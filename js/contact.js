const form = document.querySelector("#contactForm");
const messagetoSpaceX = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const message = document.querySelector(".message");

function validateForm(event) {
	event.preventDefault();
	console.log(event);

	if (checkLengthOfInput(name.value, 0)) {
		nameError.style.display = "none";
	} else {
		nameError.style.display = "block";
	}

	if (validateEmail(email.value)) {
		emailError.style.display = "none";
	} else {
		emailError.style.display = "block";
	}

	if (checkLengthOfInput(messagetoSpaceX.value, 0)) {
		messageError.style.display = "none";
	} else {
		messageError.style.display = "block";
	}

}
form.addEventListener("submit", validateForm);

function submitForm(event) {
	event.preventDefault();

	if (
		checkLengthOfInput(messagetoSpaceX.value, 0) &&
		checkLengthOfInput(name.value, 0) &&
		validateEmail(email.value)
	) {
		message.style.display = "block";
		message.innerHTML = `<div class="textMessage">
							<img src="icons/spaceship.png" alt="Spaceship icon">
							<p>Thank you for contacting us. We will get back in touch with you shortly!</p></div>`;
		form.reset();
		window.scroll(0, 707);
	} else {
		message.style.display = "none";
	}
}
form.addEventListener("submit", submitForm);

function checkLengthOfInput(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}

function validateEmail(email) {
	const regEx = /\S+@\S+\.\S+/;
	const patternMatches = regEx.test(email);
	return patternMatches;
}
