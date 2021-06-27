class Draw {
  constructor(firstPosition, secondPosition, thirdPosition) {
    this.firstStartPosition = firstPosition;
    this.secondStartPosition = secondPosition;
    this.thirdStartPosition = thirdPosition;
    this.velocity;
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
    document.getElementById('start').disabled = true;
    let eachSlotWidth = firstSlot.getBoundingClientRect().width;
    this.velocity = eachSlotWidth * 9;
    timeForFirst = (4 + Math.floor(Math.random() * 9 + 1) / 9) * 1000;
    timeForSecond = timeForFirst + 2000 + (Math.floor(Math.random() * 9 + 1) / 9) * 1000;
    timeForThird = timeForSecond + 2000 + (Math.floor(Math.random() * 9 + 1) / 9) * 1000;

    distanceForFirst = Math.round(this.velocity * timeForFirst / 1000);
    distanceForSecond = Math.round(this.velocity * timeForSecond / 1000);
    distanceForThird = Math.round(this.velocity * timeForThird / 1000);

    let mainAnimation = firstSlot.animate([{
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
    resultsArray.push(Math.round((this.firstStartPosition + distanceForFirst) / eachSlotWidth) % 9,
      Math.round((this.secondStartPosition + distanceForSecond) / eachSlotWidth) % 9,
      Math.round((this.thirdStartPosition + distanceForThird) / eachSlotWidth) % 9, timeForThird)

    const that = this;
    const onResizeFunction = window.addEventListener('resize', function () {
      mainAnimation.commitStyles();
      console.log(mainAnimation);
      distanceForFirst = 0;
      distanceForSecond = 0;
      distanceForThird = 0;
      eachSlotWidth = firstSlot.getBoundingClientRect().width;
      that.velocity = eachSlotWidth * 9;
      distanceForFirst = Math.round(that.velocity * timeForFirst / 1000);
      distanceForSecond = Math.round(that.velocity * timeForSecond / 1000);
      distanceForThird = Math.round(that.velocity * timeForThird / 1000);
      firstSlot.style.backgroundPositionY = distanceForFirst;
      // console.log(distanceForFirst);
      // secondSlot.style.backgroundPositionY = `${distanceForSecond}px`;
      // thirdSlot.style.backgroundPositionY = `${distanceForThird}px`;
      // this.firstStartPosition = distanceForFirst;
      // this.secondStartPosition = distanceForSecond;
      // this.thirdStartPosition = distanceForThird;
    })

    this.firstStartPosition += distanceForFirst;
    this.secondStartPosition += distanceForSecond;
    this.thirdStartPosition += distanceForThird;

    setTimeout(() => {
      document.getElementById('bid').disabled = false
      document.getElementById('start').disabled = false
    }, timeForThird)


    // console.log(this.firstStartPosition, this.secondStartPosition, this.thirdStartPosition);



    return resultsArray
  }

  getStartPosition() {
    return [this.firstStartPosition, this.secondStartPosition, this.thirdStartPosition]
  }
}