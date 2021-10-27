function init() {
	var html_btn = document.getElementById("btn");
	html_btn.onclick = convert_button_click;

	var h2 = document.getElementById("click_h2");
	h2.onclick = h2_click;

	var all_h3 = document.getElementsByTagName("h3");
	var i=0;
	while (i < all_h3.length) {
		all_h3[i].onclick = all_h3_click;
		i++;
	}
}

function all_h3_click() {
	var h3_content = document.getElementById("h3_content");
	h3_content.innerHTML = "You click on of the h3 element."
}

function h2_click() {
	var h2_content = document.getElementById("h2_content");
	h2_content.innerHTML = "<h1>You clicked h2 !!!</h1>";
}

function print_conversion(usd, vnd) {
	var html_message = document.getElementById("message");
	html_message.textContent = "You enter: " + usd + " USD, this is converted to VND: " + vnd + "k";
}

function convert_button_click() {
	var usd = prompt("Enter USD: ");
	var vnd = usd*23;
	print_conversion(usd, vnd)
}

window.onload = init;