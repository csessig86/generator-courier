// Load up our templates
define(['jquery'], function ($) {
    return {
        offsetTableHeader: function() {

        	// This is loaded if inside iframe
			if ( window.self !== window.top ) {
				$("#header-fixed").css({
					"top": "0px"
				})
			};

			// Fill blank table element with content-table thead
			var tableOffset = $("#content-table").offset().top;
			var $header = $("#content-table > thead").clone();
			var $fixedHeader = $("#header-fixed").html($header);

			// This fixes the header at the top of the page when you scroll down
			$(window).bind("scroll", function() {
				var offset = $(this).scrollTop();
				if (offset >= tableOffset && $fixedHeader.is(":hidden")) {
			        $fixedHeader.show();
			    }
			    else if (offset < tableOffset) {
			        $fixedHeader.hide();
			    }
			});
		// Close offsetTableHeader
        },
        reloadOffsetTableHeader: function() {
        	// This resets fixed table header whenever a regular header is clicked
        	function resetTableHeader() {
        		var $header = $("#content-table > thead").clone();
				var $fixedHeader = $("#header-fixed").html($header);

        	};

        	$('.sorting').click(function() {
        		resetTableHeader();
        	});
        	$('.sorting_asc').click(function() {
        		resetTableHeader();
        	});
        	$('.sorting_desc').click(function() {
        		resetTableHeader();
        	});
        }
	// Close return
    }
});