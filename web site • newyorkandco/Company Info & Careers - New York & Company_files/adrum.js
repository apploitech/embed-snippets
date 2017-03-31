(function(){new function(){if(!window.ADRUM&&!0!==window["adrum-disable"]){var b=window.ADRUM={};window["adrum-start-time"]=window["adrum-start-time"]||(new Date).getTime();(function(c){(function(d){d.ad=function(){for(var f=[],g=0;g<arguments.length;g++){f[g-0]=arguments[g]}for(g=0;g<f.length;g++){var e=f[g];e&&e.setUp()}}})(c.monitor||(c.monitor={}))})(b||(b={}));(function(e){e=e.conf||(e.conf={});e.beaconUrlHttp="http://col.eum-appdynamics.com";e.beaconUrlHttps="https://col.eum-appdynamics.com";e.corsEndpointPath="/eumcollector/beacons/browser/v1";e.imageEndpointPath="/eumcollector/adrum.gif?";e.appKey=window["adrum-app-key"]||"AD-AAB-AAC-BNT";var h="https:"===document.location.protocol;e.adrumExtUrl=(h?"https://cdn.appdynamics.com":"http://cdn.appdynamics.com")+"/adrum-ext.dd9fb31bfbfbc5719aa4caed486bc048.js";e.adrumXdUrl="https://cdn.appdynamics.com/adrum-xd.dd9fb31bfbfbc5719aa4caed486bc048.html";e.agentVer="4.2.9.0";e.sendImageBeacon="false";if(window["adrum-geo-resolver-url"]){var g=window["adrum-geo-resolver-url"],i=g.indexOf("://");-1!=i&&(g=g.substring(i+3));g=(h?"https://":"http://")+g}else{g=h?"":""}e.geoResolverUrl=g;e.useStrictDomainCookies=!0===window["adrum-use-strict-domain-cookies"];e.userConf=window["adrum-config"];e.be=10})(b||(b={}));(function(c){(function(o){function l(d){return"undefined"!==typeof d&&null!==d}function p(d){return"[object Array]"===Object.prototype.toString.apply(d)}function i(d){return"object"==typeof d&&!p(d)&&null!==d}function n(d){return"string"==typeof d}function j(h,s){for(var t in s){var m=s[t];if(g(s,t)){var q=h[t];i(m)&&i(q)?j(q,m):h[t]=p(q)&&p(m)?q.concat(m):m}}return h}function g(d,f){return Object.prototype.hasOwnProperty.call(d,f)&&l(d[f])}function k(d){return n(d)?d.replace(/^\s*/,"").replace(/\s*$/,""):d}o.isDefined=l;o.isArray=p;o.isObject=i;o.isFunction=function(d){return"function"==typeof d||!1};o.isString=n;o.isNumber=function(d){return"number"==typeof d};o.Ta=function(d){setTimeout(d,0)};o.addEventListener=function(r,q,f){function d(){try{return f.apply(this,Array.prototype.slice.call(arguments))}catch(e){c.exception(e,"M1",q,r,e)}}c.isDebug&&c.log("M0",q,r);r.addEventListener?r.addEventListener(q,d,!1):r.attachEvent&&r.attachEvent("on"+q,d)};o.loadScriptAsync=function(m){var f=document.createElement("script");f.async=!0;f.src=m;var d=document.getElementsByTagName("script")[0];d?(d.parentNode.insertBefore(f,d),c.log("M2",m)):c.log("M3",m)};o.mergeJSON=j;o.hasOwnPropertyDefined=g;o.qd=function(d){var f=[];d&&(o.isObject(d)?f=[d]:o.isArray(d)&&(f=d));return f};o.generateGUID="undefined"!==typeof window.crypto&&"undefined"!==typeof window.crypto.getRandomValues?function(){function d(h){for(h=h.toString(16);4>h.length;){h="0"+h}return h}var f=new Uint16Array(8);window.crypto.getRandomValues(f);return d(f[0])+d(f[1])+"_"+d(f[2])+"_"+d(f[3])+"_"+d(f[4])+"_"+d(f[5])+d(f[6])+d(f[7])}:function(){return"xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx".replace(/[xy]/g,function(d){var f=16*Math.random()|0;return("x"==d?f:f&3|8).toString(16)})};o.hd=function(d){return d?(d=d.stack)&&"string"===typeof d?d:null:null};o.trim=k;o.Ag=function(r){var t={},s,q;if(!r){return t}var f=r.split("\n");for(q=0;q<f.length;q++){var u=f[q];s=u.indexOf(":");r=k(u.substr(0,s)).toLowerCase();s=k(u.substr(s+1));r&&(t[r]=t[r]?t[r]+(", "+s):s)}return t};o.tryPeriodically=function(r,t,s,q){function f(){if(t()){s&&s()}else{var d=r(++u);0<d?setTimeout(f,d):q&&q()}}var u=0;f()};o.Sb=function(d){return d.charAt(0).toUpperCase()+d.slice(1)};o.Kc=function(d){for(var m=[],f=1;f<arguments.length;f++){m[f-1]=arguments[f]}return function(){for(var q=[],e=0;e<arguments.length;e++){q[e-0]=arguments[e]}return d.apply(this,m.concat(q))}};o.now=Date&&Date.now||function(){return(new Date).getTime()}})(c.utils||(c.utils={}))})(b||(b={}));(function(h){function k(m,f,n,o){m=h.conf.beaconUrlHttps+"/eumcollector/error.gif?version=1&appKey="+n+"&msg="+encodeURIComponent(m.substring(0,500));o&&(m+="&stack=",m+=encodeURIComponent(o.substring(0,1500-m.length)));return m}function i(d,c){2<=j||(document.createElement("img").src=k(d,0,h.conf.appKey,c),j++)}function l(c){return 0<=c.location.search.indexOf("ADRUM_debug=true")||0<=c.cookie.search(/(^|;)\s*ADRUM_debug=true/)}h.iDR=l;h.isDebug=l(document);var g=[];h.logMessages=g;h.log=function(d){for(var c=1;c<arguments.length;c++){}h.isDebug&&g.push(Array.prototype.slice.call(arguments).join(" | "))};h.error=function(d){for(var c=1;c<arguments.length;c++){}c=Array.prototype.slice.call(arguments).join(" | ");h.log(c);i(c,null)};h.exception=function(){for(var d=[],c=0;c<arguments.length;c++){d[c-0]=arguments[c]}1>arguments.length||(d=Array.prototype.slice.call(arguments),c=h.utils.hd(d[0]),d=d.slice(1).join(" | "),h.log(d),i(d,c))};h.assert=function(d,c){d||h.error("Assert fail: "+c)};h.dumpLog=h.isDebug?function(){for(var c="",d=0;d<g.length;d++){c+=g[d].replace(RegExp("<br/>","g"),"\n\t")+"\n"}return c}:function(){};h.cIEBU=k;var j=0;h.log("M4")})(b||(b={}));(function(c){var g=function(){function d(f){this.max=f;this.ya=0}d.prototype.Pf=function(){this.ja()||this.ya++};d.prototype.ja=function(){return this.ya>=this.max};d.prototype.reset=function(){this.ya=0};return d}(),e=function(){function d(){this.ga=[];this.Wa=new g(d.qe);this.Ja=new g(d.ee)}d.prototype.submit=function(f){this.push(f)&&c.initEXTDone&&this.processQ()};d.prototype.processQ=function(){for(var f=this.hf(),j=0;j<f.length;j++){var i=f[j];"function"===typeof c.commands[i[0]]?(c.isDebug&&c.log("M5",i[0],i.slice(1).join(", ")),c.commands[i[0]].apply(c,i.slice(1))):c.error("M6",i[0])}};d.prototype.dg=function(f){return"reportXhr"===f||"reportPageError"===f};d.prototype.push=function(i){var k=i[0],j=this.dg(k),f=j?this.Wa:this.Ja;if(f.ja()){return c.log("M7",j?"spontaneous":"non spontaneous",k),!1}this.ga.push(i);f.Pf();return !0};d.prototype.hf=function(){var f=this.ga;this.reset();return f};d.prototype.size=function(){return this.ga.length};d.prototype.reset=function(){this.ga=[];this.Wa.reset();this.Ja.reset()};d.prototype.isSpontaneousQueueDead=function(){return this.Wa.ja()};d.prototype.isNonSpontaneousQueueDead=function(){return this.Ja.ja()};d.qe=100;d.ee=100;return d}();c.Ed=e})(b||(b={}));(function(c){c.q=new c.Ed;c.command=function(g){for(var e=1;e<arguments.length;e++){}c.isDebug&&c.log("M8",g,Array.prototype.slice.call(arguments).slice(1).join(", "));c.q.submit(Array.prototype.slice.call(arguments))}})(b||(b={}));(function(c){(function(d){var e=function(){function f(){this.status={}}f.prototype.setUp=function(){};f.prototype.set=function(g,h){this.status[g]=h};return f}();d.ob=e})(c.monitor||(c.monitor={}))})(b||(b={}));(function(c){(function(e){window.ADRUM.aop=e;e.support=function(d){return !d||"apply" in d};e.around=function(g,i,d,h){c.assert(e.support(g),"aop.around called on a function which does not support interception");g=g||function(){};return function(){c.isDebug&&c.log("M9",h,Array.prototype.slice.call(arguments).join(", "));var l=Array.prototype.slice.call(arguments),f;try{i&&(f=i.apply(this,l))}catch(o){c.exception(o,"M10",h,o)}c.assert(!f||"[object Array]"===Object.prototype.toString.call(f));var j=void 0;try{j=g.apply(this,f||l)}finally{try{d&&d.apply(this,l)}catch(n){c.exception(n,"M11",h,n)}}return j}};e.before=function(d,f){return e.around(d,f)};e.after=function(d,f){return e.around(d,null,f)}})(c.aop||(c.aop={}))})(b||(b={}));(function(c){c=c.EventType||(c.EventType={});c[c.BASE_PAGE=0]="BASE_PAGE";c[c.IFRAME=1]="IFRAME";c[c.XHR=2]="XHR";c[c.VIRTUAL_PAGE=3]="VIRTUAL_PAGE";c[c.PAGE_ERROR=4]="PAGE_ERROR";c[c.ABSTRACT=100]="ABSTRACT";c[c.ADRUM_XHR=101]="ADRUM_XHR";c[c.NG_VIRTUAL_PAGE=102]="NG_VIRTUAL_PAGE"})(b||(b={}));(function(c){c=c.events||(c.events={});c.l={};c.l[100]={guid:"string",url:"string",parentGUID:"string",parentUrl:"string",parentType:"number",timestamp:"number"};c.l[3]={resTiming:"object"};c.l[102]={digestCount:"number"};c.l[2]={method:"string",parentPhase:"string",parentPhaseId:"number",error:"object"};c.l[101]={xhr:"object"};c.l[4]={msg:"string",line:"number",stack:"string"}})(b||(b={}));(function(c){var g=function(){function d(){this.w={}}d.prototype.mark=function(f,h){e.mark.apply(this,arguments)};d.prototype.getTiming=function(f){return(f=this.getEntryByName(f))&&f.startTime};d.prototype.measure=function(f,j,i){e.measure.apply(this,arguments)};d.prototype.getEntryByName=function(f){return e.getEntryByName.call(this,f)};d.xa=function(f){return e.xa(f)};return d}();c.PerformanceTracker=g;var e;(function(l){var i=c.utils.hasOwnPropertyDefined,k=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance,j=k&&k.timing&&k.timing.navigationStart?k.timing.navigationStart:window["adrum-start-time"],f=c.utils.now;l.mark=function(h,d){this.w[h]={name:h,entryType:"mark",startTime:c.utils.isDefined(d)?d:f(),duration:0}};l.measure=function(h,m,n){i(this.w,m)&&i(this.w,n)?this.w[h]={name:h,entryType:"measure",startTime:m?this.w[m].startTime:j,duration:(n?this.w[n].startTime:f())-(m?this.w[m].startTime:j)}:c.error("M12",i(this.w,m)?n:m)};l.getEntryByName=function(d){return this.w[d]||null};l.xa=function(d){return d+j}})(e||(e={}))})(b||(b={}));(function(c){(function(h){function g(j,f){j=j||{};for(var k in j){f[k]=function(){var d=k,l=j[k];return function(o){var p="_"+d,n=this[p];if(c.utils.isDefined(o)){if(typeof o===l){this[p]=o}else{throw TypeError("wrong type of "+d+" value, "+typeof o+" passed in but should be a "+l+".")}}return n}}()}}function i(j){var f={},k;for(k in j){var l=j[k];f[l.start]=!0;f[l.end]=!0}return f}var e=function(){function d(f){this.perf=new c.PerformanceTracker;this.timestamp(c.utils.now());this.guid(c.utils.generateGUID());this.url(document.URL);this.$c(f)}d.prototype.type=function(){return 100};d.prototype.$c=function(j){if(c.utils.isObject(j)){for(var f in j){var k=this[f]||this["mark"+c.utils.Sb(f)];k&&c.utils.isFunction(k)&&k.call(this,j[f])}}};d.Ob=function(j,k,f){return{guid:function(){return j},url:function(){return k},type:function(){return f}}};d.prototype.Ff=function(){return d.Ob(this.parentGUID(),this.parentUrl(),this.parentType())};d.prototype.parent=function(j){var f=this.Ff();c.utils.isDefined(j)&&(this.parentGUID(j.guid()),this.parentUrl(j.url()),this.parentType(j.type()));return f};return d}();h.EventTracker=e;h.V=g;h.Pb=function(k,f){k=k||{};var l=i(k),j;for(j in l){l=c.utils.Sb(j),f["mark"+l]=c.utils.Kc(function(d,m){this.perf.mark(d,m)},j),f["get"+l]=c.utils.Kc(function(d){return this.perf.getTiming(d)},j)}};g(h.l[100],e.prototype)})(c.events||(c.events={}))})(b||(b={}));var a=this.Je||function(e,h){function g(){this.constructor=e}for(var i in h){h.hasOwnProperty(i)&&(e[i]=h[i])}g.prototype=h.prototype;e.prototype=new g};(function(c){(function(d){var e=function(g){function f(h){g.call(this,h)}a(f,g);f.prototype.type=function(){return 4};return f}(d.EventTracker);d.Error=e;d.V(d.l[4],e.prototype)})(c.events||(c.events={}))})(b||(b={}));(function(c){(function(g){var e=function(h){function f(){h.apply(this,arguments)}a(f,h);f.prototype.setUp=function(){h.prototype.setUp.call(this);c.listenForErrors=this.Cc;this.Cc()};f.prototype.Cc=function(){if(c.aop.support(window.onerror)){var d=this;window.onerror=c.aop.around(window.onerror,function(l,i,n,k,j){f.Ha||(f.errorsSent>=c.conf.be?c.log("M13"):(k=c.utils.hd(j),c.command("reportPageError",new c.events.Error(c.utils.mergeJSON({msg:l,url:i,line:n,stack:k},d.status))),f.errorsSent++,f.Ha=!0))},function(){f.Ha=!1},"onerror");c.log("M14")}else{c.log("M15")}};f.Ha=!1;f.errorsSent=0;return f}(g.ob);g.ErrorMonitor=e;g.ac=new g.ErrorMonitor})(c.monitor||(c.monitor={}))})(b||(b={}));(function(c){var e=function(){function f(){this.ra=[];this.ma(f.ua,0)}f.prototype.sg=function(d){this.ma(f.Ib,d)};f.prototype.ug=function(d){this.ma(f.Qb,d)};f.prototype.tg=function(d){this.ma(f.Kb,d)};f.prototype.ma=function(g,d){this.ra.push({rg:(new Date).getTime(),qg:d,Lc:g});this.cf=g};f.prototype.getPhaseName=function(){return this.cf};f.prototype.getPhaseID=function(g){for(var d=0;d<f.Nb.length;d++){if(f.Nb[d]===g){return d}}return null};f.prototype.getPhaseCallbackTime=function(g){for(var d=this.ra,h=0;h<d.length;h++){if(d[h].Lc===g){return d[h].rg}}return null};f.prototype.findPhaseAtNominalTime=function(h){c.assert(0<=h);for(var d=this.ra,g=d.length-1;0<=g;g--){if(h>=d[g].qg){return d[g].Lc}}c.error("M16",h,c.utils.jf(d));return f.ua};f.ua="AFTER_FIRST_BYTE";f.Ib="AFTER_DOM_INTERACTIVE";f.Qb="AT_ONLOAD";f.Kb="AFTER_ONLOAD";f.Nb=[f.ua,f.Ib,f.Qb,f.Kb];return f}();c.th=e;c.lifecycle=new e;c.lifecycle=c.lifecycle})(b||(b={}));(function(c){(function(d){var e=function(g){function f(){g.apply(this,arguments)}a(f,g);f.prototype.type=function(){return 0};return f}(d.EventTracker);d.PageView=e})(c.events||(c.events={}))})(b||(b={}));(function(c){(function(g){var e=function(){function d(){}d.prototype.setUp=function(){d.Pg();d.Og()};d.Og=function(){c.utils.addEventListener(window,"load",d.na);c.utils.addEventListener(window,"load",d.xg)};d.xg=function(f){c.lifecycle.ug(f&&f.timeStamp);c.utils.Ta(function(){var h=(new Date).getTime();c.lifecycle.tg(h);c.command("mark","onload",h);g.Ab.perf&&(g.perfMonitor.Ze(),g.perfMonitor.$e());c.command("reportOnload",new c.events.PageView);c.utils.loadScriptAsync(c.conf.adrumExtUrl)});c.log("M17")};d.Pg=function(){if(document.addEventListener){document.addEventListener("DOMContentLoaded",d.ba,!1)}else{document.attachEvent("onreadystatechange",d.ba);var h=null;try{h=null===window.frameElement?document.documentElement:null}catch(i){}null!=h&&h.doScroll&&function f(){if(!d.isReady){try{h.doScroll("left")}catch(j){setTimeout(f,10);return}d.na()}}()}c.log("M18")};d.na=function(f){d.Fc||(c.lifecycle.sg(f&&f.timeStamp),c.command("mark","onready",(new Date).getTime()),d.Fc=!0)};d.ba=function(f){document.addEventListener?(document.removeEventListener("DOMContentLoaded",d.ba,!1),d.na(f)):"complete"===document.readyState&&(document.detachEvent("onreadystatechange",d.ba),d.na(f))};d.isReady=!1;d.Fc=!1;return d}();g.Gd=e;g.gf=new g.Gd})(c.monitor||(c.monitor={}))})(b||(b={}));(function(c){(function(g){var e=function(){function f(){this.navTiming=this.resTiming=null}f.prototype.setUp=function(){f.perf=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance};f.prototype.Ze=function(){var i=f.perf;if(i=i&&i.timing){if(i.navigationStart&&i.navigationStart<=i.loadEventEnd){var k={},j;for(j in i){var d=i[j];"number"===typeof d&&(k[j]=d)}this.navTiming=k}else{c.log("M20")}}else{c.log("M19")}};f.prototype.$e=function(){this.resTiming=this.kc()};f.prototype.kc=function(){var d=f.perf,h=[];d&&d.getEntriesByType&&(d=d.getEntriesByType("resource"))&&d.length&&0<d.length&&d.unshift&&(h=d);0==h.length&&c.log("M21");return h};f.perf=null;return f}();g.Ab=e;g.perfMonitor=new g.Ab})(c.monitor||(c.monitor={}))})(b||(b={}));(function(c){(function(e){e.parseURI=function(f){var g=String(f).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);f=g&&null!=f.match(g[1]+"//");return g&&{href:g[0]||"",protocol:g[1]||"",Va:f?"//":"",eb:g[2]||"",Na:g[3]||"",host:g[4]||"",hostname:g[5]||"",port:g[6]||"",pathname:g[7]||"",search:g[8]||"",hash:g[9]||""}};e.absolutizeURI=function(v,t){function u(g){var h=[];g.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(k){"/.."===k?h.pop():h.push(k)});return h.join("").replace(/^\//,"/"===g.charAt(0)?"/":"")}var s,p,i,d,o,q,f,j;j=t?e.parseURI(t):{};f=v?e.parseURI(v):{};j.protocol?(s=j.protocol,p=j.Va,i=j.eb,d=j.Na,o=j.host,q=u(j.pathname),f=j.search):j.host?(s=f.protocol,p=f.Va,i=j.eb,d=j.Na,o=j.host,q=u(j.pathname),f=j.search):(s=f.protocol,p=f.Va,i=f.eb,d=f.Na,o=f.host,j.pathname?("/"===j.pathname.charAt(0)?q=u(j.pathname):(q=f.pathname?f.pathname.slice(0,f.pathname.lastIndexOf("/")+1)+j.pathname:p?"/"+j.pathname:j.pathname,q=u(q)),f=j.search):(q=u(f.pathname),f=j.search||f.search));return s+p+(i?i+(d?":"+d:"")+"@":"")+o+q+f+(j.hash?j.hash:"")};e.getFullyQualifiedUrl=function(n){try{var p,g=document.location.href,o;c:{for(var j=document.getElementsByTagName("base"),d=0;d<j.length;d++){var l=j[d].href;if(l){o=l;break c}}o=void 0}p=o?e.absolutizeURI(g,o):g;return e.absolutizeURI(p,n)}catch(i){return c.exception(i,"M22",n,p),n}}})(c.utils||(c.utils={}))})(b||(b={}));(function(c){c=c.events||(c.events={});c=c.b||(c.b={});c.navigationStart="navigationStart";c.domainLookupStart="domainLookupStart";c.domainLookupEnd="domainLookupEnd";c.connectStart="connectStart";c.secureConnectionStart="secureConnectionStart";c.connectEnd="connectEnd";c.requestStart="requestStart";c.responseStart="responseStart";c.responseEnd="responseEnd";c.domContentLoadedEventStart="domContentLoadedEventStart";c.loadEventEnd="loadEventEnd";c.Yc="sendTime";c.cc="firstByteTime";c.Uc="respAvailTime";c.Vc="respProcTime";c.fb="viewChangeStart";c.md="viewChangeEnd";c.gb="viewDOMLoaded";c.sd="xhrRequestsCompleted";c.$h="viewFragmentsLoaded";c.ai="viewResourcesLoaded";c.hb="virtualPageStart";c.ih="virtualPageEnd"})(b||(b={}));(function(c){c=c.events||(c.events={});c.B={};c.B[0]={of:{start:c.b.navigationStart,end:c.b.loadEventEnd,name:"PLT"},tf:{start:c.b.navigationStart,end:c.b.responseStart,name:"FBT"},Wh:{start:c.b.navigationStart,end:c.b.requestStart,name:"SCT"},Xh:{start:c.b.secureConnectionStart,end:c.b.connectEnd,name:"SHT"},Dh:{start:c.b.domainLookupStart,end:c.b.domainLookupEnd,name:"DLT"},Zh:{start:c.b.connectStart,end:c.b.connectEnd,name:"TCP"},Uh:{start:c.b.requestStart,end:c.b.responseStart,name:"RAT"},Fh:{start:c.b.responseStart,end:c.b.loadEventEnd,name:"FET"},Hh:{start:c.b.responseStart,end:c.b.domContentLoadedEventStart,name:"DRT"},xh:{start:c.b.responseStart,end:c.b.responseEnd,name:"DDT"},Bh:{start:c.b.responseEnd,end:c.b.domContentLoadedEventStart,name:"DPT"},Th:{start:c.b.domContentLoadedEventStart,end:c.b.loadEventEnd,name:"PRT"},Ch:{start:c.b.navigationStart,end:c.b.domContentLoadedEventStart,name:"DOM"}};c.B[2]={tf:{start:c.b.Yc,end:c.b.cc,name:"FBT"},Gh:{start:c.b.cc,end:c.b.Uc,name:"DDT"},wh:{start:c.b.Uc,end:c.b.Vc,name:"DPT"},of:{start:c.b.Yc,end:c.b.Vc,name:"PLT"}};c.B[3]={Nh:{start:c.b.hb,end:c.b.ih,name:"PLT"},zh:{start:c.b.fb,end:c.b.md,name:"DDT"},Kh:{start:c.b.fb,end:c.b.gb,name:"DRT"},oh:{start:c.b.md,end:c.b.gb,name:"DPT"},ph:{start:c.b.fb,end:c.b.gb,name:"DOM"},Sh:{start:"viewChangeEnd",end:"xhrRequestsCompleted",name:null},Lh:{start:"viewChangeEnd",end:"viewPartialsLoaded",name:null},Jh:{start:"viewPartialsLoaded",end:"viewFragmentsLoaded",name:null},Mh:{start:"viewPartialsLoaded",end:"viewResourcesLoaded",name:null}};c.B[102]=c.B[3]})(b||(b={}));(function(c){(function(d){var e=function(f){function g(h){f.call(this,h)}a(g,f);g.prototype.type=function(){return 2};return g}(d.EventTracker);d.Ajax=e;d.V(d.l[2],e.prototype);d.Pb(d.B[2],e.prototype)})(c.events||(c.events={}))})(b||(b={}));(function(c){(function(d){var e=function(f){function g(h){f.call(this,h)}a(g,f);g.prototype.type=function(){return 2};return g}(d.Ajax);d.AdrumAjax=e;d.V(d.l[101],e.prototype)})(c.events||(c.events={}))})(b||(b={}));(function(c){(function(g){var e=function(h){function f(){h.call(this);this.conf=null;this.Xa=!1;!0===window["adrum-xhr-disable"]?c.log("M23"):window.XMLHttpRequest?(this.conf={exclude:[{urls:[{pattern:c.conf.beaconUrlHttp+c.conf.corsEndpointPath},{pattern:c.conf.beaconUrlHttps+c.conf.corsEndpointPath}]}],include:[]},f.Oc(this.conf,c.conf.userConf&&c.conf.userConf.xhr),(this.d=window.XMLHttpRequest.prototype)?"open" in this.d&&"send" in this.d?(this.Xa=c.aop.support(this.d.open)&&c.aop.support(this.d.send))||c.log("M27"):c.log("M26"):c.log("M25")):c.log("M24")}a(f,h);f.Oc=function(k,l){l&&(l.include=c.utils.qd(l.include),l.exclude=c.utils.qd(l.exclude),c.utils.mergeJSON(k,l));var i=k.exclude;if(i){for(var j=0;j<i.length;j++){var n=i[j].urls;n&&0<n.length&&(i[j].urls=f.Wb(n))}}if(i=k.include){for(j=0;j<i.length;j++){(n=i[j].urls)&&0<n.length&&(i[j].urls=f.Wb(n))}}};f.Wb=function(l){for(var m=[],i=0;i<l.length;i++){var n=l[i].pattern;if("string"===typeof n){try{m.push(new RegExp(n))}catch(j){c.exception(j,"Parse regex pattern failed.")}}else{c.error("xhr filter pattern should be a string")}}return m};f.bd=function(j,k,i){var l=i&&i.include;i=i&&i.exclude;return l&&0<l.length&&!f.zc(k,j,l)||i&&0<i.length&&f.zc(k,j,i)};f.prototype.setUp=function(){if(this.Xa){c.log("M28");c.xhrConstructor=window.XMLHttpRequest;c.xhrOpen=this.xhrOpen=this.d.open;c.xhrSend=this.xhrSend=this.d.send;var d=this;this.d.open=c.aop.around(this.d.open,function(){var j=1<=arguments.length?String(arguments[0]):"",i=2<=arguments.length?String(arguments[1]):"",i=c.utils.getFullyQualifiedUrl(i);f.bd(i,j,d.conf)||(this._adrumAjaxT=new c.events.AdrumAjax(c.utils.mergeJSON({method:j,url:i,xhr:this},d.status)))},null,"XHR.open");this.d.send=c.aop.around(this.d.send,function(){var o=this,i=o._adrumAjaxT;if(i){var p=c.utils.now(),j=i.getSendTime();c.assert(null===j,"M29");i.timestamp(p);i.markSendTime(j||p);i.parentPhase(c.lifecycle.getPhaseName());f.bg(i.url())?o.setRequestHeader("ADRUM","isAjax:true"):c.log("M30",document.location.href,i.url());var n=0,l=function(){if(4==o.readyState){c.log("M31"),d.sa(o)}else{var k=null;try{k=o.onreadystatechange}catch(q){c.log("M32",q);d.sa(o);return}n++;k?c.aop.support(k)?(o.onreadystatechange=d.Xb(k,o,"XHR.onReadyStateChange"),c.log("M33",n)):(c.log("M34"),d.sa(o)):n<f.He?c.utils.Ta(l):(c.log("M35"),d.sa(o))}};l()}},null,"XHR.send");"addEventListener" in this.d&&"removeEventListener" in this.d&&c.aop.support(this.d.addEventListener)&&c.aop.support(this.d.removeEventListener)?(this.d.addEventListener=c.aop.around(this.d.addEventListener,this.bf(),null,"XHR.addEventListener"),this.d.removeEventListener=c.aop.around(this.d.removeEventListener,function(j,k){if(this._adrumAjaxT){var i=Array.prototype.slice.call(arguments);k.__adrumInterceptor?(i[1]=k.__adrumInterceptor,c.log("M36")):c.log("M37");return i}},null,"XHR.removeEventListener")):c.log("M38");c.log("M39")}};f.mg=function(j,l){for(var i=!1,m=0;m<l.length;m++){var k=l[m];if(k&&k.test(j)){i=!0;break}}return i};f.zc=function(j,n,i){var o=!1;if(n&&i){for(var l=0;l<i.length;l++){var k=i[l];if(!(k.method&&j!==k.method||k.urls&&!f.mg(n,k.urls))){o=!0;break}}}return o};f.Bg=function(j,k,i){return(k||j)===(i||j)};f.pc=function(j){var k=j._adrumAjaxT;if(k){var i=(new Date).getTime();2==j.readyState?k.markFirstByteTime(k.getFirstByteTime()||i):4==j.readyState&&(c.assert(null===k.getRespAvailTime(),"M40"),k.markRespAvailTime(k.getRespAvailTime()||i),k.markFirstByteTime(k.getFirstByteTime()||i))}};f.bg=function(j){var k=document.createElement("a");k.href=j;j=document.location;var i=j.protocol;return k.protocol===i&&k.hostname===j.hostname&&f.Bg(f.ef[i],k.port,j.port)};f.prototype.Xb=function(j,k,i){return f.mh(j,function(){f.pc(this)},function(){var l=k._adrumAjaxT;if(l&&4==k.readyState){var d=(new Date).getTime();c.assert(null===l.getRespProcTime(),"M41");l.markRespProcTime(l.getRespProcTime()||d);f.a(k,l)}},i)};f.a=function(j,k){var i=j.status;if(400<=i){var l=j.responseText;k.error({status:i,msg:c.utils.isString(l)?l:""})}c.command("reportXhr",k)};f.prototype.sa=function(j){if(j._adrumAjaxT){var k=(new Date).getTime()+30000,i=function(){f.pc(j);var l=j._adrumAjaxT;if(l){var d=(new Date).getTime();4==j.readyState?(c.assert(null===l.getRespProcTime(),"M42"),l.markRespProcTime(l.markRespProcTime()||d),c.log("M43"),f.a(j,l),delete j._adrumAjaxT):d<k?setTimeout(i,f.nb):(delete j._adrumAjaxT,c.log("M44"))}};i()}};f.mh=function(k,l,i,m){var j=k;k&&"object"===typeof k&&"toString" in k&&"[xpconnect wrapped nsIDOMEventListener]"===k.toString()&&"handleEvent" in k&&(j=function(){k.handleEvent.apply(this,Array.prototype.slice.call(arguments))});return c.aop.around(j,l,i,m)};f.prototype.bf=function(){for(var j=0;j<arguments.length;j++){}var i=this;return function(m,l){if(("load"===m||"error"===m)&&l&&this._adrumAjaxT){var n;n=l;if(n.__adrumInterceptor){n=n.__adrumInterceptor}else{if(c.aop.support(n)){var k=i.Xb(n,this,"XHR.invokeEventListener");n=n.__adrumInterceptor=k}else{n=null}}if(n){return k=Array.prototype.slice.call(arguments),k[1]=n,c.log("M45"),k}c.log("M46",m,l)}}};f.He=5;f.nb=50;f.ef={"http:":"80","https:":"443"};return f}(g.ob);g.ea=e;g.jb=new g.ea})(c.monitor||(c.monitor={}))})(b||(b={}));(function(c){(function(j){function h(l,o){var e=[],p=/^\s*(ADRUM_BT\w*)=(.*)\s*$/i.exec(l);if(p){var n=p[1],p=p[2].replace(/^"|"$/g,""),p=decodeURIComponent(p).split("|"),m=p[0].split(":");if("R"===m[0]&&Number(m[1])===o){for(i(n),n=1;n<p.length;n++){e.push(p[n])}}}return e}function k(l,o){var e=/^\s*(ADRUM_(\d+)_(\d+)_(\d+))=(.*)\s*$/i.exec(l);if(e){var p=e[1],n=e[4],m=e[5];if(Number(e[3])===o){return i(p),{index:Number(n),value:m}}}return null}function g(f){var e=/^\s*ADRUM=s=([\d]+)&r=(.*)\s*/.exec(f);if(e){c.log("M49",f);if(3===e.length){return i("ADRUM"),{startTime:Number(e[1]),startPage:e[2]}}c.error("M50",f);return null}}function i(l){c.log("M48",l);var f=new Date;f.setTime(f.getTime()-1000);document.cookie=l+"=;Expires="+f.toUTCString()}j.startTimeCookie=null;j.cookieMetadataChunks=null;j.Zb=function(u,d){c.log("M47");for(var r=d?d.length:0,o=[],s=u.split(";"),v=0;v<s.length;v++){var f=s[v],q=k(f,r);q?o.push(q):(f=g(f),null!=f&&(j.startTimeCookie=f))}Array.prototype.sort.call(o,function(e,l){return e.index-l.index});f=[];for(v=0;v<o.length;v++){f.push(o[v].value)}for(v=0;v<s.length;v++){(o=h(s[v],r))&&0<o.length&&(f=f.concat(o))}j.cookieMetadataChunks=f};c.correlation.eck=j.Zb})(c.correlation||(c.correlation={}))})(b||(b={}));(function(c){c.report=function(e){c.utils.Ta(function(){c.command("reportEvent",e)})}})(b||(b={}));(function(c){"APP_KEY_NOT_SET"===c.conf.appKey&&"undefined"!==typeof console&&"undefined"!==typeof console.log&&console.log("AppDynamics EUM cloud application key missing. Please specify window['adrum-app-key']");c.correlation.Zb(document.cookie,document.referrer);c.command("mark","firstbyte",window["adrum-start-time"]);c.monitor.ad(c.monitor.ac,c.monitor.gf,c.monitor.perfMonitor,c.monitor.jb)})(b||(b={}));(function(c){c=c.ng||(c.ng={});c=c.c||(c.c={});c.Dc="locationChangeStart";c.jg="locationChangeSuccess";c.Wc="routeChangeStart";c.Xc="routeChangeSuccess";c.dd="stateChangeStart";c.ed="stateChangeSuccess";c.nd="viewContentLoaded";c.Mf="includeContentRequested";c.Lf="includeContentLoaded";c.Yb="digest";c.Ph="outstandingRequestsComplete";c.Rb="beforeNgXhrRequested";c.Jb="afterNgXhrRequested";c.Oh="ngXhrLoaded";c.Ub="$$completeOutstandingRequest"})(b||(b={}));(function(c){(function(h){function g(j,d,q,l,k,m){if(d){try{return d.apply(j,[q,l,k].concat(m))}catch(o){return j.error(q,l,k,m,h.Error.Od,"an exception occurred in a caller-provided callback function",o)}}}function i(f,d){return function(){var n=this.current,l=d[n]||d[h.da]||n,j=Array.prototype.slice.call(arguments);if(this.Xe(f)){return this.error(f,n,l,j,h.Error.Pd,"event "+f+" inappropriate in current state "+this.current)}if(!1===g(this,this["onbefore"+f],f,n,l,j)){return h.ca.kb}l===h.da&&(l=n);if(n===l){return g(this,this["onafter"+f]||this["on"+f],f,n,l,j),h.ca.se}var m=this;this.transition=function(){m.transition=null;m.current=l;g(m,m["onenter"+l]||m["on"+l],f,n,l,j);g(m,m["onafter"+f]||m["on"+f],f,n,l,j);return h.ca.Ae};if(!1===g(this,this["onleave"+n],f,n,l,j)){return this.transition=null,h.ca.kb}if(this.transition){return this.transition()}}}var e=c.utils.hasOwnPropertyDefined;h.VERSION="2.3.5";h.ca={Ae:1,se:2,kb:3,rh:4};h.Error={Pd:100,sh:200,Od:300};h.da="*";h.create=function(w,q){function k(l){var m=l.from instanceof Array?l.from:l.from?[l.from]:[h.da];o[l.name]=o[l.name]||{};for(var f=0;f<m.length;f++){y[m[f]]=y[m[f]]||[],y[m[f]].push(l.name),o[l.name][m[f]]=l.to||m[f]}}var u="string"==typeof w.initial?{state:w.initial}:w.initial,r=q||w.target||{},d=w.events||[],j=w.callbacks||{},o={},y={};u&&(u.event=u.event||"startup",k({name:u.event,from:"none",to:u.state}));for(var z=0;z<d.length;z++){k(d[z])}for(var x in o){e(o,x)&&(r[x]=i(x,o[x]))}for(x in j){e(j,x)&&(r[x]=j[x])}r.current="none";r.Ih=function(f){return f instanceof Array?0<=f.indexOf(this.current):this.current===f};r.We=function(f){return !this.transition&&(e(o[f],this.current)||e(o[f],h.da))};r.Xe=function(f){return !this.We(f)};r.ra=function(){return y[this.current]};r.error=w.error||function(n,t,s,l,v,f,p){throw p||f};if(u&&!u.defer){r[u.event]()}return r}})(c.Db||(c.Db={}))})(b||(b={}));(function(c){(function(g){var e=function(f){function d(h){f.call(this,h);this.perf=new c.PerformanceTracker;this.start()}a(d,f);d.prototype.type=function(){return 3};d.prototype.Bf=function(){return g.EventTracker.Ob(this.guid(),this.url(),this.type())};d.prototype.cd=function(i){var h=this.Bf();i.set("parent",h);c.log("M51",h.guid(),h.url())};d.prototype.startCorrelatingXhrs=function(){c.log("M52");this.cd(c.monitor.jb)};d.prototype.stopCorrelatingXhrs=function(){c.monitor.jb.set("parent",null);c.log("M53")};d.prototype.Sg=function(){c.log("M54");this.cd(c.monitor.ac)};d.prototype.start=function(){this.markVirtualPageStart();this.startCorrelatingXhrs()};d.prototype.end=function(){this.markVirtualPageEnd();this.stopCorrelatingXhrs()};return d}(g.EventTracker);g.VPageView=e;g.V(g.l[3],e.prototype);g.Pb(g.B[3],e.prototype)})(c.events||(c.events={}))})(b||(b={}));(function(c){var e=c.ng||(c.ng={}),e=e.conf||(e.conf={});e.disabled=c.conf.userConf&&c.conf.userConf.spa&&c.conf.userConf.spa.angular&&c.conf.userConf.spa.angular.disable;e.distinguishVPwithItsTemplateUrl=c.conf.userConf&&c.conf.userConf.spa&&c.conf.userConf.spa.angular&&!0===c.conf.userConf.spa.angular.distinguishVPwithItsTemplateUrl?!0:!1;e.xhr={};e.metrics={includeResTimingInEndUserResponseTiming:!0};c.conf.userConf&&c.conf.userConf.spa&&c.conf.userConf.spa.angular&&c.conf.userConf.spa.angular.vp&&(c.conf.userConf.spa.angular.vp.xhr&&c.monitor.ea.Oc(e.xhr,c.conf.userConf.spa.angular.vp.xhr),c.conf.userConf.spa.angular.vp.metrics&&c.utils.mergeJSON(e.metrics,c.conf.userConf.spa.angular.vp.metrics))})(b||(b={}));(function(c){(function(g){var e=function(f){function d(h){f.call(this,h);this.xc=!0;this.X={};this.T=0;this.stopCorrelatingXhrs()}a(d,f);d.prototype.type=function(){return 3};d.prototype.hb=function(){this.markViewChangeStart();this.markVirtualPageStart(this.getViewChangeStart());this.timestamp(this.getViewChangeStart())};d.prototype.Nf=function(){this.digestCount(this.digestCount()+1)};d.prototype.Of=function(){this.T++;c.log("increasing xhr count "+this.T+" pending xhr requests")};d.prototype.df=function(){this.T--;c.log("decreasing xhr count "+this.T+" pending xhr requests")};d.prototype.If=function(){var h=this.perf.getEntryByName(c.events.b.sd);c.log("xhrCount "+this.T+" xhrReuqestCompleted "+h);return 0<this.T};d.prototype.Te=function(){var h={qa:0},l=document.querySelectorAll("ng-view, [ng-view], .ng-view, [ui-view]");if(l&&0<l.length){for(var o in d.Tc){for(var j=0;j<l.length;j++){var i=angular.element(l[j]).find(o);if(0<i.length){for(var k=0;k<i.length;k++){var m=i[k][d.Tc[o].Za];(m=m?decodeURIComponent(m):null)&&!h[m]&&(h[m]=o,h.qa++)}}}}}this.X=h};d.prototype.Se=function(h){return !!this.X[decodeURIComponent(h.name)]};d.prototype.Ue=function(){var i=[],h=this;0<this.X.qa&&(i=c.monitor.perfMonitor.kc().filter(function(j){return h.Se(j)}));this.resTiming(i)};d.qf=function(i){for(var k=[],h=0;h<i.length;h++){var j=i[h];2!==i[h].eventType&&101!==i[h].eventType||c.monitor.ea.bd(j.eventUrl,j.method,g.conf.xhr)||k.push(i[h])}return k};d.Cf=function(i){var j,h,k=-1;j=0;for(h=i.length;j<h;j++){k=Math.max(k,i[j].timestamp+i[j].metrics.PLT)}return k};d.prototype.Ne=function(){if(g.conf.xhr){var h=d.qf(c.channel.getEventsWithParentGUID(this.guid())),h=d.Cf(h);if(0<h){var i=this.perf.getEntryByName(c.events.b.sd);this.markXhrRequestsCompleted(Math.min(i&&i.startTime||Number.MAX_VALUE,h))}}};d.prototype.adjustTimings=function(){this.Ne();var h=this.getViewDOMLoaded(),i=this.getXhrRequestsCompleted(),h=Math.max(h,i);g.conf.metrics.includeResTimingInEndUserResponseTiming&&(this.Me(),i=this.getViewResourcesLoaded(),i=Math.max(h,i),c.log("adjust this.end from %s to %s",h,i),h=i);this.markVirtualPageEnd(h)};d.prototype.Me=function(){if(0<this.X.qa){this.Ue();var i=this.resTiming();if(i&&i.length>=this.X.qa){for(var h=[],j=0;j<i.length;j++){h.push(i[j].responseEnd)}i=Math.max.apply(Math,h);this.markViewResourcesLoaded(c.PerformanceTracker.xa(i))}}};d.prototype.identifier=function(h){var i=this.pd;c.utils.isDefined(h)&&(this.pd=d.pf(h),this.url(this.pd.url));return i};d.pf=function(i){var h={};i&&i.g?(h.g={La:""},c.utils.mergeJSON(h.g,{La:i.g.originalPath,Y:i.g.template,Z:i.g.templateUrl})):i&&i.state&&(h.state={url:""},c.utils.mergeJSON(h.state,{url:i.state.url,name:i.state.name,Y:i.state.template,Z:i.state.templateUrl}));return h};d.Tc={img:{Za:"src"},script:{Za:"src"},link:{Za:"href"}};return d}(c.events.VPageView);g.NgVPageView=e;c.events.V(c.events.l[102],e.prototype)})(c.ng||(c.ng={}))})(b||(b={}));(function(c){(function(g){var e=function(){function d(){this.e=new g.NgVPageView}d.prototype.Ig=function(){var f=this;g.conf.metrics.includeResTimingInEndUserResponseTiming?(c.log("M55"),setTimeout(function(){f.Pa()},d.Ce)):setTimeout(function(){f.Pa()},d.De)};d.prototype.Pa=function(){c.log("M56");var f=this.e;c.command("call",function(){f.adjustTimings();c.reporter.reportEvent(f)})};d.prototype.Ng=function(f){this.e=f};d.Ce=5000;d.De=2*c.monitor.ea.nb;return d}();g.VirtualPageStateMachine=e;c.Db.create({events:[{name:"start",from:"none",to:"ChangeView"},{name:"viewLoaded",from:"ChangeView",to:"XhrPending"},{name:"xhrCompleted",from:"XhrPending",to:"End"},{name:"abort",from:"*",to:"none"},{name:"init",from:"*",to:"none"},{name:"locChange",from:"*",to:"*"},{name:"beforeXhrReq",from:"*",to:"*"},{name:"afterXhrReq",from:"*",to:"*"}],error:function(f){c.log("M57"+f)},callbacks:{onChangeView:function(){this.e.hb();this.e.Sg()},onviewLoaded:function(){this.e.markViewDOMLoaded()},onXhrPending:function(){this.e.xc&&this.xhrCompleted()},onleaveXhrPending:function(f,i,h){if("abort"===f){return this.Pa(),!0}if("xhrCompleted"===f&&"End"===h){if(this.e.If()){return !1}this.e.markXhrRequestsCompleted();return !0}},onEnd:function(){this.e.Te();this.Ig()},oninit:function(h,k,j,i){this.Ng(i)},onlocChange:function(h,k,j,i){this.e.identifier.url=i},onbeforeXhrReq:function(l,i,k,j){var h=this.e;h.xc=!1;c.log("M58",j&&j[1]||"",h.guid());h.Of();h.startCorrelatingXhrs();j[3]&&(j[3]=c.aop.before(j[3],function(n,f,m){c.log("M59");h.df();m&&(n=c.utils.Ag(m)["content-type"])&&0<=n.indexOf("text/html")&&h.markViewFragmentsLoaded()}));return j},onafterXhrReq:function(){this.e.stopCorrelatingXhrs()}}},e.prototype)})(c.ng||(c.ng={}))})(b||(b={}));(function(c){(function(g){var e=function(){function d(){this.k=new g.VirtualPageStateMachine;this.distinguishVPwithItsTemplateUrl=c.ng.conf.distinguishVPwithItsTemplateUrl}d.prototype.h=function(h,j){c.log("M60",h);switch(h){case g.c.Wc:case g.c.dd:this.k.start();var i=new g.NgVPageView({url:j.next.url,identifier:j.next});this.distinguishVPwithItsTemplateUrl&&d.Wf(this.k.e,i)?this.k.e.$c({url:j.next.url,identifier:j.next}):this.Xg(i);break;case g.c.Xc:case g.c.ed:this.k.e.markViewChangeEnd();break;case g.c.nd:this.k.viewLoaded();break;case g.c.Rb:this.k.beforeXhrReq(j);break;case g.c.Jb:this.k.afterXhrReq();break;case g.c.Ub:this.k.xhrCompleted();break;case g.c.Dc:this.k.locChange(j.next.url);break;case g.c.Yb:this.k.e.Nf()}};d.prototype.Xg=function(f){this.k.abort();this.k.init(f);this.k.start()};d.Wf=function(k,j){var l=k.identifier(),i=j.identifier(),h=!1;return h=!c.utils.isDefined(l)&&!c.utils.isDefined(i)||l===i?!0:c.utils.isDefined(l)&&c.utils.isDefined(i)?l.state||i.state?c.utils.isDefined(l.state)&&c.utils.isDefined(i.state)?l.state.name===i.state.name&&l.state.Y===i.state.Y&&l.state.Z===i.state.Z&&l.state.url===i.state.url:!1:l.g&&i.g?l.g.La===i.g.La&&l.g.Y===i.g.Y&&l.g.Z===i.g.Z:l.url===i.url:!1};return d}();g.Fe=e})(c.ng||(c.ng={}))})(b||(b={}));(function(c){(function(g){var e=function(){function d(){this.j=new g.Fe}d.prototype.setUp=function(){var f=this;c.utils.addEventListener(document,"DOMContentLoaded",function(){c.log("M61");f.init()})};d.prototype.init=function(){if("undefined"!=typeof angular){c.log("M62");var h=this,f=angular.module("ng");f.config(["$provide",function(i){h.Tf(i);h.Sf(i)}]);f.run(["$browser",function(i){h.Rf(i)}]);c.log("M63")}};d.prototype.Sf=function(f){var h=c.aop,i=this;f.decorator("$httpBackend",["$delegate",function(j){return j=h.around(j,function(){var k=Array.prototype.slice.call(arguments);i.j.h(g.c.Rb,k);return k},function(){i.j.h(g.c.Jb)})}])};d.prototype.Tf=function(f){var h=c.aop,i=this;f.decorator("$rootScope",["$delegate",function(j){j.$digest=h.after(j.$digest,function(){i.j.h(g.c.Yb)});j.$on("$locationChangeStart",function(l,k){var n={url:k},m=l&&l.W&&l.W.$state&&l.W.$state.current;m&&(n.state=m);i.j.h(g.c.Dc,{next:n})});j.$on("$locationChangeSuccess",function(){i.j.h(g.c.jg)});j.$on("$routeChangeStart",function(l,k){var n={url:location.href},m=k&&k.$$route;m&&(n.g=m);i.j.h(g.c.Wc,{next:n})});j.$on("$routeChangeSuccess",function(){i.j.h(g.c.Xc)});j.$on("$stateChangeStart",function(l,k){i.j.h(g.c.dd,{next:{state:k}})});j.$on("$stateChangeSuccess",function(){i.j.h(g.c.ed)});j.$on("$viewContentLoaded",function(l){var k={url:location.href};if(l=l&&l.W&&l.W.$state&&l.W.$state.current){k.state=l}i.j.h(g.c.nd,{next:k})});j.$on("$includeContentRequested",function(){i.j.h(g.c.Mf)});j.$on("$includeContentLoaded",function(){i.j.h(g.c.Lf)});return j}])};d.prototype.Rf=function(f){var h=this;f.$$completeOutstandingRequest=c.aop.before(f.$$completeOutstandingRequest,function(){h.j.h(g.c.Ub)})};return d}();g.nh=e;g.ngMonitor=new e})(c.ng||(c.ng={}))})(b||(b={}));(function(c){var e=c.ng||(c.ng={});e.conf.disabled||c.monitor.ad(e.ngMonitor)})(b||(b={}))}}})();