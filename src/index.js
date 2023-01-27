import PopUp from "./popup.js";
import Game from "./game.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 5;

const gameFinishBanner = new PopUp();
const game = new Game(5, 5, 5);
game.setGameStopListener((reason) => {
  console.log(reason);
  let message;
  switch (reason) {
    case "cancel":
      message = "REPLY?";
      break;
    case "win":
      message = "YOU WON!";
      break;
    case "lose":
      message = "YOU LOST";
      break;
    default:
      throw new Error("Not valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
