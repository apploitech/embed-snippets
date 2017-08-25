/**************************************************************************************************************
* Name                  : finalAddress
* Description           : Integrate to Capture Api Search Address method to format address.
*
* Parameter     
*   baseUrl             : Capture Api base url
*   authToken           : Authentication token
* 
* Public Method
*   format              : Perform call to Capture Api Address Layout method.
***************************************************************************************************************/
function finalAddress(baseUrl, authToken) {
    var self = this;
    self.baseUrl = baseUrl;
    self.authToken = authToken;

    /*
    * Public method: format
    * 
    * Parameters
    *   relativeUrl     : relative url to format address
    *   onSuccess       : function to call when Capture Api call is successful
    *   onError         : function to call when ajax error
    */
    this.format = function (relativeUrl, onSuccess, onError) {
        $.support.cors = true;

        $.ajax({
            url: self.baseUrl + relativeUrl,
            type: 'GET',
            timeout: 50000,
            success: onSuccess,
            error: onError,
            beforeSend: function (request) {
                request.setRequestHeader('Auth-Token', self.authToken);
            }
        });
    };
};