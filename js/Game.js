class Game {
  constructor(start) {

    this.stats = new Statistics();
    this.wallet = new Wallet(start);
    document.getElementById('start').addEventListener('click',
      this.startGame.bind(this));
    this.spanWallet = document.querySelector('.game-data__wallet-value')
    this.inputBid = document.getElementById('bid');
    this.spanResult = document.querySelector('.game-data__result');
    this.spanGames = document.querySelector('.game-data__game-number');
    this.spanWins = document.querySelector('.game-data__wins');
    this.spanLoses = document.querySelector('.game-data__loses');
    this.startPositions = [0, 0, 0]
    this.render()

  }
  render(money = this.wallet.getWalletValue(), result = "", stats = [0, 0, 0], bid = 0, wonMoney = 0) {
    this.spanWallet.textContent = `${money}$`;
    if (result) {
      result = `You win ${wonMoney}$. `
      this.spanResult.style.color = "green";
    } else if (!result && result !== "") {
      result = `You lose ${bid}$. `
      this.spanResult.style.color = "red";
    }
    this.spanResult.textContent = result;
    this.spanGames.textContent = stats[0];
    this.spanWins.textContent = stats[1];
    this.spanLoses.textContent = stats[2];
    this.inputBid.value = ""

  }

  startGame() {
    this.spanResult.textContent = "";
    if (this.inputBid.value < 1) return alert('Wrong stake')
    const bid = Math.floor(this.inputBid.value);

    if (!this.wallet.checkCanPlay(bid)) {
      return alert('You do not have enough money or invalid value')
    }
    this.wallet.changeWallet(bid, '-');
    this.spanWallet.textContent = `${this.wallet.getWalletValue()}$`;
    this.draw = new Draw(this.startPositions[0], this.startPositions[1], this.startPositions[2]);
    const resultsArray = this.draw.getDrawResult();
    this.startPositions = this.draw.getStartPosition()
    const win = Result.checkWinner(resultsArray)
    const wonMoney = Result.moneyWinInGame(win, bid)
    this.wallet.changeWallet(wonMoney);
    this.stats.addGameToStatistics(win, bid);
    const that = this;
    setTimeout(function () {
      that.render(that.wallet.getWalletValue(), win, that.stats.showGameStatistics(), bid, wonMoney)
    }, resultsArray[3])
  }
}