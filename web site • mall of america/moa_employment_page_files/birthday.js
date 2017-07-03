$(document).ready(function(){
	$.fn.extend({
		animateCss: function (animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);
			});
		}
	});
	
	$(document).keypress(function(e){
		// console.log('keycode: '+e.keyCode);
		if (e.keyCode == 66 || e.keyCode == 98){ // B
			$('a#logo').animateCss('bounce');
		} else if (e.keyCode == 70 || e.keyCode == 102){ // F
			$('a#logo').animateCss('flash');
		} else if (e.keyCode == 80 || e.keyCode == 112){ // P
			$('a#logo').animateCss('pulse');
		} else if (e.keyCode == 82 || e.keyCode == 114){ // R
			$('a#logo').animateCss('rubberBand');
		} else if (e.keyCode == 83 || e.keyCode == 115){ // S
			$('a#logo').animateCss('shake');
		} else if (e.keyCode == 87 || e.keyCode == 119){ // W
			$('a#logo').animateCss('wobble');
		} else if (e.keyCode == 84 || e.keyCode == 116){ // T
			$('a#logo').animateCss('tada');
		} else if (e.keyCode == 74 || e.keyCode == 106){ // J
			$('a#logo').animateCss('jello');
		}
	});
	
  // globals
  var canvas;
  var ctx;
  var W;
  var H;
  var mp = 150; //max particles
  var particles = [];
  var angle = 0;
  var tiltAngle = 0;
  var confettiActive = true;
  var animationComplete = true;
  var deactivationTimerHandler;
  var reactivationTimerHandler;
  var animationHandler;
	var confettiFirstRun = false;

  // objects

  var particleColors = {
      colorOptions: ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"],
      colorIndex: 0,
      colorIncrementer: 0,
      colorThreshold: 10,
      getColor: function () {
          if (this.colorIncrementer >= 10) {
              this.colorIncrementer = 0;
              this.colorIndex++;
              if (this.colorIndex >= this.colorOptions.length) {
                  this.colorIndex = 0;
              }
          }
          this.colorIncrementer++;
          return this.colorOptions[this.colorIndex];
      }
  }

  function confettiParticle(color) {
		var rMin = (W < 740) ? 7 : 10;
		var rMax = (W < 740) ? 20 : 30;
		var density = (W < 740) ? 2 : 10;
		
		this.x = Math.random() * W; // x-coordinate
		this.y = (Math.random() * H) - H; //y-coordinate
		this.r = RandomFromTo(rMin, rMax); //radius;
		this.d = (Math.random() * mp) + density; //density;
		this.color = color;
		this.tilt = Math.floor(Math.random() * 10) - 10;
		this.tiltAngleIncremental = (Math.random() * 0.07) + .05;
		this.tiltAngle = 0;

		this.draw = function () {
			ctx.beginPath();
			ctx.lineWidth = this.r / 2;
			ctx.strokeStyle = this.color;
			ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
			ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
			return ctx.stroke();
		}
  }
	
	document.addEventListener('DOMContentLoaded', function(){
    SetGlobals();
	});
	
  SetGlobals();

  $(window).resize(function () {
      W = window.innerWidth;
      H = window.innerHeight;
			mp = (W < 740) ? 50 : 150;
      canvas.width = W;
      canvas.height = H;
  });
	
	var birthday_canvas_interval;
	$('#birthday-party-mode > button').on('click', function(){
		var btn = $(this);
		$('body').toggleClass('birthday-party-mode');
		if ($('body').hasClass('birthday-party-mode')){
			$('#birthday-confetti-canvas').show();
			$('#birthday-party-mode .callout').removeClass('hide');
			clearInterval(birthday_canvas_interval);
			if (!confettiFirstRun){
				InitializeConfetti();
				confettiFirstRun = true;
			} else {
				RestartConfetti();
			}
			$('#birthday-disco-ball').addClass('active');
		} else {
			DeactivateConfetti();
			$('#birthday-disco-ball').removeClass('active');
			birthday_canvas_interval = setInterval(function(){
				// in case the browser is older and the pointer-events: none aren't working on the canvas elements
				// prevents it from being blocking when turned off
				if (!$('body').hasClass('birthday-party-mode')){
					$('#birthday-confetti-canvas').hide();
					$('#birthday-party-mode .callout').removeClass('hide');
				}
			}, 9000);
		}
	});
	$('#birthday-party-mode .callout .icon-x').on('click', function(){
		$('#birthday-party-mode .callout').addClass('hide');
	});
	
	$('#birthday-disco-ball').on('click', function(){
		$(this).removeClass('active');
	});

  function SetGlobals() {
    W = window.innerWidth;
    H = window.innerHeight;
		mp = (W < 740) ? 50 : 150;
		canvas = document.getElementById("birthday-confetti-canvas");
		if (canvas !== null){
			ctx = canvas.getContext("2d");
			canvas.width = W;
			canvas.height = H;
		}
  }

  function InitializeConfetti() {
      particles = [];
      animationComplete = false;
      for (var i = 0; i < mp; i++) {
          var particleColor = particleColors.getColor();
          particles.push(new confettiParticle(particleColor));
      }
      StartConfetti();
  }

  function Draw() {
      ctx.clearRect(0, 0, W, H);
      var results = [];
      for (var i = 0; i < mp; i++) {
          (function (j) {
              results.push(particles[j].draw());
          })(i);
      }
      Update();

      return results;
  }

  function RandomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
  }


  function Update() {
      var remainingFlakes = 0;
      var particle;
      angle += 0.01;
      tiltAngle += 0.1;

      for (var i = 0; i < mp; i++) {
          particle = particles[i];
          if (animationComplete) return;

          if (!confettiActive && particle.y < -15) {
              particle.y = H + 100;
              continue;
          }

          stepParticle(particle, i);

          if (particle.y <= H) {
              remainingFlakes++;
          }
          CheckForReposition(particle, i);
      }

      if (remainingFlakes === 0) {
          StopConfetti();
      }
  }

  function CheckForReposition(particle, index) {
      if ((particle.x > W + 20 || particle.x < -20 || particle.y > H) && confettiActive) {
          if (index % 5 > 0 || index % 2 == 0) //66.67% of the flakes
          {
              repositionParticle(particle, Math.random() * W, -10, Math.floor(Math.random() * 10) - 10);
          } else {
              if (Math.sin(angle) > 0) {
                  //Enter from the left
                  repositionParticle(particle, -5, Math.random() * H, Math.floor(Math.random() * 10) - 10);
              } else {
                  //Enter from the right
                  repositionParticle(particle, W + 5, Math.random() * H, Math.floor(Math.random() * 10) - 10);
              }
          }
      }
  }
  function stepParticle(particle, particleIndex) {
      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2;
      particle.x += Math.sin(angle);
      particle.tilt = (Math.sin(particle.tiltAngle - (particleIndex / 3))) * 15;
  }

  function repositionParticle(particle, xCoordinate, yCoordinate, tilt) {
      particle.x = xCoordinate;
      particle.y = yCoordinate;
      particle.tilt = tilt;
  }

  function StartConfetti() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      (function animloop() {
          if (animationComplete) return null;
          animationHandler = requestAnimFrame(animloop);
          return Draw();
      })();
  }

  function ClearTimers() {
      clearTimeout(reactivationTimerHandler);
      clearTimeout(animationHandler);
  }

  function DeactivateConfetti() {
      confettiActive = false;
      ClearTimers();
  }

  function StopConfetti() {
      animationComplete = true;
      if (ctx == undefined) return;
      ctx.clearRect(0, 0, W, H);
  }

  function RestartConfetti() {
      ClearTimers();
      StopConfetti();
      reactivationTimerHandler = setTimeout(function () {
          confettiActive = true;
          animationComplete = false;
          InitializeConfetti();
      }, 100);

  }

  window.requestAnimFrame = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
          return window.setTimeout(callback, 1000 / 60);
      };
  })();

});