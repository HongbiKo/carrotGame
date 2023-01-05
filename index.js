"use strict";

const field = document.querySelector(".game__area");
const fieldRect = field.getBoundingClientRect();
const startBtn = document.querySelector(".game__btn");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const gamePopup = document.querySelector(".popUp");
const popUptext = document.querySelector(".popUp__message");
const popUpRefresh = document.querySelector(".popUp__again");

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 5;

const carrotSound = new Audio("./sounds/carrot_pull.mp3");
const bugSound = new Audio("./sounds/bug_pull.mp3");
const alertSound = new Audio("./sounds/alert.wav");
const bgSound = new Audio("./sounds/bg.mp3");
const gameWinSound = new Audio("./sounds/game_win.mp3");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);

startBtn.addEventListener("click", function () {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener("click", function () {
  hidePopUp();
  startGame();
});

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startTimer();
  playSound(bgSound);
}
function stopGame() {
  started = false;
  stopTimer();
  hideStopBtn();
  showPopup("Do you wanna play one more?");
  playSound(alertSound);
  stopSound(bgSound);
}
function finishGame(win) {
  started = false;
  hideStopBtn();
  if (win) {
    playSound(gameWinSound);
  } else {
    playSound(bugSound);
  }
  stopTimer();
  showPopup(win ? "YOU WON" : "YOU LOST");
  stopSound(bgSound);
}

function showStopBtn() {
  const icon = document.querySelector(".fa-solid");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  startBtn.style.visibility = "visible";
}
function hideStopBtn() {
  startBtn.style.visibility = "hidden";
}
function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}
function startTimer() {
  let remainingTimeSec = GAME_DURATION;
  updateTimerText(remainingTimeSec);
  timer = setInterval(function () {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}
function stopTimer() {
  clearInterval(timer);
}
function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.textContent = `${minutes} : ${seconds}`;
}
function showPopup(text) {
  popUptext.textContent = text;
  gamePopup.classList.remove("popUp--hide");
}
function hidePopUp() {
  gamePopup.classList.add("popUp--hide");
}

function initGame() {
  field.innerHTML = "";
  gameScore.textContent = CARROT_COUNT;
  score = 0;
  addItem("carrot", CARROT_COUNT, "imgs/carrot.png");
  addItem("bug", BUG_COUNT, "imgs/bug.png");
}

function onFieldClick(e) {
  if (!started) {
    return;
  }
  const target = e.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    finishGame(false);
  }
}
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}
function updateScoreBoard() {
  gameScore.textContent = CARROT_COUNT - score;
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
