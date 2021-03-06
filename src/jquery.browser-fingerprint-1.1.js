// fork from https://github.com/NEWECX/jquery-browser-fingerprint

// Browser fingerprinting is a technique to "mark" anonymous users using JS
// (or other things).  To build an "identity" of sorts the browser is queried
// for a list of its plugins, the screen size and several other things, then
// hashes them.  The idea is that these bits of information produce an unique
// "fingerprint" of sorts; the more elaborate the list of data points is, the
// more unique this fingerprint becomes.  And you wouldn't even need to set a
// cookie to recognize this user when she visits again.
//
// For more information on this topic consult
// [Ars Technica](http://arstechnica.com/tech-policy/news/2010/05/how-your-web-browser-rats-you-out-online.ars)
// or the [EFF](http://panopticlick.eff.org/).  There is a lot of potential
// for undesirable shenanigans, and I strictly oppose using this technique for
// marketing and ad-related tracking purposes.
//
// Anyways, I needed a really simple fingerprinting library, so I wrote a
// quick and dirty jQuery plugin.  This is by no means a complete and
// watertight implementation -- it is merely the scratch for a particular itch
// I was having.  YMMV.
//
// This library was written by Carlo Zottmann, carlo@municode.de, has its home
// on [Github](http://github.com/carlo/jquery-browser-fingerprint) and is
// WTF-licensed (see LICENSE.txt).

( function($) {

  // Calling `jQuery.fingerprint()` will return a string of useragent properties

  $.fingerprint = function() {

    // This function, `_raw()`, uses several browser details which are
    // available to JS here to build a string, namely...
    //
    // * the user agent
    // * screen size
    // * color depth
    // * the timezone offset
    // * sessionStorage support
    // * localStorage support
    // * the list of all installed plugins (we're using their names,
    //    descriptions, mime types and file name extensions here)
    function _raw() {
      return [
        navigator.userAgent,
        [ screen.height, screen.width, screen.colorDepth ].join("x"),
        ( new Date() ).getTimezoneOffset(),
        !!window.sessionStorage,
        !!window.localStorage,
        $.map( navigator.plugins, function(p) {
          return [
            p.name,
            p.description,
            $.map( p, function(mt) {
              return [ mt.type, mt.suffixes ].join("~");
            }).join(",")
          ].join("::");
        }).join(";")
      ].join("###");
    }

    return _raw();
  };

})(jQuery);
