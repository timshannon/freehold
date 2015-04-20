/*global MAPJS */
MAPJS.URLHelper = {
	urlPattern: /(https?:\/\/|www\.)[\w-]+(\.[\w-]+)+([\w.,!@?^=%&amp;:\/~+#-]*[\w!@?^=%&amp;\/~+#-])?/i,
	containsLink : function (text) {
		'use strict';
		return MAPJS.URLHelper.urlPattern.test(text);
	},
	getLink : function (text) {
		'use strict';
		var url = text.match(MAPJS.URLHelper.urlPattern);
		if (url && url[0]) {
			url = url[0];
			if (!/https?:\/\//i.test(url)) {
				url = 'http://' + url;
			}
		}
		return url;
	},
	stripLink : function (text) {
		'use strict';
		return text.replace(MAPJS.URLHelper.urlPattern, '');
	}
};
