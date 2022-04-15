import clock from "./clock.js";
import prestige from "./prestige.js";
import sfx from "./sfx.js";
import stats from "./stats.js";

const pointsTxt = $("#points");
const mainClick = $("#main-click");
const primaryUpgrade = $("#primary-upgrade");
const secondaryUpgrade = $("#secondary-upgrade");
const interestBtn = $("#interest-btn");
const prestigeBtn = $("#prestige-btn")
const upgradePanel = $("#upgrade-panel");
const hoverMenuUpgrades = $("#hover-menu-upgrades");

// temporary fix, run this function elsewhere; hopefully prestige is loaded by then.
const initOnClicks = ()=>{
	mainClick.onclick = ()=> self.clickedMain(false);
	primaryUpgrade.onclick = ()=> self.clickedPrimeUp(false);
	secondaryUpgrade.onclick = ()=> self.clickedSecondUp(false);
	interestBtn.onclick = ()=> self.clickedInterestUp(false);
};

const self = {
  points: new Reactive(get_or("primary.points", 0)), // normal points
	gain: get_or("primary.gain", 1),

  primUp: get_or("primUp", {
		cost: 10,
    amount: 1,
	}),
	secondUp: get_or("secondUp", {
		cost: 250,
		amount: 1,
	}),
	interest: get_or("interest", {
		unlocked: false,
		unlockCost: 100000, // 100k
    cost: 250000, // 250k
		rate: 0, // rate of gain per second
    amount: .001,
	}),

	clickedMain: ()=>{
    let tempGain = self.gain;
    if (prestige.crit.unlocked && (Math.random() <= 1/5)) {
      tempGain *= 2;
      if (prestige.crit.maxed && (Math.random() <= 1/5)) tempGain *= 10;
    }
    if (prestige.doub.unlocked && (Math.random() < 1/5)) {
      tempGain *= 2;
      if (prestige.doub.maxed && (Math.random() < 1/5)) tempGain *= 2;
    }
		tempGain = Math.round(tempGain * (1 + (prestige.points.$/100)));
		sfx.click();

		self.points.update(v => v + tempGain);

		if (stats.highestPointsOneClick < tempGain) stats.highestPointsOneClick = tempGain;
		if (stats.highestPoints < self.points.$) stats.highestPoints = self.points.$;
		stats.clicks++;
		stats.$clicks.$highestPoints.$highestPointsOneClick;
	},
	clickedPrimeUp: ()=>{
		if (self.points.$ < self.primUp.cost) return;
		self.points.update(v => v - self.primUp.cost);
		self.primUp.cost = Math.round(self.primUp.cost * (1 + .1 * prestige.costReduce.rate)); 
		self.gain += self.primUp.amount;
		self.$primaryUpgrade.$mainClick;
	},
	clickedSecondUp: ()=>{
		if (self.points.$ < self.secondUp.cost) return;
		self.points.update(v => v - self.secondUp.cost);
		self.secondUp.cost = Math.round(self.secondUp.cost * (1 + .05 * prestige.costReduce.rate)); 
		self.primUp.amount += self.secondUp.amount;
		self.$primaryUpgrade.$secondryUpgrade;
	},
	clickedInterestUp: ()=>{
		if (self.interest.unlocked == false) {
			if (self.points.$ < self.interest.unlockCost * prestige.costReduce.rate) return; 
			self.points.update(v => v - self.interest.unlockCost * prestige.costReduce.rate); 
			self.interest.unlocked = true;
			self.interest.rate = .005;
			self.$interestBtn;
      stats.$interestRate;
			return;
		}
		if (self.points.$ < self.interest.cost) return;
		self.points.update(v => v - self.interest.cost);
		self.interest.cost = Math.round(self.interest.cost * (1 + .25 * prestige.costReduce.rate)); 
		self.interest.rate = Math.round((self.interest.rate + self.interest.amount)*1000)/1000;
		self.$interestBtn;
		stats.$interestRate;
	},

	initOnClicks: initOnClicks,

	hoverMenuOn: true,
	toggleHoverMenu() {
		if (this.hoverMenuOn) {
			const cList = hoverMenuUpgrades.classList;
			cList.toggle("-functional", !cList.toggle("-false", false));
			upgradePanel.style.display = ("grid");
			hoverMenuUpgrades.innerText = ("H\r\nO\r\nV\r\nE\r\nR");
		}
		else {
			const cList = hoverMenuUpgrades.classList;
			cList.toggle("-false", !cList.toggle("-functional", false));
			upgradePanel.style.display = ("none");
			hoverMenuUpgrades.innerText = ("");
		}
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

  get $mainClick() {
    mainClick.innerText = `Click This: +${formatNum(this.gain)} Points`;
    return this;
  },
	get $primaryUpgrade() {
		primaryUpgrade.innerText = `Primary Upgrade\n(+${formatNum(this.primUp.amount)} Points/Click)\n[${formatNum(this.primUp.cost)} Points]`;
		return this;
	},
	get $secondryUpgrade() {
		secondaryUpgrade.innerText = `Secondary Upgrade\n(+${formatNum(this.secondUp.amount)} Points Per Click Per Upgrade)\n[${formatNum(this.secondUp.cost)} Points]`;
		return this;
	},
  get $interestBtn () {
    if (this.interest.unlocked) interestBtn.innerText = `Upgrade Interest\n(+${this.interest.amount*100}%/Second)\n[${formatNum(this.interest.cost)} Points]`;
		else interestBtn.innerText = `Unlock Interest\n(+0.5% Points/Second)\n[${formatNum(this.interest.unlockCost)} Points]`;
    return this;
  }
};
self.$all;

self.points.sub((v) => {
	pointsTxt.innerText = `Points: ${formatNum(self.points.$)}`;

  let cList = primaryUpgrade.classList;
  self.points.$ >= self.primUp.cost ? cList.toggle("-functional", !cList.toggle("-false", false)) : cList.toggle("-false", !cList.toggle("-functional", false));
  cList = secondaryUpgrade.classList;
  self.points.$ >= self.secondUp.cost ? cList.toggle("-functional", !cList.toggle("-false", false)) : cList.toggle("-false", !cList.toggle("-functional", false));
  cList = interestBtn.classList;
	self.interest.unlocked ? self.points.$ >= self.interest.cost ? cList.toggle("-functional", !cList.toggle("-false", false)) : cList.toggle("-false", !cList.toggle("-functional", false)) : self.points.$ > self.interest.unlockCost ? cList.toggle("-functional", !cList.toggle("-false", false)) : cList.toggle("-false", !cList.toggle("-functional", false))
  cList = prestigeBtn.classList;
  self.points.$ >= prestige.cost ? cList.toggle("-functional", !cList.toggle("-false", false)) : cList.toggle("-false", !cList.toggle("-functional", false));

});

clock.run(()=>{
	// self.points.update(v => v - self.interest.cost);
	self.points.update(v => v * Math.round(1 + (self.interest.rate * (prestige.points.$/100))));
	if (stats.highestPoints < self.points.$) stats.highestPoints = self.points.$;
	stats.$highestPoints;
	// if (self.points >= Infinity) console.log("you are at infinity")
}); 

export default self;