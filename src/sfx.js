const clickSound = () => {
  gid("sfx-slider").blur();
  gid("click-sound").volume = sfxVolume / 100;
  gid("click-sound").currentTime = 0.03;
  gid("click-sound").play();
}

const popSound = () => {
  gid("pop-sound").volume = sfxVolume / 100;
  gid("pop-sound").currentTime = 0.12;
  gid("pop-sound").play();
}

const longPopSound = () => {
  gid("long-pop-sound").volume = sfxVolume / 100;
  gid("long-pop-sound").currentTime = 0.012;
  gid("long-pop-sound").play();
}

const setSfxVolume = () => {
  sfxVolume = gid("sfx-slider").value;
}