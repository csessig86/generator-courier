define(['jquery'], function ($) {
	return {
		formatiFrame: function() {
			// This is loaded if inside iframe
			if ( window.self !== window.top ) {
				$('#header-footer-geocoder').hide();
				$('#share-main').hide();
				$('#top-box').css({
					'background-color': '#FFF'
				});
				$('#credits-box').html('<p>By <a href="https://twitter.com/courieressig" target="_blank">Chris Essig</a></p>')
				$('#copyright-box').hide();
			}
		}
	}
});