// determine media-query settings
var layout = "desktop";

/*
    countUp.js
    by @inorganik
*/
// target = id of html element or var of previously selected html element where counting occurs
// startVal = the value you want to begin at
// endVal = the value you want to arrive at
// decimals = number of decimal places, default 0
// duration = duration of animation in seconds, default 2
// options = optional object of options (see below)
var CountUp = function(target, startVal, endVal, decimals, duration, options) {

    // make sure requestAnimationFrame and cancelAnimationFrame are defined
    // polyfill for browsers without native support
    // by Opera engineer Erik Möller
    var lastTime = 0;
    var vendors = ['webkit', 'moz', 'ms', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    var self = this;

     // default options
    self.options = {
        useEasing : true, // toggle easing
        useGrouping : true, // 1,000,000 vs 1000000
        separator : ',', // character to use as a separator
        decimal : '.', // character to use as a decimal
        easingFn: null, // optional custom easing closure function, default is Robert Penner's easeOutExpo
        formattingFn: null // optional custom formatting function, default is self.formatNumber below
    };
    // extend default options with passed options object
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            self.options[key] = options[key];
        }
    }
    if (self.options.separator === '') { self.options.useGrouping = false; }
    if (!self.options.prefix) self.options.prefix = '';
    if (!self.options.suffix) self.options.suffix = '';

    self.d = (typeof target === 'string') ? document.getElementById(target) : target;
    self.startVal = Number(startVal);
    self.endVal = Number(endVal);
    self.countDown = (self.startVal > self.endVal);
    self.frameVal = self.startVal;
    self.decimals = Math.max(0, decimals || 0);
    self.dec = Math.pow(10, self.decimals);
    self.duration = Number(duration) * 1000 || 2000;

    self.formatNumber = function(nStr) {
        nStr = nStr.toFixed(self.decimals);
        nStr += '';
        var x, x1, x2, rgx;
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? self.options.decimal + x[1] : '';
        rgx = /(\d+)(\d{3})/;
        if (self.options.useGrouping) {
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + self.options.separator + '$2');
            }
        }
        return self.options.prefix + x1 + x2 + self.options.suffix;
    };
    // Robert Penner's easeOutExpo
    self.easeOutExpo = function(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    };

    self.easingFn = self.options.easingFn ? self.options.easingFn : self.easeOutExpo;
    self.formattingFn = self.options.formattingFn ? self.options.formattingFn : self.formatNumber;

    self.version = function () { return '1.7.1'; };

    // Print value to target
		/*
    self.printValue = function(value) {
        var result = self.formattingFn(value);

        if (self.d.tagName === 'INPUT') {
            this.d.value = result;
        }
        else if (self.d.tagName === 'text' || self.d.tagName === 'tspan') {
            this.d.textContent = result;
        }
        else {
            this.d.innerHTML = result;
        }
    };
		*/
		self.printValue = function(value) {
			var width = 2;
			var result = (value) ? self.formatNumber(value) : '0';

			// 1. make string
			result = result + ''; 

			// 2. add padding of two 0's
			result = result.length >= 2 ? result : new Array(2 - result.length + 1).join('0') + result;
				
			// 3. wrap digits with span tags
			var temp = result.split('');
			var tempLength = temp.length;
			result = '';
			for (var i=0; i<tempLength; i++) {
				result += '<span class="num-'+temp[i]+'">'+temp[i]+'</span>';
			}
			
			//result = '<span>' + result.split('').join('<\/span><span>') + '<\/span>';

			if (self.d.tagName == 'INPUT') {
				this.d.value = result;
			} else {
				this.d.innerHTML = result;
			}
		}

    self.count = function(timestamp) {

        if (!self.startTime) { self.startTime = timestamp; }

        self.timestamp = timestamp;
        var progress = timestamp - self.startTime;
        self.remaining = self.duration - progress;

        // to ease or not to ease
        if (self.options.useEasing) {
            if (self.countDown) {
                self.frameVal = self.startVal - self.easingFn(progress, 0, self.startVal - self.endVal, self.duration);
            } else {
                self.frameVal = self.easingFn(progress, self.startVal, self.endVal - self.startVal, self.duration);
            }
        } else {
            if (self.countDown) {
                self.frameVal = self.startVal - ((self.startVal - self.endVal) * (progress / self.duration));
            } else {
                self.frameVal = self.startVal + (self.endVal - self.startVal) * (progress / self.duration);
            }
        }

        // don't go past endVal since progress can exceed duration in the last frame
        if (self.countDown) {
            self.frameVal = (self.frameVal < self.endVal) ? self.endVal : self.frameVal;
        } else {
            self.frameVal = (self.frameVal > self.endVal) ? self.endVal : self.frameVal;
        }

        // decimal
        self.frameVal = Math.round(self.frameVal*self.dec)/self.dec;

        // format and print value
        self.printValue(self.frameVal);

        // whether to continue
        if (progress < self.duration) {
            self.rAF = requestAnimationFrame(self.count);
        } else {
            if (self.callback) { self.callback(); }
        }
    };
    // start your animation
    self.start = function(callback) {
        self.callback = callback;
        self.rAF = requestAnimationFrame(self.count);
        return false;
    };
    // toggles pause/resume animation
    self.pauseResume = function() {
        if (!self.paused) {
            self.paused = true;
            cancelAnimationFrame(self.rAF);
        } else {
            self.paused = false;
            delete self.startTime;
            self.duration = self.remaining;
            self.startVal = self.frameVal;
            requestAnimationFrame(self.count);
        }
    };
    // reset to startVal so animation can be run again
    self.reset = function() {
        self.paused = false;
        delete self.startTime;
        self.startVal = startVal;
        cancelAnimationFrame(self.rAF);
        self.printValue(self.startVal);
    };
    // pass a new endVal and start animation
    self.update = function (newEndVal) {
        cancelAnimationFrame(self.rAF);
        self.paused = false;
        delete self.startTime;
        self.startVal = self.frameVal;
        self.endVal = Number(newEndVal);
        self.countDown = (self.startVal > self.endVal);
        self.rAF = requestAnimationFrame(self.count);
    };

    // format startVal on initialization
    self.printValue(self.startVal);
};

/**
 * get/check/set cookies
 *
 */
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
}

function setCookie(cname, cvalue, exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function checkCookie(cname){
	var check = getCookie(cname);
	if (check != ""){
		return true;
	} else {
		return false;
	}
}

// jQuery
$(document).ready(function(){
	
	$(window).resize(function(){
		setWHAside();
	});
	
	// legacy browser support for placeholder text on form fields
	$('input[placeholder], textarea[placeholder]').placeholder();
	
	// open external links in a new window
	$('a[href^=http]').each(function(){
		if ($(this).attr('href').indexOf(location.hostname) == -1){
			$(this).attr('target','_blank');
		}
	});
	// open downloads in a new window
	$('a[href$=pdf]').each(function(){
		$(this).attr('target','_blank');
	});
	
	$.extend($.modal.defaults, {
		closeHTML: "<a href='#'><span>Close</span></a>",
		minHeight: 250,
		maxHeight: 700,
		minWidth: 300,
		maxWidth: 900
	});
	
	// language selector
	$('#langselect p a').click(function(){
		$('#langselect ul').slideDown(333, function(){
			$('#langselect a.close').fadeIn(333);	
		});
		return false;
	});
	$('#langselect a.close').click(function(){
		$(this).fadeOut(250);
		$('#langselect ul').slideUp(333);
		return false;
	});
	$('#langselect ul a').click(function(){
		$('#langselect ul a').removeClass('active');
		$(this).addClass('active');
		
		var lang = $(this).attr('href').substr(1);
		var text = $(this).html();
		
		$('#langselect p span.current').html(text)
		$('#langselect a.close').fadeOut(250);
		$('#langselect ul').slideUp(333);
		
		$('input#selectedlang').val(lang);
		$('form#form-selectedlang').submit();
		
		return false;
	});
	
	// sharing modal launch
	$('.share-trigger').click(function(){
		var baseurl = $(this).attr('data-url-base');
		var stitle = $(this).attr('data-title');
		var simg = $(this).attr('data-img');
		var surl = $(this).attr('data-url');

		var ajaxurl = baseurl+'/site/socialshare/?title='+stitle+'&url='+surl+'&img='+simg;
				
		var vars = {
			url: ajaxurl,
			success: function(html){
				$('#social-sharing-options').html(html);
				$('#social-sharing-options').modal({
					overlayClose:true,
					containerId: 'simplemodal-container-dark',
					onOpen: function (dialog) {
						dialog.overlay.fadeIn('fast', function(){
							dialog.data.hide();
							dialog.container.fadeIn('fast', function(){
								dialog.data.fadeIn('fast');
								
								// resize and recenter
								dialog.container.css('height', 'auto');
								dialog.origHeight = 0;
								$.modal.setContainerDimensions();
								$.modal.setPosition();
								
								initSharingWidgets();
							});
						});
					},
					onClose: function (dialog) {
						dialog.data.fadeOut('fast', function(){
							dialog.container.fadeOut('fast', function(){
								dialog.overlay.fadeOut('fast', function(){
									$.modal.close();
								});
							});
						});
					}
				});
			},
			error: function(){
				alert('Connection Error. Please try again later.');
			}
		}
		$.ajax(vars);
		return false;
	});
	
	// lookbook modal 
	var lookbook_current_index = 0;
	var lookbook_total = $('.lb-spread').length-1;
	$('.lb-modal-trigger').click(function(){
		var index = $('.lb-spread').index($(this).parent());
		var img = $(this).find('.lb-spread-img').attr('src');
		var desc = $(this).find('.lb-spread-desc').html();
		lookbook_current_index = index;
		
		var html = '<i class="icons icon-naleft white lb-modal-prev"><span>Prev</span></i><i class="icons icon-naright white lb-modal-next"><span>next</span></i>'
			+ '<div class="lb-modal-img-shell">'
			+ '<img src="'+img+'" height="592" alt="" border="0"/>';
		if (desc != undefined && desc != ''){
			html += '<div class="lb-modal-info">'+desc+'</div>';
		}
		html += '</div>';
		
		$('#lookbook-modal').html(html);
		$('#lookbook-modal').modal({
			closeHTML: "<a href='#'><span>Close</span></a>",
			minHeight: 672,
			maxHeight: 672,
			minWidth: 848,
			maxWidth: 848,
			overlayClose: true,
			containerId: 'simplemodal-container-lookbook',
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function(){
					dialog.data.hide();
					dialog.container.fadeIn('fast', function(){
						dialog.data.fadeIn('fast');
						
						// resize and recenter
						dialog.container.css('height', 'auto');
						dialog.origHeight = 0;
						$.modal.setContainerDimensions();
						$.modal.setPosition();
					});
				});
			},
			onClose: function (dialog) {
				dialog.data.fadeOut('fast', function(){
					dialog.container.fadeOut('fast', function(){
						dialog.overlay.fadeOut('fast', function(){
							$.modal.close();
						});
					});
				});
			}
		});
		return false;
	});
	
	$('.lb-modal-prev, .lb-modal-next').live('click', function(){
		var new_index = lookbook_current_index;
		if ($(this).hasClass('lb-modal-prev')){
			// prev
			if (lookbook_current_index > 0){
				new_index--;
			} else {
				new_index = lookbook_total;
			}
		} else {
			// next
			if (lookbook_current_index < lookbook_total){
				new_index++;
			} else {
				new_index = 0;
			}
		}
		
		lookbook_current_index = new_index;
		
		var target = $('.lb-lookbook-container .lb-spread:eq('+new_index+')');
		var img = target.find('.lb-spread-img').attr('src');
		var desc = target.find('.lb-spread-desc').html();
				
		var html = '<img src="'+img+'" height="592" alt="" border="0"/>';
		if (desc != undefined && desc != ''){
			html += '<div class="lb-modal-info">'+desc+'</div>';
		}
		
		$('#lookbook-modal .lb-modal-img-shell').html(html);		
	});
	
	
	// HOME actions
	if ($('section#home').length == 1){
		// home newsletter signup
		$('#home-signup.closed').live('click', function(){
			openHomeSignup();
		});
		$('#home-signup.open > span').live('click', function(){
			closeHomeSignup();
		});
		var ht = setTimeout(openHomeSignup, 5000);
		
		// home What's Happening
		var whIntDuration = 10000;
		var whInt = setInterval(whInterval,whIntDuration);
		$('#home-wh-container').hover(
			function(){
				$(this).addClass('hover');
				whInt = clearInterval(whInt);
			},
			function(){
				$(this).removeClass('hover');
				if ($(this).hasClass('auto')){
					whInt = setInterval(whInterval,whIntDuration);
				}
			}
		);
		$('#home-wh-tabs a').click(function(){
			$('#home-wh-container').removeClass('auto');
			var tabIndex = $(this).parent().index();
			changeHomeTabs(tabIndex);
			return false;
		});
		
		// home Sponsored
		var homeSponsoredLength = $('#home-sponsored-shell').children('div').length;
		if (homeSponsoredLength > 1){
			var sponsoredIntDuration = 10000;
			var sponsoredInt = setInterval(sponsoredInterval,sponsoredIntDuration);
			$('#home-sponsored-shell').css({'width':(homeSponsoredLength*600)+'px'});
			$('#home-sponsored-container').append('<nav></nav>');
			for (var i=0; i<homeSponsoredLength; i++){
				var item = '<a ';
				if (i==0){
					item += 'class="selected" ';
				}
				item += 'href="#sponsored-'+(i+1)+'">'+(i+1)+'</a>';
				$('#home-sponsored-container nav').append(item);
			}
			$('#home-sponsored-container nav a').click(function(){
				$('#home-sponsored-container').removeClass('auto');
				var index = $(this).index();
				changeSponsoredTabs(index);
				return false;
			});
			$('#home-sponsored-container').hover(
				function(){
					$(this).addClass('hover');
					sponsoredInt = clearInterval(sponsoredInt);
				},
				function(){
					$(this).removeClass('hover');
					if ($(this).hasClass('auto')){
						sponsoredInt = setInterval(sponsoredInterval,sponsoredIntDuration);
					}
				}
			);
		}
	}
	
	// DIRECTORY actions
	if ($('section#directory').length == 1){
		
		var searchSpinnerOpts = {
		  lines: 13,
		  length: 4,
		  width: 2,
		  radius: 6,
		  rotate: 0,
		  color: '#000',
		  speed: 1,
		  trail: 60,
		  shadow: false,
		  hwaccel: false,
		  className: 'spinner',
		  zIndex: 12000,
		  top: 'auto',
		  left: 'auto'
		};
		var target = document.getElementById('search-spinner');
		var searchSpinner = new Spinner(searchSpinnerOpts).spin(target);
		$('#search-spinner').hide();
		
		// hide the checkboxes (we know the user has JS)
		$('#directory-nav label input').css({'display':'none'});
		// add empty onclick which allows labels to work on iPad
//		$('#directory-nav label').attr('onclick','');
		// set smaller heights on category lists that won't require scrolling
		$('.search-option-sub ul.overview').each(function(){
			var count = $(this).children('li').length;
			if (count < 14){
				var height = count*24;
				$(this).css({'height':height+'px'});
				$(this).parent().css({'height':height+'px'});
				$(this).closest('.search-list').css({'height':(height+58)+'px'});
			}
		});
		$('.search-list > div').tinyscrollbar();
		// category groups
		$('.search-option-sub h3').click(function(){
			$(this).parent().toggleClass('selected');
			$(this).parent().find('.search-list > div').tinyscrollbar();			
			$(this).parent().siblings('.search-option-sub').removeClass('selected');
			if ($(this).parent().hasClass('selected')){
				$('#directory-dismiss').remove();
				$('#wrapper').append('<div id="directory-dismiss" class="dismiss"></div>');
				$('#directory-dismiss').click(function(){
					$('.search-option-sub').removeClass('selected');
					$(this).remove();
				});
			} else {
				$('#directory-dismiss').remove();
			}
		});
		$('.search-list .overview li button').click(function(e){
			e.preventDefault();
			var item = $(this).closest('li');
			var check = $(this).siblings('input');
			item.toggleClass('selected');
			if (item.hasClass('selected')){
				check.attr('checked','checked');
			} else {
				check.attr('checked',false);
			}
		});
		/*
		// categories
		$('.search-list .overview label').click(function(e){
			e.preventDefault();
			$(this).toggleClass('selected');
			if ($(this).hasClass('selected')){
			//	$(this).removeClass('selected');
				$(this).children('input').attr('checked','checked');
			} else {
			//	$(this).addClass('selected');
				$(this).children('input').attr('checked',false);
			}
		});
		*/
		$('.search-list nav a.clear').click(function(){
			var $list = $(this).closest('.search-list');
			$list.find('.overview li').each(function(){
				$(this).removeClass('selected');
				$(this).children('input').attr('checked',false);
			});
			return false;
		});
		$('input#directorysearchquery').focus(function(){
			$('.search-option:not(.static)').removeClass('active');
			$('#directory-dismiss').remove();
		});
		$('a#results-reset').click(function(){
			$('.search-option:not(.static)').removeClass('selected active');
			$('.search-option > label input, .search-list label input').attr('checked',false);
			$('.search-list .overview li').each(function(){
				$(this).removeClass('selected');
				$(this).children('input').attr('checked',false);
			});
			$('#directorysearchquery').val('');
			
			$(this).fadeOut(250);
			$('p#results-breadcrumb').html('&nbsp;');
			$('#directory-nav header').removeClass('active');
			
			resetDirectoryIntro();
			return false;
		});
		$('form#directorysearch').submit(function(event){
			$('#search-spinner').fadeIn(250);
			
			var type = false;
			var query = false;
			
			// close any open submenus
			$('.search-option-sub').removeClass('selected');
			$('#directory-dismiss').remove();
			
			var resultsBCT = "Results ";
			if ($('#directorysearchquery').val()){
				var str = $('#directorysearchquery').val();
				if (str.length > 2){
					query = true;
					resultsBCT += "containing <strong>"+$('#directorysearchquery').val()+"</strong> ";
				}
			}
			
			var olength = $('.search-option').length;
			var ocount = 1;
			$('.search-option').each(function(){
				var clength = $(this).find('.search-list li input').length;
				var ccount = 1;
				var catcount = 1;
				if ($(this).hasClass('selected')){
					type = true;
					/*
					if ($(this).children('label').children('span').length > 0){
						resultsBCT += " in <strong>"+$(this).children('label').children('span').text()+"</strong>";
					}
					*/
					if (clength > 0){
						$(this).find('.search-list li input').each(function(){
							if ($(this).attr('checked')){
								if (catcount == 1){
									resultsBCT += "in ";
								} else if (catcount > 1){
									resultsBCT += " + ";
								}
								resultsBCT += "<strong>"+$(this).siblings('button').text()+"</strong>";
								catcount++;
							}
							if (ccount == clength){
								submitDirectoryQuery(resultsBCT);
							} else {
								ccount++;
							}
						});
					} else {
						submitDirectoryQuery(resultsBCT);
					}
				}
				if (ocount == olength){
					if (!type){
						if (query){
							submitDirectoryQuery(resultsBCT);
						} else {
							showDirectoryError('none');
						}
					}
				} else {
					ocount++;
				}
			});
			
			return false;
		});
		
	}
	
	// scroll the fixed What's Happening aside
	if ($('#whatshappening').length == 1){
		$(window).scroll(
			function(){
				if ($('body').hasClass('whaside')){
					var whHeight = $('#whatshappening').height();
					var whContentHeight = $('#whatshappening > div').outerHeight();
					if (whContentHeight > whHeight){
						var docHeight = $('#wrapper').outerHeight();
						var scrollAmount = $(window).scrollTop();
						var scrollPerc = scrollAmount / (docHeight-whHeight);
						var newWHTop = 0-((whContentHeight-whHeight)*scrollPerc);
						$('#whatshappening > div').css({'top':newWHTop+'px'});
					} else {
						$('#whatshappening > div').css({'top':'0px'});
					}
				}
			}
		);
	}
	
	// image gallery slider
	if ($('.scroller').length > 0){
		$('.scroller').each(function(){
			$scroller = $(this);
			$list = $scroller.find('ul.scroller-list');
			$list.children('li:last-child').css({'margin-right':'0px'});
			var adNum = $list.children().length;
			var adWidth = $list.children('li:first-child').width();
			var adMargin = parseInt($list.children('li:first-child').css('margin-right'));
			var totalScrollWidth = (adNum*adWidth)+((adNum-1)*adMargin);
			$list.css({'width':totalScrollWidth+'px'});

			if ($scroller.hasClass('ads')){
				var type = 'ads';
				var displayMax = 3;
			} else if ($scroller.hasClass('imgs')){
				var type = 'gallery';
				var displayMax = 4;
			} else if ($scroller.hasClass('imgsbig')){
				var type = 'gallery';
				var displayMax = 7;
			}

			if ($list.children().length > displayMax){
				$scroller.append('<span class="prev disabled"><i class="icons icon-naleft"></i></span><span class="next"><i class="icons icon-naright"></i></span>');
				$('.scroller > span').click(function(){
					if (!$(this).hasClass('working')){
						if ($(this).hasClass('next')){
							var direction = 'next';
						} else if ($(this).hasClass('prev')){
							var direction = 'prev';
						}

						var btnTarget = $(this);
						var shellTarget = btnTarget.parent().parent().find('.scroller-shell');
						var shellWidth = shellTarget.width();
						var shellLeft = 0;

						var listTarget = btnTarget.parent().parent().find('.scroller-list');
						var listWidth = listTarget.width();
						var listLeft = parseInt(listTarget.css('left'));

						var newListPos = listLeft;
						if (direction == 'next'){
							if ($(this).hasClass('disabled')){
								newListPos = 0;
							} else {
								newListPos = listLeft-(shellWidth+adMargin);
							}
							if (newListPos < 0-(listWidth-shellWidth)){ newListPos = 0-(listWidth-shellWidth); }
						} else if (direction == 'prev'){
							if ($(this).hasClass('disabled')){
								newListPos = 0-(listWidth-shellWidth);
							} else {
								newListPos = listLeft+(shellWidth+adMargin);
							}
							if (newListPos > 0){ newListPos = 0; }
						}

						btnTarget.siblings('span').addClass('working');
						btnTarget.addClass('working');

						listTarget.stop(true,false).animate({"left": newListPos+"px"}, 700, 'easeInOutQuint', function(){
							var newListLeft = parseInt(listTarget.css('left'));

							if (direction == 'next'){
								if (newListLeft+listWidth <= shellLeft+shellWidth){
									btnTarget.addClass('disabled');
								} else {
									btnTarget.removeClass('disabled');
								}
								if (newListLeft == shellLeft){
									btnTarget.siblings('span.prev').addClass('disabled');
								} else {
									btnTarget.siblings('span.prev').removeClass('disabled');
								}
							} else if (direction == 'prev'){
								if (newListLeft < shellLeft){
									btnTarget.removeClass('disabled');
								} else {
									btnTarget.addClass('disabled');
								}
								if (newListLeft+listWidth <= shellLeft+shellWidth){
									btnTarget.siblings('span.next').addClass('disabled');
								} else {
									btnTarget.siblings('span.next').removeClass('disabled');
								}
							}
							btnTarget.siblings('span').removeClass('working');
							btnTarget.removeClass('working');
						});
					}
				});
			}
		});
	}
	// image gallery thumb changing
	if ($('.imggallery .scroller').length > 0){
		$('.imggallery .scroller-list a').click(function(){
			var src = $(this).attr('href');
			$(this).closest('.imggallery').find('.imghero').attr('src', src);
			return false;
		});
	}

	// attractions featured slideshow
	if ($('#attractions').length == 1){
		var attrSlideShowDelay = 5000;
		var attrSlideShowSpeed = 1000;
		var attrSlideWidth = 910;
		var attrCount = 0;
		var attrTotal = $('#attractions-slideshow').children('li').length-1;
		$('#attractions-slideshow').css({'width':((attrTotal+1)*attrSlideWidth)+'px'})
		
		var attrSlideshowInterval = setInterval(attrSlideshowLoop, attrSlideShowDelay);
		function attrSlideshowAnim(attrCount){
			var newPos = 0-(attrSlideWidth*attrCount);
			$('.attractions-gallery > span').addClass('working');
			if ($('#attractions-slideshow li:eq('+attrCount+') a span').length == 1){
				var $target = $('#attractions-slideshow li:eq('+attrCount+') a');
				var $span = $target.children('span');
				var img = $('<img alt="" height="400" width="910" />').attr('src', $span.attr('data-src'));
				$span.remove();
				img.prependTo($target);
				$(img).load(function(){
					$('#attractions-slideshow').stop(true,false).animate({"left": newPos+"px"}, attrSlideShowSpeed, 'easeInOutQuint', function(){
						$('.attractions-gallery > span').removeClass('working');
						attrSlideshowInterval = setInterval(attrSlideshowLoop, attrSlideShowDelay);
					});
				});
			} else {
				$('#attractions-slideshow').stop(true,false).animate({"left": newPos+"px"}, attrSlideShowSpeed, 'easeInOutQuint', function(){
					$('.attractions-gallery > span').removeClass('working');
					attrSlideshowInterval = setInterval(attrSlideshowLoop, attrSlideShowDelay);
				});
			}
		}
		function attrSlideshowLoop(){
			clearInterval(attrSlideshowInterval);
			if (attrCount < attrTotal){
				attrCount++;
			} else {
				attrCount = 0;
			}
			attrSlideshowAnim(attrCount);
		};
		$('.attractions-gallery > span').click(function(){
			if (!$(this).hasClass('working')){
				clearInterval(attrSlideshowInterval);
				var type = ($(this).hasClass('prev')) ? "prev" : "next";
				switch(type){
					case "prev":
						attrCount = (attrCount > 0) ? attrCount-1 : attrTotal;
						break;
					case "next":
						attrCount = (attrCount < attrTotal) ? attrCount+1 : 0;
						break;
				}
				attrSlideshowAnim(attrCount);
			}
		});
		$('.attractions-gallery > span').focus(function(){
			$(this).blur();
		});
	}

	// page subnav reveal
	$('#page-subnav').hover(
		function(){
			var subnavBaseHeight = $('#page-subnav h2').height();
			var subnavBottomPadding = 0;
			var height = 0;
			$('#page-subnav > div ul ul').each(function(){
				if ($(this).height() > height) height = $(this).height();
				subnavBottomPadding = 20;
			});
			$(this).stop(true,false).animate({'height':(height+subnavBaseHeight+subnavBottomPadding)+'px'}, 500, 'easeInOutQuint');
		},
		function(){
			$(this).stop(true,false).animate({'height':'56px'}, 500, 'easeInOutQuint');
		}
	);
	
	if ($('#mc-embedded-subscribe-form').length > 0){
		
		$('#mc-embedded-subscribe-form').each(function(index){
			$(this).find('#mce-responses').before('<div class="mc-field-group input-group"><label>Terms and Conditions <span class="asterisk">*</span> </label><ul><li><input class="required" id="moa-accept-terms" type="checkbox" value="1"> <label for="moa-accept-terms">I have read and consent to the <a href="/terms-of-use" target="_blank">Terms of Use</a> and <a href="/privacy" target="_blank">Privacy Policy</a> on mallofamerica.com.</label></li></ul></div>');
		});
		
		$(document).on('submit', '#mc-embedded-subscribe-form', function(){
			var minimum_age = 13;
			var errors = 0;
			
			$(this).find('input[type=text].required, input[type=email].required, select.required').each(function(index){
				if ($(this).val() == ''){
					$(this).addClass('mce_inline_error');
					$(this).closest('.mc-field-group').children('label').addClass('mce_inline_error');
					errors++;
				} else {
					$(this).removeClass('mce_inline_error');
					$(this).closest('.mc-field-group').children('label').removeClass('mce_inline_error');
				}
			});
			
			$(this).find('input[type=checkbox].required').each(function(index){
				if ($(this).is(':checked')){
					$(this).removeClass('mce_inline_error');
					$(this).closest('.mc-field-group').children('label').removeClass('mce_inline_error');
				} else {
					$(this).addClass('mce_inline_error');
					$(this).closest('.mc-field-group').children('label').addClass('mce_inline_error');
					errors++;
				}
			});
			
			if ($(this).find('#mce-BIRTHDATE-month').length > 0){
				// form has a birthdate field
				var birthday_month = $(this).find('#mce-BIRTHDATE-month').val();
				var birthday_day = $(this).find('#mce-BIRTHDATE-day').val();
				var birthday_year = $(this).find('#mce-BIRTHDATE-year').val();
			
				var age = getAge(new Date(birthday_month+'/'+birthday_day+'/'+birthday_year));
				if (!isNaN(age)){
					if (age >= minimum_age){
						if (!errors){
							$(this).slideUp(250).after('<p><strong>Thank you!</strong></p>');
							return true
						}
					} else {
						// silent fail
						$(this).slideUp(250).after('<p><strong>We\'re sorry, we are unable to process your request at this time.</strong></p>');
					}
				}
			} else {
				if (!errors){
					return true;
				}
			}
		
			return false;
		});
	
	}
	
	// newsletter signup (mailchimp)
	$(document).on('submit', '#newsletter-signup-form', function(e){
		e.preventDefault();
		
		var check_inputs = ['email','firstname','lastname','zipcode','country','dob_month','dob_day','dob_year'];
		var check_checkboxes = ['termsconsent','agreetoreceive'];
		var errors = false;
		
		// check inputs
		for (var i = 0; i < check_inputs.length; i++){
			var $target = $('#input-'+check_inputs[i]);
			var test = $target.val();
			if (test){
				$target.removeClass('error');
			} else {
				errors = true;
				$target.addClass('error');
			}
		}
		
		// check checkboxes
		for (var i = 0; i < check_checkboxes.length; i++){
			var $target = $('#input-'+check_checkboxes[i]);
			var $errormsg = $('#error-'+check_checkboxes[i]);
			if ($target.is(":checked")){
				$target.removeClass('error');
				$('#error-'+check_checkboxes[i]).hide();
			} else {
				errors = true;
				$target.addClass('error');
				$('#error-'+check_checkboxes[i]).show();
			}
		}
		
		if (!errors && !checkCookie('dobf')){
			var request = $.ajax({
				type: "POST",
				url: $('#newsletter-signup-form').attr('action'),
				data: $('#newsletter-signup-form').serialize()
			});
			request.done(function(msg) {
				var result = JSON.parse(msg);
				if (result.error != undefined){
					// error(s)
					if (result.error.fields.coppa != undefined){
						setCookie('dobf', 1, 1);
						$('#newsletter-signup-header').html('<strong style="color:#c00;">Zoinks!</strong>');
						$('#newsletter-signup-message').html('<p style="font-style:normal;text-align:center;">We\'re sorry, we are unable to process your request at this&nbsp;time.</p>').slideDown(250);
						$('#newsletter-signup-form, #home-signup').slideUp(250);
					} else {
						$('#newsletter-signup-header').html('<strong style="color:#c00;">Correct Errors Below</strong>');
						for (var key in result.error.fields){
							$('#input-'+key).addClass('error');
						}
					}
				} else if (result.success != undefined){
					// success
					$('#newsletter-signup-header').html('You\'re all set — welcome to a whole lot of&nbsp;fabulous!');
					$('#newsletter-signup-message').html('<p style="font-style:normal;text-align:center;">You will receive periodic updates from newsletter@mallofamerica.com, depending on the preferences you share with&nbsp;us.<br><br>Follow us on <a href="https://www.facebook.com/MallofAmerica" target="_blank">Facebook</a>, <a href="https://twitter.com/mallofamerica" target="_blank">Twitter</a> and <a href="https://instagram.com/mallofamerica" target="_blank">Instagram</a> for the latest updates. Check out our <a href="http://blog.mallofamerica.com" target="_blank">blog</a> to get an insider peek at the latest in style, entertainment and culture at the&nbsp;Mall.</p>').slideDown(250);
					$('#newsletter-signup-form, #home-signup').slideUp(250);
				} else {
					// unknown error
					$('#newsletter-signup-header').html('<strong style="color:#c00;">We\'re Sorry</strong>');
					$('#newsletter-signup-message').html('<p style="font-style:normal;text-align:center;">An unknown error occurred. Please try again&nbsp;later.</p>').slideDown(250);
					$('#newsletter-signup-form, #home-signup').slideUp(250);
				}
			});
			request.fail(function(jqXHR, textStatus) {
				$('#newsletter-signup-header').html('<strong style="color:#c00;">We\'re Sorry</strong>');
				$('#newsletter-signup-message').html('<p style="font-style:normal;text-align:center;">We were unable to process your request. Please try again&nbsp;later.</p>').slideDown(250);
				$('#newsletter-signup-form, #home-signup').slideUp(250);
			});
		} else {
			$('#newsletter-signup-header').html('<strong style="color:#c00;">All Fields Required</strong>');
		}
		
		return false;
	});
	
	
	// newsletter signup (formstack)
	$('.newsletter-signup form').submit(function(){
		if (!checkCookie('dobf')){
			var email = $(this).find('input[type=email]').val();
		
			$('#newsletter-signup-step2 #input-email').val(email);
			
			$('#newsletter-signup-step2').modal({
				overlayClose:true,
				containerId: 'simplemodal-container-dark',
				onOpen: function (dialog) {
					dialog.overlay.fadeIn('fast', function(){
						dialog.data.hide();
						dialog.container.fadeIn('fast', function(){
							dialog.data.fadeIn('fast');
						});
					});
				},
				onClose: function (dialog) {
					dialog.data.fadeOut('fast', function(){
						dialog.container.fadeOut('fast', function(){
							dialog.overlay.fadeOut('fast', function(){
								$.modal.close();
							});
						});
					});
				}
			});
		}
		
		return false;
	});
	
	// ads modal
	if ($('.moaad').length > 0){
		$('.admodal-trigger').click(function(){
			$(this).siblings('.admodal').modal({
				overlayClose:true,
				onOpen: function (dialog) {
					dialog.overlay.fadeIn('fast', function(){
						dialog.data.hide();
						dialog.container.fadeIn('fast', function(){
							dialog.data.fadeIn('fast');
						});
					});
				},
				onClose: function (dialog) {
					dialog.data.fadeOut('fast', function(){
						dialog.container.fadeOut('fast', function(){
							dialog.overlay.fadeOut('fast', function(){
								$.modal.close();
							});
						});
					});
				}
			});
			return false;
		});
	}
	if ($('.lightbox').length > 0){
		$('.lightbox-trigger').click(function(){
			var lightboxTarget = 'lightbox-'+$(this).attr('href').substr(1);
			$('#'+lightboxTarget).modal({
				overlayClose:true,
				onOpen: function (dialog) {
					dialog.overlay.fadeIn('fast', function(){
						dialog.data.hide();
						dialog.container.fadeIn('fast', function(){
							dialog.data.fadeIn('fast');
						});
					});
				},
				onClose: function (dialog) {
					dialog.data.fadeOut('fast', function(){
						dialog.container.fadeOut('fast', function(){
							dialog.overlay.fadeOut('fast', function(){
								$.modal.close();
							});
						});
					});
				}
			});
			return false;
		});
	}
	
	// function to parse and cache XML
	function getXML() {
		var XML = null;
		$.ajax({
			url:      xmlFile,
			dataType: 'xml',
			async:    false,
			success:  function(data) {
				XML = data;
			}
		});
		return XML;
	}
	
	// community
	if($('#community-facts').length > 0){
		
		$('.community-fact-group header').click(function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).siblings('div').slideUp(500);
			} else {
				$(this).addClass('active')
				$(this).siblings('div').slideDown(500);
			}
			$(this).parent().siblings('.community-fact-group').each(function(){
				$(this).children('header').removeClass('active');
				$(this).children('div').slideUp(500);
			});
		});
	}
	
	// events calendar grid
	$('#events-calendar-grid .ecell-trigger').click(function(e){
		if ($.support.opacity){ // test that will reveal IE8 and below
			e.preventDefault();
			
			var $cell = $(this).closest('li');
			var $list = $(this).closest('ul');
			if (!$list.hasClass('working')){
				$list.addClass('working');
				if ($cell.hasClass('current')){
					if ($cell.hasClass('active')){
						$cell.find('.ecell-list-inner').scrollTop(0);
						$cell.removeClass('active');
						setTimeout(function(){
							$cell.removeClass('current');
						}, 250);
						setTimeout(function(){
							$list.removeClass('working selected');
						}, 500);
					} else {
						$cell.removeClass('current');
						setTimeout(function(){
							$list.removeClass('working selected');
						}, 250);
					}
				} else {
					if ($cell.siblings('.current').length){
						$cell.siblings().each(function(e){
							var $el = $(this);
							if ($(this).hasClass('active')){
								$el.find('.ecell-list-inner').scrollTop(0);
								$el.removeClass('active');
								setTimeout(function(){
									$el.removeClass('current');
								}, 250);
							} else {
								$el.removeClass('current');
							}
						});
						setTimeout(function(){
							$cell.addClass('current');
						}, 250);
						setTimeout(function(){
							$cell.addClass('active');
						}, 500);
						setTimeout(function(){
							$list.removeClass('working');
						}, 750);
					} else {
						$cell.addClass('current');
						$list.addClass('selected');
						setTimeout(function(){
							$cell.addClass('active');
						}, 250);
						setTimeout(function(){
							$list.removeClass('working')
						}, 500);
					}
				}
			}
		} else {
			// older browser - just link
		}
	});
	
	$('.events-loadmore').click(function(){
		var target = $(this).attr('data-target');
		var count = parseInt($(target).attr('data-loadmorecount'), 10);
		var total = parseInt($(target).attr('data-loadmoretotal'), 10);
		if (count < total){
			count++;
			$(target).attr('data-loadmorecount', count);
			$(target).find('.loadmore-group-'+count).removeClass('hidden');
			if (count == total-1 || total == 1) {
				$(this).hide();
			}
		} else {
			$(this).hide();
		}
	});
	
	var countdownEasing = function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	};
	if ($('#eventgrid-countdown').length && countdown_start != undefined && countdown_remaining != undefined){
		var countdown = document.getElementById('eventgrid-countdown');
		var countdown_options = {
			easingFn: countdownEasing
		};
		if (countdown_start > countdown_remaining){
			var countdown_duration = 1.5 + ((countdown_start - countdown_remaining) * .02);
			setTimeout(function(){
				var numAnim = new CountUp(countdown, countdown_start, countdown_remaining, 0, countdown_duration, countdown_options);
				numAnim.start();
			}, 1000);
		}
	}
});

// home newsletter signup
function openHomeSignup(){
	if ($('#home-signup').hasClass('closed')){
		$('#home-signup').removeClass('closed').addClass('open');
		$('#home-signup header, #home-signup form').slideDown(500, 'easeInOutQuint');
	}
}
function closeHomeSignup(){
	if ($('#home-signup').hasClass('open')){
		$('#home-signup').removeClass('open').addClass('closed');
		$('#home-signup header, #home-signup form').slideUp(500, 'easeInOutQuint');
	}
}

// home What's Happening cycle
function whInterval(){
	if ($('#home-wh-container').hasClass('auto') && !$('#home-wh-container').hasClass('hover')){
		var index = $('#home-wh-tabs li.selected').index();
		var whTabTotal = $('#home-wh-tabs').children('li').length;
		if (index < whTabTotal-1){
			changeHomeTabs(index+1);
		} else {
			changeHomeTabs(0);
		}
	} else {
		whInt = clearInterval(whInt);
	}
}
function changeHomeTabs(index){
	$('#home-wh-tabs li').removeClass('selected');
	$('#home-wh-tabs li:eq('+index+')').addClass('selected');
	var slideOffset = 0-(index*600);
	$('#home-wh-shell').stop(true,false).animate({'left':slideOffset+'px'}, 750, 'easeOutQuint');
}

// home Sponsored cycle
function sponsoredInterval(){
	if ($('#home-sponsored-container').hasClass('auto') && !$('#home-sponsored-container').hasClass('hover')){
		var index = $('#home-sponsored-container nav a.selected').index();
		var sTabTotal = $('#home-sponsored-container nav').children('a').length;
		if (index < sTabTotal-1){
			changeSponsoredTabs(index+1);
		} else {
			changeSponsoredTabs(0);
		}
	} else {
		sponsoredInt = clearInterval(sponsoredInt);
	}
}
function changeSponsoredTabs(index){
	$('#home-sponsored-container nav a').removeClass('selected');
	$('#home-sponsored-container nav a:eq('+index+')').addClass('selected');
	var slideOffset = 0-(index*600);
	$('#home-sponsored-shell').stop(true,false).animate({'left':slideOffset+'px'}, 750, 'easeOutQuint');
}


function resetDirectoryIntro(){
	$('body').animate({scrollTop: 0}, 1000, 'easeOutQuint');
	$('#directory-noresults').slideUp(1000, 'easeOutQuint');
	$('#directory-toomanyresults').slideUp(1000, 'easeOutQuint');
	$('#directory-intro').slideDown(1000, 'easeOutQuint');
	$('#page').slideUp(1000, 'easeOutQuint');
}
function showDirectoryError(type){
	$('body').animate({scrollTop: 0}, 1000, 'easeOutQuint');
	switch(type){
		case "none":
			$('#directory-noresults').slideDown(1000, 'easeOutQuint');
			$('#directory-toomanyresults').slideUp(1000, 'easeOutQuint');
			break;
		case "many":
			$('#directory-noresults').slideUp(1000, 'easeOutQuint');
			$('#directory-toomanyresults').slideDown(1000, 'easeOutQuint');
			break;
	}
	$('#directory-intro').slideDown(1000, 'easeOutQuint');
	$('#page').slideUp(1000, 'easeOutQuint');
	$('#search-spinner').delay(750).fadeOut(250);
}
function showDirectoryResults(){
	$('body').animate({scrollTop: 0}, 1000, 'easeOutQuint');
	$('#directory-noresults').slideUp(1000, 'easeOutQuint');
	$('#directory-toomanyresults').slideUp(1000, 'easeOutQuint');
	$('#directory-intro').slideUp(1000, 'easeOutQuint');
	$('#page').slideDown(1000, 'easeOutQuint');
	$('#search-spinner').delay(750).fadeOut(250);
}
function submitDirectoryQuery(resultsBCT){
	resetDirectoryIntro();
	var ajaxurl = $('form#directorysearch').attr('data-ajax');
	var formdata = $('form#directorysearch').serialize();
	var vars = {
		url: ajaxurl,
		data: formdata,
		type: "POST",
		success: function(html){
			if (html == undefined || html == null || html == '' || html == 0 || html == '0'){
				showDirectoryError('none');
			} else if (html == 1 || html == '1'){
				showDirectoryError('many');
			} else {
				$('#search-results').html(html);
				showDirectoryResults();
			}
			$('a#results-reset').fadeIn(250);
			$('#directory-nav header').addClass('active');
			$('p#results-breadcrumb').html(resultsBCT);
		},
		error: function(){
			showDirectoryError('none');
		}
	}
	$.ajax(vars);
}

// set display of What's Happening aside
function setWHAside(){
	if (!$('body').hasClass('noaside')){
		if ($(window).width() > 1210){
			$('body').addClass('whaside');
		} else {
			$('body').removeClass('whaside');
		}
	}
}

// init the sharing widgets that were loaded via AJAX
function initSharingWidgets(){
	// render the facebook buttons
	FB.XFBML.parse();
	/*
	// FB js is included in the main site template (for the like button)
	if ($('.social .fb').length >= 1){
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
	*/
	// render twitter buttons
	if ($('.social .tw').length >= 1){
		(function() {
			var twitterScriptTag = document.createElement('script');
			twitterScriptTag.type = 'text/javascript';
			twitterScriptTag.async = true;
			twitterScriptTag.src = 'http://platform.twitter.com/widgets.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(twitterScriptTag, s);
		})();
	}
	// render google +1 buttons
	if ($('.social .gp').length >= 1){
		(function() {
			var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			po.src = '//apis.google.com/js/plusone.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		})();
	}
	// render the pinterest buttons
	if ($('.social .pn').length >= 1){
		(function (w, d, load) {
			var script,
			first = d.getElementsByTagName('SCRIPT')[0],
			n = load.length,
			i = 0,
			go = function () {
				for (i = 0; i < n; i = i + 1) {
					script = d.createElement('SCRIPT');
					script.type = 'text/javascript';
					script.async = true;
					script.src = load[i];
					first.parentNode.insertBefore(script, first);
				}
			}
			if (w.attachEvent) {
				w.attachEvent('onload', go);
			} else {
				w.addEventListener('load', go, false);
			}
		}(window, document, 
			['//assets.pinterest.com/js/pinit.js']
		));
	}
}

function getAge(birthdate){
	var today = new Date();
	var nowyear = today.getFullYear();
	var nowmonth = today.getMonth();
	var nowday = today.getDate();
 
	var birthyear = birthdate.getFullYear();
	var birthmonth = birthdate.getMonth();
	var birthday = birthdate.getDate();
 
	var age = nowyear - birthyear;
	var age_month = nowmonth - birthmonth;
	var age_day = nowday - birthday;
    
	if(age_month < 0 || (age_month == 0 && age_day <0)) {
		age = parseInt(age) -1;
	}
	
	return age;
}