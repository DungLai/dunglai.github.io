
var messages = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'Chatbot' //name of the chatbot

//edit this function to change what the chatbot says
function chatbotResponse() {
  botMessage = "Hi, I'm your virtual assistant, let's start with help command"; //the default message

  if (lastUserMessage === 'hi') {
    botMessage = 'Whazz up haumie';
  }

  if (lastUserMessage === 'what is your name') {
    botMessage = 'My name is Chris brosky' ;
  }
  if (lastUserMessage === 'what do you wanna get to eat') {
    botMessage = 'Well, the hegemony of our culture is rooted in deep seated hatred towards the black community. Jail systems are run privately which is part of the corruption of our prison system in America. Also, we have a broken justice system.';
  }
  
  if (lastUserMessage === 'HAMSTER') {
    botMessage = 'HAAAAMSTAAAAA!';
  }
  
  if (lastUserMessage === 'Chris we gotta go') {
    botMessage = '.........';
  }
    if (lastUserMessage === 'CHRIS!') {
    botMessage = 'Wait what are we doing';
  }
  if (lastUserMessage === 'why were you late') {
    botMessage = 'My mom was trippin on some shit';
  }
  
  if (lastUserMessage === 'Why were you not at school') {
    botMessage = 'Eh, did not feel like goin';
  }
    if (lastUserMessage === 'what time is it') {
    botMessage = 'ITS MACARONI TIME';
  }
  
    if (lastUserMessage === 'Bro you wanna hang today') {
    botMessage = 'YEEEEE HAUMIE';
  }
  
  
    if (lastUserMessage === 'Put on a song') {
    botMessage = 'PUT ON SOME JUICE!';
  }
  
  if (lastUserMessage === 'hey man can you pick us up') {
    botMessage = 'of course bro';
  }
  
   if (lastUserMessage === 'dude where are you') {
    botMessage = 'dude I dont know';
  }
  

  if (lastUserMessage === 'dude freestyle') {
    botMessage = 'boom bomadad boom bodadad aummmmmm usuag lalalalalalla yeyeyeyeeeee boom bomadad boom bodadad aummmmmm usuag lalalalalalla yeyeyeyeeeee boom bomadad boom bodadad aummmmmm usuag lalalalalalla yeyeyeyeeeee';
  }
  
    if (lastUserMessage === 'DUDE') {
    botMessage = 'DUDE!!!!!';
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
    messages.push(lastUserMessage);
    //takes the return value from chatbotResponse() and outputs it
    chatbotResponse()
      //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage)
      // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few messages to html
    for (var i = 1; i < 8; i++) {
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

// pop up video

    function showVideo(location){
      document.getElementById('youtubeVideo').innerHTML = dictTime[location] + " " +dictDesc[location] + '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + dictYoutube[location] + '?autoplay=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
      document.getElementById('youtubeVideoAmbeo').innerHTML = '<br> <iframe width="560" height="315" src="https://www.youtube.com/embed/' + dictYoutubeAmbeo[location] + '?autoplay=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
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
      1: "",
      2: "you are facing North, there is a pedestrian cross road in front of you. Behind you is Flinder Street entrance and there will be some steps to get into Flinder Street  Station ",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
      10: "",
      11: "",
      12: "",
      13: "",
      14: "",
      15: "",
      16: "",
      17: "",
      18: ""
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
      12: "Outside barrier (facing Swanston St)",
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
// fit content to right-body div
$(function() {
    while( $('#right-body div').height() > $('#right-body').height() ) {
        $('#right-body div').css('font-size', (parseInt($('#right-body div').css('font-size')) - 1) + "px" );
    }
});