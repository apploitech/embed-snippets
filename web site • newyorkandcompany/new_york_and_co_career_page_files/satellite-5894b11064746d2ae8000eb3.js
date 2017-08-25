_satellite.pushBlockingScript(function(event, target, $variables){
  if (AnalyticsDataLayer.pagetype) {
    var customPageData = false;
        if(AnalyticsDataLayer.pagetype=='pdp')
        {
            var styleid =
                AnalyticsDataLayer.products &&
                AnalyticsDataLayer.products.items &&
                AnalyticsDataLayer.products.items[0] &&
                AnalyticsDataLayer.products.items[0].styleid ||
                '';
            fbq('track', 'ViewContent', {
                content_ids: [styleid],
                content_name: 'PDP',
                content_type : 'product'
            });
            console.log('Facebook View Content PDP for styleId - ' + styleid);    
        }
    
}
});
