
//
// Game screen runs the actual game.
//
// Copyright 2022 Alpha Zoo LLC.
// Written by Matthew Carlin
//


class GameScreen extends PIXI.Container {

  constructor() {
    super();
    this.initializeScreen();
  }


  initializeScreen() {
    // this.background = makeSprite("Art/background.png");

    this.background = makeSprite("Art/placeholder_background.jpg");
    this.background.anchor.set(0.5,0);
    this.background.position.set(game.width/2,170);
    // this.background.scale.set(0.9, 0.9);

    this.addChild(this.background);

    this.play_mat = makeContainer(this);

    this.mode = "inactive";
  }


  startPlay() {
    let self = this;

    stopMusic();
    //setMusic("stage_" + game.choice, false);

    this.left_monkey = makeSprite("Art/monkey_1.png");
    this.left_monkey.anchor.set(0.5, 0.5);
    this.left_monkey.position.set(game.width / 4 - 50, game.height - 150);
    this.play_mat.addChild(this.left_monkey);

    this.right_monkey = makeSprite("Art/monkey_2.png");
    this.right_monkey.anchor.set(0.5, 0.5);
    this.right_monkey.position.set(3 * game.width / 4 + 50, game.height - 150);
    this.right_monkey.scale.set(-1,1);
    this.play_mat.addChild(this.right_monkey);

    this.left_cloud = makeSprite("Art/cloud.png");
    this.left_cloud.anchor.set(0.5, 0);
    this.left_cloud.position.set(game.width / 4 - 50, 30);
    this.play_mat.addChild(this.left_cloud);

    this.right_cloud = makeSprite("Art/cloud.png");
    this.right_cloud.anchor.set(0.5, 0);
    this.right_cloud.position.set(3 * game.width / 4 + 50, 30);
    this.play_mat.addChild(this.right_cloud);

    this.mode = "active";

    // this.hearts = [];
    // for (let i = 0; i < 6; i++) {
    //     let heart = makeSprite("Art/heart.png");
    //     heart.position.set(432 + (1024-432)/2 + 48 + 64 * (i % 3), 72 + 72 * Math.floor(i/3));
    //     this.addChild(heart);
    //     this.hearts.push(heart);
    // }

    this.start_time = game.markTime();
  }


  handleKeyDown(key) {
    if (this.mode === "active") {
        // if (this.character.pose === "idle") {
        //     if (key.toLowerCase() === "a") {
        //         this.moveTo(1);
        //     }
        //     if (key.toLowerCase() === "s") {
        //         this.moveTo(2);
        //     }
        //     if (key.toLowerCase() === "d") {
        //         this.moveTo(3);
        //     }
        //     if (key.toLowerCase() === "f") {
        //         this.moveTo(4);
        //     }
        //     if (key.toLowerCase() === "g") {
        //         this.moveTo(5);
        //     }
        //     if (key.toLowerCase() === "h") {
        //         this.moveTo(6);
        //     }
        // }
    }
  }


  update(fractional) {

    let self = this;

    game.shakeThings();
    game.freeeeeFreeeeeFalling(fractional);
  };
};
