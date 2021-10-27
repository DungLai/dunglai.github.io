function saveData() {
	var firstname = document.getElementById("firstname").value;
	var lastname = document.getElementById("lastname").value;
	var age = document.getElementById("age").value;
	var phonenumber = document.getElementById("phonenumber").value;
	var email = document.getElementById("email").value;
	sessionStorage.firstname = firstname;
	sessionStorage.setItem("lastname", lastname);
	sessionStorage.age = age;
	sessionStorage.email = email;
	sessionStorage.phonenumber = phonenumber;

	var occupationArray = document.getElementById("radio_occupation").getElementsByTagName("input");
	for (var i=0; i < occupationArray.length; i++) {
		if (occupationArray[i].checked == true) {
			sessionStorage.occupation = occupationArray[i].value;
		}
	}

	var logicmath = document.getElementById("logicmath").checked;
	var python = document.getElementById("python").checked;
	var web = document.getElementById("web").checked;
	var datascience = document.getElementById("datascience").checked;
	var game = document.getElementById("game").checked;
	var ai = document.getElementById("ai").checked;

	sessionStorage.logicmath = logicmath;
	sessionStorage.python=python;
	sessionStorage.datascience=datascience;
	sessionStorage.game=game;
	sessionStorage.ai=ai;
	sessionStorage.web=web;
}

function prefillData() {
	if (sessionStorage.firstname != null) {
		document.getElementById("firstname").value = sessionStorage.firstname;
		document.getElementById("lastname").value = sessionStorage.lastname;
		document.getElementById("age").value = sessionStorage.age;
		document.getElementById("email").value = sessionStorage.email;
		document.getElementById("phonenumber").value = sessionStorage.phonenumber;
		switch (sessionStorage.occupation) {
			case "highschool":
				document.getElementById("highschool").checked = true;
				break;
			case "university":
				document.getElementById("university").checked = true;
				break;
			case "working":
				document.getElementById("working").checked = true;
				break;
			case "retired":
				document.getElementById("retired").checked = true;
				break;
		}
		if (sessionStorage.logicmath == "true") {
			document.getElementById("logicmath").checked = true;
		} 
		if (sessionStorage.datascience == "true") {
			document.getElementById("datascience").checked = true;
		} 
		if (sessionStorage.game == "true") {
			document.getElementById("game").checked = true;
		} 
		if (sessionStorage.ai == "true") {
			document.getElementById("ai").checked = true;
		} 
		if (sessionStorage.web == "true") {
			document.getElementById("web").checked = true;
		} 
		if (sessionStorage.python == "true") {
			document.getElementById("python").checked = true;
		} 
	}
}

function init() {
	var regForm = document.getElementById("registerForm");
	regForm.onsubmit = saveData;
	prefillData()
}

window.onload = init;