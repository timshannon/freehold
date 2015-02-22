System.registerModule("src/subscription.js", [], function() {
  "use strict";
  var __moduleName = "src/subscription.js";
  var url = "http://blog.codinghorror.com/rss/";
  return {get url() {
      return url;
    }};
});
System.registerModule("src/index.js", [], function() {
  "use strict";
  var __moduleName = "src/index.js";
  var url = System.get("src/subscription.js").url;
  var r = new Ractive({
    el: "#ractives",
    template: "#tMain"
  });
  var nav = r.findComponent("navbar");
  $.ajax({
    url: url,
    jsonp: "callback",
    dataType: "jsonp ",
    success: function(response) {
      console.log(response);
    }
  });
  return {};
});
System.get("src/index.js" + '');
