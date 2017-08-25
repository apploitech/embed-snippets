


$(document).ready(function(){


 window.fbAsyncInit = function() { 	
	
	fbappID= $("#getAppIdForm").find("#getAppId").val();
		 FB.init({
			appId      : fbappID,
            status     : true, 
            cookie     : true,
            xfbml      : true,
            oauth      : true,
            version    : 'v2.6'
          });

 }; 

 (function() { 

 var e = document.createElement("script"); e.async = true; 

	e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';

 document.getElementById("fb-root").appendChild(e); 

 }());

 function streamPublish(prodid,prodName,proddescription,prodimageURL,giftPageUrl,shippingGroupClassType)
	 {
  
  var prodid=prodid;
  var hostURL=$("#getthisURL").html().trim();
  var getcontextURL=$("#getthisfbURL").html().trim();
  var prodimageURL1=hostURL+prodimageURL;
  var linkBackURL;

  if(shippingGroupClassType == 'electronicShippingGroup'){
		linkBackURL=contextURL+giftPageUrl;
	}else{
		linkBackURL=contextURL+"/browse/productDetailColorSizePicker.jsp?productId="+productId;
	}
 var name=prodName;
  var description=proddescription;
var caption=prodName;


FB.ui(
  {
    method: 'feed',
    name: 'Product Purchased:'+name,
    link: linlbakurl,
    picture: prodimageURL1,
    caption: 'Product Caption:'+caption,
    description: description
  },
  function(response) {
    if (response && response.post_id) {
     // alert('Post was published.');
    } else {
      alert('Post was not published.');
    }
  }
);

 }


});// end of ready 

function fblogin() {
	FB.login(function(response) {
		if (response.authResponse) {
				
				
				access_token = response.authResponse.accessToken; //get access token
				user_id = response.authResponse.userID; //get FB UID
				
				FB.api('/me', {fields: 'email,first_name,last_name,name'},function(response) {
					var email=response.email;
                    var name=response.name;
                    var id=response.id ;
                    var username=response.username;
					 var socialMediaType="facebook";
					 var lname=response.last_name;
					 var fname=response.first_name;
					

					if(email != null)
					 {
								 $.ajax({
									type: "GET",
									url: "/myaccount/gadgets/settingSessionInfo.jsp",
									data: {email:email,name:name,username:username,id:id,socialMediaType:socialMediaType,lname:lname,fname:fname},
									success: function(data){

														  }
							   });
								 /** Omniture Related code **/
								 omnitureFacebookLoginClick(); 
								 /** Omniture Related code **/
								 setTimeout("myfunc()",1000);
					 }
				});			  
		} else {
				//user hit cancel button
				console.log('User cancelled login or did not fully authorize.');

		}
		}, {
			scope: 'email,publish_actions,user_birthday'
	}, true);
}

function OnLoginRedirection()
{
	 
FB.getLoginStatus(function(response) {
	
 if (response.status === 'connected') {
	  
	 FB.api('/me', function(response) {

                    var email=response.email;
                    var name=response.name;
                    var id=response.id ;
                    var username=response.username;
					 var socialMediaType="facebook";
					 var lname=response.last_name;
					 var fname=response.first_name;
					

        if(email != null)
		 {
				     $.ajax({
			            type: "GET",
			            url: "/myaccount/gadgets/settingSessionInfo.jsp",
			            data: {email:email,name:name,username:username,id:id,socialMediaType:socialMediaType,lname:lname,fname:fname},
			            success: function(data){

			                                  }
						

				   });


                setTimeout("myfunc()",5000);
		 }
                             

});			      
				

   // the user is logged in and connected to your
   // app, and response.authResponse supplies
   // the user's ID, a valid access token, a signed
   // request, and the time the access token 
   // and signed request each expire
  


 } else if (response.status === 'not_authorized') {
   // the user is logged in to Facebook, 
   //but not connected to the app
 } else {
   // the user isn't even logged in to Facebook.
 }
});

}	
function myfunc()
          {
	var appURL= $("#getAppIdForm").find("#getAppURL").val();
	var checkoutURL = $('#desCheckout').val();
	if(checkoutURL === '' || checkoutURL === undefined  || checkoutURL === null){
		//window.location=appURL;
		window.location.assign(appURL);	
	}else{
		//window.location=checkoutURL;
		window.location.assign(checkoutURL);	
	}
}

