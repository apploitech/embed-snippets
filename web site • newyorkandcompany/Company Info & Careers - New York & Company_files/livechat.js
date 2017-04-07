/**
 * Radial LiveChat Core
 * @version 1.4.6
 * @author Justin Szczurowski <szczurowskij@radial.com>
 */

(function($) {
  var wrapper = arguments.callee;

  if (!window.liveChatSettings) throw new Error("Couldn't find LiveChat settings. Please make sure livechat-config.js is loaded before livechat.js");
  if (!window.liveChatClientSettings) throw new Error("Couldn't find LiveChat Client settings. Please make sure livechat-config-client.js is loaded before livechat.js");

  if (!window.jQuery) {
    // jQuery is required
    if (!liveChatClientSettings.jQuery) throw new Error("jQuery is not loaded, and liveChatClientSettings.jQuery is not defined. Please set liveChatClientSettings.jQuery to a relative or absolute URL which points to the jQuery file you wish to load.");

    if (!wrapper.jQueryLoading) {
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.src = liveChatClientSettings.jQuery;
      document.getElementsByTagName('head')[0].appendChild(script);
      wrapper.jQueryLoading = true;
    }

    return setTimeout(wrapper, 10);
  }

  if (wrapper.jQueryLoading) {
    var $ = jQuery.noConflict();
    wrapper.jQueryLoading = false;
  }

  // Extensions
  // Scrolls the element to the specified Y coordinate
  $.fn.scrollTo = function(y, speed, callback) {
    if (!speed) speed = 600;
    if (typeof callback !== "function") callback = function(){};

    $(this).stop().animate({ scrollTop: y }, speed, callback);
  };

  // Animate a given element with the selected animation(s), and then remove them
  $.fn.animateOnce = function(animateClasses, time, callback) {
    animateClasses += " animated";

    var $this = $(this);

    if ($this.data('animate-once')) $this.off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend').removeClass($this.data('animate-once')).stop();

    $this.data('animate-once', animateClasses);

    if (typeof time === "function") {
      callback = time;
      time = false;
    }

    if (time && (typeof time === "number" || !(/[0-9.]+m?s/i).test(time))) time += "s";

    var animationDuration = $this.css('animation-duration');

    if (animationDuration === "0s") animationDuration = "";

    $this.show();

    if (time) $this.css({ animationDuration: time });

    $this.addClass(animateClasses).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
      $this.removeClass(animateClasses).off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
      $this.data('animate-once', false);

      if (time) $this.css({ animationDuration: animationDuration });
      if (typeof callback === "function") callback.call(this);
    });

    return $this;
  };

  // Common variables
  var $window = $(window),
      $document = $(document),
      $body = $('body'),
      $head = $('head'),
      pageType = $body.hasClass('livechat-prechat') ? "pre-chat" : (document.location.href.indexOf(liveChatSettings.chatUrl) !== -1 ? "in-chat" : "client"),
      userAgent = navigator.userAgent,
      isIOS = (/iPad|iPhone|iPod/i).test(userAgent) && !window.MSStream,
      isMobile = (/iPhone|iPod|(?=.*\bAndroid\b)(?=.*\bMobile\b)|(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)|IEMobile|BB10|NokiaN9/i).test(userAgent),
      isTablet = !isMobile && (/iPad|Android|\bTablet\b|\b(KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b|(?=.*\bWindows\b)(?=.*\bARM\b)/i).test(userAgent);

  // Pre-Chat / In-Chat
  if (pageType === "pre-chat" || pageType === "in-chat") {
    // Viewport
    (function() {
      if ($head.find('meta[name=viewport]').length !== 0) return;

      $head.append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />');
    })();

    // Favicon
    if (liveChatClientSettings.favIcon) $head.append('<link rel="icon" type="' + liveChatClientSettings.favIcon.type + '" href="' + liveChatClientSettings.favIcon.url + '">');

    // Mobile
    if (isMobile) $body.addClass("is-mobile");
    if (isTablet) $body.addClass("is-tablet");

    // Common elements
    $document.on('click', '.livechat-close-btn', function() {
      window.close();
    });
  }

  // In-Chat Only
  if (pageType === "in-chat") {
    var inChatSettings = liveChatClientSettings.inChat,
        messageSettings = inChatSettings.messages;

    if (liveChatClientSettings.title) document.title = liveChatClientSettings.title;
    if (isIOS) $('.liveAgentSaveButton').hide();

    // Apply styles & values
    $body.addClass("livechat-inchat");
    $('.liveAgentSendButton').addClass("livechat-send-btn btn");
    $('.livechat-text').html(inChatSettings.headline || "");
    $('#liveAgentChatInput').attr('autocomplete', "off");
    if (inChatSettings.loadingText) $('.livechat-loading-text').html(inChatSettings.loadingText);

    if (inChatSettings.subText) {
      $('.livechat-subtext').html(inChatSettings.subText);
    } else {
      $('.livechat-subtext').hide();
    }

    // Chat window size
    function scaleUI() {
      var docHeight = $window.height(),
          chatHeight = docHeight - $('.livechat-client-input').outerHeight(true) - $('.liveAgentChatWaiting').outerHeight(true) - 5,
          maxHeight = $('.livechat-inchat-container').css('max-height'),
          rows = $('#liveAgentClientChat').find('.row'),
          chatLog = $('#liveAgentChatLog');

      maxHeight = (!maxHeight || maxHeight === "none") ? docHeight : parseFloat(maxHeight);

      rows.each(function() {
        var $this = $(this);

        if ($this.hasClass("liveAgentChatWrap")) return;

        chatHeight -= $this.outerHeight(true);
      });

      chatLog.css({ height: Math.min(chatHeight, maxHeight) });
    }

    $window.on('resize', scaleUI);

    // Agent is connected
    liveagent.addEventListener(liveagent.chasitor.Events.CHAT_ESTABLISHED, function() {
      scaleUI();
      $('.livechat-loading-modal').hide();
      window.focus();
    });

    // Chat request failed
    liveagent.addEventListener(liveagent.chasitor.Events.CHAT_REQUEST_FAILED, function() {
      var container = $('#liveAgentMessageContainer'),
          closeButton = container.find('.btn-primary');

      if (closeButton.length === 0) return setTimeout(arguments.callee, 100);

      $('.livechat-loading-text').html(container.find('div > p').html());
      $('.livechat-loading-image').hide();

      closeButton.on('click', function(){ window.close(); });
    });

    var onChatEnded = function() {
      // Inject a close button
      $('.livechat-inchat-buttons').append('<div class="livechat-close-btn"></div>');

      if (typeof liveChatSettings.endChat.callback === "function") liveChatSettings.endChat.callback();
      if (typeof liveChatClientSettings.endChat.callback === "function") liveChatClientSettings.endChat.callback();
    };

    // Chat ended
    liveagent.addEventListener(liveagent.chasitor.Events.AGENT_CHAT_ENDED, onChatEnded);
    liveagent.addEventListener(liveagent.chasitor.Events.CHASITOR_CHAT_ENDED, onChatEnded);

    // Chat message received
    if (messageSettings.animate || messageSettings.customClasses || messageSettings.callback) {
      liveagent.addEventListener(liveagent.chasitor.Events.AGENT_CHAT_MESSAGE, function() {
        var element = $('.operator').not('[id]').last();

        if (messageSettings.customClasses) element.addClass(messageSettings.customClasses);
        if (messageSettings.animate) element.animateOnce(messageSettings.animationClass, messageSettings.animationTime);
        if (typeof messageSettings.callback === "function") messageSettings.callback.apply(this, arguments);
      });

      // Chat message sent
      liveagent.addEventListener(liveagent.chasitor.Events.CHASITOR_CHAT_MESSAGE, function() {
        var element = $('.client').not('[id]').last();

        if (messageSettings.customClasses) element.addClass(messageSettings.customClasses);
        if (messageSettings.animate) element.animateOnce(messageSettings.animationClass, messageSettings.animationTime);
        if (typeof messageSettings.callback === "function") messageSettings.callback.apply(this, arguments);
      });
    }

    // Add listeners for all supported events and update the UI as needed
    (function() {
      var events = liveagent.chasitor.Events,
          eventId,
          updateUI = function() {
            var agentMessageButtons = $('#liveAgentMessageContainer button');

            if (agentMessageButtons.length !== 0) agentMessageButtons.addClass("btn btn-primary");
          };

      for (eventId in events) {
        liveagent.addEventListener(events[eventId], updateUI);
      }
    })();

    // In-chat callbacks
    if (liveChatSettings.inChat && typeof liveChatSettings.inChat.callback === "function") liveChatSettings.inChat.callback();
    if (liveChatClientSettings.inChat && typeof liveChatClientSettings.inChat.callback === "function") liveChatClientSettings.inChat.callback();

    $(function() {
      // Try to hide address bar for mobile
      setTimeout(function(){ window.scrollTo(0, 1); }, 0);
    });

  // Pre-Chat Only
  } else if (pageType === "pre-chat") {
    if (liveChatClientSettings.title) document.title = liveChatClientSettings.title;

    // Pre-chat form action
    var prechatForm = $('#livechat-prechat-form'),
        sessionId = $('#livechat-session-id').val() || false;

    // The session ID must be 8-4-4-12 in format
    if (sessionId && !(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i).test(sessionId)) sessionId = false;

    prechatForm.attr('action', liveChatSettings.chatUrl + '?language=#deployment_id=' + liveChatSettings.deploymentId + '&org_id=' + liveChatSettings.orgId + '&button_id=' + liveChatSettings.buttonId + (sessionId ? '&session_id=' + sessionId : ''));

    // Pre-chat form inputs
    prechatForm.append('<input type="hidden" name="liveagent.prechat:BrandCode" value="' + liveChatSettings.brandCode + '" />');
    prechatForm.append('<input type="hidden" name="liveagent.prechat:Chat_Initiated_By" value="' + (isTablet ? "tablet" : (isMobile ? "mobile" : "desktop")) + '" />');
    prechatForm.append('<input type="hidden" name="liveagent.prechat.findorcreate.map:Case" value="Chat_Initiated_By__c,Chat_Initiated_By" />');
    prechatForm.append('<input type="hidden" name="liveagent.prechat.findorcreate.map.doCreate:Case" value="Chat_Initiated_By__c,true" />');

    // Apply settings
    $('.livechat-text').html(liveChatClientSettings.preChat.headline || "");

    if (liveChatClientSettings.preChat.subText) {
      $('.livechat-subtext').html(liveChatClientSettings.preChat.subText);
    } else {
      $('.livechat-subtext').hide();
    }

    // Case number
    $('#is-existing-case').on('change', function(e) {
      var $this = $(this),
          field = $('.existing-case-field'),
          fieldClass = "hidden",
          validator = $this.closest('form').data('validator'),
          settings = (validator) ? validator.settings : false;

      if ($(this).is(':checked')) {
        field.removeClass(fieldClass);
        $('#case-number').select();
        $body.scrollTo($body.prop('scrollHeight'));
      } else {
        field.addClass(fieldClass);

        if (settings) {
          field.find(settings.errorElement + "." + settings.errorClass.split(" ")[0] + ", .form-errors").hide();
          field.find("." + settings.errorClass).removeClass(settings.errorClass);
        }
      }
    });

    if ($.validator) {
      // Better email validation
      $.validator.addMethod("email", function(value, element) {
        return this.optional(element) || (/^[a-z0-9._%'+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i).test(value);
      }, $.validator.messages.email);

      // Case number validation
      $.validator.messages.casenumber = "Please enter a valid order number.";
      $.validator.addMethod("casenumber", function(value, element) {
        return ($('#is-existing-case').is(':checked') && value.length !== 0 && (/^[0-9a-z]{1,30}$/i).test(value));
      }, $.validator.messages.casenumber);
    }

    // Pre-chat callbacks
    if (liveChatSettings.preChat && typeof liveChatSettings.preChat.callback === "function") liveChatSettings.preChat.callback();
    if (liveChatClientSettings.preChat && typeof liveChatClientSettings.preChat.callback === "function") liveChatClientSettings.preChat.callback();

    // Onload, so the client has a chance to modify settings
    $(function() {
      // Hide address bar for mobile
      setTimeout(function(){ window.scrollTo(0, 1); }, 0);

      if (!$.validator) return;

      // Form validation
      $('.form-validation').validate({
        errorClass: "livechat-field-error",
        errorElement: "div",

        showErrors: function(errorMap, errorList) {
          var validator = this;

          // Clear alerts if there's no errors
          if (errorList.length === 0) {
            $(validator.settings.errorElement + "." + validator.settings.errorClass.split(" ")[0] + ", .form-errors").each(function() {
              $(this).data('animated', false).hide();
            });

            validator.currentElements.removeClass(validator.settings.errorClass);
            return;
          }

          var settings = liveChatClientSettings.validation.errors,
              animate = settings.animate,
              callback = settings.callback,
              customClasses = settings.customClasses;

          // Control how errors are displayed
          $.each(errorList, function() {
            validator.defaultShowErrors();

            var element = (this.method) ? validator.toShow : $(this.element.nextSibling);

            element.prepend('<span class="livechat-icon-error"></span>');

            if (animate && !element.data('animated')) {
              element.data('animated', true);
              element.animateOnce(liveChatClientSettings.validation.errors.animationClass, liveChatClientSettings.validation.errors.animationTime);
            }

            if (customClasses) element.addClass(customClasses);
          });

          if (typeof callback === "function") callback.call(this, errorList);
        }
      });
    });
  } else {
  // Client page
    // Initialize LiveChat
    var initLiveChat = function() {
      var buttonId = liveChatSettings.buttonId;

      liveagent.init(liveChatSettings.initUrl, liveChatSettings.deploymentId, liveChatSettings.orgId);
      liveagent.setChatWindowWidth(liveChatClientSettings.windowWidth);
      liveagent.setChatWindowHeight(liveChatClientSettings.windowHeight);

      if (!window._laq) window._laq = [];

      window._laq.push(function() {
        var onlineButtons = $('.livechat-online'),
            offlineButtons = $('.livechat-offline');

        onlineButtons.each(function() {
          $(this).on('click', function(e) {
            e.preventDefault();
            liveagent.startChat(buttonId);
          });

          liveagent.showWhenOnline(buttonId, this);
        });

        offlineButtons.each(function() {
          liveagent.showWhenOffline(buttonId, this);
        });
      });
    };

    // LiveChat initialization
    $.getScript(liveChatSettings.deploymentScript).done(function() {
      // Done loading script
      initLiveChat();
    }).fail(function() {
      // Error loading script
      throw new Error("Failed to load SalesForce deployment script!");
    });
  }
})(window.jQuery);
