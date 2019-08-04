
var timer = document.getElementById('timer');

	var minutes = ["0",0];
	var seconds = ["0",0];
	var mms = ["0",0];
	var check = 0;
	var inter;
	var placeholder = 0;
	var totime = "";
	var timerStr = "";
	var count = 0;
	var sse = 0;
	var ssetime = ["0",0,":","0",0,",","0",0];
	var attempt = [0,0,0,0,0,0,0,0,0,0,0,0];
	var attemptcount = 0;
	var sseavg = 0;
	
	
	window.onkeypress = function (tog) {
		switch(check) {
			case 0:
				inter = setInterval(heck, 10);
				check++;
				break;
				
			case 1:
				check++;
				clearInterval(inter);
				totime = timerStr;
				var x = document.getElementById("list").children;   // !!!!!
				x[count].textContent = totime;
				console.log(totime);
				console.log(count);
				count++;
				sse = sse + (minutes[1] * 6000 + seconds[1] * 100 + mms[1]);
				sseavg = Math.round(sse/count);
				
				ssetime[1] = Math.floor(sseavg / 6000);
					if (ssetime[1] < 10) {
						var ssetimeStr1 = ssetime[0] + ssetime[1];
					} else {
						ssetimeStr1 = ssetime[1];
					}
					
				ssetime[4] = Math.floor((sseavg - ssetime[1] * 6000) / 100);
					if (ssetime[4] < 10) {
						var ssetimeStr2 = ssetime[3] + ssetime[4];
					} else {
						ssetimeStr2 = ssetime[4];
					}
				ssetime[7] = Math.floor(sseavg - (ssetime[1] * 6000) - (ssetime[4] * 100))
					if (ssetime[7] < 10) {
						var ssetimeStr3 = ssetime[6] + ssetime[7];
					} else {
						ssetimeStr3 = ssetime[7];
					}
				
				document.getElementById("tt").textContent = ssetimeStr1 + " : " + ssetimeStr2
				+ " , " + ssetimeStr3;
				
				console.log(attemptcount);
				attempt[count-1] = attemptcount;
				
				$.post('/upload',{"number": attemptcount, "scramble": algToServer}, sent, 'json');
				console.log(algToServer);
				
				generate();
				break;
				
			case 2:
				attemptcount = 0;
				check = 1;
				minutes = ["0",0];
				seconds = ["0",0];
				mms[1] = 0;
				inter = setInterval(heck, 10);
				
		}
	}
	
	
	
	function heck() {
		mms[1]++;
		attemptcount++;
		placeholder++;
		
		
		if (mms[1] > 99) {
			mms[1] = 0;
			seconds[1]++;
		}
		
		if (seconds[1] > 59) {
			seconds[1] = 0;
			minutes[1]++;
		}
		if (mms[1] < 10) {
			var timeStrMms = mms[0] + mms[1];
		} else {
		timeStrMms = mms[1];
		}
		
		if (seconds[1] < 10) {
			var timeStrSec = seconds[0] + seconds[1];
		} else {
			timeStrSec = seconds[1];
		}
		
		if (minutes[1] < 10) {
			var timeStrMin = minutes[0] + minutes[1];
		} else {
			timeStrMin = minutes[1];
		}
		
		timerStr = timeStrMin + " : " + timeStrSec + " , " + timeStrMms;
		document.getElementById('timer').textContent = timerStr; // TÄRKEÄ ----- KUN HALUAT SAADA MUUTTUJAN HTML TAGIIN!!!!
		
		
}

	function Myfunction() {
		$.post('/removelast',attemptcount, sent, 'json');
		sse = sse - (attempt[count-1]); // tämä
		attempt[count] = 0;
		var c = document.getElementById("list").children;
		c[count - 1].textContent = '';
		document.activeElement.blur();
		count = (count - 1);
		sseavg = Math.round(sse/count);
		
		ssetime[1] = Math.floor(sseavg / 6000);
		
		if (ssetime[1] < 10) {
			var ssetimeStr1 = ssetime[0] + ssetime[1];
		} else {
			ssetimeStr1 = ssetime[1];
		}
	
		ssetime[4] = Math.floor((sseavg - ssetime[1] * 6000) / 100);
		if (ssetime[4] < 10) {
			var ssetimeStr2 = ssetime[3] + ssetime[4];
		} else {
			ssetimeStr2 = ssetime[4];
		}
		
		ssetime[7] = Math.floor(sseavg - (ssetime[1] * 6000) - (ssetime[4] * 100))
		if (ssetime[7] < 10) {
			var ssetimeStr3 = ssetime[6] + ssetime[7];
		} else {
			ssetimeStr3 = ssetime[7];
		}
		
document.getElementById("tt").textContent = ssetimeStr1 + " : " + ssetimeStr2
+ " , " + ssetimeStr3;
	}
	
function sent(data) {
	console.log(data);
}