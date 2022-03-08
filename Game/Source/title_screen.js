
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

    this.background = makeSprite("Art/title.png");
    this.background.anchor.set(0,0);
    this.background.position.set(0,0);
    this.addChild(this.background);

    setMusic("title_music");

    this.status = "active";
  }


  handleKeyDown(key) {
    if (this.status == "active") {
      if (key === "Enter") {
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



