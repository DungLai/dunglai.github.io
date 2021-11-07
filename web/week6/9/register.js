function validate() {
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

	var payment = document.getElementById("payment")
	sessionStorage.payment = payment.value

	var error_msg = ""
	// R1
	if (firstname.match("^[A-Z a-z]{1,30}$") == null) {
		error_msg += "First name has to contain only characters and between 1 or 30 characters<br>";
	}

	// R1
	if (lastname.match("^[A-Z a-z]{1,30}$") == null) {
		error_msg += "Last name has to contain only characters and between 1 or 30 characters<br>";
	}

	//R2
	if (email.match("^[a-zA-Z]*@[a-z.A-Z]*$") == null) {
		error_msg += "Email has to contain @<br>";
	}

	//R3
	if (phonenumber.match("^((/+84)|0)[0-9]{9,10}$") == null) {
		error_msg += "Phone number has to start with +84 or 0 and is between 9 or 10 digits<br>";
	}

	//R4
	if (age.match("^((([0-9])|([0-9][0-9])|(1[0-5][0-9]))|(150))$") == null) {
		error_msg += "Age has to be a number less than 150<br>";
	}

	// R5
	if (sessionStorage.occupation == "highschool"){
		if (parseInt(age) > 18){
			error_msg += "If highschool then age need to be less than or equal to 18<br>";
		}
	}

	if (error_msg == "") {
		return true
	} else {
		document.getElementById("error").innerHTML = error_msg;
		return false
	}
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

		document.getElementById("payment").value = sessionStorage.payment;
	}
}

function init() {
	var regForm = document.getElementById("registerForm");
	regForm.onsubmit = validate;
	prefillData()
}

window.onload = init;