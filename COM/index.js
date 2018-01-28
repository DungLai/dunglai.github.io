
		function showLocation(location){
			// Print Description of location
			// //document.getElementById('note').innerHTML = dictDesc[location];
			// Show youtube video upon video link in dictYoutube
			// //document.getElementById('youtubeVideo').innerHTML = dictDesc[location]
			document.getElementById('youtubeVideo').innerHTML = dictDesc[location] + '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + dictYoutube[location] + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'

		}

		var dictDesc = {
			1: "11:40am	Walk and record along predefined route from Platform 3, up escalators, through barriers and onto Flinders/Swanston steps.",
			2: "11:44am	Start of Cnr Flinders and Swanston at steps",
			3: "11:46am	Under main dome",
			4: "",
			5: "11:55am	Near barriers",
			6: "11:57am	Approaching barriers",
			7: "1:10pm	At top of Platform 3 escalators",
			8: "1:12pm	At top of Platform 5 escalators",
			9: "1:16pm	Outside Baguette",
			10: "1:17pm	Outside NZ Natural ice-cream",
			11: "1:22pm	At top of Platform 8 escalator",
			12: "1:24pm	Outside barrier (facing Swanston St)",
			13: "1:25pm	Outside Taxi Rank (opposite NZ ice-cream)",
			14: "1:26pm	Near Busker (White Wedding Dress)",
			15: "1:26pm	Outside Relay Hub Convenience Store",
			16: "1:34pm	On Platform 3",
			17: "1:37pm	Platform 3 near subway entrance (stone steps)",			
			18: "1:39pm	In subway near platform 2/3 entrance"
		}

		var dictYoutube = {
			1: "a7gG0tIKkuY",
			2: "pTbWLeybnRA",
			3: "zmrERTfzuIk",
			4: "",
			5: "sSLgvlaHTT4",
			6: "InK6ql6NRqQ",
			7: "XYNNNJzAYSo",
			8: "F5UP-9N372Q",
			9: "L3i9-akFGB4",
			10: "Z0_Kaq91lt4",
			11: "yq-pfTnxj1Y",
			12: "I5aGoJxzgfI",
			13: "H9QFw0gcCZI",
			14: "vLU2JqArU84",
			15: "MUQgjWfAIv4",
			16: "3I9tY9d-UPE",
			17: "hUf7nWDwUXY",
		 	18: "SbomIdTWH8U"		
		}

// fit content to right-body div
$(function() {
    while( $('#right-body div').height() > $('#right-body').height() ) {
        $('#right-body div').css('font-size', (parseInt($('#right-body div').css('font-size')) - 1) + "px" );
    }
});

//////////////////////// speech recognition //////////////////////// 

var help = function() {
	// document.getElementById('test').innerHTML += "hello";
	var helloTxt = new SpeechSynthesisUtterance('Hello World');
	window.speechSynthesis.speak(helloTxt);
}

var a = function() {
	document.getElementById('test').innerHTML += "a";
	var aTxt = new SpeechSynthesisUtterance('You say A');
	window.speechSynthesis.speak(aTxt);
}

var b = function() {
	document.getElementById('test').innerHTML += "b";
	var bTxt = new SpeechSynthesisUtterance('You say B');
	window.speechSynthesis.speak(bTxt);
}

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'help': help, // list of commands
    'what is this': whatIsThis, // description of project
    'what time is this' : whatTimeIsThis, // time when video was recorded
    'where am i' : whereAmI, // location information
  	'next location' : nextLocation, // move to next location
  	'replay' : replay // replay the video 
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}