var s_account="nyacdev";
var s_isMobile=false;


if (typeof AnalyticsDataLayer=='object') {
  if (AnalyticsDataLayer.devicetype=="mobile") {
    s_account='nyacmobiledev';
    s_isMobile=true;
  }
}


var s=new AppMeasurement();
s.account=s_account;

// copy local s obect to global s object
if (window.t_s) {
  for (var k in window.t_s) {
    if (window.t_s.hasOwnProperty(k)) {
      s[k] = window.t_s[k];
    }
  }
}


s.isMobile=s_isMobile;
s.prop23="DTM:AM:2016.11.15|ACR:JDL"; // last update
s.dynamicAccountSelection = true;
s.dynamicAccountList = 'nyacdev=sit.nyandcompany.com;nyacdev2=uat.nyandcompany.com;nyacprod=www.nyandcompany.com;nyacprod=prod10.nyandcompany.com';
s.debugTracking=false;
s.charSet = "UTF-8";
s.currencyCode = "USD";

/* Link and ClickMap tracking */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes="exe,zip,wav,mp3,mp4,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkInternalFilters="nyandcompany.com,richrelevance.com";
s.linkLeaveQueryString=false;
s.linkTrackVars="";
s.linkTrackEvents="";

/* Channel Manager Config */
s._channelDomain='Social Media Organic|facebook.com,flickr.com,twitter.com,youtube.com,myspace.com,blogspot.com,pinterest.com,plus.google.com,wordpress.com,tumblr.com,t.co>';
s._channelPattern="Partnerships|crm_>Partnerships|pr_>Email|em>Affiliates|afl>Affiliates|aff_>Display|dis>Display|dsp_>Social Networks|soc>Comparison Shopping|cse>Social Media|sm_>Paid Search|PS>Paid Search|sem_>Google Catalog|org_feed";

s.usePlugins=true
function s_doPlugins(s)
{
  s.account=s.dynamicAccountPlugin();
  s.dynamicVariablePrefix="D=";

  s.plugins = "x";

  /* marin integration */
  if(!s.eVar69)s.eVar69=s.getQueryParam("KW_ID");
  s.eVar69=s.getValOnce(s.eVar69,"s_v69",0);

  /* temp bandaid: camelCase prodView */
  if (!s.events) s.events = '';
  s.events=s.events.replace("prodview","prodView");



    /* Add calls to plugins here */
    /* Instantiate s.events */
    s.events=s.events?s.events:"";

    /* Get the campaign variable and call channel manager*/
    var ep_rid;
    if (s.getQueryParam("om_rid"))
        ep_rid = s.getQueryParam("om_rid")
    else if (s.getQueryParam("ep_rid"))
        ep_rid = s.getQueryParam("ep_rid")

    var ep_mid;
    if (s.getQueryParam("om_mid"))
        ep_mid = s.getQueryParam("om_mid")
    else if (s.getQueryParam("ep_mid"))
        ep_mid = s.getQueryParam("ep_mid")

    var sssdmh = s.getQueryParam ("sssdmh");
    var cid = s.getQueryParam ('cid');

    s.channelManager('cid','','c_m','','','');
    s.campaign=s._campaign;
    s.eVar39=s._channel;

      if(ep_rid){
        /* s.channelManager('ep_rid','','c_m','0','','1');*/
        s._campaign=s.campaign=ep_rid;
        s._channel="Email";
    }

    if(ep_mid){
        /*s.channelManager('ep_mid','','c_m','0','','1'); */
        s._campaign=s.campaign=ep_mid;
        s._channel="Email";
    }

    if(!s.campaign && sssdmh)
        s.channelManager('sssdmh','','c_m','0','','1');

    s.campaign=s.getValOnce(s.campaign,"s_campaign",0);

    /* Get Channel With ChannelManager*/
    s.eVar39=s._channel;

    if(s.eVar39)
        s.eVar49=s.eVar50=s.eVar51=s.eVar39;

    s.eVar40=s.crossVisitParticipation(s.eVar39,'s_ev40','7','10','>','purchase',1);

    /* Capture Email ID*/
    //epsilon
    if(!s.eVar10)
        s.eVar10=s.getQueryParam("ep_mid");
    if(!s.eVar19)
        s.eVar19=s.getQueryParam("ep_rid");

    //cheetahmail
    if(!s.eVar52)
        s.eVar52=s.getQueryParam("om_mid");
    if(!s.eVar53)
        s.eVar53=s.getQueryParam("om_rid");


    /* Set external campaign landing page*/
    if(s.campaign)
        s.eVar23 = s.pageName;

    /* Cross Visit Participation plugin*/
    s.eVar24=s.crossVisitParticipation(s.campaign,'s_ev24','30','5','>','purchase',1);
    if(s.eVar24)
        s.eVar25=s.crossVisitParticipation(s.getDaysSinceLastVisit('s_lv'),'s_ev25','30','5','>','purchase',1);

/****************************************************************/
    //Determine bounce rate for all visits
    s.visitstart=s.getVisitStart('s_vs');
    if(s.visitstart&&s.visitstart==1)
    {
        s.firstPage='firstpage';
    }
    s.clickPast(s.firstPage,'event22','event23');

       /* bandaid: suppress pageName on s.tl calls (done in s.track function) */
       s.prop7=s.getPreviousValue(s.pageName,'gpv','');

    /* Determine Search Location, Add-to-Cart Location and Percentage of Page Viewed via previous page name

    if(s.events&&s.events.indexOf('scAdd')>-1)
    {
        s.linkTrackVars=s.apl(s.linkTrackVars,'eVar6',',',2);
        if(s.prop7)
            s.eVar6=s.prop7;
    } */
    //if (s.prop7)
    //    s.prop8=s.getPercentPageViewed();

    /* Automate Campaign Tracking Code Extraction based on the cid parameter
    if(!s.campaign){
        s.campaign=s.getQueryParam('cid');
        s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
    } */

    /* Automate Internal Campaign Code Extraction based on icid parameter*/
    if(!s.eVar5)
        s.eVar5=s.getQueryParam('intcmp,icid','&');
    if(s.eVar5){
        s.eVar5=s.eVar59=s.getValOnce(s.eVar5,'s_ev5',0);
        s.eVar22=s.pageName;
                s.eVar60=s.crossVisitParticipation(s.eVar5,'s_cvp_v5','365','15','>','',0);
    }

    s.prop1 = s.getValOnce(s.prop1, 's_stv', 0);

    /* Automate Search Events */
    if(s.prop1)
    {
        s.eVar1=s.prop1;
        s.events=s.apl(s.events,'event1',',',2);
        if(s.prop2&&(s.prop2=='0'||s.prop2=='zero'))
        {
            s.prop2='zero';
            s.events=s.apl(s.events,'event19',',',2);
        }
        if(!s.products)
        {
            if(!s.c_r('productnum'))
                s.productNum=1;
            else
                s.productNum=parseInt(s.c_r('productnum'))+1;
            //s.products=';productsearch' + s.productNum;
            var e=new Date();
            ct=e.getTime();
            e.setTime(ct+30*86400000);
            s.c_w('productnum',s.productNum,e);
        }
    } else {
        var a=s.split(s.events,',');
        var e='';
        for(var i = 0; i < a.length ; i++ )
        {
            if(a[i]=='event1'||a[i]=='event19')
                continue;
            else
                e += a[i]?a[i]+',':a[i];
        }
        s.events=e.substring(0,e.length-1);
        s.eVar1 = s.prop2 = '';
    }

    if(s.c_r('productnum')&&s.events.indexOf('purchase')>-1)
        s.c_w('productnum','0',0);

    if(s.eVar1 && s.prop7)
        s.prop5=s.prop7;


    /* Automate Custom ProdView Event */
    if(s.events&&s.events.toLowerCase().indexOf('prodview')>-1)
        s.events=s.apl(s.events,'event15',',',2);

    /*  Automate OrderID eVar */
    if(s.purchaseID){
        s.eVar11 = s.purchaseID;
        s.eVar11 = s.getValOnce(s.purchaseID,"s_ppid",0)
    }

    /* Determine whether visitor is New or a Repeat visitor within the last 365 days */
    s.eVar29=s.getNewRepeat(365);

    /* Do not delete, this is for NY&CO to use the extCmp cookie value to control their marketing channel code firing on their side */
    if(s.getQueryParam('cid'))
        var lca = 'cid|'+s.getQueryParam('cid'); //lca - last click attribution
    if(ep_mid)
        var lca = 'ep_mid|'+ep_mid;

    if(s.eVar39 && s.eVar39.toLowerCase()=='natural search')
        var lca = 'natural search';

    s.getAndPersistValue(lca,"extCmp",7);

  /* bandaid: round product rating to nearest 10th */
  if(s.eVar42&&s.eVar42!='no rating') s.eVar42=String(Math.round(10*Number(s.eVar42))/10);

  /* //phase 2, leave off for now
    if(s.prop14 && !s.eVar31) s.eVar31=s.prop14;
    if(s.prop15 && !s.eVar32) s.eVar32=s.prop15;
    if(s.prop16 && !s.eVar33) s.eVar33=s.prop16;
    if(s.prop17 && !s.eVar34) s.eVar34=s.prop17;
    if(s.prop18 && !s.eVar35) s.eVar35=s.prop18;
    if(s.prop19 && !s.eVar36) s.eVar36=s.prop19;
    if(s.prop20 && !s.eVar37) s.eVar37=s.prop20;
*/

    //time parting
    s.eVar30=s.getTimeParting('d','-5') + ' - ' + s.getTimeParting('h','-5');

    //Blank out products if events isn't set so that we don't inflate prodViews
    if(s.products&&!s.events)
        s.products='';

    //Lowercase all variables except for the events variable
    s.manageVars('lowercaseVars','events',2)

    //track Test & target
    s.tnt=s.trackTNT();


/* sc imp type */
  var platform = s.isMobile?'mobile':'desktop/tablet';
  s.linkTrackVars=s.apl(s.linkTrackVars,'eVar43,prop22',',',2);
  s.prop22="new site (dev): "+platform;
  if ( s.inList('nyacprod',s.account,',',':') ) {
    s.prop22="new site: "+platform;
  }
  s.eVar43=s.prop22;

  s.server=document.domain;
  s.eVar2="D=pageName";
  if (s.prop7) s.eVar13="D=c7";

  s.pageName=s.pageName||'';
  s.hier1=s.pageName.replace(/:/g,',');

  /* Link Tracking */

  if (s.linkObject&&s.linkType&&s.linkURL) {
     switch (s.linkType) {
      case 'd':
	      s.linkTrackVars=s.apl(s.linkTrackVars,'events',',',2);
          s.linkTrackVars=s.apl(s.linkTrackVars,'eVar54',',',2);
          s.linkTrackEvents = s.apl(s.linkTrackEvents,'event54',',',2);
          s.events = s.apl(s.events,'event54',',',2);
          s.eVar54 = 'DOWNLOAD|'+s.linkURL;
      break;
      case 'e':
          s.linkTrackVars=s.apl(s.linkTrackVars,'events',',',2);
          s.linkTrackVars=s.apl(s.linkTrackVars,'eVar54',',',2);
          s.linkTrackEvents = s.apl(s.linkTrackEvents,'event54',',',2);
          s.events = s.apl(s.events,'event54',',',2);
          s.eVar54 = 'EXIT|'+s.linkURL;
      break;
    }
  }


  /* time since last purchase */
  s.eVar41 = s.timeSinceLastEvent('purchase','s_tsle_p',365);

  s.linkTrackVars=s.apl(s.linkTrackVars,'eVar15',',',2);
  s.linkTrackVars=s.apl(s.linkTrackVars,'prop23',',',2);
  s.linkTrackVars=s.apl(s.linkTrackVars,'prop22',',',2);
  s.linkTrackVars=s.apl(s.linkTrackVars,'eVar2',',',2);
  s.linkTrackVars=s.apl(s.linkTrackVars,'server',',',2);
  s.linkTrackVars=s.apl(s.linkTrackVars,'hier2',',',2);


/* integrate sc to tnt */
  if (!s.isMobile) {
    if ( s.inList('purchase',s.events,',',':') ) {
      if(typeof(mboxLoadSCPlugin) == "function") mboxLoadSCPlugin(s);
    }
  }

/* bandaid: force events lowercase since event serialization isn't consistently cased */
  if (s.events) s.events=s.events.toLowerCase();


/* well.. okay so the bandaid to just lowercase events because of serialization
   seems to be having adverse side effects on camel-cased events vs. s.tl tracking
   so here's another bandaid to hump them again */
var n_vars = {
  'scopen':'scOpen',
  'scview':'scView',
  'scadd':'scAdd',
  'scremove':'scRemove',
  'sccheckout':'scCheckout',
  'prodview':'prodView'
}
for (var nv in n_vars) {
  if (s.inList(nv,s.events,',',':')) {
    s.events=s.events.replace(nv,n_vars[nv]);
  }
  if (s.inList(nv,s.linkTrackEvents,',',':')) {
    s.linkTrackEvents=s.linkTrackEvents.replace(nv,n_vars[nv]);
  }
}

  /*
    bandaid: strip bad commas from products string
    assumption is cat slot never used so valid commas
    should always be followed by a semicolon
   */
  if (s.products) {
    s.products=s.products.replace(/,(?!;)/g,'');
  }

  /* QA */
  if (s.events) {
    s.eVar72 = s.events;
    if (s.linkType)  s.linkTrackVars=s.apl(s.linkTrackVars,'eVar72',',',2);
  }
  s.prop70 = s.eVar70 = "D=g";
  s.linkTrackVars=s.apl(s.linkTrackVars,'prop70,eVar70',',',2);
  if (s.purchaseID) s.prop71 = s.purchaseID;
  s.linkTrackVars=s.apl(s.linkTrackVars,'prop71',',',2);
  s.prop72 = String(new Date());
  s.linkTrackVars=s.apl(s.linkTrackVars,'prop72',',',2);
  if (s.products) {
    s.eVar71=s.products;
    s.linkTrackVars=s.apl(s.linkTrackVars,'eVar71',',',2);
  }

  if (!s.linkType) s.eVar57='+1';


} // end s_doPlugins
s.doPlugins=s_doPlugins


/************************** CONVENIENCE FUNCTIONS *************************/
/*
** Plugin: track - general tracking callback function
** ACR.josh 02.07.11
**
*/
s.track = function (params,tt,ld) {
  try { console.log("OMN: s.track: ", arguments); } catch(e) {}

  if (arguments[1]&&arguments[1].match(/^tl_/)) {
    var t_ltv = s.linkTrackVars;
    var t_lte = s.linkTrackEvents;
    if (typeof(arguments[2]) == 'undefined' || arguments[2] == '') var ld = 'no value';
    for(var j in params) {
      if(params.hasOwnProperty(j)) {
        if (j=='pageName') continue;
        s.linkTrackVars = s.apl(s.linkTrackVars,j,',',2);
        if (j=='events') {
          params[j]=String(params[j]);
          var k = params[j].split(',');
          for (var c = 0; c<k.length; c++) {
            var te = k[c].split(/:|=/)[0];
            s.linkTrackEvents = s.apl(s.linkTrackEvents,te,',',2);
          }
        }
        s[j] = params[j];
      } // end if
    } // end for j
    var lt = arguments[1].split('_')[1] || 'o';
    if (!s.inList(lt,'e,d,o', ',')) lt = 'o';
    s.tl(true,lt,ld);
    s.linkTrackVars = t_ltv;
    s.linkTrackEvents = t_lte;
  } else {
    var named = ['campaign','channel','charSet','currencyCode','events','pageName','pageType','pageURL','products','purchaseID','referrer','server','state','TnT','transactionID','visitorID','zip'];
    for(var n=0,l=named.length;n<l;n++) {
      if(typeof s[named[n]] != 'undefined') delete s[named[n]];
    }
    for(n=1;n<=100;n++) {
      if(typeof s['hier'+n] != 'undefined') delete s['hier'+n];
      if(typeof s['eVar'+n] != 'undefined') delete s['eVar'+n];
      if(typeof s['prop'+n] != 'undefined') delete s['prop'+n];
    }
    s.events = '';
    for(var j in params) {
      if(params.hasOwnProperty(j)) {
        s[j] = params[j];
      } // end if
    } // end for j
    s.t();
  } // end else
} // end s.track

/*
 * Utility: inList v1.0 - find out if a value is in a list
 * MODIFIED BY: Acronym 2012.11.09
 * Now Accepts optional 4th arg for sub-delimiter to account for serialized events
 */
s.inList= function(v,l,D,d) {
  var s=this,ar=Array(),i=0,D=(D)?D:',',d=(d)?String(d):'';
  if((typeof(l)!='undefined')&&((typeof(l)=='string')||(l instanceof String))){
    if(s.split) {
      ar=s.split(l,D);
    } else if(l.split) {
      ar=l.split(D);
    } else {
      return -1;
    }
  } else if ((typeof(l)!='undefined')&&((typeof(l)=='array')||(l instanceof Array))) {
    ar=l;
  }    else {
    return false;
  }
  while(i<ar.length){
    if(v==((d&&((typeof(ar[i])=='string')||(ar[i] instanceof String)))?ar[i].split(d)[0]:ar[i]))
      return true;i++
  }
  return false;
}


/**
 * Plugin: getTimeDifference
 * ACR.josh 2013.08.15
 * @param  str  b start timestamp
 * @param  str  e end timestamp
 * @param  bool r round hours/mins up or down. default down.
 * @return str [days]:[hours]:[minutes] diff between b and e
**/
s.getTimeDifference=new Function("b","e","r",""
+"var r=(r)?true:false;var t=new Date();t.setTime(e-b);td=t.getTime()"
+";var d=Math.floor(td/86400000);td-=d*86400000;var h=Math.floor(td/3"
+"600000);td-=h*3600000;var m=Math.ceil(td/60000);if(h>0){if(m>0){if("
+"r)h++;m=0;}}if(d>0){if((h>0)||(m>0)){if(r)d++;h=0;m=0;}}return d+':"
+"'+h+':'+m;");
// end getTimeDifference

/**
 * Plugin: timeSinceLastEvent
 * ACR.josh 2013.08.15
 * @depend getTimeDifference, inList
 * @param  str  e the event to base time since on
 * @param  str  c cookie to store timestamps. default s_tsle
 * @param  int  d cookie expiration, in days. defaults to session
 * @param  str  f first time value. defaults to "first [e]"
 * @param  bool r round hours/mins up or down. default down.
 * @return str '' if !e || str [days]:[hours]:[minutes] since last e
**/
s.timeSinceLastEvent=new Function("e","c","d","f","r",""
+"var s=this,x='',cv='',v='';var c=c||'s_tsle';var r=(r)?true:false;v"
+"ar ev=s.events||'';var t=(new Date()).getTime();var d=(d)?Number(d)"
+":false;if(typeof e=='undefined')return '';var f=(f)?f:'first '+e;if"
+"(s.inList(e,ev,',',':')){if(d){x=new Date;x.setTime(x.getTime()+100"
+"0*60*60*24*d);}cv=s.c_r(c);v=(!cv)?f:s.getTimeDifference(cv,t,r);s."
+"c_w(c,t,x);}return v;");
// end daysSinceLastEvent


/*** START addthis tracking ***/
// callback function to be called on addthis click event
function s_shareEventHandler(evt) {
  try {
    console.log('OMN: s_shareEventHandler called: ',evt);
    var url = 'unknown';
        var shareType = 'unknown';

    // current addthis (evt is an object)
    if ( typeof(addthis)=='object' ) {
      if (evt.type == 'addthis.menu.share') {
        console.log("OMN: addthis (current): ", evt);
        /*
                  evt.data.service - the social media type (e.g. gmail, tumblr)
                    evt.data.url - the url of the page
                */
        url=String(evt.data.url||url).toLowerCase();
        shareType=String(evt.data.service||shareType).toLowerCase();
      }

    // legacy addthis (evt is string)
    } else {
      console.log("OMN: addthis (legacy): ", evt);
      /*
              evt - the social media type (e.g. gmail, tumblr)
            */
      url=String(location.href||url).toLowerCase();
      shareType=String(evt||shareType).toLowerCase();
    }

    /*
           pop omn vars and s.tl here
           url : the url of the page being shared
             shareType : the social media type (e.g. gmail, tumblr)
        */
    var payload = {
      'events' : 'event55',
      'eVar55' : (shareType+'|'+url)
    }
    s.track(payload,'tl_o','share tracking');

  } catch(e) { console.log("OMN: "+e); }
} // end s_shareEventHandler
// wrapper for attaching addthis event listener
function s_attachAddthisListener() {
  try {
    if (!s_attachAddthisListener.attempts) s_attachAddthisListener.attempts = 1;
    var attempts = 5;
    console.log('OMN: addthis object listener attempt',s_attachAddthisListener.attempts);
    if (s_attachAddthisListener.attempts < attempts) {
      // if current addthis version...
      if ( typeof(addthis)=='object' ) {
        addthis.addEventListener('addthis.menu.share', s_shareEventHandler);
        console.log("OMN: addthis object listener added");
      } else {
        // look for and attempt to piggyback off previous addthis version
        if ( typeof(addthis_sendto)=='function' ) {
          var o_addthis_sendto = addthis_sendto;
          var addthis_sendto = function () {
              s_shareEventHandler(arguments[0]);
              o_addthis_sendto.apply(this, arguments);
            }
          console.log("OMN: addthis legacy function appended");
        } else {
          s_attachAddthisListener.attempts++;
          window.setTimeout('s_attachAddthisListener()',1000);
        }
      } // end else
    } // end if attempts
    else {
      console.log("OMN: no addthis widget detected");
    }
  } catch (e) {
      console.log('OMN: ',error);
  }
} // end s_attachAddthisListener
/* attempt to attach addthis listener */
try {
  if( typeof(console)=='undefined' ) console = { log:function(){} }
  if (!s.isMobile) {
    s_attachAddthisListener();
  }
} catch(error) { console.log("OMN: ",error); }
/*** END addthis tracking ***/

/************************** END CONVENIENCE FUNCTIONS *************************/



/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

s.wd = s.w;
/*
 * Cookie Combining Utility v.5
 */
if(!s.__ccucr)
{
    s.c_rr = s.c_r;
    s.__ccucr = true;
    function c_r(k)
    {
        var s = this, d = new Date, v = s.c_rr(k), c = s.c_rspers(), i, m, e;
        if(v) return v; k = s.escape ? s.escape(k) : encodeURIComponent(k);
        i = c.indexOf(' ' + k + '='); c = i < 0 ? s.c_rr('s_sess') : c;
        i = c.indexOf(' ' + k + '='); m = i < 0 ? i : c.indexOf('|', i);
        e = i < 0 ? i : c.indexOf(';', i); m = m > 0 ? m : e;
        v = i < 0 ? '' : s.unescape ? s.unescape(c.substring(i + 2 + k.length, m < 0 ? c.length : m)) : decodeURIComponent(c.substring(i + 2 + k.length, m < 0 ? c.length : m));
        return v;
    }
    function c_rspers()
    {
        var s = this, cv = s.c_rr("s_pers"), date = new Date().getTime(), expd = null, cvarr = [], vcv = "";
        if(!cv) return vcv; cvarr = cv.split(";"); for(var i = 0, l = cvarr.length; i < l; i++)    { expd = cvarr[i].match(/\|([0-9]+)$/);
        if(expd && parseInt(expd[1]) >= date) { vcv += cvarr[i] + ";"; } } return vcv;
    }
    s.c_rspers = c_rspers;
    s.c_r = s.cookieRead = c_r;
}
if(!s.__ccucw)
{
    s.c_wr = s.c_w;
    s.__ccucw = true;
    function c_w(k, v, e)
    {
        var s = this, d = new Date, ht = 0, pn = 's_pers', sn = 's_sess', pc = 0, sc = 0, pv, sv, c, i, t, f;
        d.setTime(d.getTime() - 60000); if(s.c_rr(k)) s.c_wr(k, '', d); k = s.escape ? s.escape(k) : encodeURIComponent(k);
        pv = s.c_rspers(); i = pv.indexOf(' ' + k + '='); if(i > -1) { pv = pv.substring(0, i) + pv.substring(pv.indexOf(';', i) + 1); pc = 1; }
        sv = s.c_rr(sn); i = sv.indexOf(' ' + k + '='); if(i > -1) { sv = sv.substring(0, i) + sv.substring(sv.indexOf(';', i) + 1);
        sc = 1; } d = new Date; if(e) { if(e == 1) e = new Date, f = e.getYear(), e.setYear(f + 5 + (f < 1900 ? 1900 : 0));
        if(e.getTime() > d.getTime()) {  pv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIComponent(v)) + '|' + e.getTime() + ';';
        pc = 1; } } else { sv += ' ' + k + '=' + (s.escape ? s.escape(v) : encodeURIComponent(v)) + ';';
        sc = 1; } sv = sv.replace(/%00/g, ''); pv = pv.replace(/%00/g, ''); if(sc) s.c_wr(sn, sv, 0);
        if(pc) { t = pv; while(t && t.indexOf(';') != -1) { var t1 = parseInt(t.substring(t.indexOf('|') + 1, t.indexOf(';')));
        t = t.substring(t.indexOf(';') + 1); ht = ht < t1 ? t1 : ht; } d.setTime(ht); s.c_wr(pn, pv, d); }
        return v == s.c_r(s.unescape ? s.unescape(k) : decodeURIComponent(k));
    }
    s.c_w = s.cookieWrite = c_w;
}

/*
 * Plugin Utility: Replace v1.0
 */
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 * variable
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
* Plugin: getPercentPageViewed v1.4
*/
/*
s.handlePPVevents=new Function("",""
+"if(!s.getPPVid)return;var dh=Math.max(Math.max(s.d.body.scrollHeigh"
+"t,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight,"
+"s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s."
+"d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documen"
+"tElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||"
+"(s.wd.document.documentElement.scrollTop||s.wd.document.body.scroll"
+"Top),vh=st+vph,pv=Math.min(Math.round(vh/dh*100),100),c=s.c_r('s_pp"
+"v'),a=(c.indexOf(',')>-1)?c.split(',',4):[],id=(a.length>0)?(a[0]):"
+"escape(s.getPPVid),cv=(a.length>1)?parseInt(a[1]):(0),p0=(a.length>"
+"2)?parseInt(a[2]):(pv),cy=(a.length>3)?parseInt(a[3]):(0),cn=(pv>0)"
+"?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy)?vh:cy)):'';s.c_w('s_pp"
+"v',cn);");
s.getPercentPageViewed=new Function("pid",""
+"pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.l"
+"inkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'"
+"),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i="
+"3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape("
+"a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid"
+"=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('"
+"s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventL"
+"istener('load',s.handlePPVevents,false);s.wd.addEventListener('scro"
+"ll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handl"
+"ePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onlo"
+"ad',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevent"
+"s);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-'"
+")?(a):(a[1]);");
*/


/*
 * Plugin: getQueryParam (legacy support)
 * Modified for AM compatibility just in case someone out there is
 * using it. note: the real legacy plugin is case-insensitive
 * for params. AM Util version is case-sensitive!
 */
s.getQueryParam=function(p,d,u) {
  var s=this;
  var a,c,l,v=[];
  var p=p||'';
  var d=d||'';
  var u=u||'';
  p=p.split(',');
  for (c=0,l=p.length;c<l;c++) {
    a=s.Util.getQueryParam(p[c],u);
    if(a) v.push(a);
  }
  return v.join(d);
} // end getQueryParam (legacy support)

/* Required for manageVars */
s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''}

/*
 * Utility manageVars v0.25 - clear variable values (requires split 1.5)
*/
s.manageVars=new Function("c","l","f",""
+"var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa"
+"geName,purchaseID,channel,server,pageType,campaign,state,zip,events"
+",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar"
+"'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl"
+"it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l"
+"a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}"
+"}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0"
+");return true;}else{return false;}");
s.clearVars=new Function("t","var s=this;s[t]='';");
s.lowercaseVars=new Function("t",""
+"var s=this;if(s[t]){s[t]=s[t].toString();if(!s[t].indexOf('D=')==0)"
+"{s[t]=s[t].toLowerCase();}}");
 /*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");
/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");
/*
 *    Plug-in: crossVisitParticipation v1.7 - stacks values from
 *    specified variable in cookie and returns value
 */
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");
/*
 * Plugin: Days since last Visit 1.0.H - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),c='s_lastvisit',day=24*"
+"60*60*1000;e.setTime(ct+3*365*day);cval=s.c_r(c);if(!cval){s.c_w(c,"
+"ct,e);return 'First page view or cookies not supported';}else{var d"
+"=ct-cval;if(d>30*60*1000){if(d>30*day){s.c_w(c,ct,e);return 'More t"
+"han 30 days';}if(d<30*day+1 && d>7*day){s.c_w(c,ct,e);return 'More "
+"than 7 days';}if(d<7*day+1 && d>day){s.c_w(c,ct,e);return 'Less tha"
+"n 7 days';}if(d<day+1){s.c_w(c,ct,e);return 'Less than 1 day';}}els"
+"e return '';}"
);
/*
 * Plugin: getTimeParting 2.0
 */
s.getTimeParting=new Function("t","z","y","l",""
+"var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+"tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+"|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
+"=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+"g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+"=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+"a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+" Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+"etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+"nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+"Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+"00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"
+"||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"
+"le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
+"eturn A}}else{return Z+', '+W}}}");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue=new Function("v","c","e",""
+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+"v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
* TNT Integration Plugin v1.0
*/
s.trackTNT =new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");
/*
 * channelManager v2.85AM - Tracking External Traffic
 */
s.channelManager=new Function("a","b","c","d","e","f","g",""
+"var s=this,h=new Date,i=0,j,k,l,m,n,o,p,q,r,t,u,v,w,x,y,z,A,B,C,D,E"
+",F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T;h.setTime(h.getTime()+1800000);if(e)"
+"{i=1;if(s.c_r(e))i=0;if(!s.c_w(e,1,h))s.c_w(e,1,0);if(!s.c_r(e))i=0"
+";if(f&&s.c_r('s_tbm'+f))i=0;}j=s.referrer?s.referrer:document.refer"
+"rer;j=unescape(j.toLowerCase());if(!j)k=1;else {l=j.indexOf('?')>-1"
+"?j.indexOf('?'):j.length;m=j.substring(0,l);n=s.split(j,'/');n=s.sp"
+"lit(n[2],'?');o=n[0].toLowerCase();p=s.linkInternalFilters.toLowerC"
+"ase();p=s.split(p,',');for(q=0;q<p.length;q++){r=o.indexOf(p[q])==-"
+"1?'':j;if(r)break;}}if(!r&&!k){t=j;u=v=o;w='Other Natural Referrers"
+"';x=s.seList+'>'+s._extraSearchEngines;if(d==1){m=s.replace(m,'oogl"
+"e','%');m=s.replace(m,'ahoo','^');j=s.replace(j,'as_q','*');}y=s.sp"
+"lit(x,'>');for(z=0;z<y.length;z++){A=y[z];A=s.split(A,'|');B=s.spli"
+"t(A[0],',');for(C=0;C<B.length;C++){D=m.indexOf(B[C]);if(D>-1){if(A"
+"[2])E=v=A[2];else E=o;if(d==1){E=s.replace(E,'#',' - ');j=s.replace"
+"(j,'*','as_q');E=s.replace(E,'^','ahoo');E=s.replace(E,'%','oogle')"
+";}F=s.split(A[1],',');for(G=0;G<F.length;G++){if(j.indexOf(F[G]+'='"
+")>-1||j.indexOf('https://www.google.')==0||j.indexOf('http://r.sear"
+"ch.yahoo.com')==0)H=1;I=s.Util.getQueryParam(F[G],j).toLowerCase();"
+"if(H||I)break;}}if(H||I)break;}if(H||I)break;}}if(!r||g!='1'){J=s.s"
+"plit(a,',');K=0;while(!T&&K<J.length){T=s.Util.getQueryParam(J[K],'"
+"',b);K++;}if(T){v=T;if(E)w='Paid Search';else w='Unknown Paid Chann"
+"el';}if(!T&&E&&H){v=E;w='Natural Search';}}if(i&&k&&!T)t=u=v=w='Typ"
+"ed/Bookmarked';J=s._channelDomain;if(J&&o&&!r){K=s.split(J,'>');for"
+"(L=0;L<K.length;L++){M=s.split(K[L],'|');N=s.split(M[1],',');O=N.le"
+"ngth;for(P=0;P<O;P++){Q=N[P].toLowerCase();R=o.indexOf(Q);if(R>-1){"
+"w=M[0];break;}}if(R>-1)break;}}J=s._channelParameter;if(J){K=s.spli"
+"t(J,'>');for(L=0;L<K.length;L++){M=s.split(K[L],'|');N=s.split(M[1]"
+",',');O=N.length;for(P=0;P<O;P++){R=s.Util.getQueryParam(N[P]);if(R"
+"){w=M[0];break;}}if(R)break;}}J=s._channelPattern;if(J){K=s.split(J"
+",'>');for(L=0;L<K.length;L++){M=s.split(K[L],'|');N=s.split(M[1],',"
+"');O=N.length;for(P=0;P<O;P++){Q=N[P].toLowerCase();R=T.toLowerCase"
+"();S=R.indexOf(Q);if(S==0){w=M[0];break;}}if(S==0)break;}}S=w?T+u+w"
+"+I:'';c=c?c:'c_m';if(c!='0')S=s.getValOnce(S,c,0);if(S){s._campaign"
+"ID=T?T:'n/a';s._referrer=t?t:'n/a';s._referringDomain=u?u:'n/a';s._"
+"campaign=v?v:'n/a';s._channel=w?w:'n/a';s._partner=E?E:'n/a';s._key"
+"words=H?I?I:'Keyword Unavailable':'n/a';if(f&&w!='Typed/Bookmarked'"
+"){h.setTime(h.getTime()+f*86400000);s.c_w('s_tbm'+f,1,h);}}else s._"
+"campaignID=s._referrer=s._referringDomain=s._campaign=s._channel=s."
+"_partner=s._keywords='';");
/* Top 130 - Grouped */
s.seList="google.,googlesyndication.com,.googleadservices.com|q,as_q|"
+"Google>bing.com|q|Bing>yahoo.com,yahoo.co.jp|p,va|Yahoo!>ask.jp,ask"
+".co|q,ask|Ask>.aol.,suche.aolsvc.de|q,query|AOL>altavista.co,altavi"
+"sta.de|q,r|AltaVista>.mywebsearch.com|searchfor|MyWebSearch>webcraw"
+"ler.com|q|WebCrawler>wow.com|q|Wow>infospace.com|q|InfoSpace>blekko"
+".com|q|Blekko>dogpile.com|q|DogPile>alhea.com|q|Alhea>goduckgo.com|"
+"q|GoDuckGo>info.com|qkw|Info.com>contenko.com|q|Contenko>www.baidu."
+"com|wd|Baidu>daum.net,search.daum.net|q|Daum>icqit.com|q|icq>myway."
+"com|searchfor|MyWay.com>naver.com,search.naver.com|query|Naver>nets"
+"cape.com|query,search|Netscape Search>reference.com|q|Reference.com"
+">seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it,www.tiscali.c"
+"o.uk|key,query|Tiscali>virgilio.it|qs|Virgilio>yandex|text|Yandex.r"
+"u>optimum.net|q|Optimum Search";

/*
 * Plugin Utility - first only
 */
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
* Plugin: clickPast - version 1.0
*/
s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");
/*
 * Plugin: getVisitStart v2.0 - returns 1 on first page of visit
 * otherwise 0
 */
s.getVisitStart=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");
/*
 * s.join: 1.0 - Joins an array into a string
 */
s.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Utility Function: p_gh
 */
s.p_gh = new Function(""
+ "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+ "o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+ "o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+ "ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

/*
** Plugin: dynamicAccountPlugin v1.0
** support for legacy H code DAL vars since AM does not natively support them
** returns rsids based on DAL vars, so assign this to s.account or pass to s.sa().
*/
s.dynamicAccountPlugin=function() {
  var s=this;
  var acct=s.account||'';
  var dal,c,d,l,h,i,j;
  var dam=s.dynamicAccountMatch||location.hostname;
  if (!s.dynamicAccountSelection||!s.dynamicAccountList) return acct;
  dal=s.dynamicAccountList.split(';');
  for (c=0,l=dal.length;c<l;c++) {
    d=dal[c].split('=');
    if (d[1]) {
      h=d[1].split(',');
      for (i=0,j=h.length;i<j;i++) {
        if (dam.indexOf(h[i])>-1) {
          return d[0];
        }
      }
    }
  }
  return acct;
}

/**
  2016.08.01 - plugin to fix known issue with s.Util.getQueryParam
  https://github.com/alcazes/Adobe-Analytics-from-A-To-Z/wiki/Custom-s.Util.getQueryParam:-take-into-account-fragment-in-URL
 **/

s.getQueryParamCustom = function(c, b, d, e, h) {
            var f, g;
            e || (e = false);
            h || (h = s);
            b || (b = h.pageURL ? h.pageURL : window.location);
            d || (d = "&");
            return c && b && (b = "" + b, f = b.indexOf("?"), 0 <= f && (b = ( !e && "#"!= d && (/^.*(\?.*)#.*/.test(b)) ) ? (g = b.indexOf('#'), d + b.substring(f + 1, g) + d ) : (( e && "#"!= d && (/^.*(\?.*)#.*/.test(b))) ? (g = b.indexOf('#'), d + b.substring(g + 1) + d ) : d + b.substring(f + 1) + d ), f = b.indexOf(d + c + "="), 0 <= f && (b = b.substring(f + d.length + c.length + 1), f = b.indexOf(d), 0 <= f && (b = b.substring(0, f)), 0 < b.length))) ? h.unescape(b) : ""
        }
s.Util.getQueryParam = s.getQueryParamCustom;

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="newyorkandcompany";
s.trackingServer="metrics.nyandcompany.com";
s.trackingServerSecure="smetrics.nyandcompany.com";
