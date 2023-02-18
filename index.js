const form = document.querySelector("form");
const button = document.getElementById("submit-btn");
const cardNameInput = document.querySelector(`[data-input="name"]`);
const cardNumberInput = document.querySelector(`[data-input="card-number"]`);
const cardMonthInput = document.querySelector(`[data-input="month"]`);
const cardYearInput = document.querySelector(`[data-input="year"]`);
const cardCvcInput = document.querySelector(`[data-input="cvc"]`);
const thanks = document.querySelector(".thank-you");
const cardName = document.querySelector(".front-card .card_name");
const cardNumberText = document.querySelector(".front-card .card_number");
const cvcText = document.querySelector(".back-card-cvc");

const continueBtn = document.querySelector("#continue-btn");
const cardExpiryMonth = document.querySelector(".card_expiry_month");
const cardExpiryYear = document.querySelector(".card_expiry_year");
// console.log(form);
let errors = 0;

const isValidCardNumber = (cardNumber) => {
  let cardNumberPattern = /^[\d\s\+\-]{0,20}/g;
  return cardNumberPattern.test(String(cardNumber).toLowerCase());
};
const isValidYear = (cardNumber) => {
  let cardNumberPattern = /^[\d]{2}/g;
  return cardNumberPattern.test(String(cardNumber).toLowerCase());
};
const isValidMonth = (cardNumber) => {
  let cardNumberPattern = /^[\d]{2}/g;
  return cardNumberPattern.test(String(cardNumber).toLowerCase());
};
const isValidCvc = (cardNumber) => {
  let cardNumberPattern = /^[\d]{3}/g;
  return cardNumberPattern.test(String(cardNumber).toLowerCase());
};

// console.log(isValidEmail("444-444-444"));

continueBtn.addEventListener("click", () => {
  cardNameInput.value = "";
  cardNumberInput.value = "";
  cardMonthInput.value = "";
  cardYearInput.value = "";
  cardCvcInput.value = "";

  cvcText.textContent = "000";
  cardExpiryYear.textContent = "00";
  cardExpiryMonth.textContent = "00";
  cardNumberText.textContent = "0000 0000 0000 0000";
  cardName.textContent = "JANE APPLESEED";
  form.classList.remove("hidden");
  thanks.classList.add("hidden");
});

form.onsubmit = (e) => {
  e.preventDefault();
  if (!validateFields()) {
    form.classList.add("hidden");
    thanks.classList.remove("hidden");
    console.log("no error");
  } else {
    console.log("have error");
  }
};

// button.addEventListener("click", (e) => {});
cardNames();
cardNumber();
month();
year();
month();
cvc();
function cardNumber() {
  cardNumberInput.onkeyup = function () {
    const removeChar = this.value.replace(/[^0-9\.]/g, ""); // This is to remove alphabets and special characters.
    var removeDot = removeChar.replace(/\./g, ""); // This is to remove "DOT"
    this.value = removeDot;
    const formatedNumber = this.value.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    cardNumberText.textContent = this.value = formatedNumber;

    setSuccess(cardNumberInput);
    if (!cardNumberInput.value.trim()) {
      setError(cardNumberInput, "Enter a Card Number");
      cardNumberText.textContent = "0000 0000 0000 0000";
    }
  };
}

function cardNames() {
  cardNameInput.onkeyup = function () {
    if (!this.value.trim()) {
      setError(cardNameInput, "Enter Card Holder Name");
      cardName.textContent = "JANE APPLESEED";
    } else {
      cardName.textContent = this.value;
      setSuccess(cardNameInput);
    }
  };
}

function month() {
  cardMonthInput.onkeyup = () => {
    if (!cardMonthInput.value.trim()) {
      cardMonthInput.style.border = "2px solid hsl(0, 100%, 66%)";
      cardMonthInput.parentElement.parentElement.querySelector(".error").style.display = "block";
      cardMonthInput.parentElement.parentElement.querySelector(".error").textContent = "can't be blank";
      //   setError(cardMonthInput.parentElement, "Can't be blank")
    } else {
      const removeChar = cardMonthInput.value.replace(/[^0-9\.]/g, ""); // This is to remove alphabets and special characters.
      cardMonthInput.value = removeChar;
      cardMonthInput.parentElement.parentElement.querySelector(".error").style.display = "none";
      cardMonthInput.style.border = "2px solid hsl(var(--NC-light-grayish-violet))";
      cardExpiryMonth.textContent = cardMonthInput.value;
    }
  };
}

function year() {
  cardYearInput.onkeyup = () => {
    if (!cardYearInput.value.trim()) {
      cardYearInput.style.border = "2px solid hsl(0, 100%, 66%)";
      cardYearInput.parentElement.parentElement.querySelector(".error").style.display = "block";
      cardYearInput.parentElement.parentElement.querySelector(".error").textContent = "can't be blank";
      //   setError(cardYearInput.parentElement, "Can't be blank")
    } else {
      const removeChar = cardYearInput.value.replace(/[^0-9\.]/g, ""); // This is to remove alphabets and special characters.
      cardYearInput.value = removeChar;
      cardYearInput.parentElement.parentElement.querySelector(".error").style.display = "none";
      cardYearInput.style.border = "2px solid hsl(var(--NC-light-grayish-violet))";
      cardExpiryYear.textContent = cardYearInput.value;

      setSuccess(cardYearInput);
    }
  };
}

function cvc() {
  cardCvcInput.onkeyup = () => {
    if (!cardCvcInput.value.trim()) setError(cardCvcInput, "Can't be blank");
    else if (!isValidCvc(cardCvcInput.value) && cardCvcInput.value.length !== 3) setError(cardCvcInput, "Enter a valid Number");
    else {
      const removeChar = cardCvcInput.value.replace(/[^0-9\.]/g, ""); // This is to remove alphabets and special characters.
      cardCvcInput.value = removeChar;
      cvcText.textContent = cardCvcInput.value;
      setSuccess(cardCvcInput);
    }
  };
}

function validateFields() {
  errors = 0;
  // const currentStep = document.querySelector(".step.active");

  errors += validateCardNumber();
  errors += validateCardName();
  errors += validateMonth();
  errors += validateYear();
  errors += validateCvc();

  console.log(errors);
  return errors;
}

function validateCardNumber() {
  if (!cardNumberInput.value.trim()) {
    setError(cardNumberInput, "Enter a Card Number");
    errors = 1;
  } else {
    // setSuccess(cardNumberInput);
    // cardNumber();
    errors = 0;
  }
  return errors;
}

function validateCardName() {
  if (!cardNameInput.value.trim()) {
    setError(cardNameInput, "Enter a Card Name");
    errors = 1;
  } else {
    errors = 0;
  }
  return errors;
}

function validateMonth() {
  if (!cardMonthInput.value.trim()) {
    cardMonthInput.style.border = "2px solid hsl(0, 100%, 66%)";
    cardMonthInput.parentElement.parentElement.querySelector(".error").style.display = "block";
    cardMonthInput.parentElement.parentElement.querySelector(".error").textContent = "can't be blank";
    errors = 1;
  } else {
    errors = 0;
  }
  return errors;
}

function validateYear() {
  if (!cardYearInput.value.trim()) {
    cardYearInput.style.border = "2px solid hsl(0, 100%, 66%)";
    cardYearInput.parentElement.parentElement.querySelector(".error").style.display = "block";
    cardYearInput.parentElement.parentElement.querySelector(".error").textContent = "can't be blank";
    errors = 1;
  } else {
    errors = 0;
  }

  return errors;
}

function validateCvc() {
  if (!cardCvcInput.value.trim()) {
    setError(cardCvcInput, "Can't be blank");
    errors = 1;
  } else {
    errors = 0;
  }
  return errors;
}

function setError(element, message) {
  const formControl = element.parentElement;
  const error = formControl.querySelector(".error");
  element.style.border = "2px solid hsl(0, 100%, 66%)";
  error.style.display = "block";
  error.textContent = message;
}
function setSuccess(element) {
  const formControl = element.parentElement;
  const error = formControl.querySelector(".error");
  element.style.border = "2px solid hsl(var(--NC-light-grayish-violet))";
  error.style.display = "none";
  //   error.textContent = message;
}
