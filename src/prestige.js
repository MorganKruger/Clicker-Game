import primary from "./primary.js";
import stats from "./stats.js";
import sfx from "./sfx.js";
import clock from "./clock.js";
import themes from "./themes.js";

const themesSuperPointCount = $("#themes-super-point-count")
const unlockStartingPoints = $("#unlock-starting-points");
const unlockCrit = $("#unlock-crit");
const unlockDoub = $("#unlock-double");
const unlockCostReduce = $("#unlock-cost-reduce");
const unlockMorePrestigePoints = $("#unlock-more-prestige-points");
const unlockThemeDouble = $("#unlock-theme-double");
const unlockTertiaryUpgrade = $("#unlock-tertiary-upgrade");
const unlockUberBtn = $("#unlock-uber-btn");
const uberBtn = $("#uber-btn");
const unlockMoreThemeReturns = $("#unlock-more-duplicate-theme-returns");

const prestShop = $("#prestige-shop");
const prestPointsTxt = $("#prestige-points");
const prestShopInfo = $("#prestige-shop-info");
const showPrestShopBtn = $("#show-prestige-shop");

const prestigeBtn = $("#prestige-btn");

const uberClickable = $("#uber-btn");

prestigeBtn.onclick = ()=> self.do_prestige();

showPrestShopBtn.onclick = ()=> self.toggleMenu();

const maxedAndCost = upgr => (upgr.maxed == true || self.points.$ < upgr.cost || !self.open ||  stats.totalPrestiges < 1);

const self = {
  open: false,
  cost: 50000000, // 50M
  gain: 5,
  lastUber: 0,

  points: new Reactive(0), // prestige points

  startingPoints: {
    maxed: false,
    cost: 2,
    lvl: 0,
  },
  crit: {
    unlocked: false,
    maxed: false,
    cost: 2, //2 then 4 or something
  },
  doub: {
    unlocked: false,
    maxed: false,
    cost: 3, //3 then 69 or something
  },
  costReduce: {
    rate: 1,
    unlocked: false,
    maxed: false,
    lvl: 0,
    cost: 1,
  },
  morePoints: { 
    lvl: 0,
    unlocked: false,
    maxed: false,
    cost: 2,
  },
  themeDouble: { 
    maxed: false,
    cost: 20,
  },  
  tertUp: { 
    maxed: false,
    cost: 1,
    lvl: 0,
  },
  uberClickable: { 
    maxed: false,
    cost: 10,
  },  
  moreThemeReturns: {
    maxed: false,
    cost: 100,
  },


  // Functions
  toggleMenu() {
    const isOpen = this.open;
    closeAllMenus();
		isOpen ? this.closeMenu() : this.openMenu();
	},

	openMenu() {
		const cList = showPrestShopBtn.classList;
		cList.toggle("-active", !cList.toggle("-functional", false));
    prestShop.style.transform = ("translate(-50%,-50%)");
    prestShopInfo.style.transform = ("translate(0%, -50%)");
    primary.hoverMenuOn = false;
    self.open = true;
		primary.toggleHoverMenu();
		sfx.menuToggle();
	},

	closeMenu() {
		const cList = showPrestShopBtn.classList;
		cList.toggle("-functional", !cList.toggle("-active", false));    prestShop.style.transform = ("translate(-200%,-50%)");
    prestShopInfo.style.transform = ("translate(110%, -50%)");
    primary.hoverMenuOn = true;
    self.open = false;
		primary.toggleHoverMenu();
		sfx.menuToggle();
	},
  
  buyStartingPoints() {
    if (maxedAndCost(this.startingPoints)) return;
    this.startingPoints.lvl += 1;
    this.points.update(v => v - this.startingPoints.cost);
    this.startingPoints.cost += 1;
    if (this.startingPoints.lvl >= 8) {
      const cList = unlockStartingPoints.classList;
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
  buyMoreThemeReturns() {
    if (maxedAndCost(this.moreThemeReturns)) return;
    const cList = unlockMoreThemeReturns.classList;
    cList.toggle("-full", !cList.toggle("-functional", false));
    this.moreThemeReturns.maxed = true;
    this.points.update(v => v - this.moreThemeReturns.cost);
    
    this.$unlockMoreThemeReturns;
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
      unlockDoub.innerText = `Unlock Double Clicks\n[0/2 Complete]\n[${this.doub.cost} Super Points]`
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
  get $unlockMoreThemeReturns() {
    if (this.moreThemeReturns.maxed) {
      unlockMoreThemeReturns.innerText = `More Duplicate-Theme Returns Maximized\n[1/1 Complete]`
      return this;
    }
  },

  bigMoney() {
    let uberPoints = Math.round(primary.gain * 50 * 1.175 ** stats.totalPrestiges); 
    primary.points += uberPoints;
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
  do_prestige() {
    if (primary.points < self.cost) return;
    // are you sure? This will reset your score and non-permenant upgrades
    if (stats.time < stats.fastestPrestige) stats.fastestPrestige = stats.time;
    primary.points = ((this.startingPoints.lvl <= 0)? 0 : (500 * 2 ** this.startingPoints.lvl));
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
    $("#show-themes").style.display = ("grid");
  }
};

self.points.sub((v) => {
  prestPointsTxt.innerText = `Super Points: ${formatNum(self.points.$)}`;
  themesSuperPointCount.innerText = `Super Points: ${formatNum(self.points.$)}`;
});

clock.run(()=>{  
	if (self.uberClickable.maxed && stats.totalTime > self.lastUber + 15 && Math.random() * 10 < 1) { //uberBtn is unlocked + it's been >15 seconds + 1/10 chance = spawn uberBtn
		self.lastUber = stats.totalTime;
		uberBtn.style.left = (`${Math.random() * 100}%`);
		uberBtn.style.top = (`${Math.random() * 100}%`);
		uberBtn.style.display = "grid";
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
unlockMoreThemeReturns.onclick = ()=> self.buyMoreThemeReturns();

uberClickable.onclick = ()=> self.bigMoney();

self.$all;

export default self;


const tool_tips = [
  "Information: restart after each prestige with points to spend.\r\n\r\nEquation: starting points = 500 * 2 ^ level of completion\r\n\r\n*prestige upgrades remain even after prestige*",
  "Information: each click has a chance to critical click. Successful critical clicks will then roll for super critical if it is unlocked\r\n\r\nCritical Equation: 1/5 chance for X2 points from a click\r\n\r\nSuper Critical Equation: 1/4 chance to recieve X10 points from a click\r\n\r\n*click effects stack*",
  "Information: each click has a chance to double click. Successful double clicks will then roll for a quad click if it is unlocked\r\n\r\nDouble Equation: 1/3 chance for X2 points from a click\r\n\r\nQuadruple Equation: 1/3 chance to recieve X2 points from a click\r\n\r\n*click effects stack*",
  "Information: reduce the amount that costs increase for regular upgrades(including prestige and interest)\r\n\r\nEquation: new cost = original cost * original cost increase * (0.95 ^ level of completion)\r\n\r\n*peaks at about 40% reduction*",
  "Information: receive more super points from each prestige\r\n\r\nEquation: super points gain = 5 + level of completion\r\n\r\n*this upgrade's cost doesn't increase*",
  "Information: double the amount that the secondary upgrade improves the primary upgrade\r\n\r\nEquation: secondary upgrade gain(new) = secondary upgrade gain(old) * 2\r\n\r\n*this is overpowered*",
  "Information: buttons occasionaly appear in a random location for 1 high value click.\r\n\r\nEquation: uber click value = normal click value * 50 * (1.175 ^ number of prestiges)\r\n\r\n*gets stronger with each prestige*",
  "Information: increase the refund you get from each duplicate theme that you receive\r\n\r\nEquation: 3 Super Points per duplicate theme\r\n\r\n*this can get you positive returns from buying themes*",
  "No information",
  "Information: receive 2 items from theme boxes instead of 1\r\n\r\nEquation: N/A\r\n\r\n*you may receive duplicates*",
  "No information",
  "No information",
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
