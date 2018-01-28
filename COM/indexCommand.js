////////////////////// speech recognition //////////////////////// 

var help = function() {
  // document.getElementById('test').innerHTML += "hello";
  var help = new SpeechSynthesisUtterance('This is an auditory based simulation of Flinder Street Station. You can use the following voice commands: help, what is this, when was the video recoreded, where am i, next location, replay');
  window.speechSynthesis.speak(help);
}

var whatIsThis = function() {
  var whatIsThis = new SpeechSynthesisUtterance('This is a project to improve people with vision impaired navigation skills. You will be listenining to immersive spatial audio in different locations in Flinder Street Station.');
  window.speechSynthesis.speak(whatIsThis);
}

var whenRecoreded = function() {
  var location = document.querySelector('input[name="location"]:checked').value;
  var whenRecoreded = new SpeechSynthesisUtterance('This video is recoreded at ' + dictTime[location]);
  window.speechSynthesis.speak(whenRecoreded);
}

var whereAmI = function() {
  var location = document.querySelector('input[name="location"]:checked').value;
  var whereAmI = new SpeechSynthesisUtterance('You are at ' + dictDesc[location]);
  window.speechSynthesis.speak(whereAmI);
}

var nextLocation = function() {
  var location = document.querySelector('input[name="location"]:checked').value;
  // skip empty video
  location = (parseInt(location)+1).toString()
  if (location === "4") { 
    location = (parseInt(location)+1).toString()
  }
  if (location === '18') {
    location = '1';
  }
  document.getElementById(location).checked = true;
  showVideo(location);
  var nextLocation = new SpeechSynthesisUtterance('Playing next location, you are at: ' + dictDesc[location]);
  window.speechSynthesis.speak(nextLocation);
}

var replay = function() {
  var location = document.querySelector('input[name="location"]:checked').value;
  showVideo(location);
  var replay = new SpeechSynthesisUtterance('Replaying the video, you are at ' + dictDesc[location]);
  window.speechSynthesis.speak(replay);
}

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'help': help, // list of commands
    'what is this': whatIsThis, // description of project
    'when (was the video) recoreded' : whenRecoreded, // time when video was recorded
    'where am i' : whereAmI, // location information
    'next location' : nextLocation, // move to next location
    'replay' : replay // replay the video 
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}


/// add transition voice : location 1 => location2 : you walking 3 meter into