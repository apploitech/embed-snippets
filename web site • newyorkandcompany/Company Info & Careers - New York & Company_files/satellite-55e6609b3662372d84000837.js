/* newsletter signup footer / popup tracking */
if (typeof jQuery=='function') {
  jQuery(document).ajaxSuccess(function( event, request, settings ) {
    try {
      if (
        settings
        &&
        settings.url
      ) {
        switch (true) {
          /* FORM SUBMIT **/
          case (settings.url.indexOf("?_DARGS=/nyco/browse/navSubscription.jsp.subscriptionForm")>-1) :
            var response=false;
            try {
              var response=jQuery.parseJSON(request.responseText);
            } catch(e) {response=false;}
            if (response&&(typeof response=='object')) {
              switch (response.status) {
                /* SUCCESSFUL FORM SUBMIT */
                case 'success' :
                  /*
                  request.data is a string of data "a=b&foo=bar&.."
                  s.getQueryParam('[param]','','?'+request.data);
                   - first_name
                   - last_name
                   - email
                   - mobile_number
                   - zip_code
                  */
                  s.track({'events':'event73'},'tl_o','newsletter subscriptions');
                break;
                /* FAIL FORM SUBMIT (form field(s) not filled out/invalid) */
                case 'error' :
                  var errors=[];
                  for (var p in response) {
                    var m = p.match(/^myaccount_subscription_error\.(.*)/);
                    if (m&&m[1]) {
                      errors.push(m[1]);
                    }
                  }                  
                  /*
                    errors is array of possible values (mobile_number is optional so never listed):
                    -blankEmail
                    -FirstNameBlank
                    -LastNameBlank
                    -blankdZipCode
                    -invalidEmail
                    -etc ?

                    no tracking at this time
                  */
                break;          
              } // end switch
            } // end response
          break;
          /** FORM VIEW **/
          case (settings.url.indexOf("/nyco/browse/navSubscription.jsp")>-1) :
            // no tracking at this time
          break;          
        } // end switch        
      } // end if settings.url
    } catch(e){console.log(e);}
  }); // end ajaxSuccess
} // end if jQuery

