function loadCSS(href, before, media, callback) {
  'use strict';
  var ss = window.document.createElement('link');
  var ref = before || window.document.getElementsByTagName('script')[0];
  var sheets = window.document.styleSheets;
  ss.rel = 'stylesheet';
  ss.href = href;
  ss.media = 'only x';
  if (callback) {
    ss.onload = callback;
  }
  ref.parentNode.insertBefore(ss, ref);
  ss.onloadcssdefined = function(cb) {
    var defined;
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].href && sheets[i].href.indexOf(href) > -1) {
        defined = true;
      }
    }
    if (defined) {
      cb();
    } else {
      setTimeout(function() {
        ss.onloadcssdefined(cb);
      });
    }
  };
  ss.onloadcssdefined(function() {
    ss.media = media || 'all';
  });
  return ss;
}
if (screen.width < 480) {
  loadCSS('Files/mobile.css');
  loadHeader();
}
if ((screen.width >= 480) && (screen.width < 720)) {
  loadCSS('Files/phablet.css');
}
if ((screen.width >= 720) && (screen.width < 1024)) {
  loadCSS('Files/tablet.css');
}
if (screen.width >= 1024) {
  loadCSS('Files/desktop.css');
}
//Use this in <head></head>
//loadCSS('style.css');
//<noscript><link rel="stylesheet" type="text/css" media="screen and (min-device-width: 480px) and (max-device-width: 719px)" href="phablet.css"></noscript>
