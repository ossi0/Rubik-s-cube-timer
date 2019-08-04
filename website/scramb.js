var scrambleside = [];
var scrambleface = [];
var scrambledir = [];
var scramble = [];
var scrambled = [];
var alg = [];

var previousside = -1;
var previousside2 = -1;
var previousface = -1;

var currentside;
var currentface;

var algToServer = "";

generate();

	function generate() {
		document.getElementById('scramble').textContent = "Scramble: " + " " + " " + " ";
		scrambleside.push(genside());
		scrambleface.push(genface());
		scrambledir.push(gendir());
		for (var i=0; i < 25; i++) {
			previousface = scrambleface[i];
			previousside = scrambleside[i];
			previousside2 = scrambleside[i-1];
			
			currentface = genface();
			currentside = genside();
			while (currentface == previousface && currentside == previousside) {
				currentface = genface();
			}
			
			while (currentside == previousside2 && currentside == previousside) {
				currentside = genside();
			}
			scrambleside.push(currentside);
			scrambleface.push(currentface);
			scrambledir.push(gendir());
		}
		for (j = 0; j < scrambleside.length; j++) {
			switch (scrambleside[j]) {
				case 0:
					switch (scrambleface[j]) {
						case 0:
							scramble.push("U");
							break;
						case 1:
							scramble.push("D");
							break;
					}
					break;
					
				case 1:
					switch (scrambleface[j]) {
						case 0:
							scramble.push("R");
							break;
						case 1:
							scramble.push("L");
							break;
					}
					break;
					
				case 2:
					switch (scrambleface[j]) {
						case 0:
							scramble.push("F");
							break;
						case 1:
							scramble.push("B");
							break;
					}
					break;
			}
		}
		
		for (k = 0; k < scrambledir.length; k++) {
			switch (scrambledir[k]) {
				case 0:
					scrambled.push("");
					break;
				case 1:
					scrambled.push("'");
					break;
				case 2:
					scrambled.push("2");
					break;
			}
		}
		
		for (h = 0; h < scrambleside.length; h++) {
			alg.push(scramble[h] + scrambled[h]);
			document.getElementById("scramble").textContent += alg[h] + " ";
		}
		algToServer = alg.join(" ");
		scrambleside = [];
		scrambleface = [];
		scrambledir = [];
		scramble = [];
		scrambled = [];
		alg = [];

		previousside = -1;
		previousside2 = -1;
		previousface = -1;

		currentside = -1;
		currentface = -1;
		return alg;
	}

	function gendir() {
		return Math.floor(Math.random() * 3);
	}
	
	function genface() {
		return Math.floor(Math.random() * 2);
	}
	
	function genside() {
		return Math.floor(Math.random() * 3);
	}
	