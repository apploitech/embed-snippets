(function (window, document) {

if (window.modeanalized !== undefined) return;

// domready (c) Dustin Diaz 2012 - License MIT
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('domready', function (ready) {

  var fns = [],
      fn,
      f = false,
      doc = document,
      testEl = doc.documentElement,
      hack = testEl.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      addEventListener = 'addEventListener',
      onreadystatechange = 'onreadystatechange',
      readyState = 'readyState',
      loaded = /^loade|c/.test(doc[readyState]);

  function flush(f) {
    loaded = 1;
    while (f = fns.shift()) f();
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f);
    flush();
  }, f);


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn);
      flush();
    }
  });

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left');
          } catch (e) {
            return setTimeout(function() { ready(fn); }, 50);
          }
          fn();
        }();
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn);
    });
});

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
}

function getLinks() {
  var links    = [],
      docLinks = document.getElementsByTagName('a'),
      length   = docLinks.length;

  for (var i = 0; i < length; i++) {
    if ((' ' + docLinks[i].className).indexOf(' mode-') !== -1) {
      links.push(docLinks[i]);
    }
  }
  return links;
}

function embed(link) {
  var id     = generateUUID(),
      iframe = document.createElement('iframe'),
      query  = 'resize=true&embed_id=' + id,
      url    = link.href.indexOf('?') > 0 ? link.href + '&' + query : link.href + '?' + query;

  iframe.src = url;
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.height = '300px';
  link.parentNode.replaceChild(iframe, link);

  var onmessage = (function(id) {
    return function (event) {
      event || (event = window.event);
      if (event.data && event.data.id === id) {
        // footer = 24 height + 1 border | iframe = 2 border
        iframe.style.height = (event.data.height * 1 + (2 + 24)) + 'px';
      }
    };
  })(id);
  
  if (window.addEventListener) {
    window.addEventListener('message', onmessage, false);
  } else {
    window.attachEvent('onmessage', onmessage);
  }
}

window.modeanalized = true;

domready(function () {
  var links = getLinks(),
      length = links.length,
      className = '';

  for (var i = 0; i < length; i++) {
    className = ' ' + links[i].className + ' ';
    if (className.indexOf(' mode-embed ') !== -1) {
      embed(links[i]);
    }
  }
});
}(this, document));