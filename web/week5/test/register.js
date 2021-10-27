function test() {
	var firstname = document.getElementById("firstname").value;
	var lastname = document.getElementById("lastname").value;
	sessionStorage.firstname = firstname;
	sessionStorage.lastname = lastname;
}

function prefill() {
	document.getElementById("firstname").value = sessionStorage.firstname;
	document.getElementById("lastname").value = sessionStorage.lastname;
}

function init() {
	prefill();
	var regForm = document.getElementById("registerForm"); // get ref to the HTML element
	regForm.onsubmit = test; // register the event listener
}

window.onload = init;