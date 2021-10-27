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
	var i=0;
	while (i < occupationArray.length) {
		if (occupationArray[i].checked == true) {
			sessionStorage.occupation = occupationArray[i].value;
		}
		i+=1;
	}

	// for (var i=0; i < occupationArray.length; i++) {
	// 	if (occupationArray[i].checked == true) {
	// 		sessionStorage.occupation = occupationArray[i].value;
	// 	}
	// }
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