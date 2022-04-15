import primary from "./primary.js";
import stats from "./stats.js";
import sfx from "./sfx.js";
import clock from "./clock.js";
import themes from "./themes.js";

const showThemes = $("#show-themes")
const themeBuyDetail = $("#theme-buy-detail");
const themesSuperPointCount = $("#themes-super-point-count");
const buyThemeBtn = $("#buy-theme-btn");
const prestigeBtn = $("#prestige-btn");

const toggleAutoClick = $("#toggle-auto-click")
const toggleAutoUpgrade = $("#toggle-auto-upgrade")
const toggleAutoPrestige = $("#toggle-auto-prestige")

const unlockStartingPoints = $("#unlock-starting-points");
const unlockCrit = $("#unlock-crit");
const unlockDoub = $("#unlock-double");
const unlockCostReduce = $("#unlock-cost-reduce");
const unlockMorePrestigePoints = $("#unlock-more-prestige-points");
const unlockThemeDouble = $("#unlock-theme-double");
const unlockTertiaryUpgrade = $("#unlock-tertiary-upgrade");
const unlockUberBtn = $("#unlock-uber-btn");
const uberBtn = $("#uber-btn");
const unlockAutoClick = $("#unlock-auto-click");
const unlockMoreThemeReturns = $("#unlock-more-duplicate-theme-returns");
const unlockAutoUpgrade = $("#unlock-auto-upgrade");
const unlockAutoPrestige = $("#unlock-auto-prestige");

const prestShop = $("#prestige-shop");
const prestPointsTxt = $("#prestige-points");
const prestShopInfo = $("#prestige-shop-info");
const showPrestShopBtn = $("#show-prestige-shop");

const uberClickable = $("#uber-btn");


prestigeBtn.onclick = ()=> self.do_prestige(false);

showPrestShopBtn.onclick = ()=> self.toggleMenu();

const maxedAndCost = (elem) => (elem.maxed || self.points.$ < elem.cost || !self.open ||  stats.totalPrestiges < 1);

const self = {
  open: false,
  cost: get_or("prestige.cost", 50000000), // 50M
  gain: get_or("prestige.gain", 5),
  lastUber: get_or("lastUber", 0),

  points: new Reactive(get_or("prestige.points", 0)), // prestige points

  // points: new Reactive(0), // prestige points

  prestigeKeys: ["startingPoints", "crit", "doub", "costReduce", "morePoints", "themeDouble", "tertUp", "uberClickable", "autoClick", "moreThemeReturns", "autoUpgrade", "autoPrestige"],  
  startingPoints: get_or("startingPoints", {
    maxed: false,
    cost: 2,
    lvl: 0,
  }),
  startingPoints_elem: unlockStartingPoints,
  crit: get_or("crit", {
    unlocked: false,
    maxed: false,
    cost: 2, //2 then 4 or something
  }),
  crit_elem: unlockCrit,
  doub: get_or("doub", {
    unlocked: false,
    maxed: false,
    cost: 3, //3 then 69 or something
  }),
  doub_elem: unlockDoub,
  costReduce: get_or("costReduce", {
    rate: 1,
    unlocked: false,
    maxed: false,
    lvl: 0,
    cost: 1,
  }),
  costReduce_elem: unlockCostReduce,
  morePoints: get_or("morePoints", { 
    lvl: 0,
    unlocked: false,
    maxed: false,
    cost: 2,
  }),
  morePoints_elem: unlockMorePrestigePoints,
  themeDouble: get_or("themeDouble", { 
    maxed: false,
    cost: 20,
  }),  
  themeDouble_elem: unlockThemeDouble,
  tertUp: get_or("tertUp", { 
    maxed: false,
    cost: 1,
    lvl: 0,
  }),
  tertUp_elem: unlockTertiaryUpgrade,
  uberClickable: get_or("uberClickable", { 
    maxed: false,
    cost: 10,
  }),  
  uberClickable_elem: unlockUberBtn,
  autoClick: get_or("autoClick", {
    active: false,
    maxed: false, 
    cost: 5,
  }),
  autoClick_elem: unlockAutoClick,
  moreThemeReturns: get_or("moreThemeReturns", {
    maxed: false,
    cost: 50,
  }),
  moreThemeReturns_elem: unlockMoreThemeReturns,
  autoUpgrade: get_or("autoUpgrade", {
    active: false,
    maxed: false, 
    cost: 5,
  }),
  autoUpgrade_elem: unlockAutoUpgrade,
  autoPrestige: get_or("autoPrestige", {
    active: false,
    maxed: false, 
    cost: 500,
  }),
  autoPrestige_elem: unlockAutoPrestige,

  // Functions
  toggleMenu(hotkeyed) {
    if (stats.totalPrestiges < 1) return;
    const isOpen = this.open;
    closeAllMenus(hotkeyed);
		isOpen ? this.closeMenu(hotkeyed) : this.openMenu(hotkeyed);
	},

	openMenu(hotkeyed) {
		const cList = showPrestShopBtn.classList;
		cList.toggle("-active", !cList.toggle("-functional", false));
    prestShop.style.transform = ("translate(-50%,-50%)");
    prestShopInfo.style.transform = ("translate(0%, -50%)");
    primary.hoverMenuOn = false;
    self.open = true;
		primary.toggleHoverMenu();
		if (!hotkeyed) sfx.menuToggle();
	},

	closeMenu(hotkeyed) {
		const cList = showPrestShopBtn.classList;
		cList.toggle("-functional", !cList.toggle("-active", false));    prestShop.style.transform = ("translate(-200%,-50%)");
    prestShopInfo.style.transform = ("translate(110%, -50%)");
    primary.hoverMenuOn = true;
    self.open = false;
		primary.toggleHoverMenu();
		if (!hotkeyed) sfx.menuToggle();
	},
  
  buyStartingPoints() {
    if (maxedAndCost(this.startingPoints)) return;
    this.startingPoints.lvl ++;
    this.points.update(v => v - this.startingPoints.cost);
    this.startingPoints.cost += 1;
    if (this.startingPoints.lvl >= 8) {
      const cList = this.startingPoints_elem.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.startingPoints.maxed = true;
    } 
    this.$unlockStartingPoints;
  },
  buyCrit() {
    if (maxedAndCost(this.crit)) return;
    if (this.crit.unlocked) {
      const cList = unlockCrit.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.crit.maxed = true;
      this.points.update(v => v - this.crit.cost);
      this.$unlockCrit;
    } else {
      this.points.update(v => v - this.crit.cost);
      this.crit.unlocked = true;
      this.crit.cost += 3; // supCrit cost
      this.$unlockCrit;
    }
  },
  buyDoub() {
    if (maxedAndCost(this.doub)) return;
    if (this.doub.unlocked) {
      const cList = unlockDoub.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.doub.maxed = true;
      this.points.update(v => v - this.doub.cost);
      this.$unlockDoub;
    } else {
      this.points.update(v => v - this.doub.cost);
      this.doub.unlocked = true;
      this.doub.cost += 2; //this is next used to buy quad.
      this.$unlockDoub;
    }
  },
  buyCostReduce() {
    if (maxedAndCost(this.costReduce)) return;
    this.costReduce.lvl += 1;
    this.points.update(v => v - this.costReduce.cost);
    this.costReduce.rate = .95 ** this.costReduce.lvl;  
    if (this.costReduce.lvl >= 10) {
      const cList = unlockCostReduce.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.costReduce.maxed = true;
    }
    this.$unlockCostReduce;
  },
  buyMorePrestigePoints() {
    if (maxedAndCost(this.morePoints)) return;
    this.morePoints.lvl += 1;
    this.points.update(v => v - this.morePoints.cost);
    this.gain += 1;
    if (this.morePoints.lvl >= 15) {
      const cList = unlockMorePrestigePoints.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.morePoints.maxed = true;
    }
    this.$unlockMorePrestigePoints;
  },
  buyThemeDouble() {
    if (maxedAndCost(this.themeDouble)) return;
    const cList = unlockThemeDouble.classList;
    cList.toggle("-full", !cList.toggle("-functional", false));
    this.themeDouble.maxed = true;
    this.points.update(v => v - this.themeDouble.cost);
    this.$unlockThemeDouble;
  },
  buyTertiaryUpgrade() {
    if (maxedAndCost(this.tertUp)) return;
    this.tertUp.lvl += 1;
    this.points.update(v => v - this.tertUp.cost);
    this.tertUp.cost += 1;
    primary.secondUp.amount *= 2;
    if (this.tertUp.lvl >= 20) {
      const cList = unlockTertiaryUpgrade.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.tertUp.maxed = true;
    }
    this.$unlockTertiaryUpgrade;
    primary.$secondryUpgrade;
  },
  buyUberBtn() {
    if (maxedAndCost(this.uberClickable)) return;
    const cList = unlockUberBtn.classList;
    cList.toggle("-full", !cList.toggle("-functional", false));
    this.uberClickable.maxed = true;
    this.points.update(v => v - this.uberClickable.cost);
    this.$unlockUberBtn;
  },
  buyAutoClick() {
    if (maxedAndCost(this.autoClick)) return;
    const cList = unlockAutoClick.classList;
    cList.toggle("-full", !cList.toggle("-functional", false));
    this.autoClick.maxed = true;
    this.points.update(v => v - this.autoClick.cost);
    themeBuyDetail.innerText = "*you regain 3 points per duplicate*";
    toggleAutoClick.style.display = "grid";

    this.$unlockAutoClick;
  },
  buyMoreThemeReturns() {
    if (maxedAndCost(this.moreThemeReturns)) return;
    const cList = unlockMoreThemeReturns.classList;
    cList.toggle("-full", !cList.toggle("-functional", false));
    this.moreThemeReturns.maxed = true;
    this.points.update(v => v - this.moreThemeReturns.cost);
    
    this.$unlockMoreThemeReturns;
  },
  buyAutoUpgrade() {
    if (maxedAndCost(this.autoUpgrade)) return;
    const cList = unlockAutoUpgrade.classList;
    cList.toggle("-full", !cList.toggle("-functional", false));
    this.autoUpgrade.maxed = true;
    this.points.update(v => v - this.autoUpgrade.cost);
    toggleAutoUpgrade.style.display = "grid";
    
    this.$unlockAutoUpgrade;
  },
  buyAutoPrestige() {
    if (maxedAndCost(this.autoPrestige)) return;
    const cList = unlockAutoPrestige.classList;
    cList.toggle("-full", !cList.toggle("-functional", false));
    this.autoPrestige.maxed = true;
    this.points.update(v => v - this.autoPrestige.cost);
    toggleAutoPrestige.style.display = "grid";
    
    this.$unlockAutoPrestige;
  },
  toggleAutoClick() {
    if (!this.autoClick.maxed) return;
    const cList = toggleAutoClick.classList;
    if (this.autoClick.active) {
      cList.toggle("-functional", !cList.toggle("-active", false));
      this.autoClick.active = false;
    } else {
      cList.toggle("-active", !cList.toggle("-functional", false));
      this.autoClick.active = true;
    } 
    sfx.click();
  },
  toggleAutoUpgrade() {
    if (!this.autoUpgrade.maxed) return;
    const cList = toggleAutoUpgrade.classList;
    if (this.autoUpgrade.active) {
      cList.toggle("-functional", !cList.toggle("-active", false));
      this.autoUpgrade.active = false;
    } else {
      cList.toggle("-active", !cList.toggle("-functional", false));
      this.autoUpgrade.active = true;
    } 
    sfx.click();
  },
  toggleAutoPrestige() {
    if (!this.autoPrestige.maxed) return;
    const cList = toggleAutoPrestige.classList;
    if (this.autoPrestige.active) {
      cList.toggle("-functional", !cList.toggle("-active", false));
      this.autoPrestige.active = false;
    } else {
      cList.toggle("-active", !cList.toggle("-functional", false));
      this.autoPrestige.active = true;
    } 
    sfx.click();
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

  get $prestigeBtn() {
    prestigeBtn.innerText = `Prestige\n[${formatNum(this.cost)} Points]`;
    return this;
  },
  get $unlockStartingPoints() {
    if (this.startingPoints.maxed) {
      unlockStartingPoints.innerText = `Starting Points Maximized\n[${this.startingPoints.lvl}/8 Complete]`;
    } else {
      unlockStartingPoints.innerText = `Double Starting Points\n[${this.startingPoints.lvl}/8 Complete]\n[${this.startingPoints.cost} Super Points]`;
    }
    return this;
  },
  get $unlockCrit() {
    if (this.crit.maxed) {
      unlockCrit.innerText = `Critical Clicks Maximized\n[2/2 Complete]`;
    } 
    else if (this.crit.unlocked) {
      unlockCrit.innerText = `Unlock Super Critcial Clicks\n[1/2 Complete]\n[${this.crit.cost} Super Points]`;
    } 
    else {
      unlockCrit.innerText = `Unlock Critical Clicks\n[0/2 Complete]\n[${this.crit.cost} Super Points]`;
    }
    return this;
  },
  get $unlockDoub() {
    if (this.doub.maxed) {
      unlockDoub.innerText = `Multi-Clicks Maximized\n[2/2 Complete]`;
    } 
    else if (this.doub.unlocked) {
      unlockDoub.innerText = `Unlock Quadruple Clicks\n[1/2 Complete]\n[${this.doub.cost} Super Points]`;
    }
    else {
      unlockDoub.innerText = `Unlock Double Clicks\n[0/2 Complete]\n[${this.doub.cost} Super Points]`;
    }
    return this;
  },
  get $unlockCostReduce() {
    if (this.costReduce.maxed) {
      unlockCostReduce.innerText = `Cost Reduction Maximized\n[${this.costReduce.lvl}/10 Complete]`;
    } else {
      unlockCostReduce.innerText = `Increase Cost Reduction\n[${this.costReduce.lvl}/10 Complete]\n[${this.costReduce.cost} Super Points]`;
    }
    return this;
  },
  get $unlockMorePrestigePoints() {
    if (this.morePoints.maxed) {
      unlockMorePrestigePoints.innerText = `Prestige Points Maximized\n[${this.morePoints.lvl}/15 Complete]`;
    } else {
      unlockMorePrestigePoints.innerText = `Increase Prestige Point Gain\n[${this.morePoints.lvl}/15 Complete]\n[${this.morePoints.cost} Super Points]`;
    }
    return this;
  },
  get $unlockThemeDouble() {
    if (this.themeDouble.maxed) {
      unlockThemeDouble.innerText = `Theme Double Maximized\n[1/1 Complete]`;
      return this;
    }
  },
  get $unlockTertiaryUpgrade() {
    if (this.tertUp.maxed)
      unlockTertiaryUpgrade.innerText = `Tertiary Upgrade Maximized\n[${this.tertUp.lvl}/20 Complete]`;
    else 
      unlockTertiaryUpgrade.innerText = `Increase Tertiary Upgrade\n[${this.tertUp.lvl}/20 Complete]\n[${this.tertUp.cost} Super Points]`;
    return this;
  },
  get $unlockUberBtn() {
    if (this.uberClickable.maxed) {
      unlockUberBtn.innerText = `Uber Clicks Maximized\n[1/1 Complete]`;
      return this;
    }
  },
  get $unlockAutoClick() {
    if (this.autoClick.maxed) {
      unlockAutoClick.innerText = `Auto Click Maximized\n[1/1 Complete]`;
      return this;
    }
  },
  get $unlockMoreThemeReturns() {
    if (this.moreThemeReturns.maxed) {
      unlockMoreThemeReturns.innerText = `More Duplicate-Theme Returns Maximized\n[1/1 Complete]`;
      return this;
    }
  },
  get $unlockAutoUpgrade() {
    if (this.autoUpgrade.maxed) {
      unlockAutoUpgrade.innerText = `Auto Upgrade Maximized\n[1/1 Complete]`;
      return this;
    }
  },
  get $unlockAutoPrestige() {
    if (this.autoPrestige.maxed) {
      unlockAutoPrestige.innerText = `Auto Prestige Maximized\n[1/1 Complete]`;
      return this;
    }
  },

  bigMoney() {
    let uberPoints = Math.round(primary.gain * 50 * 1.175 ** stats.totalPrestiges); 
    primary.points.update(v => v + uberPoints * (1 + this.points.$/100));
		stats.clicks++;
    if (stats.highestPointsUberClick < uberPoints) stats.highestPointsUberClick = uberPoints;
		if (stats.highestPoints < self.points.$) stats.highestPoints = self.points.$;
    uberClickable.style.display = "none";
    self.lastUber = stats.totalTime;
		stats.$clicks.$highestPoints.$highestPointsOneClick.$highestPointsUberClick;
    primary.$points;
    sfx.click();
  },

  // Do Prestige
  do_prestige(automatic) {
    if (primary.points.$ < self.cost) return;
    // if (this.autoPrestigeActive = false) areYouSure();
    if (stats.time < stats.fastestPrestige) stats.fastestPrestige = stats.time;
    primary.points.set((this.startingPoints.lvl <= 0)? 0 : (500 * 2 ** this.startingPoints.lvl));
    primary.gain = 1;
    primary.primUp.amount = 1;
    primary.primUp.cost = 10;
    primary.secondUp.cost = 250;
    stats.time = 0;
    primary.interest.unlocked = false;
    primary.interest.rate = 0;
    primary.interest.cost = 250000 * this.costReduce.rate; 
    stats.totalPrestiges += 1;
    this.points.update(v => v + this.gain) 
    this.cost += Math.ceil(this.cost * this.costReduce.rate);

    this.$prestigeBtn;
    themes.themeResultLabel;
    primary.$all; 
    stats.$all;
    
    showPrestShopBtn.style.display = ("grid");
    prestShop.style.display = ("grid");
    showThemes.style.display = ("grid");
  }
};

setTimeout(() => {
  if (stats.totalPrestiges > 0) {
    showPrestShopBtn.style.display = ("grid");
    prestShop.style.display = ("grid");
    showThemes.style.display = ("grid");
  };
  if (self.autoClick.maxed) {
    toggleAutoClick.style.display = ("grid");
    if (self.autoClick.active) {
      const cList = toggleAutoClick.classList;
      cList.toggle("-active", !cList.toggle("-functional", false));
    }
  };
  if (self.autoUpgrade.maxed) {
    toggleAutoUpgrade.style.display = ("grid");
    if (self.autoUpgrade.active) {
      const cList = toggleAutoUpgrade.classList;
      cList.toggle("-active", !cList.toggle("-functional", false));
    }
  };
  if (self.autoPrestige.maxed) {
    toggleAutoPrestige.style.display = ("grid");
    if (self.autoPrestige.active) {
      const cList = toggleAutoPrestige.classList;
      cList.toggle("-active", !cList.toggle("-functional", false));
    }
  }
  self.prestigeKeys.forEach(key => {
    if (self[`${key}_elem`] == undefined) {
      console.log(`self[ ${key}_elem ] == undefined`); 
      return;
    }
    const cList = self[`${key}_elem`].classList;
    if (self[key].maxed) {
      cList.toggle("-full", !cList.toggle("-functional", false));
    }
  });
}, 10);

self.points.sub((v) => {
  prestPointsTxt.innerText = `Super Points: ${formatNum(self.points.$)}`;
  themesSuperPointCount.innerText = `Super Points: ${formatNum(self.points.$)}`;

  self.prestigeKeys.forEach(key => {
    if (self[`${key}_elem`] == undefined) {
      console.log(`self[ ${key}_elem ] == undefined`); 
      return;
    }
    const cList = self[`${key}_elem`].classList;
    if (!cList.contains("-full")) {
      if (self[key].cost > self.points.$) {
        cList.toggle("-false", !cList.toggle("-functional", false));
      } else {
        cList.toggle("-functional", !cList.toggle("-false", false));
      };
    } else { 
      cList.toggle("-functional", false);
    }
  });
  const cList = buyThemeBtn.classList
  self.points.$ > 5 ? cList.toggle("-functional", !cList.toggle("-false", false)) : cList.toggle("-false", !cList.toggle("-functional", false));
});

clock.run(()=>{  
	if (self.uberClickable.maxed && stats.totalTime > self.lastUber + 15 && Math.random() * 10 < 1) { //uberBtn is unlocked + it's been >15 seconds + 1/10 chance = spawn uberBtn
		self.lastUber = stats.totalTime;
		uberBtn.style.left = (`${Math.random() * 100}%`);
		uberBtn.style.top = (`${Math.random() * 100}%`);
		uberBtn.style.display = "grid";
	}
  if (self.autoClick.maxed && self.autoClick.active) {
    primary.points.update(v => v + primary.gain * 5);
  }
  if (self.autoPrestige.maxed && self.autoPrestige.active) { // auto prestige has priority over(comes before) auto upgrade 
    self.do_prestige(true);
  }
  if (self.autoUpgrade.maxed && self.autoUpgrade.active) {
    primary.clickedInterestUp(true);
    primary.clickedSecondUp(true);
    primary.clickedPrimeUp(true);
  }
})

unlockStartingPoints.onclick = ()=> self.buyStartingPoints();
unlockCrit.onclick = ()=> self.buyCrit();
unlockDoub.onclick = ()=> self.buyDoub();
unlockCostReduce.onclick = ()=> self.buyCostReduce();
unlockMorePrestigePoints.onclick = ()=> self.buyMorePrestigePoints();
unlockThemeDouble.onclick = ()=> self.buyThemeDouble();
unlockTertiaryUpgrade.onclick = ()=> self.buyTertiaryUpgrade();
unlockUberBtn.onclick = ()=> self.buyUberBtn();
unlockAutoClick.onclick = ()=> self.buyAutoClick();
unlockMoreThemeReturns.onclick = ()=> self.buyMoreThemeReturns();
unlockAutoUpgrade.onclick = ()=> self.buyAutoUpgrade();
unlockAutoPrestige.onclick = ()=> self.buyAutoPrestige();

toggleAutoClick.onclick = ()=> self.toggleAutoClick();
toggleAutoUpgrade.onclick = ()=> self.toggleAutoUpgrade();
toggleAutoPrestige.onclick = ()=> self.toggleAutoPrestige();

uberClickable.onclick = ()=> self.bigMoney();

self.$all;

export default self;


const tool_tips = [
  "Info: restart after each prestige with points to spend.\r\n\r\nEquation: starting points = 500 * 2 ^ level of completion\r\n\r\n*prestige upgrades remain even after prestige*",
  "Info: each click has a chance to critical click. Successful critical clicks will then roll for super critical if it is unlocked\r\n\r\nCrit Equation: 1/5 chance for X2 points each click\r\n\r\nSuper Crit Equation: 1/4 chance to recieve X10 points each click\r\n\r\n*click effects stack*",
  "Info: each click has a chance to double click. Successful double clicks will then roll for a quad click if it is unlocked\r\n\r\nDouble Equation: 1/3 chance for X2 points from a click\r\n\r\nQuad Equation: 1/3 chance to recieve X2 points from a click\r\n\r\n*click effects stack*",
  "Info: reduce the amount that costs increase for regular upgrades(including prestige and interest)\r\n\r\nEquation: new cost = original cost * original cost increase * (0.95 ^ level of completion)\r\n\r\n*peaks at about 40% reduction*",
  "Info: receive more super points from each prestige\r\n\r\nEquation: super points from prestige = 5 + level of completion\r\n\r\n*this upgrade's cost doesn't increase*",
  "Info: double the amount that the secondary upgrade improves the primary upgrade\r\n\r\nEquation: new gain from secondary upgrade = previous gain from secondary upgrade * 2\r\n\r\n*this is overpowered*",
  "Info: buttons occasionaly appear in a random location for 1 high value click.\r\n\r\nEquation: uber click value = normal click value * 50 * (1.175 ^ number of prestiges)\r\n\r\n*gets stronger with each prestige*",
  "Info: increase the refund you get from each duplicate theme that you receive\r\n\r\nEquation: 3 Super Points per duplicate theme\r\n\r\n*this can get you positive returns from buying themes*",
  "Info: gives you points every second passively\r\n\r\nEquation: (normal click value * 5) / second\r\n\r\n*does not include click modifiers*",
  "Info: receive 2 items from theme boxes instead of 1\r\n\r\nEquation: 5 super points = 2 themes\r\n\r\n*receiving duplicates gives you some super points*",
  "Info: passively buys interest upgrade, secondary upgrade, and primary upgrade(respectively) every second\r\n\r\nEquation: (points - cost of upgrade) / second\r\n\r\n*the game is becoming effortless*",
  "Info: automatically prestiges for you\r\n\r\nEquation: attempt prestige every second\r\n\r\n*now you can play the game without playing the game!*",
];

const prest_tip_txt = document.querySelector("#description-box p");
const set_hover_tip = (i)=>{
  if (i < 0) {
    prest_tip_txt.innerText = "Hover over a shop item for more details here.";
    return;
  }
  let txt = tool_tips[i];
  if (txt == undefined) txt = "No information.";
  prest_tip_txt.innerText = txt;
}

(()=>{
  const prest_btns = document.querySelectorAll("#prestige-shop .btn");
  for (let i = 0; i < prest_btns.length; i++) {
    const btn = prest_btns[i];
    btn.onmouseenter = ()=>{
      set_hover_tip(i);
    }
    btn.onmouseleave = ()=>{
      set_hover_tip(-1);
    }
  }
})();
