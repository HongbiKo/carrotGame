"use strict";

import Field from "./field.js";
import * as sound from "./sound.js";

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.startBtn = document.querySelector(".game__btn");

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.startBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setOnClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startTimer();
    sound.playBg();
  }
  stop() {
    this.started = false;
    this.stopTimer();
    this.hideStopBtn();
    this.onGameStop && this.onGameStop("cancel");
    sound.playAlert();
    sound.stopBg();
  }

  finish(win) {
    this.started = false;
    this.hideStopBtn();
    if (win) {
      sound.gameWin();
    } else {
      sound.playBug();
    }
    this.stopTimer();
    sound.stopBg();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === "bug") {
      this.finish(false);
    }
  };

  showStopBtn() {
    const icon = document.querySelector(".fa-solid");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.startBtn.style.visibility = "visible";
  }
  hideStopBtn() {
    this.startBtn.style.visibility = "hidden";
  }
  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }
  startTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.textContent = `${minutes} : ${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.textContent = this.carrotCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.textContent = this.carrotCount - this.score;
  }
}
