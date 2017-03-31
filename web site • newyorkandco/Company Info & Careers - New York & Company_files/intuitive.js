/**************************************************************************************************************
* Name                  : intuitiveSearch
* Description           : Integrate to Capture API to perform search using search-address method.
*                         Each address entry in the picklist returned by search-address method contains 
*                         url that can be used to verify address using verification method "verify-address".
* Parameter     
*   baseUrl             : Capture Api base url
*   authToken           : Authentication token
* 
* Public Method
*   searchAddress       : This method makes call to REST method search-address
*   verifyAddress       : This method makes call to REST method using url returned from search-address method.
***************************************************************************************************************/
function intuitiveSearch(baseUrl, authToken) {
    var self = this;
    self.baseUrl = baseUrl;
    self.authToken = authToken;

    /*
    * Public method: searchAddress
    * 
    * Parameters
    *   country         : Code of the country the search term is going to search against.
    *   onSuccess       : Function to call when call to address api is successful
    *   onError         : Function to call when ajax call return error.
    */
    this.searchAddress = function (country, searchTerm, onSuccess, onError) {
        $.support.cors = true;
        $.ajax({
            url: self.baseUrl + "/capture/v1/search-address/text",
            type: 'GET',
            data: { 'query': searchTerm, 'country': country },
            timeout: 8000,
            success: onSuccess,
            error: onError,
            beforeSend: function (request) {
                request.setRequestHeader('Auth-Token', self.authToken);
            }
        });
    };

    this.verifyAddress = function (url, onSuccess, onError) {
        $.support.cors = true;
        $.ajax({
            url: self.baseUrl + url,
            type: 'GET',
            timeout: 8000,
            success: onSuccess,
            error: onError,
            beforeSend: function (request) {
                request.setRequestHeader('Auth-Token', self.authToken);
            }
        });
    };
};
