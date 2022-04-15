import clock from "./clock.js";
import primary from "./primary.js";
import sfx from "./sfx.js";
import prestige from "./prestige.js";

const timer = $("#clock");
const showStatsBtn = $("#show-stats");
const statsWrapper = $("#stats");
const statElems = $all("#stats .stat");

showStatsBtn.onclick = ()=> self.toggleMenu();

const self = {
	open: false,
	
	totalTime: get_or("totalTime", 0),
	highestCps: get_or("highestCps", 0),
	totalPrestiges: get_or("totalPrestiges", 0),
	fastestPrestige: get_or("fastestPrestige", Number.MAX_SAFE_INTEGER),
	highestPoints: get_or("highestPoints", 0),
	highestPointsOneClick: get_or("highestPointsOneClick", 0),
	highestPointsUberClick: get_or("highestPointsUberClick", 0),
	
	time: get_or("time", 0),
	clicks: get_or("clicks", 0),
	
	// Functions
	toggleMenu(hotkeyed) {
		const isOpen = this.open;
		closeAllMenus(hotkeyed);
		isOpen ? this.closeMenu(hotkeyed) : this.openMenu(hotkeyed);
	},

	openMenu(hotkeyed) {
		const cList = showStatsBtn.classList;
		cList.toggle("-active", !cList.toggle("-functional", false));
		statsWrapper.style.transform = ("translate(-50%,-50%)");
		primary.hoverMenuOn = false;
		this.open = true;
		primary.toggleHoverMenu();
		if (!hotkeyed) sfx.menuToggle();
	},

	closeMenu(hotkeyed) {
		const cList = showStatsBtn.classList;
		cList.toggle("-functional", !cList.toggle("-active", false));
		statsWrapper.style.transform = ("translate(-50%,-200%)");
		primary.hoverMenuOn = true;
		this.open = false;
		primary.toggleHoverMenu();
		if (!hotkeyed) sfx.menuToggle();
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

	get $interestRate() {
		statElems[0].innerText = `Interest Rate: +${(primary.interest.rate*100).toFixed(1)}%`;
		return this;
	},
	get $totalTime() {
		statElems[1].innerText = `Total Time: ${this.totalTime} Seconds`;
		return this;
	},
	get $highestCps() {
		statElems[2].innerText = `Highest Clicks/Second: ${this.highestCps}`;
		return this;
	},
	get $startDate() {
		statElems[3].innerText = `Starting Date: ${new Date().toDateString()}`;
		return this;
	},
	get $fastestPrestige() {
		statElems[4].innerText = `Fastest Prestige: ${(this.fastestPrestige >= Number.MAX_SAFE_INTEGER)? "N/A" : `${this.fastestPrestige} seconds`}`;
		return this;
	},
	get $highestPoints() {
		statElems[5].innerText = `Highest Points: ${formatNum(this.highestPoints)}`;
		return this;
	},
	get $highestPointsOneClick() {
		statElems[6].innerText = `Highest Points In One Click: ${formatNum(this.highestPointsOneClick)}`;
		return this;
	},
	get $highestPointsUberClick() {
		statElems[7].innerText = `Highest Points From Uber Click: ${formatNum(this.highestPointsUberClick)}`;
		return this;
	},
	get $clicks() {
		statElems[8].innerText = `Total Clicks: ${formatNum(this.clicks)}`
		return this;
	},
	get $totalPrestiges() {
		statElems[9].innerText = `Total Prestiges: ${formatNum(this.totalPrestiges)}`
		return this;
	},
	get $uberClickValue() {
		statElems[10].innerText = `Uber Click Value: X${formatNum(Math.round(50 * 1.175 ** this.totalPrestiges))}`
		return this;
	},
	get $superPointBonus() {
		statElems[11].innerText = `Super Point Bonus: +${prestige.points.$/10}% Points Gain`
		return this;
	},
	get $time() {
		timer.innerText = `Seconds: ${this.time}`;
		return this;
	},
	
};

clock.run(()=>{
	self.time++;
	self.totalTime++;
	self.$time.$totalTime;
})

self.$all;

export default self;