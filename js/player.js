game.player = {
  x: 54,
  y: 0,
  height: 24,
  highestY: 0,
  direction: "left",
  isInAir: false,
  startedJump: false,
  moveInterval: null,
  jumpCount: 0,
  maxJumps: 2,
  fallTimeoutID: null, // Lưu trữ timeout ID
  fallTimeout: function (startingY, time, maxHeight) {
    this.fallTimeoutID = setTimeout(
      function () {
        if (this.isInAir) {
          this.y = startingY - maxHeight + Math.pow(-time / 3 + 11, 2);
          if (this.y < this.highestY) {
            this.highestY = this.y;
          }
          if (time > 37) {
            this.startedJump = false;
            game.checkCollisions();
          }
          if (time < 150) {
            time++;
            this.fallTimeout(startingY, time, maxHeight);
          } else {
            game.isOver = true;
          }
          if (this.y > 40) {
            game.isOver = true;
          }
          game.requestRedraw();
        }
      }.bind(this, startingY, time, maxHeight),
      12
    );
  },
  animationFrameNumber: 0,
  collidesWithGround: true,
  animations: {
    left: [
      { tileColumn: 4, tileRow: 0 },
      { tileColumn: 5, tileRow: 0 },
      { tileColumn: 4, tileRow: 0 },
      { tileColumn: 6, tileRow: 0 },
    ],
    right: [
      { tileColumn: 9, tileRow: 0 },
      { tileColumn: 8, tileRow: 0 },
      { tileColumn: 9, tileRow: 0 },
      { tileColumn: 7, tileRow: 0 },
    ],
  },

  jump: function (type) {
    if (this.jumpCount < this.maxJumps) {
      // if (this.isInAir) {
      //   return;
      // }
      if (this.jumpCount > 0) {
        clearTimeout(this.fallTimeoutID);
      }
      game.sounds.jump.play();
      this.isInAir = true;
      this.startedJump = true;
      this.jumpCount++;
      var startingY = this.y;
      var time = 1;
      var maxHeight = 121;
      // if (type == "fall") {
      //   time = 30;
      //   maxHeight = 0;
      // }
      this.fallTimeout(startingY, time, maxHeight);
    }
  },

  resetJump: function () {
    this.isInAir = false;
    this.jumpCount = 0;
    this.startedJump = false;
  },
};
