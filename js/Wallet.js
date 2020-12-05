class Wallet {
  constructor(money) {
    let _money = money;
    // getting current wallet value
    this.getWalletValue = () => _money;

    // checking if user have required money
    this.checkCanPlay = value => {
      if (_money >= value) return true
      return false;
    }

    this.changeWallet = (value, type = "+") => {
      if (typeof value === 'number' && !isNaN(value)) {
        if (type === "+") {
          return _money += value;
        } else if (type === "-") {
          return _money -= value;
        } else {
          throw new Error("Wrong type")
        }
      } else {
        console.log(typeof value);
        throw new Error("Wrong number")
      }
    }
  }

}