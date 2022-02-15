// import self from "./clock.js";
import primary from "./primary.js";
import sfx from "./sfx.js";

const showThemes = $("#show-themes");
const wrapper = $("#theme-wrapper");
/** @type {HTMLElement} */
const themeScroll = $("#theme-scroll");

showThemes.onclick = ()=> self.toggleMenu();

const createThemeDivs = ()=> Object.keys(self.themes).forEach(entry => {
  
  themeScroll.insertAdjacentHTML("beforeend", 
  `<div class="theme-item --default -display"><span>${entry}</span>
    <div class="theme-item-buttons">
      <div class="theme-color --default -functional">&#128396</div>
      <div class="theme-sfx --default -functional">&#9834</div>
      <div class="theme-txt --default -functional">&#119983</div>
    </div>
  </div>`
  );
  const colorBtn = themeScroll.children[themeScroll.children.length - 1];
  colorBtn.onclick = ()=>{
    const newClass = `--${entry}`;
    const currentClass = `--${self.currentTheme}`
    const elems = $all("." + currentClass);
    [].slice.call(elems).forEach(element => { 
      element.classList.remove(currentClass);
      element.classList.add(newClass);
    });
    self.currentTheme = entry;
  }
});

const self = {
  open: false,

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
  
  // Themes
  currentTheme: "default",
  themes: {
    default: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    red: { 
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
    orange: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    yellow: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    green: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    blue: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    purple: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    pink: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    brown: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    gray: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    retro: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    goopy: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    candy: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    royal: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    modern: { 
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    toxic: {  //like my ex
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    bubbly: {  
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    merica: {  
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    winter: {  
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    spring: {  
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
    summer: {  
      sfx: {
        click: "",
        purchase: "",
        menuToggle: "",
      },
      txt: {
        pts: "", //+ a few more things
      },
    },
  },
};

createThemeDivs();

export default self;



// window.onload = setTheme();

// const setTheme = () => {
  //   customTheme.colorScheme.functionalColor = .default.colorscheme[0];
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