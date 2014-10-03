$(document).ready(function() {
    var urlDS = fh.util.urlParm("file") || fh.util.urlParm("ds");
    var timer;

    var rMain = new Ractive({
        el: "main",
        template: "#tMain",
        data: {}
    });


    //Setup DS

    rMain.set("ds", new fh.Datastore(urlDS));

    loadData();


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

    });

    rMain.observe({
        "iter.limit": function(newValue, oldValue, keypath) {
            if (newValue < 0) {
                rMain.set("iter.limit", 0);
                newValue = 0;
            }

            if (timer) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(loadData, 200);
        },
        "filter": function(newValue, oldValue, keypath) {
            if (timer) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(loadData, 200);

        },
    });


    //functions
    function loadData() {
        rMain.set("waiting", true);
        var iter = rMain.get("iter");
        if (!iter) {
            iter = {
                limit: 20,
                order: "asc",
                skip: 0,
            };
        }
        var ds = rMain.get("ds");

        ds.count(iter)
            .done(function(result) {
                var count = result.data;
                rMain.set("count", count);
                rMain.set("pagination", getPagination(result.data));
                ds.iter(iter)
                    .done(function(result) {

                        rMain.set("last", result.data.length >= count);
                        rMain.set("file", ds.path);
                        rMain.set("iter", iter);
                        rMain.set("page", 1);
                        rMain.set("data", result.data);
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

    function loadNext(skip) {
        var iter = rMain.get("iter");
        var ds = rMain.get("ds");
        var count = rMain.get("count");
        iter.skip = skip;

        ds.iter(iter)
            .done(function(result) {
                var newData = result.data;
                var data = rMain.get("data");
                if (!data) {
                    data = [];
                }

                var last = (skip + newData.length) >= count;

                rMain.set("last", last);
                rMain.set("iter", iter);

                data = data.concat(newData);
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
        var iter = rMain.get("ds.iter");

        data = filterData(filter, data);
        rMain.set("data", data);

        if (data.length < iter.limit && !last) {
            loadNext(iter.skip + iter.limit);
            return;
        }

        rMain.set("waiting", false);
    }

    function filterData(filter, data) {
        var regEx;
        try {
            regEx = new RegExp(filter, "i");
        } catch (e) {
            regEx = new RegExp("", "i");
        }


        var filtered = [];

        for (var i = 0; i < data.length; i++) {
            if (regEx.exec(data[i].value)) {
                filtered.push(data[i]);
            }
        }

        return filtered;
    }

    function getPagination(count) {

    }



}); //end ready
