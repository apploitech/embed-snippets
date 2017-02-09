jQuery(document).ready(function() {

    //Parallex Health and B.
      if($(window).width()>767) {
        $(window).width
        var s = skrollr.init();
        }

      //Responsive videos
      $(".video").fitVids();
    


    // ********************************************************* 
    // ANCHOR LINK
    // ********************************************************* 

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash),
                headerHeight = $("#header-sticky").height() + 50;
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 700);
                return false;
            }
        }
    });

// ********************************************************* 
// OVERLAY
// ********************************************************* 
    var docheight = jQuery(document).height();
    //console.log(docheight)
    jQuery('#overlay').css('height', docheight);
    jQuery('.job_bg').css('height', docheight);

// ********************************************************* 
// HEALTH AND BENEFITS SCROLL
// ********************************************************* 
    $(".immune-link").click(function() {$('html, body').animate({scrollTop: $("#immune-mood").offset().top}, 500);});
    $(".energy-link").click(function() {$('html, body').animate({scrollTop: $("#energy-mood").offset().top}, 500);});
    $(".generalhealth-link").click(function() {$('html, body').animate({scrollTop: $("#generalhealth-mood").offset().top}, 500);});
    $(".beauty-link").click(function() {$('html, body').animate({scrollTop: $("#beauty-mood").offset().top}, 500);});
    $(".detox-link").click(function() {$('html, body').animate({scrollTop: $("#detox-mood").offset().top}, 500);});
    $(".superpower-link").click(function() {$('html, body').animate({scrollTop: $("#superpower-mood").offset().top}, 500);});
    $(".mood-top").click(function() {$('html, body').animate({scrollTop: $("#choose-mood").offset().top}, 500);});



// ********************************************************* 
// MAIN MENU HACK
// ********************************************************* 
  
  $('li.current-menu-ancestor').children('a').addClass('submenu-open');
  $('li.current-menu-ancestor').children('ul.sub-menu').css({'display':'block'});


// ********************************************************* 
// MAIN MENU HACK
// ********************************************************* 
  
  $('.job h1').on('click',function() {
    $(this).parent().find('.description').slideToggle('fast').toggleClass('open');
  });


// ********************************************************* 
// EVENTS START
// ********************************************************* 

  $('.archive-events').on('click', '.arrow', function(e) {
    var $section = $(e.delegateTarget);
        $section.toggleClass('open');
        $('.expand', $section).toggleClass('open');    
  });

  $('.featured-events .cta-btn').on('click', function() {
        $('.featured-events').toggleClass('close');    
  });


  // MINOR HACK
  if (window.location.hash == "#featured") {
    $(".archive-events:first-child .content .expand").addClass("open");
    $(".archive-events:first-child").addClass("open");
  }

// ********************************************************* 
// MAIN MENU
// ********************************************************* 

  var $lateral_menu_trigger = jQuery('.menu-trigger'),
      $content_wrapper = jQuery('.main-content'),
      $navigation = jQuery('header');
      $overlay = jQuery('#overlay');

    //open-close lateral menu clicking on the menu icon
    $lateral_menu_trigger.on('click', function(event){
      event.preventDefault();
      if($navigation.hasClass('lateral-menu-is-open') ) {
        $overlay.fadeOut();
        jQuery('.menu li .submenu-open').trigger('click');        
      } else {
        $overlay.fadeIn();
      };
      
      $lateral_menu_trigger.toggleClass('is-clicked');
      $navigation.toggleClass('lateral-menu-is-open');
      $content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        jQuery('body').toggleClass('overflow-hidden');

      });

      jQuery('#lateral-nav').toggleClass('lateral-menu-is-open');  
      //check if transitions are not supported - i.e. in IE9
      if(jQuery('html').hasClass('no-csstransitions')) {
        // jQuery('body').toggleClass('overflow-hidden');
      }
    });

    //close lateral menu clicking outside the menu itself (on the overlay)
    $overlay.on('click', function(event){
      if( !jQuery(event.target).is('.menu-trigger, .menu-trigger span') ) {
        $overlay.fadeOut();
        $lateral_menu_trigger.removeClass('is-clicked');
        $navigation.removeClass('lateral-menu-is-open');
        $content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          jQuery('body').removeClass('overflow-hidden');
          
        });
        jQuery('#lateral-nav').removeClass('lateral-menu-is-open');
        jQuery('.menu li .submenu-open').trigger('click');
        jQuery('body').removeClass('overflow-hidden')
        //check if transitions are not supported
        if(jQuery('html').hasClass('no-csstransitions')) {
          jQuery('body').removeClass('overflow-hidden');
          
        }
      }
  });

    

  //open (or close) submenu items in the lateral menu. Close all the other open submenu items.
  jQuery('.item-has-children').children('a').on('click', function(event){
    event.preventDefault();
    jQuery(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
  });

  jQuery('.menu-item-has-children').children('a').on('click', function(event){
    event.preventDefault();
    jQuery(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.menu-item-has-children').siblings('.menu-item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
  });

  // Click on Secondary Menu "Products"
  jQuery('.second-menu .menu li.products-item').on('click', function(event) {
    event.preventDefault();
    if (!jQuery('#header').hasClass('lateral-menu-is-open')) {

          // jQuery('.menu-trigger', mainMenu).trigger('click');
          // jQuery('.products-item a', mainMenu).trigger('click');
          //jQuery('body').addClass('overflow-hidden') && 
          jQuery('#header').addClass('lateral-menu-is-open') &&
          jQuery('#header-sticky').addClass('lateral-menu-is-open') && 
          jQuery('#lateral-nav').addClass('lateral-menu-is-open') && 
          jQuery('.menu-trigger').addClass('is-clicked') && 
          jQuery('#overlay').fadeIn();
          jQuery('.main-content').toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
            jQuery('body').toggleClass('overflow-hidden');
          });
    }
    else {
          jQuery('body').removeClass('overflow-hidden') && 
          jQuery('#header').removeClass('lateral-menu-is-open') && 
          jQuery('#header-sticky').removeClass('lateral-menu-is-open') && 
          jQuery('#lateral-nav').removeClass('lateral-menu-is-open') && 
          jQuery('.menu-trigger').removeClass('is-clicked') && 
          jQuery('#overlay').fadeOut();
    }


    var parent = jQuery(this).parents('li:first'),
        mainMenu = jQuery('#lateral-nav .menu');

    if (jQuery(this).hasClass('products-item')) {
      jQuery('.products-item a:first', mainMenu).trigger('click');
      console.log('clicked');
    }

  });

  // Click on Secondary Menu "About"
  jQuery('.second-menu .menu li.about_item').on('click', function(event) {
    event.preventDefault();
    if (!jQuery('#header').hasClass('lateral-menu-is-open')) {

          // jQuery('.menu-trigger', mainMenu).trigger('click');
          // jQuery('.products-item a', mainMenu).trigger('click');
          //jQuery('body').addClass('overflow-hidden') && 
          jQuery('#header').addClass('lateral-menu-is-open') &&
          jQuery('#header-sticky').addClass('lateral-menu-is-open') && 
          jQuery('#lateral-nav').addClass('lateral-menu-is-open') && 
          jQuery('.menu-trigger').addClass('is-clicked') && 
          jQuery('#overlay').fadeIn();
          jQuery('.main-content').toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
            jQuery('body').toggleClass('overflow-hidden');
          });
    }
    else {
          jQuery('body').removeClass('overflow-hidden') && 
          jQuery('#header').removeClass('lateral-menu-is-open') && 
          jQuery('#header-sticky').removeClass('lateral-menu-is-open') && 
          jQuery('#lateral-nav').removeClass('lateral-menu-is-open') && 
          jQuery('.menu-trigger').removeClass('is-clicked') && 
          jQuery('#overlay').fadeOut();
    }


    var parent = jQuery(this).parents('li:first'),
        mainMenu = jQuery('#lateral-nav .menu');

    if (jQuery(this).hasClass('about_item')) {
      jQuery('.about_item a:first', mainMenu).trigger('click');
      console.log('clicked');
    }

  });

  // Sticky Menu
  jQuery(window).scroll(function () {
    if ( jQuery(this).scrollTop() > 250 && !jQuery('#header-sticky').hasClass('is-fixed') ) {
      jQuery('#header-sticky').addClass('is-fixed');
      jQuery('.orgtrig').hide();
      jQuery('body').addClass('sticky');
      jQuery('#header-sticky').fadeIn();
     } else if ( jQuery(this).scrollTop() <= 250 ) {
      jQuery('#header-sticky').removeClass('is-fixed');
      jQuery('.orgtrig').show();
      jQuery('body').removeClass('sticky');
      //jQuery('header').slideUp();
    }
  });

  // BX SLIDER (FRONT PAGE TOP GALLERY )
  $('.bxslider.homepage-top-gallery-ul').bxSlider({
      auto: true,
      mode: 'fade',
      captions: true,
      pager: false,
      speed: 1000
  });

  // BX SLIDER (DR ETTI FAVORITS)
  $('.bxslider.dr-etti-fav').bxSlider({
      mode: 'fade',
      captions: true
  });

  // PRODUCTS SLIDER
  $('.product-slider .bxslider').bxSlider({
      minSlides: 2,
      maxSlides: 2,
      slideWidth: 440,
      slideMargin: 64
  });

});

$(window).on('resize', function(){

// ********************************************************* 
// OVERLAY
// ********************************************************* 
    var docheight = jQuery(document).height();
    //console.log(docheight)
    jQuery('#overlay').css('height', docheight);
    jQuery('.job_bg').css('height', docheight);

    
});

$(window).load(function() {
    var windowWidth = $(window).width();
    if (windowWidth > 1000 && jQuery(".blog-inner").length > 0) {
        var top = jQuery('.blog-inner .half.nopadding.first').offset().top - parseFloat(jQuery('.blog-inner .half.nopadding.first').css('marginTop').replace(/auto/, 0)) - 120;
        var bottom = jQuery('.footer-hastag').offset().top - parseFloat(jQuery('.footer-hastag').css('marginTop').replace(/auto/, 0)) - 120 - 75 - parseFloat(jQuery('.blog-inner .first img').height());
        jQuery('.blog-inner .half.nopadding.first').css("width", (jQuery('.blog-inner .half.last.nopadding').width() + parseInt(jQuery('.blog-inner .half.last.nopadding').css("padding-left"))));

        var y = jQuery(this).scrollTop();
        // whether that's below the form
        if (y >= top) {
            // if so, ad the fixed class
            if (y < bottom) {
                jQuery('.blog-inner .section-w-half').removeClass('absolute');
                jQuery('.blog-inner .section-w-half').addClass('fixed');
            }
            else {
                jQuery('.blog-inner .section-w-half').addClass('absolute');
                jQuery('.blog-inner .section-w-half').removeClass('fixed');
            }
        } else {
            // otherwise remove it
            jQuery('.blog-inner .section-w-half').removeClass('fixed');
        }

        jQuery(window).scroll(function (event) {
            // what the y position of the scroll is
            var y = jQuery(this).scrollTop();
            // whether that's below the form
            if (y >= top) {
                // if so, ad the fixed class
                if (y < bottom) {
                    jQuery('.blog-inner .section-w-half').removeClass('absolute');
                    jQuery('.blog-inner .section-w-half').addClass('fixed');
                }
                else {
                    jQuery('.blog-inner .section-w-half').addClass('absolute');
                    jQuery('.blog-inner .section-w-half').removeClass('fixed');
                }
            } else {
                // otherwise remove it
                jQuery('.blog-inner .section-w-half').removeClass('fixed');
            }
        });
    }
});
