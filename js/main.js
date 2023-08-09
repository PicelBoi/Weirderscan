$(function(){
	var indexbg = Math.floor(Math.random() * (20- 1)+ 1);
	var $main = $("#main"),
		$window = $( window ),
	    mainHeight = $main.outerHeight(),
	    mainWidth = $main.outerWidth(),
	    mainAspect = 4/3,
	    resizeTimer;
	var $body = $("body");
	document.getElementById("kirby").style.background = "url(https://raw.githubusercontent.com/PicelBoi/basically-qconrad-intellistar-but-worse/master/assets/background/" + indexbg + ".bg')";

//calls rescale when window resizes
	$(window).resize( function(e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(scaleWindow, 100);
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
	}
	scaleWindow(); // init

});
