_satellite.pushBlockingScript(function(event, target, $variables){
  console.log('Pinterest Tag PageView Fired with - ' + AnalyticsDataLayer.pagetype); 
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
      pintrk('track', AnalyticsDataLayer.pagetype),{
      line_items: [
			{
			   product_variant_id:styleid
			}
		]
      }
	  console.log('Pinterest Tag PDP for styleId - ' + styleid); 
       break;
	  case 'purchase' :
      var items=
          AnalyticsDataLayer.products
          &&
          AnalyticsDataLayer.products.items
          &&
          (AnalyticsDataLayer.products.items instanceof Array)
          &&
          AnalyticsDataLayer.products.items
          ||[];
		  
		  var transID = 
          AnalyticsDataLayer.products
          &&
          AnalyticsDataLayer.products.purchaseid
          ||'';
		console.log('Pinterest Tag PDP for orderId - ' + transID);   
	  pintrk('track', AnalyticsDataLayer.pagetype),{
			 order_id: transID
			}	
			
       case 'search' :
		  
		var keywords = 
        AnalyticsDataLayer.sitesearch
        &&
        AnalyticsDataLayer.sitesearch.term
        ||'';
	  console.log('Pinterest Tag PDP for search - ' + keywords);   	  
	  pintrk('track', AnalyticsDataLayer.pagetype),{
			 search_query: keywords
			}	
      default:
        pintrk('track', AnalyticsDataLayer.pagetype);
      
	}
  }
});
