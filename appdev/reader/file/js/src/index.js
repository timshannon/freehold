// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

// jshint esnext:true

import {test} from "./subscription.js";

var r = new Ractive({
    el: "#ractives",
    template: "#tMain",
});

var nav = r.findComponent("navbar");

console.log(test);
