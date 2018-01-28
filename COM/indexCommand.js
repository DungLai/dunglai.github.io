//test
// speech recognition
var hello = function() {
	document.getElementById('test').innerHTML += "hello";
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
    'hello': hello,
    'a' : a,
    'b' : b
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}