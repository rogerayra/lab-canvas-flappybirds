class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "images/bg.png";

    this.flag = false;

    this.img.onload = () => {
      this.draw();
    };
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.img,
      this.width + this.x,
      this.y,
      this.width,
      this.height
    );
    this.x--;
    if (this.x < -this.width) {
      this.x = 0;
    }
  }
}

class Pipe {
  constructor(y, height, type) {
    this.x = canvas.width;
    this.y = y;
    this.width = 70;
    this.height = height;
    this.imgTop = new Image();
    this.imgTop.src = "images/obstacle_top.png";
    this.imgBottom = new Image();
    this.imgBottom.src = "images/obstacle_bottom.png";
    this.type = type;
  }

  move(){
    this.x--;
  }

  draw() {
    if (this.type) {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.imgBottom, this.x, this.y, this.width, this.height);
    }

    this.move();
  }
}

class Bird {
  constructor() {
    this.x = 100;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.flappyUp = new Image();
    this.flappyMid = new Image();
    this.flappyDown = new Image();
    this.flappyUp.src = "images/yellowbird-upflap.png";
    this.flappyMid.src = "images/yellowbird-midflap.png";
    this.img.src = "images/yellowbird-midflap.png";
    this.flappyDown.src = "images/yellowbird-downflap.png";
  }

  move() {
    if (this.y < canvas.height - this.height) {
      this.y += 2;
    }
  }

  jump() {
    this.y -= 15;
  }

  draw() {
    if (frames % 5 === 0) {
      this.img =
        animateHelper === 0
          ? this.flappyUp
          : animateHelper === 1
          ? this.flappyMid
          : animateHelper === 2
          ? this.flappyDown
          : this.flappyMid;

      if (animateHelper < 4) {
        animateHelper++;
      } else {
        animateHelper = 0;
      }
    }
    this.move();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  isTouching(pipe) {
    return (
      this.x < pipe.x + pipe.width &&
      this.x + this.width > pipe.x &&
      this.y < pipe.y + pipe.height &&
      this.y + this.height > pipe.y
    );
  }

  isInLimits() {
    return this.y > 0 && this.y + this.height < canvas.height;
  }
}

class Score {
  constructor() {
    this.x = canvas.width - 250;
    this.y = canvas.height - 10;
  }

  draw() {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${frames}`, this.x, this.y);
  }
}
