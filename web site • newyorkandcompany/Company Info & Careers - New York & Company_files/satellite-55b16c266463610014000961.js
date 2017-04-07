try {

window.AnalyticsDataLayer=window.AnalyticsDataLayer||{};
_satellite.notify('DTM: criteo tag 2 fired');
console.log('DTM: AnalyticsDataLayer: ',AnalyticsDataLayer);
window.criteo_q = window.criteo_q || []; 
window.criteo_payload=[];
/* Account */
  window.criteo_payload.push(
    { 
      'event'  : 'setAccount', 
      'account': '22114' 
    }
  ); 

/* Email */
  if (AnalyticsDataLayer.hashedemail) {
    window.criteo_payload.push(
      { 
        'event': "setHashedEmail", 
        'email': AnalyticsDataLayer.hashedemail 
      }
    );
  } else if (AnalyticsDataLayer.email) {
    window.criteo_payload.push(
      { 
        'event': "setEmail", 
        'email': AnalyticsDataLayer.email 
      }
    );
  } // end email

/* Site Type */
  if (AnalyticsDataLayer.devicetype) {  
    var siteType = (AnalyticsDataLayer.devicetype.match(/^[mtd]/)||[]).join();     
    window.criteo_payload.push(
      { 
        'event': "setSiteType", 
        'type' :  siteType 
      }
    );
  } // end devicetype

/* Custom Pages */
if (AnalyticsDataLayer.pagetype) {
  var customPageData=false;
  var dep=AnalyticsDataLayer.deduplication;
  switch (AnalyticsDataLayer.pagetype) {
    case 'home' : 
      customPageData = { 
        'event': "viewHome",
     
      }; 
    break;
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
      customPageData = { 
        'event': "viewItem", 
        'item' :  styleid 
      }; 
    break;
    case 'search' :
      var items=
          AnalyticsDataLayer.products
          &&
          AnalyticsDataLayer.products.items
          &&
          (AnalyticsDataLayer.products.items instanceof Array)
          &&
          AnalyticsDataLayer.products.items
          ||[];
      var item=[];
      for (var i=0,l=items.length;i<l;i++) {
        item.push(items[i].styleid);   
      }
      var keywords = 
        AnalyticsDataLayer.sitesearch
        &&
        AnalyticsDataLayer.sitesearch.term
        ||'';
      customPageData = { 
        'event'   : "viewList", 
        'item'    : item, 
        'keywords': keywords 
      }; 
    break;
    case 'cart' :
      var items=
          AnalyticsDataLayer.products
          &&
          AnalyticsDataLayer.products.items
          &&
          (AnalyticsDataLayer.products.items instanceof Array)
          &&
          AnalyticsDataLayer.products.items
          ||[];
      var item=[];
      for (var i=0,l=items.length;i<l;i++) {
        item.push(
          {
            'id'      : items[i].styleid,
            'price'   : ((+items[i].finalprice)/(+items[i].quantity)),
            'quantity': items[i].quantity
          }
        );   
      }
      var customPageData = { 
        'event': "viewBasket", 
        'item':  item
      }
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
      var item=[];
      for (var i=0,l=items.length;i<l;i++) {
        item.push(
          {
            'id'      : items[i].styleid,
            'price'   : ((+items[i].finalprice)/(+items[i].quantity)),
            'quantity': items[i].quantity
          }
        );   
      }
      var transID = 
          AnalyticsDataLayer.products
          &&
          AnalyticsDataLayer.products.purchaseid
          ||'';
      var new_customer = 
          AnalyticsDataLayer.products
          &&
          AnalyticsDataLayer.products.firstpurchase
          &&
          (
            (AnalyticsDataLayer.products.firstpurchase=='true')
             ||
            (AnalyticsDataLayer.products.firstpurchase==1)
          )
          &&
          1||0;
      var credit = 
          AnalyticsDataLayer.products
          &&
          AnalyticsDataLayer.products.vendorcredit
          &&
          (AnalyticsDataLayer.products.vendorcredit instanceof Array)
          &&
          AnalyticsDataLayer.products.vendorcredit
          ||[];
      var dedupe=0;
      for (var i=0,l=credit.length;i<l;i++) {
        if(credit[i] == 'criteo') {
          dedupe=1;  
        } 
      }
      var deduplicationValue=0;
      if(AnalyticsDataLayer.criteoSession=="yes" || AnalyticsDataLayer.dedup=="yes" )
      {
        deduplicationValue=1;
        console.log("Deduplication value will be set to - " + deduplicationValue);
      }
      var customPageData = { 
        'event'        : "trackTransaction" , 
        'id'           : transID, 
        'new_customer' : new_customer, 
        'deduplication': deduplicationValue,
        'item'         : item
      }    
    break;
  } // end switch
  if (customPageData) {
    window.criteo_payload.push(customPageData);
    console.log('DTM: criteo_payload: ',window.criteo_payload);
    window.criteo_q.push(window.criteo_payload);
  }
}  // end pagetype    



} catch(e) { console.log(e); }

