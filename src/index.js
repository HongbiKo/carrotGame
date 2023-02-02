import PopUp from "./popup.js";
import { Reason, GameBuilder } from "./game.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 5;

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(5)
  .withBugCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "REPLY?";
      break;
    case Reason.win:
      message = "YOU WON!";
      break;
    case Reason.lose:
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
