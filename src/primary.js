import clock from "./clock.js";
import prestige from "./prestige.js";
import sfx from "./sfx.js";
import stats from "./stats.js";

const pointsTxt = $("#points");
const mainClick = $("#main-click");
const primaryUpgrade = $("#primary-upgrade");
const secondaryUpgrade = $("#secondary-upgrade");
const interestBtn = $("#interest-btn");
const upgradePanel = $("#upgrade-panel");
const hoverMenuUpgrades = $("#hover-menu-upgrades");

// temporary fix, run this function elsewhere; hopefully prestige is loaded by then.
const initOnClicks = ()=>{
	mainClick.onclick = ()=>{
    let tempGain = self.gain;
    if (prestige.crit.unlocked && (Math.random() <= 1/5)) {
      tempGain *= 2;
      if (prestige.crit.maxed && (Math.random() <= 1/5)) tempGain *= 10;
    }

    if (prestige.doub.unlocked && (Math.random() < 1/5)) {
      tempGain *= 2;
      if (prestige.doub.maxed && (Math.random() < 1/5)) tempGain *= 2;
    }

		self.points += tempGain;
		self.$points;

		
		if (stats.highestPointsOneClick < tempGain) stats.highestPointsOneClick = tempGain;
		if (stats.highestPoints < self.points) stats.highestPoints = self.points;
		stats.clicks++;
		stats.$clicks.$highestPoints.$highestPointsOneClick;

		sfx.click();
	};

	primaryUpgrade.onclick = ()=>{
		if (self.points < self.primUp.cost) return;
		self.points -= self.primUp.cost;
		self.primUp.cost = Math.round(self.primUp.cost * (1 + .1 * prestige.costReduce.rate)); 
		self.gain += self.primUp.amount;
		self.$points.$primaryUpgrade.$mainClick;
	};

	secondaryUpgrade.onclick = ()=>{
		if (self.points < self.secondUp.cost) return;
		self.points -= self.secondUp.cost;
		self.secondUp.cost = Math.round(self.secondUp.cost * (1 + .05 * prestige.costReduce.rate)); 
		self.primUp.amount += self.secondUp.amount;
		self.$points.$primaryUpgrade.$secondryUpgrade;
	};

	interestBtn.onclick = ()=>{
		if (self.interest.unlocked == false) {
			if (self.points < self.interest.unlockCost * prestige.costReduce.rate) return; 
			self.points -= self.interest.unlockCost * prestige.costReduce.rate; 
			self.interest.unlocked = true;
			self.interest.rate = .005;
			self.$interestBtn.$points;
      stats.$interestRate;
			return;
		}
		if (self.points < self.interest.cost) return;
		self.points -= self.interest.cost;
		self.interest.cost = Math.round(self.interest.cost * (1 + .25 * prestige.costReduce.rate)); 
		self.interest.rate = Math.round((self.interest.rate + self.interest.amount)*1000)/1000;
		self.$interestBtn.$points;
		stats.$interestRate;
	};
};

const self = {
	points: 0, // 0
	gain: 1,

  primUp: {
		cost: 10,
    amount: 1
	},
	secondUp: {
		cost: 250,
		amount: 1
	},
	interest: {
		unlocked: false,
		unlockCost: 100000, // 100k
    cost: 250000, // 250k
		rate: 0, // rate of gain per second
    amount: .001,
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

	get $points() {
		pointsTxt.innerText = `Points: ${formatNum(this.points)}`;
		return this;
	},
  get $mainClick() {
    mainClick.innerText = `Click This: +${formatNum(self.gain)} Points`;
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

clock.run(()=>{
	self.points *= 1 + self.interest.rate;
	self.$points;
	if (stats.highestPoints < self.points) stats.highestPoints = self.points; stats.$highestPoints;
	if (self.points >= Infinity) console.log("not infinity you're good to go")
}); 

export default self;