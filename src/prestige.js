import primary from "./primary.js";
import stats from "./stats.js";
import sfx from "./sfx.js";

const unlockStartingPoints = $("#unlock-starting-points");
const unlockCrit = $("#unlock-crit");
const unlockDoub = $("#unlock-double");
const unlockCostReduce = $("#unlock-cost-reduce");
const unlockMorePrestigePoints = $("#unlock-more-prestige-points");
const unlockThemeDouble = $("#unlock-theme-double");
const unlockTertiaryUpgrade = $("#unlock-tertiary-upgrade");

const prestShop = $("#prestige-shop");
const prestPointsTxt = $("#prestige-points");
const prestShopInfo = $("#prestige-shop-info");
const showPrestShopBtn = $("#show-prestige-shop");

const prestigeBtn = $("#prestige-btn");

prestigeBtn.onclick = ()=> self.do_prestige();

showPrestShopBtn.onclick = ()=> self.toggleMenu();

const maxedAndCost = upgr => (upgr.maxed == true || self.points < upgr.cost || !self.open ||  stats.totalPrestiges < 1);

const self = {
  open: false,

  cost: 50000000, // 50M
  points: 999, // prestige points
  gain: 5,

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
    this.points -= this.startingPoints.cost;
    this.startingPoints.cost += 1;
    if (this.startingPoints.lvl >= 8) {
      const cList = unlockStartingPoints.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.startingPoints.maxed = true;
    } 
    this.$unlockStartingPoints.$prestigePoints;
  },
  buyCrit() {
    if (maxedAndCost(this.crit)) return;
    if (this.crit.unlocked) {
      const cList = unlockCrit.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.crit.maxed = true;
      this.points -= this.crit.cost;
      this.$unlockCrit.$prestigePoints;
    } else {
      this.points -= this.crit.cost;
      this.crit.unlocked = true;
      this.crit.cost += 3; // supCrit cost
      this.$unlockCrit.$prestigePoints;
    }
  },
  buyDoub() {
    if (maxedAndCost(this.doub)) return;
    if (this.doub.unlocked) {
      const cList = unlockDoub.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.doub.maxed = true;
      this.points -= this.doub.cost;
      this.$unlockDoub.$prestigePoints;
    } else {
      this.points -= this.doub.cost;
      this.doub.unlocked = true;
      this.doub.cost += 2; //this is next used to buy quad.
      this.$unlockDoub.$prestigePoints;
    }
  },
  buyCostReduce() {
    if (maxedAndCost(this.costReduce)) return;
    this.costReduce.lvl += 1;
    this.points -= this.costReduce.cost;
    this.costReduce.rate = .95 ** this.costReduce.lvl;  
    if (this.costReduce.lvl >= 10) {
      const cList = unlockCostReduce.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.costReduce.maxed = true;
    }
    this.$unlockCostReduce.$prestigePoints;
  },
  buyMorePrestigePoints() {
    if (maxedAndCost(this.morePoints)) return;
    this.morePoints.lvl += 1;
    this.points -= this.morePoints.cost;
    this.gain += 1;
    if (this.morePoints.lvl >= 15) {
      const cList = unlockMorePrestigePoints.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.morePoints.maxed = true;
    }
    this.$unlockMorePrestigePoints.$prestigePoints;
  },
  buyThemeDouble() {
    if (maxedAndCost(this.themeDouble)) return;
    const cList = unlockThemeDouble.classList;
    cList.toggle("-full", !cList.toggle("-functional", false));
    this.themeDouble.maxed = true;
    this.points -= this.themeDouble.cost;
    this.$unlockThemeDouble.$prestigePoints;
  },
  buyTertiaryUpgrade() {
    if (maxedAndCost(this.tertUp)) return;
    this.tertUp.lvl += 1;
    this.points -= this.tertUp.cost;
    this.tertUp.cost += 1;
    primary.secondUp.amount *= 2;
    if (this.tertUp.lvl >= 20) {
      const cList = unlockTertiaryUpgrade.classList;
      cList.toggle("-full", !cList.toggle("-functional", false));
      this.tertUp.maxed = true;
    }
    this.$unlockTertiaryUpgrade.$prestigePoints;
    primary.$secondryUpgrade;
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
  get $prestigePoints() {
    prestPointsTxt.innerText = `Super Points: ${this.points}`;
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
    this.points += this.gain; 
    this.cost += Math.ceil(this.cost * this.costReduce.rate);
    
    this.$prestigePoints;
    this.$prestigeBtn;
    
    this.$prestigePoints.$prestigeBtn;
    primary.$all; 
    stats.$all;
    
    $("#show-prestige-shop").style.display = ("grid");
    $("#prestige-shop").style.display = ("grid");
    $("#show-themes").style.display = ("grid");
    // $("#themes").style.display = ("block");
  }
};

unlockStartingPoints.onclick = ()=> self.buyStartingPoints();
unlockCrit.onclick = ()=> self.buyCrit();
unlockDoub.onclick = ()=> self.buyDoub();
unlockCostReduce.onclick = ()=> self.buyCostReduce();
unlockMorePrestigePoints.onclick = ()=> self.buyMorePrestigePoints();
unlockThemeDouble.onclick = ()=> self.buyThemeDouble();
unlockTertiaryUpgrade.onclick = ()=> self.buyTertiaryUpgrade();

self.$all;

export default self;

/* 
const tool_tips = [
  "Information: restart after each prestige with points to spend\r\n\r\nEquation: starting points = 500 * 2 ^ level of completion\r\n\r\n*prestige upgrades remain even after prestige*",
  "Information: each click rolls for a chance to critical click. Successful critical clicks will then roll for super critical if it is unlocked\r\n\r\nCritical Equation: 1/5 chance to recieve X2 points from a click\r\n\r\nSuper Critical Equation: 1/4 chance to recieve X10 points from a click\r\n\r\n*click effects stack*",
  "Information: each click rolls for a chance to double click. Successful double clicks will then roll for a quad click if it is unlocked\r\n\r\nDouble Equation: 1/3 chance to recieve X2 points from a click\r\n\r\nQuadruple Equation: 1/3 chance to recieve X2 points from a click\r\n\r\n*click effects stack*",
  "Information: reduce the amount that costs increase for regular upgrades(including prestige and interest)\r\n\r\nEquation: new cost = original cost * original cost increase * (0.95 ^ level of completion)\r\n\r\n*peaks at about 40% reduction*",
  "Information: receive more super points from each prestige\r\n\r\nEquation: super points gain = 5 + level of completion\r\n\r\n*this upgrade's cost doesn't increase*",
  "Information: double the amount that the secondary upgrade improves the primary upgrade\r\n\r\nEquation: secondary upgrade gain(new) = secondary upgrade gain(old) * 2\r\n\r\n*this is overpowered*",
  "No information",
  "No information",
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
*/