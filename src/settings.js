import primary from "./primary.js";
import sfx from "./sfx.js";

const showSettings = $("#show-settings");
const sfxSlider = $("#sfx-slider");
const settings = $("#settings");

showSettings.onclick = ()=> self.toggleMenu();

sfxSlider.oninput = ()=> sfx.setSfxVolume();

sfxSlider.onmouseup = ()=> sfx.click();

const self = {
  open: false,
  
  // Functions
  toggleMenu() {
    const isOpen = this.open;
    closeAllMenus();
		isOpen ? this.closeMenu() : this.openMenu();
	},
  
	openMenu() {
    sfxSlider.style.pointerEvents = ("all"); 
    showSettings.style.backgroundColor = ("rgb(235, 101, 92)");
    settings.style.transform = ("translate(-50%,-50%)");
    primary.hoverMenuOn = false;
    self.open = true;
		primary.toggleHoverMenu();
		sfx.menuToggle();
	},
  
	closeMenu() {
    sfxSlider.style.pointerEvents = ("none"); //prevent focusing the bar(with 'tab') while it's off the screen.
    showSettings.style.backgroundColor = ("green");
    settings.style.transform = ("translate(200%,-50%)");
    primary.hoverMenuOn = true;
    self.open = false;
		primary.toggleHoverMenu();
		sfx.menuToggle();
	},
};

export default self;