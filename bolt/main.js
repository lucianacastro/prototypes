$(function(){

	var timer; //tiene que ser global
	var boltTimeMark = 9.58;
	var vBolt = 100/boltTimeMark; // distancia/tiempo
	var $bolt = $('#bolt');
	var $me = $('#me');
	var $meTimer = $('#me-timer');
	var $boltTimer = $('#bolt-timer');
	var $meTimeMark = $('#meTimeMark');

	$('#start').on('click', function() {
		$bolt.removeClass('finished');
		var meTimeMark = $meTimeMark.val();
		var vMe = 100/meTimeMark;
		var startTimestamp = Date.now();

		if (timer) {
			clearInterval(timer);
		}
		timer = setInterval(function() {
			var t = (Date.now() - startTimestamp)/1000;
			var xBolt = vBolt*t; //recalculamos, es el desplazamieno total. Se va a desplazar velocidad * tiempo
			var xMe = vMe*t;

			//--->setTimerClock($meTimer, t);
			//--->setTimerClock($boltTimer, t);
			if(xBolt > 100) {
				xBolt = 100;
				setTimerClock($boltTimer, boltTimeMark);
				//--->$bolt.addClass('finished');
			}
			if(xMe > 100) {
				xMe = 100;
				//--->setTimerClock($meTimer, meTimeMark);
			}
			if(xBolt === 100 && xMe === 100) {
				clearInterval(timer);
			}
			$bolt.css('margin-left', xBolt+'%');
			$me.css('margin-left', xMe+'%');
		}, 1000/60);
	});

	$('#stop').on('click', function() {
		$bolt.removeClass('finished');
		$bolt.css('margin-left', 0);
		$me.css('margin-left', 0);
		clearInterval(timer);
	});

});

function timeMarkToArray(timeMark) {
	// espera números entre 0 y 99 con N decimales
	return (''+timeMark)
		.replace(/^(\d)\./, '0$1.')
		.replace(/\.(\d)$/, '.$10')
		.split('');
}

function setTimerClock($timer, time) {
	var timeArray = timeMarkToArray(time);
	var $numbers = $timer.find('span');
	$numbers.eq(0).text(timeArray[0]);
	$numbers.eq(1).text(timeArray[1]);
	$numbers.eq(2).text(timeArray[3]);
	$numbers.eq(3).text(timeArray[4]);
}