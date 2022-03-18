import primary from "./primary.js";
import prestige from "./prestige.js";
import sfx from "./sfx.js";

const showThemes = $("#show-themes");
const wrapper = $("#theme-wrapper");
const buyThemeBtn = $("#buy-theme-btn");
const themeResultLabel = $("#theme-result-label");
/** @type {HTMLElement} */
const themeScroll = $("#theme-scroll");

buyThemeBtn.onclick = ()=> {if (prestige.points.$ >= 5) self.buyTheme();}

showThemes.onclick = ()=> self.toggleMenu();

const createThemeDivs = ()=> Object.keys(self.themes).forEach(entry => {
  themeScroll.insertAdjacentHTML("beforeend", `<div id="${entry}-theme" class="theme-item --default -false"><span>${entry}</span></div>`);
  const colorBtn = themeScroll.children[themeScroll.children.length - 1];
  $("#default-theme").classList.remove("-false"); // make sure the default theme has an -active class
  $("#default-theme").classList.add("-active");

  colorBtn.onclick = ()=>{ 
    if (colorBtn.classList.contains("-functional")) {
      const cList = $(`#${self.currentTheme}-theme`).classList;
      cList.toggle("-functional", !cList.toggle("-active", false)); //set class of old theme's button to -functional

      const newCList = $(`#${entry}-theme`).classList;
      newCList.toggle("-active", !newCList.toggle("-functional", false)); //set class of new theme's button to -active

      const newClass = `--${entry}`;
      const currentClass = `--${self.currentTheme}`;
      const elems = $all("." + currentClass); //give all elements the new class

      [].slice.call(elems).forEach(element => { 
        element.classList.remove(currentClass);
        element.classList.add(newClass);
      });
      self.currentTheme = entry;
      sfx.purchase();
    }
  }
});

const self = {
  open: false,
  newThemeName: "default",
  newThemeName2: "default",
  
  // Functions
  toggleMenu() {
    const isOpen = this.open;
    closeAllMenus();
		isOpen ? this.closeMenu() : this.openMenu();
	},
	openMenu() {
		const cList = showThemes.classList;
		cList.toggle("-active", !cList.toggle("-functional", false));
    wrapper.style.transform = ("translateY(0)");
    primary.hoverMenuOn = false;
    self.open = true;
		primary.toggleHoverMenu();
		sfx.menuToggle();
	},
	closeMenu() {
    const cList = showThemes.classList;
		cList.toggle("-functional", !cList.toggle("-active", false));
    wrapper.style.transform = ("translateY(200%)");
    primary.hoverMenuOn = true;
    self.open = false;
		primary.toggleHoverMenu();
		sfx.menuToggle();
	},
  
  buyTheme() {
    prestige.points.update(v => v - 5);
    this.newThemeName = Object.keys(this.themes)[Math.floor(Object.keys(this.themes).length * Math.random())];
    let newThemeBtn = $(`#${this.newThemeName}-theme`)
    if (newThemeBtn.classList.contains("-false")) {
      newThemeBtn.classList.remove("-false");
      newThemeBtn.classList.add("-functional");
      this.themeBonus += .05;
    } else {
      prestige.moreThemeReturns.maxed ? prestige.points.update(v => v + 3) : prestige.points.update(v => v + 2);
    }
    if (prestige.themeDouble.maxed) {
      this.newThemeName2 = Object.keys(this.themes)[Math.floor(Object.keys(this.themes).length * Math.random())];
      let newThemeBtn = $(`#${this.newThemeName2}-theme`)
      if (newThemeBtn.classList.contains("-false")) {
        newThemeBtn.classList.remove("-false");
        newThemeBtn.classList.add("-functional"); 
        this.themeBonus += .05;
      } else {
        prestige.moreThemeReturns.maxed ? prestige.points.update(v => v + 3) : prestige.points.update(v => v + 2);
      }
    }
    this.$themeResultLabel;
    prestige.$prestigePoints;
    sfx.purchase();
  },
  
  // Themes
  currentTheme: "default",
  themes: {
    default: {},
    red: {},
    orange: {},
    yellow: {},
    green: {},
    blue: {},
    purple: {},
    pink: {},
    brown: {},
    gray: {},
    white: {},
    black: {},
    empty: {},
    clear: {},
    retro: {},
    goopy: {},
    candy: {},
    royal: {},
    modern: {},
    toxic: {},
    bubbly: {},
    merica: {},
    winter: {},
    spring: {},
    summer: {},
    fall: {},
  },

  // Getters
	get $all() {
		for (const k in this) {
			if (!Object.hasOwnProperty.call(this, k)) return;
			if (k == "$all" || k[0] != "$") continue;
			this[k];
		}
		return this;
	},

  get $themeResultLabel() {
    prestige.themeDouble.maxed ? themeResultLabel.innerText = `You Got The "${this.newThemeName}" And "${this.newThemeName2}" Themes` : themeResultLabel.innerText = `You Got The "` + this.newThemeName + `" Theme`;
		return this;
	},
};

createThemeDivs();

export default self;