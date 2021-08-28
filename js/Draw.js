class Draw {
  constructor(firstPosition, secondPosition, thirdPosition) {
    this.firstStartPosition = firstPosition;
    this.secondStartPosition = secondPosition;
    this.thirdStartPosition = thirdPosition;
    this.velocity;
    this.distanceForFirst = 0;
    this.distanceForSecond = 0;
    this.distanceForThird = 0;
    this.timeForFirst = 0;
    this.timeForSecond = 0;
    this.timeForThird = 0;
    this.firstSlot = document.querySelector('.game__first-slot');
    this.secondSlot = document.querySelector('.game__second-slot');
    this.thirdSlot = document.querySelector('.game__third-slot');
    let _result = this.drawResult()
    this.getDrawResult = () => _result;
    this.eachSlotWidth;

  }

  drawResult() {
    this.firstSlot.style.removeProperty('background-position-y')
    this.secondSlot.style.removeProperty('background-position-y')
    this.thirdSlot.style.removeProperty('background-position-y')

    let resultsArray = [];
    document.getElementById('bid').disabled = true;
    document.getElementById('start').disabled = true;
    this.eachSlotWidth = this.firstSlot.getBoundingClientRect().width;
    this.velocity = this.eachSlotWidth * 9;
    this.timeForFirst = (4 + Math.floor(Math.random() * 9 + 1) / 9) * 1000;
    this.timeForSecond = this.timeForFirst + 2000 + (Math.floor(Math.random() * 9 + 1) / 9) * 1000;
    this.timeForThird = this.timeForSecond + 2000 + (Math.floor(Math.random() * 9 + 1) / 9) * 1000;
    this.distanceForFirst = Math.round(this.velocity * this.timeForFirst / 1000);
    this.distanceForSecond = Math.round(this.velocity * this.timeForSecond / 1000);
    this.distanceForThird = Math.round(this.velocity * this.timeForThird / 1000);

    this.firstSlot.animate([{
      backgroundPositionY: `${this.firstStartPosition}px`
    }, {
      backgroundPositionY: `${this.firstStartPosition + this.distanceForFirst}px`
    }], {
      duration: this.timeForFirst,
      fill: "forwards",
      easing: "linear"
    });
    this.secondSlot.animate([{
      backgroundPositionY: `${this.secondStartPosition}px`
    }, {
      backgroundPositionY: `${this.secondStartPosition + this.distanceForSecond}px`
    }], {
      duration: this.timeForSecond,
      fill: "forwards",
      easing: "linear"
    });
    this.thirdSlot.animate([{
      backgroundPositionY: `${this.thirdStartPosition}px`
    }, {
      backgroundPositionY: `${this.thirdStartPosition + this.distanceForThird}px`
    }], {
      duration: this.timeForThird,
      fill: "forwards",
      easing: "linear"
    })
    // resultsArray includes start positions and timeForThird for setTimeout function which render statistics
    resultsArray.push(Math.round((this.firstStartPosition + this.distanceForFirst) / this.eachSlotWidth) % 9,
      Math.round((this.secondStartPosition + this.distanceForSecond) / this.eachSlotWidth) % 9,
      Math.round((this.thirdStartPosition + this.distanceForThird) / this.eachSlotWidth) % 9, this.timeForThird)



    this.firstStartPosition += this.distanceForFirst;
    this.secondStartPosition += this.distanceForSecond;
    this.thirdStartPosition += this.distanceForThird;

    console.log(this.firstStartPosition)
    setTimeout(() => {
      document.getElementById('bid').disabled = false
      document.getElementById('start').disabled = false
    }, this.timeForThird)


    return resultsArray
  }

  resizeFunction() {
    const that = this;
    window.addEventListener('resize', function () {
      let eachSlotWidthOnResize = that.firstSlot.getBoundingClientRect().width;
      if ((eachSlotWidthOnResize <= 200) && (eachSlotWidthOnResize >= 90)) {
        // that.distanceForFirst = 0;
        // that.distanceForSecond = 0;
        // that.distanceForThird = 0;
        that.velocity = eachSlotWidthOnResize * 9;
        that.distanceForFirst = Math.round(that.velocity * that.timeForFirst / 1000);
        that.distanceForSecond = Math.round(that.velocity * that.timeForSecond / 1000);
        that.distanceForThird = Math.round(that.velocity * that.timeForThird / 1000);
        that.firstSlot.style.setProperty('background-position-y', that.distanceForFirst + "px", "important")
        that.secondSlot.style.setProperty('background-position-y', that.distanceForSecond + "px", "important")
        that.thirdSlot.style.setProperty('background-position-y', that.distanceForThird + "px", "important")
        that.firstStartPosition += that.distanceForFirst;
        that.secondStartPosition += that.distanceForSecond;
        that.thirdStartPosition += that.distanceForThird;
      }
    })
  }
  getStartPosition() {
    return [this.firstStartPosition, this.secondStartPosition, this.thirdStartPosition]
  }
}