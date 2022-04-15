import primary from "./primary.js";
import prestige from "./prestige.js";
import stats from "./stats.js";
import sfx from "./sfx.js";

const showThemes = $("#show-themes");
const wrapper = $("#theme-wrapper");
const buyThemeBtn = $("#buy-theme-btn");
const themeResultLabel = $("#theme-result-label");
/** @type {HTMLElement} */
const themeScroll = $("#theme-scroll");

buyThemeBtn.onclick = ()=> { if (prestige.points.$ >= 5) self.buyTheme(); };
showThemes.onclick = ()=> self.toggleMenu();

const createThemeDivs = ()=> Object.keys(self.themes).forEach(entry => {
  themeScroll.insertAdjacentHTML("beforeend", `<div id="${entry}-theme" class="theme-item --default -false"><span>${entry}</span></div>`);
  const colorBtn = themeScroll.children[themeScroll.children.length - 1];

  const defaultThemeBtn = $("#default-theme");
  if (defaultThemeBtn.classList.contains("-false")) {
    defaultThemeBtn.classList.remove("-false")
    "default" == self.currentTheme ? defaultThemeBtn.classList.add("-active") : defaultThemeBtn.classList.add("-functional")
  }

  colorBtn.onclick = ()=>{ 
    if (colorBtn.classList.contains("-functional")) {
      const cList = $(`#${self.currentTheme}-theme`).classList;
      cList.toggle("-functional", !cList.toggle("-active", false)); //set class of old theme's button to -functional

      const newCList = $(`#${entry}-theme`).classList;
      newCList.toggle("-active", !newCList.toggle("-functional", false)); //set class of new theme's button to -active

      
      const newClass = `--${entry}`;
      const currentClass = `--${self.currentTheme}`;
      const elemsOfPreviousTheme = $all(`.${currentClass}`); // select all elements of class
      console.log(`.${currentClass}`)
      console.log(elemsOfPreviousTheme);
      // if (elemsOfPreviousTheme.length <= 0) console.log(document.body);
      
      [].slice.call(elemsOfPreviousTheme).forEach(element => {  //give all elements the new class 
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
  currentTheme: get_or("currentTheme", "default"),
  
  // Functions
  toggleMenu(hotkeyed) {
    if (stats.totalPrestiges < 1) return;
    const isOpen = this.open;
    closeAllMenus(hotkeyed);
		isOpen ? this.closeMenu(hotkeyed) : this.openMenu(hotkeyed);
	},
	openMenu(hotkeyed) {
    const cList = showThemes.classList;
		cList.toggle("-active", !cList.toggle("-functional", false));
    wrapper.style.transform = ("translateY(0)");
    primary.hoverMenuOn = false;
    self.open = true;
		primary.toggleHoverMenu();
		if (!hotkeyed) sfx.menuToggle();
	},
	closeMenu(hotkeyed) {
    const cList = showThemes.classList;
		cList.toggle("-functional", !cList.toggle("-active", false));
    wrapper.style.transform = ("translateY(200%)");
    primary.hoverMenuOn = true;
    self.open = false;
		primary.toggleHoverMenu();
		if (!hotkeyed) sfx.menuToggle();
	},
  
  /** @type String[] */
  unlockedThemes: get_or("unlockedThemes", []),

  buyTheme() {
    prestige.points.update(v => v - 5);
    this.newThemeName = Object.keys(this.themes)[Math.floor(Object.keys(this.themes).length * Math.random())];
    if (!this.unlockedThemes.includes(this.newThemeName)) this.unlockedThemes.push(this.newThemeName);
    
    if (this.setUpTheme(this.newThemeName)) void(true)
    else {
      prestige.moreThemeReturns.maxed ? prestige.points.update(v => v + 3) : prestige.points.update(v => v + 2);
    }
    if (prestige.themeDouble.maxed) {
      this.newThemeName2 = Object.keys(this.themes)[Math.floor(Object.keys(this.themes).length * Math.random())];
      if (!this.unlockedThemes.includes(this.newThemeName2)) this.unlockedThemes.push(this.newThemeName2);

      if (this.setUpTheme(this.newThemeName2)) void(true)
      else {
        prestige.moreThemeReturns.maxed ? prestige.points.update(v => v + 3) : prestige.points.update(v => v + 2);
      }
    }
    this.$themeResultLabel;
    prestige.$prestigePoints;
    sfx.purchase();
  },

  setUpTheme(theme) {
    let newThemeBtn = $(`#${theme}-theme`);
    
    if (newThemeBtn == null) {
      console.error(`newThemeBtn == $("#${theme}-theme") == null`);
      return false;
    }
    if (newThemeBtn.classList.contains("-false")) {
      newThemeBtn.classList.remove("-false");
      newThemeBtn.classList.add("-functional");
      this.themeBonus += .05;
      return true;
    } 
    return false;
  },
  
  // Themes
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
    neon: {},
    rgb: {},
    cmyk: {},
    pureen: {},
    soft: {},
    pastel: {},
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


setTimeout(() => {
  createThemeDivs();
  $(`#${self.currentTheme}-theme`).classList.remove("-false"); // make sure the current theme button has an -active class
  $(`#${self.currentTheme}-theme`).classList.add("-active");
  
  const currentClass = `--${self.currentTheme}`;
  const themedElems = $all(`.--default`); // select all elements of class
  
  [].slice.call(themedElems).forEach(element => {  //give all elements the new class 
    element.classList.remove("--default");
    element.classList.add(currentClass);
  });

  console.log(document.body)
  // console.log(`#${self.currentTheme}-theme`)

  /** @type {HTMLElement} */
  let currentThemeBtn = $(`#${self.currentTheme}-theme`);
  console.log(currentThemeBtn)

  if (Array.isArray(self.unlockedThemes)) {
    self.unlockedThemes.forEach((k)=>{
      self.setUpTheme(k);
    });
  }

  $(`#${self.currentTheme}-theme`).click() // simulates a click on the user's set theme to toggle it on
}, 10);
  

export default self;