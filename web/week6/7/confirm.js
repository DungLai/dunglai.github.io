function loadDataAndCalculatePrice() {
	totalPrice = 0;
	var name = document.getElementById("confirm_name")
	var age = document.getElementById("confirm_age")
	var email = document.getElementById("confirm_email")
	var phone = document.getElementById("confirm_phone")
	var occupation = document.getElementById("confirm_occupation")
	var courses = document.getElementById("confirm_courses")
	var payment = document.getElementById("confirm_payment")
	var total = document.getElementById("confirm_total")

	lastname = sessionStorage.getItem("lastname");
	name.textContent = sessionStorage.firstname + " " + lastname;
	email.textContent = sessionStorage.email;
	phone.textContent = sessionStorage.phonenumber;
	age.textContent = sessionStorage.age;
	occupation.textContent = sessionStorage.occupation;

	var yourCourses = ""
	if (sessionStorage.logicmath == "true") {
		totalPrice += 449;
		yourCourses += "logicmath, ";
	}
	if (sessionStorage.web == "true") {
		totalPrice += 749;
		yourCourses += "web, ";
	}
	if (sessionStorage.python == "true") {
		totalPrice += 799;
		yourCourses += "python, ";
	}
	if (sessionStorage.ai == "true") {
		totalPrice += 499;
		yourCourses += "ai, ";
	}
	if (sessionStorage.datascience == "true") {
		totalPrice += 249;
		yourCourses += "datascience, ";
	}
	if (sessionStorage.game == "true") {
		totalPrice += 149;
		yourCourses += "game, ";
	}
	yourCourses = yourCourses.substring(0, yourCourses.length - 2);
	courses.textContent = yourCourses;
	payment.textContent = sessionStorage.payment;
	total.textContent = totalPrice;
}

function cancelButton() {
	window.location = "register.html";
}


function init() {
	loadDataAndCalculatePrice();
	var cancel = document.getElementById("cancel_button");
	cancel.onclick = cancelButton;
}

window.onload = init;