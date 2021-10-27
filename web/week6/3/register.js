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

	var highschool = document.getElementById("highschool").checked;
	var university = document.getElementById("university").checked;
	var working = document.getElementById("working").checked;
	var retired = document.getElementById("retired").checked;

	if (highschool == true) {
		sessionStorage.occupation = document.getElementById("highschool").value;
	} 

	if (university == true) {
		sessionStorage.occupation = document.getElementById("university").value;
	}
	if (working == true) {
		sessionStorage.occupation = document.getElementById("working").value;
	} 
	if (retired == true) {
		sessionStorage.occupation = document.getElementById("retired").value;
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
	}
}

function init() {
	var regForm = document.getElementById("registerForm");
	regForm.onsubmit = saveData;
	prefillData()
}

window.onload = init;