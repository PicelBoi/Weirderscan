$(function(){
	var $main = $("#main"),
		$window = $( window ),
	    mainHeight = $main.outerHeight(),
	    mainWidth = $main.outerWidth(),
	    mainAspect = 4/3,
	    resizeTimer;

	

//calls rescale when window resizes
	$(window).resize( function(e) {
		clearTimeout(resizeTimer);
		resizeTimer = scaleWindow();
	});

	function scaleWindow() {
		var scale, windowAspect;

		windowAspect = $window.width() / $window.height();

		if (windowAspect>=mainAspect) {
			scale = $window.height() / mainHeight;
		} else {
			scale = $window.width() / mainWidth;
		}

		$main.css({
			transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
		});
		$("#startup").css({
			transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
		});
		$("#videobg").css({
			transform: "translate(-50%, -50%) " + "scale(" + scale + ")",
			top: "50%",
			left: "50%"
		});
	}
	scaleWindow(); // init

});
