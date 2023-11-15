import Predictor from "./class/Predictor.js";

const form = document.getElementById("form");
const plateNumber = document.getElementById("plateNumber");
const date = document.getElementById("date");
const time = document.getElementById("time");

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

time.addEventListener("keydown", (e) => {
  putCharacterInInput(2, ":", e);
});

plateNumber.addEventListener("keydown", (e) => {
  putCharacterInInput(3, "-", e);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const predictor = new Predictor(plateNumber.value, date.value, time.value);
  const result = predictor.verifyPicoYPlaca();

  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = result;
});
