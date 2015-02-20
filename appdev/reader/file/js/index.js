System.registerModule("src/subscription.js", [], function() {
  "use strict";
  var __moduleName = "src/subscription.js";
  var test = "imported subscription";
  return {get test() {
      return test;
    }};
});
System.registerModule("src/index.js", [], function() {
  "use strict";
  var __moduleName = "src/index.js";
  var test = System.get("src/subscription.js").test;
  var r = new Ractive({
    el: "#ractives",
    template: "#tMain"
  });
  var nav = r.findComponent("navbar");
  console.log(test);
  return {};
});
System.get("src/index.js" + '');
