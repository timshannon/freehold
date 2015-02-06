/*global observable, jQuery, FileReader, Image, MAPJS, document, _ */
MAPJS.getDataURIAndDimensions = function (src, corsProxyUrl) {
	'use strict';
	var isDataUri = function (string) {
			return (/^data:image/).test(string);
		},
		convertSrcToDataUri = function (img) {
			if (isDataUri(img.src)) {
				return img.src;
			}
			var canvas = document.createElement('canvas'),
				ctx;
			canvas.width = img.width;
			canvas.height = img.height;
			ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);
			return canvas.toDataURL('image/png');
		},
		deferred = jQuery.Deferred(),
		domImg = new Image();

	domImg.onload = function () {
		try {
			deferred.resolve({dataUri: convertSrcToDataUri(domImg), width: domImg.width, height: domImg.height});
		} catch (e) {
			deferred.reject();
		}
	};
	domImg.onerror = function () {
		deferred.reject();
	};
	if (!isDataUri(src)) {
		if (corsProxyUrl) {
			domImg.crossOrigin = 'Anonymous';
			src = corsProxyUrl + encodeURIComponent(src);
		} else {
			deferred.reject('no-cors');
		}
	}
	domImg.src = src;
	return deferred.promise();
};
MAPJS.ImageInsertController = function (corsProxyUrl, resourceConverter) {
	'use strict';
	var self = observable(this),
		readFileIntoDataUrl = function (fileInfo) {
			var loader = jQuery.Deferred(),
				fReader = new FileReader();
			fReader.onload = function (e) {
				loader.resolve(e.target.result);
			};
			fReader.onerror = loader.reject;
			fReader.onprogress = loader.notify;
			fReader.readAsDataURL(fileInfo);
			return loader.promise();
		};
	self.insertDataUrl = function (dataUrl, evt) {
		self.dispatchEvent('imageLoadStarted');
		MAPJS.getDataURIAndDimensions(dataUrl, corsProxyUrl).then(
			function (result) {
				var storeUrl = result.dataUri;
				if (resourceConverter) {
					storeUrl = resourceConverter(storeUrl);
				}
				self.dispatchEvent('imageInserted', storeUrl, result.width, result.height, evt);
			},
			function (reason) {
				self.dispatchEvent('imageInsertError', reason);
			}
		);
	};
	self.insertFiles = function (files, evt) {
		jQuery.each(files, function (idx, fileInfo) {
			if (/^image\//.test(fileInfo.type)) {
				jQuery.when(readFileIntoDataUrl(fileInfo)).done(function (dataUrl) {
					self.insertDataUrl(dataUrl, evt);
				});
			}
		});
	};
	self.insertHtmlContent = function (htmlContent, evt) {
		var images = htmlContent.match(/img[^>]*src="([^"]*)"/);
		if (images && images.length > 0) {
			_.each(images.slice(1), function (dataUrl) {
				self.insertDataUrl(dataUrl, evt);
			});
		}
	};
};
jQuery.fn.imageDropWidget = function (imageInsertController) {
	'use strict';
	this.on('dragenter dragover', function (e) {
		if (e.originalEvent.dataTransfer) {
			return false;
		}
	}).on('drop', function (e) {
		var dataTransfer = e.originalEvent.dataTransfer,
			htmlContent;
		e.stopPropagation();
		e.preventDefault();
		if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
			imageInsertController.insertFiles(dataTransfer.files, e.originalEvent);
		} else if (dataTransfer) {
			htmlContent = dataTransfer.getData('text/html');
			imageInsertController.insertHtmlContent(htmlContent, e.originalEvent);
		}
	});
	return this;
};
