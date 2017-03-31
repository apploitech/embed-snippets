var overridablePromptGroup = function (header, prompt, button, invalidRange) {
    this.header = header;
    this.prompt = prompt;
    this.button = button;
    this.invalidRange = invalidRange;

    this.Prompt = function (overridePrompt) {
        if (!overridePrompt || overridePrompt === this.prompt) {
            return this;
        }
        else {
            return new overridablePromptGroup(
                this.header,
                overridePrompt,
                this.button,
                this.invalidRange
                );
        }
    };
};

var Text_Prompts = {
  /*  "InteractionRequired": new overridablePromptGroup(
        "<b>We think that your address may be incorrect or incomplete.</b>",
        "We recommend:",
        "Use suggested address"),

    "PremisesPartial": new overridablePromptGroup(
        "<b>Sorry, we think your apartment/suite/unit is missing or wrong.</b>",
        "Confirm your Apartment/Suite/Unit number:",
        "Confirm number",
        "Secondary information not within valid range"),

    "StreetPartial": new overridablePromptGroup(
        "<b>Sorry, we do not recognize your house or building number.</b>",
        "Confirm your House/Building number:",
        "Confirm number",
        "Primary information not within valid range"),

    "Multiple": new overridablePromptGroup(
        "<b>We found more than one match for your address.</b>",
        "Our suggested matches:"),*/
};

function searchResultFormHandler() {
    var self = this;
    
    var limit = $("#suggestionsLimit").val();

    var generateRefinePrompt = function (data, promptGroupItem) {
        $("#refinementControls").html('<p>' + promptGroupItem.header + '</p>' +
            '<p>' + promptGroupItem.prompt + '</p>' +
               '<input type="text" id="refineText" />' +
            '<input type="button" id="refineButton" value="' + promptGroupItem.button + '" />'
               );

        $("#refineButton").bind("click", function () {
            var refineText = $("#refineText").val();
            self.doRefinePicklist(refineText, data.results);
        });
    }

    var generatePickList = function (index, pickListItem, fullMoniker) {
        
        var addressText = pickListItem.text;
        var fulladdress = !pickListItem.grouped;
        var id = 'item_' + (index + 1);
        var hiddenId = searchResultFormHandler.formId + '_hidden' + (index + 1);
        var content = '<li id="' + id + '">';

        if (fulladdress || fullMoniker) {
            content += '<a href="javascript:void(0)">' + pickListItem.text;
        }
        else {
            content += '<a>' + pickListItem.text;
        }

        content += '<input type="hidden" id="' + hiddenId + '" />' + '</a>';
        content += '</li>';
        $(content).appendTo('#'+searchResultFormHandler.formId+'_picklistItems');
        $('#' + hiddenId).val(pickListItem.url);

        if (fulladdress) {
            $('#' + id).bind('click', function () {
                var url = $(this).find('input').val();
                self.onFinalAddressReturned(url);
                
            });
        } else if (fullMoniker) {
            $('#' + id).bind('click', function () {
                self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
                generatePickList(index, pickListItem);
                var data = {
                    results: [pickListItem],
                    FullMoniker: fullMoniker,
                }

                generateRefinePrompt(data, Text_Prompts.PremisesPartial);
            });
        }
    };

    var generatePrompt = function (promptGroupItem) {
        $("#refinementControls").html('<p>' + promptGroupItem.header + '</p>' +
            '<p>' + promptGroupItem.prompt + '</p>'
            );
    };

    var generateSuggestedAddressPrompt = function (data, promptGroupItem) {
        var suggestedAddress = "";
        $.each(data.fields, function (index, value) {
            // Build recommended address to show to end-user.
            suggestedAddress += '<tr><td>' + value.content + '</td></tr>';
        });

        // Show the recommended address to end-user.
        $("#refinementControls").html('<p>' + promptGroupItem.header + '</p>' +
            '<p>' + promptGroupItem.prompt + '</p>' +
            '<input type="button" id="refineButton" value="' + promptGroupItem.button + '" />' +
            '<table>' +
                suggestedAddress +
            '</table>');

        // Return address when end-user agree to use the recommended address.
        $("#refineButton").bind("click", function () {
            self.ajaxReturnAddressToForm(data);
        });
    };

    this.clickPicklist = null;

    this.onFinalAddressReturned = null;

    this.refinePicklist = null;
    
    this.ajaxSearchSuccess = function (data) {
        self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
        self.clearForm();

        if (data.count <= 0 || !data) {
            self.searchCouldNotBeVerified();
        }
        else {
        	if(data.results[0].text != "Continue typing"){
        		self.loadPicklist(data);
        	}
        }
    };

    this.ajaxSearchVerificationSuccess = function (data, status, jqXHR) {
    	
    	 // Verify Level : PremisesPartial
        if (data.verifylevel === "PremisesPartial") {
        	$(".experian_error").show();
            self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
        } else {
        	self.ajaxReturnAddressToForm(data);
        }
    	
    	
    	/**
    	 * EC-1486
    	 * Commented following code because we do not have to care about the verify level, we just need to populate fields whatever may be the data.
    	 */
    	/*
        //If no Verification Level is returned and no results are returned. Return no match dialog.
        if (!data.verifylevel && typeof data.count !== "undefined" && data.count === 0) {
            self.searchCouldNotBeVerified();
        }
        //If no Verification Level is returned and one result has returned. Return the single address result.
        if (!data.verifylevel && (data.count === 1 || typeof (data.count) === "undefined")) {
            self.doFinalAddressReturned(data.results[0].url);
        }
        //If result contains one non-grouped result and one non-grouped result after refinement, accept the first result.
            
        else if (!data.verifylevel && typeof data.count !== "undefined" &&
                 data.count === 2 && data.results[0].grouped === false && data.results[1].grouped === true) {
            self.doFinalAddressReturned(data.results[0].url);
        }
        //If result contains no verification level and more than one item return refine dialog.
        else if (!data.verifylevel && typeof data.count !== "undefined" && data.count > 1) {
            generateRefinePrompt(data, Text_Prompts.PremisesPartial);
            self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
            $.each(data.results, function (index, value) {
                generatePickList(index, value);
            });
        }
        // Verify Level : PremisesPartial
        else if (data.verifylevel === "PremisesPartial") {
            generateRefinePrompt(data, Text_Prompts.PremisesPartial);
            self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
            $.each(data.results, function (index, value) {
                generatePickList(index, value);
            });
        }
        // Verify Level : StreetPartial
        else if (data.verifylevel === "StreetPartial") {
            generateRefinePrompt(data, Text_Prompts.StreetPartial);
            self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
            $.each(data.results, function (index, value) {
                generatePickList(index, value);
            });
        }
        // Verify Level : Multiple
        else if (typeof (data.verifylevel) !== "undefined" && data.verifylevel !== "Verified" && data.verifylevel !== "InteractionRequired" && data.verifylevel !== "None") {
            if (typeof (data.results) !== "undefined") {
               // generatePrompt(Text_Prompts.Multiple);
                self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
                $.each(data.results, function (index, value) {
                    generatePickList(index, value, (data.results) ? data.results[0].id : "");
                });
            }
        }
        // Verify Level : Verified
        else if (data.verifylevel === "Verified") {
            self.ajaxReturnAddressToForm(data);
        }
        // Verify Level : InteractionRequired
        else if (data.verifylevel === "InteractionRequired") {
            generateSuggestedAddressPrompt(data, Text_Prompts.InteractionRequired);
        }
            // Verify Level : None
        else if (data.verifylevel === "None") {
            self.searchCouldNotBeVerified();
        }
        else {
            self.ajaxSearchError(null, "Server not found!", "");
        }
    */};

    this.ajaxSearchIntuitiveSuccess = function (data, status, jqXHR) {
        if (data != undefined && data.count != undefined && data.count >= 0) {
            formHandler.clearVerifyLevelPrompt();

            if (data.count == 0 && data.results != undefined && data.results.length > 0) {
                //self.loadInfoPicklist(data.results[0].text);
            	if(data.results[0].text == "Continue typing"){
            		self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
            	}
            }
            else {
            	if(data.results[0].text != "Continue typing"){
            		self.loadPicklist(data);
            	}
            }
        }
        else {
            console.log(jqXHR);
            console.log(status);
            console.log(data);
            self.ajaxSearchError(null, "Server not found!", "");
        }
    };

    this.ajaxSearchError = function (jqXHR, status, errorThrown) {
        self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
        self.clearForm();
        content = '<li id="itemError">';
        content += self.getErrorMessage(jqXHR, status, errorThrown);
        content += '</li>';
       // $(content).appendTo('#'+searchResultFormHandler.formId+'_picklistItems');
    };

    this.getErrorMessage = function (jqXHR, status, errorThrown) {
        var mesage = "";
        if (status != undefined && status != "") {
            mesage += status;
        }

        if (errorThrown != undefined && errorThrown != "") {
            mesage += " - ";
            mesage += errorThrown;
        }

        if (jqXHR != undefined && jqXHR.responseText != undefined && jqXHR.responseText != "") {
            mesage += " (" + jqXHR.responseText + ")";
        }

        return mesage;
    }

    this.clearPicklist = function () {
        $('#picklistItems').empty();
    };

    this.clearPicklist = function (id) {
        $(id).empty();
    };
    
    this.clearForm = function () {
        $("#searchStatus").empty();
        $('#addressReturned input[type="text"]').val('');
    };

    this.clearVerifyLevelPrompt = function () {
        var refinementControl = $('#refinementControls');
        if (refinementControl != undefined) {
            refinementControl.empty();
        }
    }

    this.loadPicklist = function (data) {
    	try{
    		var counter=0;
            self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
            self.clearForm();
            console.log(limit + " form => "+searchResultFormHandler.formId);
            var address1 = $.trim($("#"+searchResultFormHandler.formId).find("#address1").val());
            if(data.count > 0 && address1!="" && $("#"+searchResultFormHandler.formId).find("#address1").is(":focus")){
            	  for(var x = 0; x < parseInt(limit); x++) { 
            		  if(counter<data.results.length){
            			  var id = 'item_' + (x + 1);
                          var hiddenId = searchResultFormHandler.formId +'_hidden' + (x + 1);
                          content = '<li id="' + id + '">';
                          content += '<a href="javascript:void(0)">' + data.results[x].text;
                          content += '<input type="hidden" id="' + hiddenId + '" />' + '</a>';
                          content += '</li>';
                          $(content).appendTo('#'+searchResultFormHandler.formId+'_picklistItems');
                          $('#' + hiddenId).val(data.results[x].url);
                          $('#' + id).bind('click', function () {
                              var url = $(this).find('input').val();
                              self.doClickPicklist(url);
                          });
                          counter++;
            		  }else{
            			  break;
            		  }
                    
                  }
            }
    	}catch(e){
    		
    	}
    	
      
    };

    this.loadInfoPicklist = function (infoMessage) {
        self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
        self.clearForm();
        content = '<li id="itemInfo">';
        content += infoMessage;
        content += '</li>';
        $(content).appendTo('#'+searchResultFormHandler.formId+'_picklistItems');
    };

    this.searchStatusVerified = function () {
        $('#searchStatus').html('Verified');
    };

    this.searchCouldNotBeVerified = function () {
        $("#searchStatus").html("Address could not be verified");
    };

    this.ajaxFinalAddressError = function (jqXHR, status, errorThrown) {
        var message = self.getErrorMessage(jqXHR, status, errorThrown);
        $('#searchStatus').html(message);
    };

    this.ajaxReturnAddressToForm = function (data) {
    	 // Verify Level : PremisesPartial
        if (data.verifylevel === "PremisesPartial") {
        	var premises_partial = $('#premises_partial').val();
        	$("#"+searchResultFormHandler.formId +" .experian_error").show();
        	if(premises_partial!=undefined && premises_partial!=""){
        		$("#"+searchResultFormHandler.formId +" .experian_error").html(premises_partial);
        	}        	
            self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
        } else {
	        self.clearPicklist('#'+searchResultFormHandler.formId+'_picklistItems');
	        self.clearForm();
	        self.clearVerifyLevelPrompt();
	
	        for (var x = 0; x < data.fields.length; x++) {
	            switch (data.fields[x].id) {
	                case '':
	                	var address1_field = $("#"+searchResultFormHandler.formId).find("div#address" + (x + 1)+"_field").children("input");
	                    $(address1_field).val(data.fields[x].content);
	                    break;
	                case 'Town':
	                case 'City name':
	                case 'Municipality name':
	                    //$('#city').val(data.fields[x].content);
	                	var cityField = $("#"+searchResultFormHandler.formId).find("div#city_field").children("input");
	                	var cityId = $(cityField).attr("id");
	                	$(cityField).val(data.fields[x].content);
	                    break;
	                case 'County':
	                case 'State code':
	                case 'Province code':
	                	              	
	                	var stateField = $("#"+searchResultFormHandler.formId +" #state_field");
	                	var stateID = $(stateField).find("select").attr("id");
	                	
	                	var stateOptions =$("#"+searchResultFormHandler.formId +" #state_field #"+stateID+" option");
						$(stateOptions).each(function() {
							var optionValue = $(this).text();  
							if($(this).val() == data.fields[x].content){
								
								$(this).attr("selected","selected");
								$(stateField).find('.input span').text(optionValue);
								
							}
						 });
	                    
	                    break;
	                case 'Postcode':
	                case 'ZIP Code, +4 code':
	                case 'Postal code':
	                    //$('#postalCode').val(data.fields[x].content);
	                	var zipCode = data.fields[x].content.toString();
	                	zipCode = zipCode.split("-")[0];
	                	var postalCode_field = $("#"+searchResultFormHandler.formId).find("div#postalCode_field").children("input");
	                    $(postalCode_field).val(zipCode);
	                    break;
	            }
	        }
	
	        var country_field = $("#"+searchResultFormHandler.formId).find("div#country_field").children(".select").children(".select").children("select");
	        var countryId = $(country_field).attr("id");
	        if(countryId == undefined){
	        	country_field = $("#"+searchResultFormHandler.formId).find("div#country_field").children(".select").children("select");
	        	countryId = $(country_field).attr("id");
	        }
	        $(country_field).val("US");
	        $(country_field).siblings(".input").children().children("span").html($("#"+countryId+" option[value='US']").text());
	        
	        
	        var userSecurityStatus = $("#userSecurityStatus").val();
	        if(searchResultFormHandler.formId == "nyco_multiple_shipping"){
	        	populateMultipleShipMethod();
	        } else if(window.location.href.indexOf("/mobile") == -1 && userSecurityStatus > 0){
	        		populateShipMethodForLogedin();
	        }
	        else if(window.location.href.indexOf("/mobile") == -1 && userSecurityStatus == 0){
	        		populateShipMethod();
	        	}
	        	
	        
	        self.searchStatusVerified();
        }
    };

    this.doClickPicklist = function (url) {
        if (self.clickPicklist != undefined) {
            self.clickPicklist(url);
        }
    };

    this.doFinalAddressReturned = function (url) {
        if (self.onFinalAddressReturned != undefined) {
            self.onFinalAddressReturned(url);
        }
    };

    this.doRefinePicklist = function (refineText, results) {
        if (self.onRefinePicklist != undefined) {
            self.onRefinePicklist(refineText, results);
        }
    };

}
searchResultFormHandler.formId="";
