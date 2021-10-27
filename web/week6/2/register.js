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
}

function prefillData() {
	if (sessionStorage.firstname != null) {
		document.getElementById("firstname").value = sessionStorage.firstname;
		document.getElementById("lastname").value = sessionStorage.lastname;
		document.getElementById("age").value = sessionStorage.age;
		document.getElementById("email").value = sessionStorage.email;
		document.getElementById("phonenumber").value = sessionStorage.phonenumber;
	}
}

function init() {
	var regForm = document.getElementById("registerForm");
	regForm.onsubmit = saveData;
	prefillData()
}

window.onload = init;