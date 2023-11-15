import Predictor from "./class/Predictor.js";

/**
 * Adds a character to an input field if the length of the current value is equal to the length of the first part and the character is not already included.
 * Removes the character from the input field if the Backspace key is pressed and the current value ends with the character.
 * @param {number} lengthFirstPart - The length of the first part of the input value.
 * @param {string} character - The character to add or remove from the input value.
 * @param {Event} event - The event object for the input field.
 */
function putCharacterInInput(lengthFirstPart, character, event) {
  const currentValue = event.target.value;

  if (
    currentValue.length === lengthFirstPart &&
    !currentValue.includes(character)
  ) {
    event.target.value += character;
  }

  if (event.key === "Backspace" && currentValue.endsWith(character)) {
    event.target.value = currentValue.slice(0, -1);
  }
}

/**
 * Sets the current date and time to the given input fields.
 * @param {HTMLInputElement} date - The input field for the date.
 * @param {HTMLInputElement} time - The input field for the time.
 */
function setCurrentDateTime(date, time) {
  const today = new Date().toLocaleDateString().slice(0, 10);
  const currentDay = today.slice(0, 2);
  const currentMonth = today.slice(3, 5);
  const currentYear = today.slice(6, 10);
  date.value = `${currentYear}-${currentDay}-${currentMonth}`;

  const currentTime = new Date();
  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  time.value = formattedTime;
}

/**
 * Initializes the main function.
 * @function
 * @returns {void}
 */
function main() {
  const form = document.getElementById("form");
  const plateNumber = document.getElementById("plateNumber");
  const date = document.getElementById("date");
  const time = document.getElementById("time");
  const cleanBtn = document.getElementById("cleanBtn");
  const resultContainer = document.getElementById("result");

  /**
   * Clears the plate number input and result container, and sets the current date and time.
   * @function
   * @returns {void}
   */
  cleanBtn.addEventListener("click", () => {
    plateNumber.value = "";
    resultContainer.style.display = "none";
    setCurrentDateTime(date, time);
  });

  /**
   * Adds a hyphen to the plate number input after the third character.
   * @function
   * @param {number} index - The index where the hyphen should be added.
   * @param {string} character - The character to be added (in this case, "-").
   * @param {event} e - The keydown event.
   * @returns {void}
   */
  plateNumber.addEventListener("keydown", (e) => {
    putCharacterInInput(3, "-", e);
  });

  /**
   * Verifies if the plate number is valid and if the car is allowed to be on the road at the given date and time.
   * @function
   * @param {event} e - The submit event.
   * @returns {void}
   */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const plateNumberDigit = plateNumber.value.substr(
      3,
      plateNumber.value.length - 1
    );

    if (isNaN(plateNumberDigit)) {
      alert("Please introduce a valid plate number");
      return;
    }

    const predictor = new Predictor(plateNumber.value, date.value, time.value);
    const isPicoYPlaca = predictor.verifyPicoYPlaca();

    if (isPicoYPlaca) resultContainer.classList.add("pico_placa");
    else resultContainer.classList.remove("pico_placa");

    resultContainer.style.display = "block";
    resultContainer.innerHTML = isPicoYPlaca
      ? "Car can't be on the road"
      : "Car can be on the road";
  });

  setCurrentDateTime(date, time);
}

main();
