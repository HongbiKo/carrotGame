export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".popUp");
    this.popUpText = document.querySelector(".popUp__message");
    this.popUpRefresh = document.querySelector(".popUp__again");
    this.popUpRefresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.textContent = text;
    this.popUp.classList.remove("popUp--hide");
  }

  hide() {
    this.popUp.classList.add("popUp--hide");
  }
}
