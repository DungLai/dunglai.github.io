function cancelBooking() {
	window.location = "register.html";
}
 
function test() {
	document.getElementById("confirm_name").textContent = sessionStorage.firstname + " " + sessionStorage.lastname;
}

function init () {
	test();
	var bookForm = document.getElementById("bookform");// link the variable to the HTML element
	bookForm.onsubmit = validate;          /* assigns functions to corresponding events */
	var cancel = document.getElementById("cancelButton");
	cancel.onclick = cancelBooking;
 }

window.onload = init;
