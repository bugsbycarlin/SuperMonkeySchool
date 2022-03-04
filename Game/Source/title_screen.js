
//
// 
//
// Copyright 2022 Alpha Zoo LLC.
// Written by Matthew Carlin
//

class TitleScreen extends PIXI.Container {


  constructor() {
    super();
    this.initializeScreen();
  };


  initializeScreen() {
    let self = this;

    this.background = makeSprite("Art/bgcolor.png");
    this.background.anchor.set(0,0);
    this.background.position.set(0,0);
    // this.background.scale.set(0.8, 0.8);
    this.addChild(this.background);


    this.background = makeSprite("Art/title.png");
    this.background.anchor.set(0.5,0);
    this.background.position.set(game.width/2,0);
    this.background.scale.set(0.8, 0.8);
    this.addChild(this.background);

    this.message_text = makeSprite("Art/message.png");
    this.message_text.anchor.set(0,0);
    this.message_text.position.set(0,20);
    this.addChild(this.message_text);


    this.choice_1 = makeSprite("Art/press_1.png");
    this.choice_1.anchor.set(0.5,0.5);
    this.choice_1.position.set(game.width/2 - 300,game.height/2+40);
    this.addChild(this.choice_1);

    this.choice_2 = makeSprite("Art/press_2.png");
    this.choice_2.anchor.set(0.5,0.5);
    this.choice_2.position.set(game.width/2,game.height/2+40);
    this.addChild(this.choice_2);

    this.choice_3 = makeSprite("Art/press_3.png");
    this.choice_3.anchor.set(0.5,0.5);
    this.choice_3.position.set(game.width/2 + 300,game.height/2+40);
    this.addChild(this.choice_3);

    this.selector = makeSprite("Art/selector.png");
    this.selector.anchor.set(0.5,0.5);
    this.selector.position.set(game.width/2 - 300,game.height/2 + 100);
    this.addChild(this.selector);

    setMusic("stage_1");

    this.status = "choosing";
    this.choice = 1;


    this.skeleton_1 = makeAnimatedSprite("Art/skeleton.json", "skeleton");
    this.skeleton_1.anchor.set(0.5, 0.625);
    this.skeleton_1.position.set(100, 200);
    syncAnimation(this.skeleton_1, structure[this.choice].delay, 1);
    this.addChild(this.skeleton_1);

    this.skeleton_2 = makeAnimatedSprite("Art/skeleton.json", "skeleton");
    this.skeleton_2.anchor.set(0.5, 0.625);
    this.skeleton_2.position.set(game.width - 100, 200);
    syncAnimation(this.skeleton_2, structure[this.choice].delay, 1);
    this.addChild(this.skeleton_2);
  }


  handleKeyDown(key) {
    if (this.status == "choosing") {
      if (key === "1") {
        this.choice = 1;
        this.selector.position.set(game.width/2 - 300,game.height/2 + 100);
        stopMusic();
        setMusic("stage_1");

        syncAnimation(this.skeleton_1, structure[this.choice].delay, 1);
        syncAnimation(this.skeleton_2, structure[this.choice].delay, 1);
      }

      if (key === "2") {
        this.choice = 2;
        this.selector.position.set(game.width/2,game.height/2 + 100);
        stopMusic();
        setMusic("stage_2");

        syncAnimation(this.skeleton_1, structure[this.choice].delay, 1);
        syncAnimation(this.skeleton_2, structure[this.choice].delay, 1);
      }

      if (key === "3") {
        this.choice = 3;
        this.selector.position.set(game.width/2 + 300,game.height/2 + 100);
        stopMusic();
        setMusic("stage_3");

        syncAnimation(this.skeleton_1, structure[this.choice].delay, 1);
        syncAnimation(this.skeleton_2, structure[this.choice].delay, 1);
      }

      if (key === "Enter") {
        game.choice = this.choice;
        stopMusic();
        soundEffect("positive");
        this.state = "transitioning";
        game.screens["game"].initializeScreen();
        game.switchScreens("title", "game", 1, 0, function(){game.screens["game"].startPlay()});
      }
    }
  }

 
  update() { 
  }
};



