import PopUp from "./popup.js";
import Field from "./field.js";

const startBtn = document.querySelector(".game__btn");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

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

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    finishGame(false);
  }
}

startBtn.addEventListener("click", function () {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
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
  gameFinishBanner.showWithText("Do you wanna play one more?");
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
  gameFinishBanner.showWithText(win ? "YOU WON" : "YOU LOST");
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

function initGame() {
  gameScore.textContent = CARROT_COUNT;
  score = 0;
  gameField.init();
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
