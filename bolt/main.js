$(function(){

	var timer; //tiene que ser global
	var boltTimeMark = 9.58;
	var vBolt = 100/boltTimeMark; // distancia/tiempo
	var $bolt = $('#bolt');
	var $me = $('#me');
	var $timer = $('#timer');
	var $meTimeMark = $('#meTimeMark');

	$('#start').on('click', function() {
		var meTimeMark = $meTimeMark.val();
		var vMe = 100/meTimeMark;
		var firstTimeMark = Math.min(boltTimeMark, meTimeMark);
		var secondTimeMark = Math.max(boltTimeMark, meTimeMark);
		var firstPlaceName = firstTimeMark === boltTimeMark ? 'Usain Bolt' : 'Yo';
		var secondPlaceName = secondTimeMark === boltTimeMark ? 'Usain Bolt' : 'Yo';
		var startTimestamp = Date.now();

		if (timer) {
			clearInterval(timer);
		}
		timer = setInterval(function() {
			var t = (Date.now() - startTimestamp)/1000;
			var xBolt = vBolt*t; //recalculamos, es el desplazamieno total. Se va a desplazar velocidad * tiempo
			var xMe = vMe*t; 
			if(xBolt > 100) {
				xBolt = 100;
			}
			if(xMe > 100) {
				xMe = 100;
			}
			if(xBolt === 100 && xMe === 100) {
				clearInterval(timer);
			}
			$bolt.css('margin-left', xBolt+'%');
			$me.css('margin-left', xMe+'%');
			var timerText;
			if(t < firstTimeMark){
				timerText = t;
			} else if (t < secondTimeMark) {
				timerText = firstTimeMark + ' ' + firstPlaceName + '<br>' + t;
			} else {
				timerText = firstTimeMark + ' ' + firstPlaceName + '<br>' + secondTimeMark + ' ' + secondPlaceName;
			}
			$timer.html(timerText);
		}, 1000/60);
	});

	$('#stop').on('click', function() {
		$bolt.css('margin-left', 0);
		$me.css('margin-left', 0);
		clearInterval(timer);
	});

});