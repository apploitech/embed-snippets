(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"5128599"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");

try {
    if (AnalyticsDataLayer && AnalyticsDataLayer.pagetype == 'purchase') {
        console.log('DTM: BING UET Purchase');
        var fPrice = 0;
        for(i=0; i<AnalyticsDataLayer.products.items.length; i++) {
            fPrice += +AnalyticsDataLayer.products.items[i].finalprice;
        }
        window.uetq = window.uetq || [];
        window.uetq.push({ 'gv': fPrice }); 
    }
} catch(e){console.log('DTM: ERROR: ',e);}


