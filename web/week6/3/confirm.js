function loadData() {
	var name = document.getElementById("confirm_name")
	var age = document.getElementById("confirm_age")
	var email = document.getElementById("confirm_email")
	var phone = document.getElementById("confirm_phone")
	var occupation = document.getElementById("confirm_occupation")


	lastname = sessionStorage.getItem("lastname");
	name.textContent = sessionStorage.firstname + " " + lastname;
	email.textContent = sessionStorage.email;
	phone.textContent = sessionStorage.phonenumber;
	age.textContent = sessionStorage.age;
	occupation.textContent = sessionStorage.occupation;
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