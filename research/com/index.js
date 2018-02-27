
var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot' //name of the chatbot

//edit this function to change what the chatbot says
function chatbotResponse() {
  botMessage = "Invalid command, let's start with help command"; //the default message

  if (lastUserMessage === 'hi') {
    botMessage = "Hi, let's start with help command";
  }

  if (lastUserMessage === 'hello') {
    botMessage = "Hi, let's start with help command";
  }

  // Next location
  for (location = 0; location < 19; location++) { 
    if (lastUserMessage === 'play location ' + location) {
      document.getElementById(location).checked = true;
      botMessage = dictTime[location] + " " + dictDesc[location];
      showVideo(location);
    }    
  }

  if (lastUserMessage === 'replay') {
    var location = document.querySelector('input[name="location"]:checked').value;
    showVideo(location);
    // lastUserMessage.push("hello");
    botMessage = 'Replaying the video, you are at ' + dictDesc[location];
  }

  if (lastUserMessage === "help") {
    botMessage = "This is an auditory based simulation of Flinder Street Station. Those are the supported commands you can use: help, start exploring, next location, replay, what is this, where am i, describe, when recoreded. Or say hi to me";
  }

  if (lastUserMessage === "next location") {
    var location = document.querySelector('input[name="location"]:checked').value;
    // skip empty video
    location = (parseInt(location)+1).toString()
    if (location === "4")  { 
      location = (parseInt(location)+1).toString()
    }
    if (location === '19') {
      location = '1';
    }
    document.getElementById(location).checked = true;
    showVideo(location);  
    botMessage = 'Playing next location, you are at: ' + dictDesc[location];
  }

  if (lastUserMessage === "start exploring") {
    document.getElementById(2).checked = true;
    botMessage = "Let's begin the journey. " + dictTime[2] + " " + dictDesc[2];
    showVideo(2);
  }

  if (lastUserMessage === "when recorded") {
    var location = document.querySelector('input[name="location"]:checked').value;
    botMessage = 'This video is recoreded at ' + dictTime[location]
  }

  if (lastUserMessage === "where am i") {
   var location = document.querySelector('input[name="location"]:checked').value;
   botMessage = "You are at . " + dictDesc[location];
  }

  if (lastUserMessage === "describe") {
   var location = document.querySelector('input[name="location"]:checked').value;
   botMessage = "At the start head direction. " + dictNarration[location];
  }

  if (lastUserMessage === "what is this") {
   botMessage = "This is a project to improve people with vision impaired navigation skills. You will be listenining to immersive spatial audio in different locations in Flinder Street Station";
  }
}

//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    document.getElementById("chatbox").placeholder = "";
    //adds the value of the chatbox to the message array
    messages.push("<b>" + "You" + ":</b> " + lastUserMessage);
    //takes the return value from chatbotResponse() and outputs it
    chatbotResponse()
      //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage)
      // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few messages to html
    for (var i = 1; i < 3; i++) {
      if (messages[messages.length - i])
        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }
  }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window) {
    var utterance = new SpeechSynthesisUtterance(say);
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38){
    console.log('hi')
    //document.getElementById("chatbox").value = lastUserMessage;
  }
} 

////////////////////// speech recognition //////////////////////// 

var help = function() { askBot("help"); }
var whatIsThis = function() { askBot("what is this"); };
var whenRecoreded = function() {askBot("when recorded"); };
var whereAmI = function() { askBot("where am i"); };
var nextLocation = function() { askBot("next location"); };
var replay = function() { askBot("replay"); };
var hi = function hi() { askBot("hi"); };
var hello = function hello() { askBot("hello") };
var startExploring = function startExploring() { askBot("start exploring"); };
var describe = function Describe() { askBot("describe"); };

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'help': help, // list of commands
    'what is this': whatIsThis, // description of project
    'when (was the video) recorded' : whenRecoreded, // time when video was recorded
    'where am i' : whereAmI, // location information
    'next location' : nextLocation, // move to next location
    'replay' : replay, // replay the video 
    'start exploring' : startExploring,
    'hi' : hi,
    'hello' : hello,
    'describe' : describe
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}




/// add transition voice : location 1 => location2 : you walking 3 meter into

// pop up video
function askBot(text) { document.getElementById('chatbox').value = text; newEntry() }

function showVideo(location){ 
  document.getElementById('youtubeVideoAmbeo').innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + dictYoutubeAmbeo[location] + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'; 
}

function onClick(location) {
  askBot("play location " + location);
}

var dictTime = {
  1:  "11:40am",
  2:  "11:44am",
  3:  "11:46am",
  4:  "",
  5:  "11:55am",
  6:  "11:57am",
  7:  "1:10pm", 
  8:  "1:12pm", 
  9:  "1:16pm", 
  10: "1:17pm", 
  11: "1:22pm", 
  12: "1:24pm", 
  13: "1:25pm", 
  14: "1:26pm", 
  15: "1:26pm", 
  16: "1:34pm", 
  17: "1:37pm", 
  18: "1:39pm"
}

var dictNarration = {
  1: "Walk and record along predefined route from Platform 3, up escalators, through barriers and onto Flinders/Swanston steps.",
  2: "You are facing North, there is a long pedestrian crossroad in front of you. In the middle of the cross, there is a tram stop. 45 degrees to your right is the intersection of Swanston Street and Flinders street",
  3: "You are standing under the main dome, facing North toward Flinders Street Station entrance, outside entrance is the intersection between Flinders Street and Swanston Street. There are 10 steps down if you keep going forward",
  4: "",
  5: "You are facing the main entrance/exit on the corner of Flinders Street and Swanston St. There is a column directly in front of you, with two large arches to exit on either side of the column. 30 degrees to your left there are 4 customer service booths, there might be some queue line up barrier",
  6: "Straight ahead is North, and you will find barriers that lead you to the main dome entrance/exit. There are more barriers slightly to your right. Around 45 degrees to your left is an ANZ ATM. Situated to the left of the ATM are the toilets",
  7: "You are facing North. If you walk straight there is a walkway. On the right of the walkway is an entrance to platform 3 via lift. On the left of the walkway is an entrance to platform 3 via escalator or steep stairwell",
  8: "You are facing North. In front of you is a walkway. On the right of the walkway is an entrance to platform 5 via lift. On the left of the walkway is an entrance to platform 5 via escalator or steep stairwell",
  9: "You are facing North. There are four picnic style tables sitting directly in front of you, positioned in two rows of two. 45 degrees to your left is the customer service centre",
  10: "Slightly to your left is a lift to platform 7. Straight ahead you will find a customer centre information centre and a retail shop. Keep walking and you will reach the barriers to exit the station onto the corner of Flinders Street and Swanston Street",
  11: "Slightly to your left is a lift to platform 7. Straight ahead you will find a customer centre information centre and a retail shop. Keep walking and you will reach the barriers to exit the station onto the corner of Flinders Street and Swanston Street",
  12: "Facing North along Swanston St. If you walk straight, you will pass a line of retail shops on your left",
  13: "Facing North along Swanston St. If you walk straight, you will pass a line of retail shops on your left",
  14: "Facing North along Swanston St. Approximately 20 degrees to your left is a police centre. If you keep walking ahead, you will come to the Flinders St/ Swanston Street crossing",
  15: "Facing North along Swanston St. If you walk straight, you will pass a line of retail shops on your left",
  16: "You are facing the platform 2 railway. Walk straight to board train, feel for bumps on platform to signal safety line.",
  17: "You are facing the platform 2 railway. Walk straight to board train, feel for bumps on platform to signal safety line",
  18: "Stairs located directly in front of you lead to platforms 2 and 3. Stairs are quite steep"
}

var dictDesc = {
  1: "Walk and record along predefined route from Platform 3, up escalators, through barriers and onto Flinders/Swanston steps.",
  2: "Start of Cnr Flinders and Swanston at steps.",
  3: "Under main dome",
  4: "",
  5: "ear barriers",
  6: "Approaching barriers",
  7: "At top of Platform 3 escalators",
  8: "At top of Platform 5 escalators",
  9: "Outside Baguette",
  10: "Outside NZ Natural ice-cream",
  11: "At top of Platform 8 escalator",
  12: "Outside barrier (facing Swanston Street)",
  13: "Outside Taxi Rank (opposite NZ ice-cream)",
  14: "Near Busker (White Wedding Dress)",
  15: "Outside Relay Hub Convenience Store",
  16: "On Platform 3",
  17: "Platform 3 near subway entrance (stone steps)",      
  18: "In subway near platform 2/3 entrance"
}

//audio by VIRB 360
// var dictYoutube = {
//  1: "a7gG0tIKkuY",
//  2: "pTbWLeybnRA",
//  3: "zmrERTfzuIk",
//  4: "",
//  5: "sSLgvlaHTT4",
//  6: "InK6ql6NRqQ",
//  7: "XYNNNJzAYSo",
//  8: "F5UP-9N372Q",
//  9: "L3i9-akFGB4",
//  10: "Z0_Kaq91lt4",
//  11: "yq-pfTnxj1Y",
//  12: "I5aGoJxzgfI",
//  13: "H9QFw0gcCZI",
//  14: "vLU2JqArU84",
//  15: "MUQgjWfAIv4",
//  16: "3I9tY9d-UPE",
//  17: "hUf7nWDwUXY",
//    18: "SbomIdTWH8U"   
// }

//audio by Ambeo mic
var dictYoutubeAmbeo = {
  1: "bHfYH1X3qMQ",
  2: "oMmGzehHz8I",
  3: "coTEW5bWb_U",
  4: "",
  5: "Pya1ZSjtJkc",
  6: "asXy9f0s7fQ",
  7: "61ykPQsIxmg",
  8: "MMjGUxem810",
  9: "JHg9lxDyycI",
  10: "rOHuu16QDjY",
  11: "WY0bFAvDA-A",
  12: "bH2CpwHc2nI",
  13: "bH2CpwHc2nI",
  14: "SPgXmsCU3Iw",
  15: "yXdVdDxZ_I0",
  16: "o6YOR6L1iC4",
  17: "LNzb-qQ4ctA",
  18: "2mDcAZ-6Czc"   
}

// window.onload = function(){ 
  Speech("Welcome to the website, this is an immersive journey preparation tool for people with vision impairment. You will be exploring Flinders Street Station by listening to different locations with spatial surround sound technology. Let's start with help command.");
// }