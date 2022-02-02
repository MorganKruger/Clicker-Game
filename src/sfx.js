const sfxSlider = $("#sfx-slider");
const clickSound = $("#click-sound");
const popSound = $("#pop-sound");
const longPopSound = $("#long-pop-sound");

const btns = $all(".btn");
btns.forEach(e => e.onmouseup = ()=> self.purchase());

const self = {
  sfxVolume: 50,

  click() {
    if (this.sfxVolume <= 1) { return }
    sfxSlider.blur();
    clickSound.volume = this.sfxVolume / 100;
    clickSound.currentTime = 0.03;
    clickSound.play();
  },
  menuToggle() {
    popSound.volume = this.sfxVolume / 100;
    popSound.currentTime = 0.12;
    popSound.play();
  },
  purchase() {
    longPopSound.volume = this.sfxVolume / 100;
    longPopSound.currentTime = 0.012;
    longPopSound.play();
  },
  setSfxVolume() {
    this.sfxVolume = sfxSlider.value;
  }
};

export default self;