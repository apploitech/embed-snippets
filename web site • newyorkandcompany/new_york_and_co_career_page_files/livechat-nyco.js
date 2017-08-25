// NYCO-specific LiveChat JS
(function($) {
  // jQuery-dependent
  (function() {
    // Wait for jQuery
    if (!window.jQuery) return setTimeout(arguments.callee, 10);

    $ = jQuery;

    if ($.validator) {
      // Extend the casenumber method to force properly formatted order numbers
      $.validator.methods.casenumber = function(value, element) {
        return ($('#is-existing-case').is(':checked') && value.length !== 0 && (/^[0-9a-z]{8,30}$/i).test(value));
      };
    }
  })();
})(window.jQuery);
