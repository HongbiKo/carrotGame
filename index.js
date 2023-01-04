"use strict";

const field = document.querySelector(".game__area");
const fieldRect = field.getBoundingClientRect();
const CARROT_SIZE = 80;

function initGame() {
  addItem("carrot", 5, "imgs/carrot.png");
  addItem("bug", 5, "imgs/bug.png");
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

initGame();
