function loadData() {
	var name = document.getElementById("confirm_name")
	var age = document.getElementById("confirm_age")
	var email = document.getElementById("confirm_email")
	var phone = document.getElementById("confirm_phone")
	var occupation = document.getElementById("confirm_occupation")
	var courses = document.getElementById("confirm_courses")

	lastname = sessionStorage.getItem("lastname");
	name.textContent = sessionStorage.firstname + " " + lastname;
	email.textContent = sessionStorage.email;
	phone.textContent = sessionStorage.phonenumber;
	age.textContent = sessionStorage.age;
	occupation.textContent = sessionStorage.occupation;

	var yourCourses = ""
	if (sessionStorage.logicmath == "true") {
		yourCourses += "logicmath, ";
	}
	if (sessionStorage.web == "true") {
		yourCourses += "web, ";
	}
	if (sessionStorage.python == "true") {
		yourCourses += "python, ";
	}
	if (sessionStorage.ai == "true") {
		yourCourses += "ai, ";
	}
	if (sessionStorage.datascience == "true") {
		console.log("123")
		yourCourses += "datascience, ";
		console.log(yourCourses);
	}
	if (sessionStorage.game == "true") {
		yourCourses += "game, ";
	}
	yourCourses = yourCourses.substring(0, yourCourses.length - 2);
	courses.textContent = yourCourses;
}

function cancelButton() {
	window.location = "register.html";
}

function init() {
	loadData();
	var cancel = document.getElementById("cancel_button");
	cancel.onclick = cancelButton;
}

window.onload = init;