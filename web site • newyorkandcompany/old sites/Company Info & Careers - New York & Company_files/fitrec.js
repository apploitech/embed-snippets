!function(){"use strict";function e(e){var t=document.getElementsByTagName("style")[0]||function(){var e=document.createElement("style");return e.type="text/css",document.getElementsByTagName("head")[0].appendChild(e),e}();t.styleSheet?t.styleSheet.cssText=t.styleSheet.cssText+e:t.textContent=t.textContent+e}function t(e,t){return"https:"===document.location.protocol?t:e}function r(e,t,r,c,n){var s,o;document.createStyleSheet&&t===l?document.createStyleSheet(c):(s=document.createElement(e),s.id=r,s.type=t,n&&(s.onload=n),t===l?(s.rel="stylesheet",s.href=c):t===y&&(s.async=!0,s.src=c),o=document.getElementsByTagName("script")[0],o.parentNode.insertBefore(s,o))}function c(){var e,t,r,c,n=document.getElementsByTagName("script"),s="",o={};for(t=0;t<n.length;++t)if(e=n[t].src,/fitrec(-[^\.]+)?\.js/.test(e)){s=e;break}for(r=(s.split("?",2)[1]||"").split("&"),t=0;t<r.length;++t)c=r[t].split("=",2),2===c.length&&(o[c[0]]=c[1]);return o}function n(e,t){function r(){++n>=t||e()||(c=setTimeout(r,100*(1<<n-1)))}var c,n=0;r()}function s(e){n(function(){return window.jQuery?(e(),!0):!1},15)}function o(e){n(function(){return tfc===T?!1:(e(),!0)},15)}function i(e){T[e]=function(){U.push({apiName:e,args:arguments})}}var a=!!window.tfc,u=!1;if(!a){var f,d,l="text/css",y="text/javascript",p="link",m="script",v="serviceMode",g="deviceType",h="desktop",j="mobile",I="responsive",w=["calculate","event","update","getProfileUrl"],T={},R={},U=[];for(d=0;d<w.length;++d)i(w[d]);T.init=function(e){if(!u){u=!0;var n,s=e.configurationURI,o=e.configurationSecureURI,i=e.storeKey,a=t(s,o),d=a+"/fitconfig?callback=tfc.processConfiguration&storeId="+i+"&_="+(new Date).getTime();f=e,f.shimQueryParams=n=c(),e.serviceMode&&(d=d+"&"+v+"="+e.serviceMode),n.deviceType&&(d+="&"+g+"="+n.deviceType),r(m,y,"tfc-fitrec-config",d)}},T.processConfiguration=function(e){function c(){r(m,y,"tfc-fitrec-library",q),o(function(){var e,t;for(e=0;e<U.length;++e)t=U[e],tfc[t.apiName].apply(tfc,t.args);tfc.__calculate?tfc.__calculate(void 0,!0):tfc.calculate()})}function n(){C&&r(m,y,"tfc-store-library",A)}var i=f.storeKey,a=e.cdnURI,u=e.cdnSecureURI,d=e.jQueryURI,v=e.jQuerySecureURI,g=e.storeProductId,w=e.storeVersion,S=e.uxProductId,E=e.uxVersion,Q=e.storeLoadsJquery,x=e.ieCssWorkaround,C=void 0===e.customJsEnabled?!1:e.customJsEnabled,N=void 0===e.jQueryDisabled?!1:e.jQueryDisabled,b=e.widgetDeviceType,P=""===w||""===g?"":"/"+g+"/"+w,_=""===E||""===S?"":"/"+S+"/"+E,k=void 0===e.storeVersionPath?P:e.storeVersionPath,M=void 0===e.uxVersionPath?_:e.uxVersionPath,V="/resources/store/"+i+"/css/fitrec"+(b===j||b===I?"-"+b:"")+".css",B="/resources/store/"+i+"/js/",J="/resources/fitrec/js/application.js",O="/resources/store/"+i+"/js/tfcapp.js";T.configuration=R.configuration=e,e.serviceMode=f.serviceMode,e.shimQueryParams=f.shimQueryParams;var D=t(a+k+V,u+k+V),K=b===I?t(a+k+B+"fitrec-responsive-css.js",u+k+B+"fitrec-responsive-css-s.js"):t(a+k+B+"fitrec-css.js",u+k+B+"fitrec-css-s.js");!x||b!==h&&b!==I?r(p,l,"tfc-fitrec-css",D):r(m,y,"tfc-fitrec-css-js",K);var q=t(a+M+J,u+M+J),A=t(a+k+O,u+k+O);N?(c(),n()):Q?s(function(){window.tfcJQuery=jQuery,c(),n()}):r(m,y,"tfc-jquery-library",t(d,v),function(){window.tfcJQuery=jQuery.noConflict(!0),c(),n()})},window.tfc=T,window.tfcManager=R,window.tfc_loadIeCssWorkaround=e}}(),tfc.init&&tfc.init({configurationURI:"http://fitrec.truefitcorp.com",configurationSecureURI:"https://consumer.truefitcorp.com",storeKey:"nyc"});