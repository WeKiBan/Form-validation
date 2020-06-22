// query selector for form
const form = document.querySelector('.form');

// email query selectors
const email = document.querySelector('#mail');
const emailError = document.querySelector('.email-error');

// country query selectors
const country = document.querySelector('#country');
const countryError = document.querySelector('.country-error');

// postcode query selectors
const postcode = document.querySelector('#postcode');
const postcodeError = document.querySelector('.postcode-error');
// postcode regex
const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

// password query selectors
const password = document.querySelector('#password');
const passwordError = document.querySelector('.password-error');
// password regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// confirm password query selectors
const confirmPassword = document.querySelector('#confirm-password');
const confirmPasswordError = document.querySelector('.confirm-password-error');

// validation for email
function checkEmailValidity() {
  // check top see if email input is valid if it is change text content of error to nothing and return true;
  if (email.validity.valid) {
    emailError.textContent = '';
    email.classList.remove('error-border');
    emailError.classList.remove('error');
    return true;
  }
  // if the value is in missing, too short or invalid the corresponding error message is added to the error span
  if (email.validity.valueMissing) {
    email.classList.add('error-border');
    emailError.classList.add('error');
    emailError.textContent = 'You need to enter an email address!';
  } else if (email.validity.typeMismatch) {
    email.classList.add('error-border');
    emailError.classList.add('error');
    emailError.textContent = 'Entered value needs to be an email address!';
    return false;
  } else if (email.validity.tooShort) {
    email.classList.add('error-border');
    emailError.classList.add('error');
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}`;
  }
  return false;
}

email.addEventListener('input', checkEmailValidity);

// validation for country selection

function checkCountryValidity() {
  // check if country input is valid if valid remove error message;
  if (country.validity.valid) {
    country.classList.remove('error-border');
    countryError.classList.remove('error');
    countryError.textContent = '';
    return true;
  }
  // if invalid add error message to span
  country.classList.add('error-border');
  countryError.classList.add('error');
  countryError.textContent = 'You must select a country';
  return false;
}

country.addEventListener('input', checkCountryValidity);

// validation for postcode input
function checkPostcodeValidity() {
  // produces error if value is missing
  if (postcode.validity.valueMissing) {
    postcode.classList.add('error-border');
    postcodeError.classList.add('error');
    postcodeError.textContent = 'Please enter a postcode.';
    return false;
  }
  // produces error if value is too short
  if (postcode.validity.tooShort) {
    postcode.classList.add('error-border');
    postcodeError.classList.add('error');
    postcodeError.textContent = 'Postcode is too short. Please enter a valid postcode.';
    return false;
  }
  // tests value against regex and produces error if postcode is wrong format
  if (!postcodeRegex.test(postcode.value)) {
    postcode.classList.add('error-border');
    postcodeError.classList.add('error');
    postcodeError.textContent = 'Invalid Postcode. Please enter a valid postcode.';
    return false;
  }
  // if the value passes the tests it removes the error and returns true
  postcode.classList.remove('error-border');
  postcodeError.classList.remove('error');
  postcodeError.textContent = '';
  return true;
}

postcode.addEventListener('input', checkPostcodeValidity);

// validate the password
function checkPasswordValidity() {
  // produces error if value is missing
  if (password.validity.valueMissing) {
    password.classList.add('error-border');
    passwordError.classList.add('error');
    passwordError.textContent =
      'Please enter a password, Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.';
    return false;
  }
  // tests value against regex and produces error if password is wrong format
  if (!passwordRegex.test(password.value)) {
    password.classList.add('error-border');
    passwordError.classList.add('error');
    passwordError.textContent =
      'Invalid password, must be a minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.';
    return false;
  }
  // if the value passes the tests it removes the error and returns true
  password.classList.remove('error-border');
  passwordError.classList.remove('error');
  passwordError.textContent = '';
  return true;
}

password.addEventListener('input', checkPasswordValidity);

// validate the password confirmation
function checkConfirmPasswordValidity() {
  if (confirmPassword.validity.valueMissing) {
    confirmPassword.classList.add('error-border');
    confirmPasswordError.classList.add('error');
    confirmPasswordError.textContent = 'Please confirm your password.';
    return false;
  }
  if (confirmPassword.value !== password.value) {
    confirmPassword.classList.add('error-border');
    confirmPasswordError.classList.add('error');
    confirmPasswordError.textContent = 'Passwords do not match, please try again.';
    return false;
  }
  confirmPassword.classList.remove('error-border');
  confirmPasswordError.classList.remove('error');
  confirmPasswordError.textContent = '';
  return true;
}

confirmPassword.addEventListener('input', checkConfirmPasswordValidity);

// validate entire form when submitted prevent default if form is incomplete.

form.addEventListener('submit', (e) => {
  // checks to make sure all values in the form are valid if there are any mistakes it prevents the form from being submitted.
  checkEmailValidity();
  checkCountryValidity();
  checkPostcodeValidity();
  checkPasswordValidity();
  checkConfirmPasswordValidity();

  if (
    !checkEmailValidity() ||
    !checkCountryValidity() ||
    !checkPostcodeValidity() ||
    !checkPasswordValidity() ||
    !checkConfirmPasswordValidity()
  ) {
    e.preventDefault();
  }
});
