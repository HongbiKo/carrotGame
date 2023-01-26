"use strict";

import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__area");
    this.fieldRect = this.field.getBoundingClientRect();
    //this binding 3가지 방법
    // 1. this.onClick = this.onClick.bind(this);
    /* 
    2.this.field.addEventListener("click", (event) => {
      this.onClick(event);
    });
    */
    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "imgs/carrot.png");
    this._addItem("bug", this.bugCount, "imgs/bug.png");
  }

  setOnClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, path) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", path);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  // 3.
  onClick = (e) => {
    const target = e.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick("bug");
    }
  };
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
