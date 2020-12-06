class Result {
  static moneyWinInGame(result, bid) {
    if (result === "sevens") return 8 * bid;
    else if (result === "oranges") return bid;
    else if (result === "bars") return 9 * bid;
    else if (result === "cherrie") return 5 * bid;
    else if (result === "bigWins") return 7 * bid;
    else if (result === "bananas") return 2 * bid;
    else if (result === "lemons") return 3 * bid;
    else if (result === "plums") return 4 * bid;
    else if (result === "watermelons") return 6 * bid;
    else return 0
  }

  static checkWinner(draw) {
    if (draw[0] === 0 && draw[0] === draw[1] && draw[1] === draw[2]) return "sevens";
    else if (draw[0] === 1 && draw[0] === draw[1] && draw[1] === draw[2]) return "oranges";
    else if (draw[0] === 2 && draw[0] === draw[1] && draw[1] === draw[2]) return "bars";
    else if (draw[0] === 3 && draw[0] === draw[1] && draw[1] === draw[2]) return "cherries";
    else if (draw[0] === 4 && draw[0] === draw[1] && draw[1] === draw[2]) return "bigWins";
    else if (draw[0] === 5 && draw[0] === draw[1] && draw[1] === draw[2]) return "bananas";
    else if (draw[0] === 6 && draw[0] === draw[1] && draw[1] === draw[2]) return "lemons";
    else if (draw[0] === 7 && draw[0] === draw[1] && draw[1] === draw[2]) return "plums";
    else if (draw[0] === 8 && draw[0] === draw[1] && draw[1] === draw[2]) return "watermelons";
    else return false;
  }

}