// import self from "./clock.js";
import primary from "./primary.js";
import sfx from "./sfx.js";

const showThemes = $("#show-themes");
/** @type {HTMLElement} */
const themeScroll = $("#theme-scroll");
const wrapper = $("#theme-wrapper");

showThemes.onclick = ()=> self.toggleMenu();

const createThemeDivs = ()=> Object.keys(self.wrapper).forEach(entry => {
  // const theme = themeScroll.appendChild(document.createElement("div"));
  // theme.innerText = "Lorem Ipsum Dolor Sit Amet";
  // theme.setAttribute ("class", "theme-item");
  //   const themeItemButtons = theme.appendChild(document.createElement("div"));
  //   themeItemButtons.setAttribute ("class", "theme-item-buttons");
  //     const themeSFX = themeItemButtons.appendChild(document.createElement("div"));
  //     themeSFX.setAttribute ("class", "theme-sfx");
  //     const themeColor = themeItemButtons.appendChild(document.createElement("div"));
  //     themeColor.setAttribute ("class", "theme-color");
  //     const themeTxt = themeItemButtons.appendChild(document.createElement("div"));
  //     themeTxt.setAttribute ("class", "theme-txt");
  
themeScroll.insertAdjacentHTML("beforeend", 
  `<div class="theme-item"><span>Lorem Ipsum Sit Amet Dolor</span>
    <div class="theme-item-buttons">
      <div class="theme-sfx"></div>
      <div class="theme-color"></div>
      <div class="theme-txt"></div>
    </div>
  </div>`
  );
});

const self = {
  open: false,
  // colorScheme: this.color.default,
  
  // Functions
  toggleMenu() {
    const isOpen = this.open;
    closeAllMenus();
		isOpen ? this.closeMenu() : this.openMenu();
	},
  
	openMenu() {
    showThemes.style.backgroundColor = ("rgb(235, 101, 92)");
    wrapper.style.transform = ("translateY(0)");
    primary.hoverMenuOn = false;
    self.open = true;
		primary.toggleHoverMenu();
		sfx.menuToggle();
	},
  
	closeMenu() {
    showThemes.style.backgroundColor = ("green");
    wrapper.style.transform = ("translateY(200%)");
    primary.hoverMenuOn = true;
    self.open = false;
		primary.toggleHoverMenu();
		sfx.menuToggle();
	},
  
  // Themes
  // Colors are listed; functionalColor, displayFieldColor, text1Color, text2Color, activeColor, falseColor, bgColor, and completedColor
  // SFX are listed; clickSound, menuToggleSound, purchaseSound, and prestigeSound
  // Texts are listed; scoreName, up1Name, up2Name, up3Name, interestName, presName, mainClickTxt, OtherStatsTxt
  // for each object, create 'div' with class 'theme-item'. for each key in object, create 'div' with 'onclick="set theme"'
  wrapper: {
    default: { 
      color: {
        functional: "#008000",
        display: "#3ca53c", 
        txt1: "#ffd700",
        txt2: "#008000",
        active: "#eb655c",
        false: "#415a41",
        bg: "#f0e68c",
        full: "#ffd700",
      },
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "",
        // thing: "",
        // thing: "",
        // thing: "",
        // thing: "",
      },
    },
    red: { 
      color: {
        functional: "#800000",
        display: "#b34242", 
        txt1: "#fc3232",
        txt2: "#800000",
        active: "#990404",
        false: "#3f2424",
        bg: "#854646",
        full: "#fc3232",
      },
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "",
        // thing: "",
        // thing: "",
        // thing: "",
        // thing: "",
      },
    },
  },
};

createThemeDivs();

export default self;

// window.onload = setTheme();

// const setTheme = () => {
  //   customTheme.colorScheme.functionalColor = themes.default.colorscheme[0];
  //   customTheme.colorScheme.displayFieldColor = themes.default.colorscheme[0];
  //   customTheme.colorScheme.text1Color = themes.default.colorscheme[0];
  //   customTheme.colorScheme.text2Color = themes.default.colorscheme[0];
  //   customTheme.colorScheme.activeColor = themes.default.colorscheme[0];
  //   customTheme.colorScheme.falseColor = themes.default.colorscheme[0];
  //   customTheme.colorScheme.bgColor = themes.default.colorscheme[0];
  //   customTheme.colorScheme.completedColor = themes.default.colorscheme[0];

//   gid("functional-color-sample").style.backgroundColor = (customTheme.colorScheme.functionalColor);
//   gid("display-field-color-sample").style.backgroundColor = (customTheme.colorScheme.displayFieldColor);
//   gid("text1-color-sample").style.backgroundColor = (customTheme.colorScheme.text1Color);
//   gid("text2-color-sample").style.backgroundColor = (customTheme.colorScheme.text2Color);
//   gid("active-color-sample").style.backgroundColor = (customTheme.colorScheme.activeColor);
//   gid("false-color-sample").style.backgroundColor = (customTheme.colorScheme.falseColor);
//   gid("bg-color-sample").style.backgroundColor = (customTheme.colorScheme.bgColor);
//   gid("completed-color-sample").style.backgroundColor = (customTheme.colorScheme.completedColor);

  //then sound effect samples

  //then text sample(new name for score)
// }

/* 
customTheme = {
  colorScheme: {
    functionalColor: "",
    displayFieldColor: "", 
    text1Color: "",
    text2Color: "",
    activeColor: "",
    falseColor: "",
    bgColor: "",
    completedColor: ""
  },
  
  soundEffects: {
    clickSound: "",
    menuToggleSound: "",
    purchaseSound: "",
    prestigeSound: "" // Doesn't exist
  },
  
  themedText: {
    scoreName: "",
    up1Name: "",
    up2Name:"",
    up3Name:"",
    interestName:"",
    presName: "",
    mainClickText: "",
    otherStatsText: ""
  }
}
*/