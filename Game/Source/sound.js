
let music_volume = 0.4;
let sound_volume = 0.4;
let current_music = null;

let sound_files = [
  ["title_music", "Steve_Oxen_Rio_After_Dark.mp3"],
  // ["stage_1", "1_-_Juhani_Junkala_-_Stage_1.mp3"],
  // ["stage_2", "2_-_Disyman_-_Robot_Loop.mp3"],
  // ["stage_3", "3_-_Juhani_Junkala_-_Boss_Fight.mp3"],
  ["positive", "positive.wav"],
  // ["victory", "victory.mp3"],
  // ["shock", "shock.wav"],
  // ["place", "place.wav"],
  // ["rotate", "rotate.wav"],
  // ["clear", "clear.wav"],
  // ["tile", "tile.wav"],
  // ["game_over", "game_over.mp3"],
]

let sound_data = [];
for (let i = 0; i < sound_files.length; i++) {
  file = sound_files[i];
  sound_data[file[0]] = new Howl({preload: true, src: ["Sound/" + file[1]]})
}


soundEffect = function(effect_name) {
  if (sound_volume > 0) {
    var sound_effect = sound_data[effect_name];
    if (sound_effect != null) {
      sound_effect.volume(sound_volume);
      sound_effect.play();
    }
  }
}


stopSoundEffect = function(effect_name) {
  if (sound_volume > 0) {
    var sound_effect = sound_data[effect_name];
    if (sound_effect != null) {
      sound_effect.stop();
    }
  }
}


setMusic = function(music_name, loop = true) {
  if (music_volume > 0) {
    if (current_music != null && current_music.name == music_name) {
      return;
    }

    var music = sound_data[music_name];
    if (music != null) {
      current_music = music;
      music.name = music_name;
      music.loop(loop);
      music.volume(music_volume);
      music.play();
    }
  }
}


stopMusic = function() {
  if (current_music != null) {
    current_music.stop();
    current_music = null;
  }
}




