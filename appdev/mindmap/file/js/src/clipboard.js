/*global MAPJS*/
MAPJS.MemoryClipboard = function () {
	'use strict';
	var self = this,
		clone = function (something) {
			if (!something) {
				return undefined;
			}
			return JSON.parse(JSON.stringify(something));
		},
		contents;
	self.get = function () {
		return clone(contents);
	};
	self.put = function (c) {
		contents = clone(c);
	};
};
