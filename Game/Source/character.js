
//
// 
//
// Copyright 2022 Alpha Zoo LLC.
// Written by Matthew Carlin
//

class Character extends PIXI.Container {


  constructor() {
    super();
    this.initializeCharacter();
  };


  initializeCharacter() {
    let self = this;

    this.poses = {
        "idle": null,
        "hurt": null,
        "jump": null,
        "death": null,
        "roll" :null
    };

    for (const [key, value] of Object.entries(this.poses)) {
        let zen = makeAnimatedSprite("Art/" + key + ".json", key);
        zen.anchor.set(0.5, 0.6);
        self.addChild(zen);
        zen.visible = false;
        self.poses[key] = zen;
    }

    this.pose = "idle";
  }


  setSpeed(period) {
    for (const [key, value] of Object.entries(this.poses)) {
        syncAnimation(this.poses[key], period, 1, false);
    }
  }


  setPose(pose) {
    for (const [key, value] of Object.entries(this.poses)) {
        this.poses[key].gotoAndStop(0);
        if (key == pose) {
            this.poses[key].visible = true;
            this.poses[key].play();
        } else {
            this.poses[key].visible = false;
        }
    }
    this.pose = pose;
  }

 
  update() { 
  }
};



