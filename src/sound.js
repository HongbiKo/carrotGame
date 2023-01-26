"use strict";

const carrotSound = new Audio("./sounds/carrot_pull.mp3");
const bugSound = new Audio("./sounds/bug_pull.mp3");
const alertSound = new Audio("./sounds/alert.wav");
const bgSound = new Audio("./sounds/bg.mp3");
const gameWinSound = new Audio("./sounds/game_win.mp3");

export function playCarrot() {
  playSound(carrotSound);
}

export function playBug() {
  playSound(bugSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playBg() {
  playSound(bgSound);
}

export function gameWin() {
  playSound(gameWinSound);
}

export function stopBg() {
  stopSound(bgSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
