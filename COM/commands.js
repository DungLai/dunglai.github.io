// List of commands

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'hello': helloCommand() 
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}


function helloCommand() {
	var helloCommand = new SpeechSynthesisUtterance('Hello');
	window.speechSynthesis.speak(msg);
}
