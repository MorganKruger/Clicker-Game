import primary from "./primary.js";
import sfx from "./sfx.js";

const showSettings = $("#show-settings");
const sfxSlider = $("#sfx-slider");
const settings = $("#settings");

showSettings.onclick = ()=> self.toggleMenu(false);

sfxSlider.oninput = ()=> sfx.setSfxVolume();

sfxSlider.onmouseup = ()=> sfx.click();

const self = {
  open: false,
  
  // Functions
  toggleMenu(hotkeyed) {
    const isOpen = this.open;
    closeAllMenus(hotkeyed);
		isOpen ? this.closeMenu(hotkeyed) : this.openMenu(hotkeyed);
	},
  
	openMenu(hotkeyed) {
    sfxSlider.style.pointerEvents = ("all"); 
		const cList = showSettings.classList;
		cList.toggle("-active", !cList.toggle("-functional", false));
    settings.style.transform = ("translate(-50%,-50%)");
    primary.hoverMenuOn = false;
    self.open = true;
		primary.toggleHoverMenu();
		if (!hotkeyed) sfx.menuToggle();
	},
  
	closeMenu(hotkeyed) {
    sfxSlider.style.pointerEvents = ("none"); //prevent focusing the bar(with 'tab') while it's off the screen.
		const cList = showSettings.classList;
		cList.toggle("-functional", !cList.toggle("-active", false));
    settings.style.transform = ("translate(200%,-50%)");
    primary.hoverMenuOn = true;
    self.open = false;
		primary.toggleHoverMenu();
		if (!hotkeyed) sfx.menuToggle();
	},
};

export default self;