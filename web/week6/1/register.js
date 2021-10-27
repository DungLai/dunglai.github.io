function saveData() {
	var firstname = document.getElementById("firstname").value;
	var lastname = document.getElementById("lastname").value;
	var age = document.getElementById("age").value;
	var phone = document.getElementById("phonenumber").value;
	var email = document.getElementById("email").value;
	sessionStorage.firstname = firstname;
	sessionStorage.setItem("lastname", lastname);
	sessionStorage.age = age;
	sessionStorage.email = email;
	sessionStorage.phone = phone;

}

function init() {
	var regForm = document.getElementById("registerForm");
	regForm.onsubmit = saveData;
}

window.onload = init;