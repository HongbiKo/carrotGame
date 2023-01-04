"use strict";

const field = document.querySelector(".game__area");
const fieldRect = field.getBoundingClientRect();
const startBtn = document.querySelector(".game__btn");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 5;

let started = false;
let score = 0;
let timer = undefined;

startBtn.addEventListener("click", function () {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started != started;
});

function startGame() {
  initGame();
  showStopBtn();
  showTimerAndScore();
  startTimer();
}
function stopGame() {}
function showStopBtn() {
  const icon = document.querySelector(".fa-play");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}
function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}
function startTimer() {
  let remainingTimeSec = GAME_DURATION;
  updateTimerText(remainingTimeSec);
  setInterval(function () {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    } else {
      updateTimerText(--remainingTimeSec);
    }
  }, 1000);
}
function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.textContent = `${minutes} : ${seconds}`;
}

function initGame() {
  field.innerHTML = "";
  gameScore.textContent = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "imgs/carrot.png");
  addItem("bug", BUG_COUNT, "imgs/bug.png");
}

function addItem(className, count, path) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", path);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
