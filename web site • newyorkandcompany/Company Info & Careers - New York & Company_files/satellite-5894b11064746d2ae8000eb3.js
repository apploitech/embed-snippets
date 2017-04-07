_satellite.pushBlockingScript(function(event, target, $variables){
  console.log('Facebook Pixel Fired ' ); 
if (AnalyticsDataLayer.pagetype) {
  var customPageData=false;
  switch (AnalyticsDataLayer.pagetype) {
      case 'pdp' :
      var styleid=
          AnalyticsDataLayer.products
          &&
          AnalyticsDataLayer.products.items
          &&
          AnalyticsDataLayer.products.items[0]
          &&
          AnalyticsDataLayer.products.items[0].styleid
          ||'';
	    fbq('track', 'ViewContent', {
			  content_ids: [styleid],
			  content_name: 'PDP'
		});			  
	  console.log('Facebook Tag PDP for styleId - ' + styleid); 
       break;
       case 'search' :
		var keywords = 
        AnalyticsDataLayer.sitesearch
        &&
        AnalyticsDataLayer.sitesearch.term
        ||'';
	  console.log('Facebook Tag for search - ' + keywords);   	  
	   fbq('track', 'ViewContent', {
			  content_type: 'Search Page',
			  content_name: keywords
		});			
      default:
        fbq('track', 'ViewContent', {
			content_name: AnalyticsDataLayer.pagetype,
			
		});
		console.log('Facebook Pixel Fired with - ' + AnalyticsDataLayer.pagetype); 
      
	}
  }
});
