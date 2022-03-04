
//
// Game screen runs the actual game.
//
// Copyright 2022 Alpha Zoo LLC.
// Written by Matthew Carlin
//


let left_margin = (1024 - 432) / 2 + 36;
let top_margin = 576 - 24;
let wire_top = 576;
let wire_left = (1024 - 432) / 2;

class GameScreen extends PIXI.Container {

  constructor() {
    super();
    this.initializeScreen();
  }


  initializeScreen() {
    this.background = makeSprite("Art/board.png");

    this.greens = makeSprite("Art/greens.png");
    this.greens.anchor.set(0,0);
    this.greens.position.set(0,0);
    this.addChild(this.greens);


    this.play_mat = makeContainer(this);

    this.mode = "inactive";
  }


  startPlay() {
    let self = this;

    this.char_square = 3;

    stopMusic();
    setMusic("stage_" + game.choice, false);

    current_music.on('end', function(){
        stopMusic();
        soundEffect("victory");
        self.mode = "finished";
        delay(function() {
            game.screens["title"].initializeScreen();
            game.switchScreens("game", "title", 1, 0);
        }, self.beat * 2)
        
            // console.log("HEY THIS IS SUPPOSED TO END THE TIME");
            // self.start_time = game.markTime();
            // self.step = 0;
            // self.hey.text = "SOUP BREAK";
            // self.hey.visible = true;
            // self.mode = "prep";
    });

    this.beat = structure[game.choice].delay;

    this.character = new Character();
    this.addChild(this.character);
    this.character.position.set(left_margin + 72 * 2, top_margin);
    this.character.setSpeed(this.beat);
    this.character.setPose("idle");

    this.mode = "active";

    

    this.step = 0;

    this.hearts = [];
    for (let i = 0; i < 6; i++) {
        let heart = makeSprite("Art/heart.png");
        heart.position.set(432 + (1024-432)/2 + 48 + 64 * (i % 3), 72 + 72 * Math.floor(i/3));
        this.addChild(heart);
        this.hearts.push(heart);
    }

    this.beats = [];
    for (let i = 0; i < structure[game.choice].beats; i++) {
        let letter = pick(["a","s","d","f","g","h","a","s","d","f","g","h", ""]);
        if (i < 6) letter = "";
        if (dice(10) < 5 - game.choice) letter = "";
        let item = {
            letter: letter,
            sprites: []
        }
        if (letter == "a") item.pos = 1;
        if (letter == "s") item.pos = 2;
        if (letter == "d") item.pos = 3;
        if (letter == "f") item.pos = 4;
        if (letter == "g") item.pos = 5;
        if (letter == "h") item.pos = 6;
        this.beats.push(item);
    }

    this.makeBeat(6);
    this.makeBeat(7);

    let zones = [];
    for (let i = 0; i < game.num_skeletons; i++) {
        zones.push(200 + dice(350));
    }
    zones.sort();
    for (let i = 0; i < game.num_skeletons; i++) {
        let skeleton = makeAnimatedSprite("Art/skeleton.json", "skeleton");
        skeleton.anchor.set(0.5, 0.625);

        skeleton.position.set(50 + Math.random() * 200, zones[i]);
        if (dice(100) < 50) {
            skeleton.x += (1024 - 432) / 2 + 432;
        }
        
        syncAnimation(skeleton, this.beat, 1);
        makeSmoke(this, skeleton.x, skeleton.y - 20, 1, 1);
        this.addChild(skeleton);
    }

    this.start_time = game.markTime();
  }


  makeBeat(val) {
    if (this.beats[val].letter != "") {
        let pos = this.beats[val].pos;
        if (pos > 1) {
            let left_1 = makeSprite("Art/" + (pos - 1) + "_a.png");
            let left_2 = makeSprite("Art/" + (pos - 1) + "_b.png");
            left_1.position.set(wire_left, wire_top - 72 * (val - this.step + 1));
            left_2.position.set(wire_left, wire_top - 72 * (val - this.step + 1));
            this.addChild(left_1);
            this.addChild(left_2);
            this.beats[val].sprites.push(left_1);
            this.beats[val].sprites.push(left_2);
            if (dice(100) > 50) {
                left_2.visible = false;
            } else {
                left_1.visible = false;
            }
        }
        let marker = makeSprite("Art/letter_" + this.beats[val].letter + ".png");
        marker.position.set(wire_left + 72 * (pos - 1), wire_top - 72 * (val - this.step + 1))
        this.beats[val].sprites.push(marker);
        this.addChild(marker);
        if (pos < 6) {
            let right_1 = makeSprite("Art/" + (6 - pos) + "_a.png");
            let right_2 = makeSprite("Art/" + (6 - pos) + "_b.png");
            right_1.position.set(wire_left + 6 * 72, wire_top - 72 * (val - this.step + 1));
            right_2.position.set(wire_left + 6 * 72, wire_top - 72 * (val - this.step + 1));
            right_1.scale.set(-1, 1);
            right_2.scale.set(-1, 1);
            this.addChild(right_1);
            this.addChild(right_2);
            this.beats[val].sprites.push(right_1);
            this.beats[val].sprites.push(right_2);
            if (dice(100) > 50) {
                right_2.visible = false;
            } else {
                right_1.visible = false;
            }
        }
    }
  }


  destroyBeat(val) {
    if (this.beats[val].letter != "") {
        for (let i = 0; i < this.beats[val].sprites.length; i++) {
            this.removeChild(this.beats[val].sprites[i]);
        }
    }
    this.beats[val].sprites = [];
  }


  shiftBeat(val) {
    let self = this;

    if (this.beats[val].letter != "") {
        let pos = this.beats[val].pos;
        if (pos == 1) {
            if(this.beats[val].sprites[1].visible == true) {
                this.beats[val].sprites[1].visible = false;
                this.beats[val].sprites[2].visible = true;
            } else {
                this.beats[val].sprites[1].visible = true;
                this.beats[val].sprites[2].visible = false;
            }
        }

        if (pos > 1) {
            if(this.beats[val].sprites[0].visible == true) {
                this.beats[val].sprites[0].visible = false;
                this.beats[val].sprites[1].visible = true;
            } else {
                this.beats[val].sprites[0].visible = true;
                this.beats[val].sprites[1].visible = false;
            }
            if (pos < 6) {
                if(this.beats[val].sprites[3].visible == true) {
                    this.beats[val].sprites[3].visible = false;
                    this.beats[val].sprites[4].visible = true;
                } else {
                    this.beats[val].sprites[3].visible = true;
                    this.beats[val].sprites[4].visible = false;
                }
            }
        }


        for (let k = 0; k < this.beats[val].sprites.length; k++) {
            let y = this.beats[val].sprites[k].position.y;
            var tween = new TWEEN.Tween(this.beats[val].sprites[k])
                .to({y: y + 72})
                .duration(self.beat / 2)
                // .easing(TWEEN.Easing.Quadratic.Out)
                .onComplete(function() {
                })
                .start();
        }
    }
  }


  moveTo(value) {
    if (value == this.char_square) return;

    if (this.character.y != top_margin) this.character.y = top_margin;

    let self = this;
    let new_pose = pick(["roll", "jump", "jump"]);
    this.character.setPose(new_pose);
    if (value < this.char_square) {
        this.character.scale.set(-1,1);
    } else {
        this.character.scale.set(1, 1);
    }
    this.char_square = value;

    var tween = new TWEEN.Tween(self.character.position)
        .to({x: left_margin + (value - 1) * 72})
        .duration(self.beat / 2)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(function() {
            if (self.character.pose != "death") self.character.setPose("idle");
        })
        .start();
    if (new_pose == "jump") {
        let orig_y = self.character.y;
        var tween = new TWEEN.Tween(self.character.position)
        .to({y: orig_y - 20})
        .duration(self.beat / 4)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(function() {
        })
        .start();
        delay(function() {
            var tween2 = new TWEEN.Tween(self.character.position)
            .to({y: orig_y})
            .duration(self.beat / 4)
            .easing(TWEEN.Easing.Quadratic.In)
            .onComplete(function() {
                if (self.character.pose != "death") self.character.setPose("idle");
            })
            .start();
        }, self.beat / 4);
            
    }
  }


  handleKeyDown(key) {
    if (this.mode === "active") {
        if (this.character.pose === "idle") {
            if (key.toLowerCase() === "a") {
                this.moveTo(1);
            }
            if (key.toLowerCase() === "s") {
                this.moveTo(2);
            }
            if (key.toLowerCase() === "d") {
                this.moveTo(3);
            }
            if (key.toLowerCase() === "f") {
                this.moveTo(4);
            }
            if (key.toLowerCase() === "g") {
                this.moveTo(5);
            }
            if (key.toLowerCase() === "h") {
                this.moveTo(6);
            }
        }
    }
  }


  update(fractional) {

    let self = this;

    if (this.mode === "active" && game.timeSince(this.start_time) > structure[game.choice].offset + structure[game.choice].delay * this.step) {
        this.step += 1;

        for (let i = 0; i < this.beats.length; i++) {
            let beat = this.beats[i];

            if (beat.sprites.length != 0) {
                this.shiftBeat(i);
            }

            if (i < this.step - 2) this.destroyBeat(i);
        }

        if (this.step < this.beats.length - 8) {
            this.makeBeat(this.step + 8);
        }

        delay(function() {
            if (self.step <= self.beats.length - 1) {
                if (self.beats[self.step].letter != "" 
                    && self.char_square != self.beats[self.step].pos) {
                    console.log(self.char_square);
                    console.log(self.beats[self.step].pos);
                    soundEffect("shock");
                    let heart = self.hearts.pop();
                    self.removeChild(heart);
                    if (self.hearts.length > 0) {
                        
                        self.character.setPose("hurt");
                        var tween = new TWEEN.Tween(self.character.position)
                            .to({})
                            .duration(self.beat / 2)
                            .easing(TWEEN.Easing.Quadratic.Out)
                            .onComplete(function() {
                                if (self.character.pose != "death") self.character.setPose("idle");
                            })
                            .start();
                    } else {
                        self.character.setPose("death");
                        self.character.poses["death"].loop = false;
                        self.character.poses["death"].animationSpeed = 0.1;
                        stopMusic();
                        self.mode = "dead";
                        game.num_skeletons += 1;
                        delay(function() {
                            self.removeChildren();
                            self.initializeScreen();
                            self.startPlay();
                        }, self.beat * 8)
                    }
                    
                    
                }

            }
        }, this.beat / 4);
    }

    game.shakeThings();
    game.freeeeeFreeeeeFalling(fractional);
  };
};
