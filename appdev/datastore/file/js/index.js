// Copyright 2014 Tim Shannon. All rights reserved.
// Use of this source code is governed by the MIT license
// that can be found in the LICENSE file.

$(document).ready(function() {
    var urlDS = fh.util.urlParm("file") || fh.util.urlParm("ds");
    var timer;

    var rMain = new Ractive({
        el: "main",
        template: "#tMain",
        data: {}
    });


    //Setup DS
    if (!urlDS) {
        setEmpty();
    } else {
        rMain.set("urlDS", urlDS);
        fh.properties.get(urlDS)
            .done(function() {
                rMain.set("ds", new fh.Datastore(urlDS));
                loadData();
            })
            .fail(function(result) {
                rMain.set("fileError", result.message);
                setEmpty();
            });
    }


    //events
    rMain.on({
        "showFilter": function(event) {
            rMain.set("filter", "");
            rMain.set("showFilter", !(rMain.get("showFilter") || false));
        },
        "sort": function(event) {
            if (event.context.iter.order == "asc") {
                rMain.set("iter.order", "dsc");
            } else {
                rMain.set("iter.order", "asc");
            }
            loadData();

        },
        "search": function(event) {
            event.original.preventDefault();
            if (!event.context.search) {
                rMain.set("iter.regexp", null);
            } else {
                rMain.set("iter.regexp", event.context.search);
            }
            loadData();
        },
        "prev": function(event) {
            var page = rMain.get("page");
            if (page <= 1) {
                return;
            }
            page -= 1;
            rMain.set("page", page);
            loadPage(page);
        },
        "next": function(event) {
            var page = rMain.get("page");
            var last = rMain.get("last");

            page += 1;
            rMain.set("page", page);
            loadPage(page);
        },
        "open": function(event) {
            $("#fileBrowse").modal();
        },
        "selectFile": function(event) {
            window.location = "/datastore/?file=" + rMain.get("selected");
        },
        "viewValue": function(event) {
            $("#viewValue").modal();
            rMain.set("currentValue", JSON.stringify(event.context.value, null, '\t'));
            rMain.set("currentKey", JSON.stringify(event.context.key));
        },
    });

    rMain.observe({
        "iter.limit": function(newValue, oldValue, keypath) {
            if (newValue === oldValue) {
                return;
            }
            if (!newValue || newValue < 1) {
                rMain.set("iter.limit", 1);
                newValue = 1;
            }

            if (timer) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(loadData, 200);
        },
        "filter": function(newValue, oldValue, keypath) {
            if (newValue === oldValue) {
                return;
            }
            if (timer) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(loadData, 200);

        },
    });


    //functions
    function loadData() {
        var ds = rMain.get("ds");
        if (!ds) {
            return;
        }
        rMain.set("waiting", true);
        rMain.set("filtered", 0);
        rMain.set("last", false);
        rMain.set("page", 1);
        var iter = rMain.get("iter");
        if (!iter) {
            iter = {
                limit: 20,
                order: "asc",
            };
        }

        iter.skip = 0;

        ds.iter(iter)
            .done(function(result) {
                var data = result.data;
                ds.count(iter)
                    .done(function(result) {
                        var count = result.data;
                        rMain.set("count", count);
                        rMain.set("last", data.length >= count);
                        rMain.set("file", ds.path);
                        rMain.set("iter", iter);
                        rMain.set("page", 1);
                        rMain.set("data", data);
                        setFilter();
                    })
                    .fail(function(result) {
                        rMain.set("error", result.message);
                    });
            })
            .fail(function(result) {
                rMain.set("error", result.message);
            });

    }

    function loadPage(page) {
        var data = rMain.get("data");
        var iter = rMain.get("iter");

        if (data.length < (page * iter.limit)) {
            loadNext();
        }
    }

    function loadNext() {
        var iter = rMain.get("iter");
        var ds = rMain.get("ds");
        var filtered = rMain.get("filtered");
        var count = rMain.get("count");
        iter.skip += iter.limit;

        rMain.set("waiting", true);
        ds.iter(iter)
            .done(function(result) {
                var newData = result.data;
                var data = rMain.get("data");
                if (!data) {
                    data = [];
                }

                rMain.set("iter", iter);

                data = data.concat(newData);

                rMain.set("last", ((data.length + filtered) >= count));

                rMain.set("data", data);
                setFilter();
            })
            .fail(function(result) {
                rMain.set("error", result.message);
            });

    }

    function setFilter() {
        var filter = rMain.get("filter");
        var data = rMain.get("data");
        var last = rMain.get("last");
        var iter = rMain.get("iter");
        var page = rMain.get("page");

        data = filterData(filter, data);
        rMain.set("data", data);

        if (data.length < (page * iter.limit) && !last) {
            loadNext();
            return;
        }

        rMain.set("waiting", false);
    }

    function filterData(filter, data) {
        var curFiltered = rMain.get("filtered") || 0;
        var regEx;
        try {
            regEx = new RegExp(filter, "i");
        } catch (e) {
            regEx = new RegExp("", "i");
        }


        var filtered = [];

        for (var i = 0; i < data.length; i++) {
            if (regEx.exec(JSON.stringify(data[i].value))) {
                filtered.push(data[i]);
            }
        }

        rMain.set("filtered", curFiltered + (data.length - filtered.length));

        return filtered;
    }

    function setEmpty() {
        rMain.set("page", 1);
        rMain.set("iter.limit", 20);
        rMain.set("last", true);
        rMain.set("count", 0);
        rMain.set("filtered", 0);
        rMain.set("data", []);

    }

}); //end ready
