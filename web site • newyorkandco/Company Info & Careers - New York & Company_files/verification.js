/**************************************************************************************************************
* Name                  : verificationSearch
* Description           : Integrate to Capture API to perform search using verify-address method
* 
* Parameter     
*   baseUrl             : Capture Api base url
*   authToken           : Authentication token
* 
* Public Method
*   searchAddress       : This method makes call to REST method verify-address
*   refinePicklist      : This method makes call to REST method verify-address to refine on picklist.
***************************************************************************************************************/
function verificationSearch(baseUrl, authToken) {
    var self = this;
    this.baseUrl = baseUrl;
    this.authToken = authToken;
    
    var getPicklistMoniker = function (refineVal, results) {
        var mon = null;
        var rValue = refineVal.toUpperCase();

        if (rValue) {
            var $addresses = results || [];
            var alphaRefineValMatches = rValue.match(/[a-zA-Z]+/);
            var numRefineValMatches = rValue.match(/[0-9]+/);
            var alphaRefineVal = alphaRefineValMatches ? alphaRefineValMatches[0].toUpperCase().charCodeAt(0) : null;
            var numericRefineVal = numRefineValMatches ? Number(numRefineValMatches[0]) : null;

            $.each($addresses, function (i, v) {
                var decodedAdd = decodeURIComponent(v.text);
                var alphanumeric = decodedAdd.match(/([a-zA-Z0-9]+) \.\.\. ([a-zA-Z0-9]+)/g);
                var hasOddEven = decodedAdd.match(/(\[odd\]|\[even\])/g) || false;
                var isOdd = decodedAdd.match(/\[odd\]/g) || false;
                var isMatch = false;

                if (!hasOddEven || ((!isOdd && (numericRefineVal % 2 === 0)) || (isOdd && (numericRefineVal % 2 !== 0)))) {
                    $(alphanumeric).each(function () {
                        var range = this.split(" ... ");
                        var bottomNumber = range[0].match(/([0-9]+)/g);
                        var topNumber = range[1].match(/([0-9]+)/g);
                        var bottomAlpha = range[0].match(/([a-zA-Z]+)/g);
                        var topAlpha = range[1].match(/([a-zA-Z]+)/g);

                        if (topNumber && bottomNumber) {
                            if (numericRefineVal >= Number(bottomNumber[0]) &&
                                numericRefineVal <= Number(topNumber[0])) {
                                isMatch = true;
                            }
                        } else if (bottomNumber) {
                            if (numericRefineVal === Number(bottomNumber[0])) {
                                isMatch = true;
                            }
                        }

                        if (topAlpha && bottomAlpha && isMatch) {
                            isMatch = false;
                            if (Number(bottomAlpha[0].toUpperCase().charCodeAt(0) !== Number(topAlpha[0].toUpperCase().charCodeAt(0)))) {
                                if (alphaRefineVal >= Number(bottomAlpha[0].toUpperCase().charCodeAt(0)) &&
                                    alphaRefineVal <= Number(topAlpha[0].toUpperCase().charCodeAt(0))) {
                                    isMatch = true;
                                }
                            }
                        } else if (topAlpha && alphaRefineVal && isMatch) {
                            if (Number(topNumber[0]) === numericRefineVal &&
                                alphaRefineVal > Number(topAlpha[0].toUpperCase().charCodeAt(0))) {
                                isMatch = false;
                            }
                        }
                    });
                }

                if (!isMatch) {
                    var strippedAdd = decodedAdd.replace(/([a-zA-Z0-9]+) \.\.\. ([a-zA-Z0-9]+)/g, "");
                    var numericalMatches = strippedAdd.match(/\b([0-9]+)\b/g);

                    $(numericalMatches).each(function () {
                        if (numericRefineVal === Number(this)) {
                            isMatch = true;
                        }
                    });
                }

                if (isMatch) {
                    mon = decodeURIComponent(v.id);
                    return false;
                }
            });
        }

        return mon;
    };

    /*
    * Public method: searchAddress
    * 
    * Parameters
    *   country         : country code to search against
    *   searchTerm      : search text
    *   onSuccess       : function to call when Capture Api call is successful
    *   onError         : function to call when ajax error
    */
    this.searchAddress = function (country, searchTerm, onSuccess, onError) {
        var searchParameters = {
            country: country,
            query: searchTerm,
        };
        searchParameters["auth-token"] = self.authToken;

        $.support.cors = true;
        $.ajax({
            url: baseUrl + "/capture/v1/verify-address/text",
            type: 'GET',
            data: searchParameters,
            timeout: 5000,
            success: onSuccess,
            error: onError
        });
    };

    /*
    * Public method     : refinePicklist
    * 
    * Parameters
    *   country         : country code to search against
    *   refineText      : refinement search text
    *   onSuccess       : function to call when Capture Api call is successful
    *   onError         : function to call when ajax error
    */
    this.refinePicklist = function (country, refineText, results, onSuccess, onError) {
        var moniker = getPicklistMoniker(refineText, results);

        if (moniker) {
            var refineParameters = {
                country: country,
                query: refineText,
                id: moniker
            };
            refineParameters["auth-token"] = self.authToken;

            $.support.cors = true;
            $.ajax({
                url: baseUrl + "/capture/v1/verify-address/text",
                type: 'GET',
                data: refineParameters,
                timeout: 5000,
                success: onSuccess,
                error: onError
            });

        } else {
            alert("Invalid range");
        }
    };
};
