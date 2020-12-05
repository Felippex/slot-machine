class Draw {
  constructor(firstPosition, secondPosition, thirdPosition) {
    this.firstStartPosition = firstPosition;
    this.secondStartPosition = secondPosition;
    this.thirdStartPosition = thirdPosition;
    this.velocity = 810;
    let _result = this.drawResult()
    this.getDrawResult = () => _result;
  }

  drawResult() {
    const firstSlot = document.querySelector('.game__first-slot');
    const secondSlot = document.querySelector('.game__second-slot');
    const thirdSlot = document.querySelector('.game__third-slot');
    let resultsArray = [];
    let timeForFirst = 0;
    let timeForSecond = 0;
    let timeForThird = 0;
    let distanceForFirst = 0;
    let distanceForSecond = 0;
    let distanceForThird = 0;
    document.getElementById('bid').disabled = true;
    resultsArray = [];
    timeForFirst = (4 + Math.floor(Math.random() * 9 + 1) / 9) * 1000;
    timeForSecond = timeForFirst + 2000 + (Math.floor(Math.random() * 9 + 1) / 9) * 1000;
    timeForThird = timeForSecond + 2000 + (Math.floor(Math.random() * 9 + 1) / 9) * 1000;

    distanceForFirst = Math.round(this.velocity * timeForFirst / 1000);
    distanceForSecond = Math.round(this.velocity * timeForSecond / 1000);
    distanceForThird = Math.round(this.velocity * timeForThird / 1000);

    firstSlot.animate([{
      backgroundPositionY: `${this.firstStartPosition}px`
    }, {
      backgroundPositionY: `${this.firstStartPosition + distanceForFirst}px`
    }], {
      duration: timeForFirst,
      fill: "forwards",
      easing: "linear"
    });
    secondSlot.animate([{
      backgroundPositionY: `${this.secondStartPosition}px`
    }, {
      backgroundPositionY: `${this.secondStartPosition + distanceForSecond}px`
    }], {
      duration: timeForSecond,
      fill: "forwards",
      easing: "linear"
    });
    thirdSlot.animate([{
      backgroundPositionY: `${this.thirdStartPosition}px`
    }, {
      backgroundPositionY: `${this.thirdStartPosition + distanceForThird}px`
    }], {
      duration: timeForThird,
      fill: "forwards",
      easing: "linear"
    })
    // resultsArray includes start positions and timeForThird for setTimeout function which render statistics
    resultsArray.push(Math.floor((this.firstStartPosition + distanceForFirst) / 90 % 9),
      Math.floor((this.secondStartPosition + distanceForSecond) / 90 % 9),
      Math.floor(this.thirdStartPosition + distanceForThird) / 90 % 9, timeForThird)
    this.firstStartPosition += distanceForFirst;
    this.secondStartPosition += distanceForSecond;
    this.thirdStartPosition += distanceForThird;

    setTimeout(() => {
      document.getElementById('bid').disabled = false
    }, timeForThird)

    return resultsArray
  }


  getStartPosition() {
    return [this.firstStartPosition, this.secondStartPosition, this.thirdStartPosition]
  }
}