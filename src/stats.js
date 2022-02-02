import clock from "./clock.js";
import primary from "./primary.js"
import sfx from "./sfx.js";

const timer = $("#clock");
const showStatsBtn = $("#show-stats");
const statsWrapper = $("#stats");
const statElems = $all("#stats .stat");

showStatsBtn.onclick = ()=> self.toggleMenu();


const self = {
	open: false,
	
	// interestRate: 0,           // 0
	totalTime: 0,              // 1
	highestCps: 0,             // 2
	totalPrestiges: 0,         // 3
	fastestPrestige: Infinity, // 4
	highestPoints: 0,          // 5
	highestPointsOneClick: 0,  // 6
	
	time: 0,
	clicks: 0,
	prestigeAmt: 0,
	
	// Functions
	toggleMenu() {
		const isOpen = this.open;
		closeAllMenus();
		isOpen ? this.closeMenu() : this.openMenu();
	},

	openMenu() {
		showStatsBtn.style.backgroundColor = ("rgb(235, 101, 92)");
		statsWrapper.style.transform = ("translate(-50%,-50%)");
		primary.hoverMenuOn = false;
		this.open = true;
		primary.toggleHoverMenu();
		sfx.menuToggle();
	},

	closeMenu() {
		showStatsBtn.style.backgroundColor = ("green");
		statsWrapper.style.transform = ("translate(-50%,-200%)");
		primary.hoverMenuOn = true;
		this.open = false;
		primary.toggleHoverMenu();
		sfx.menuToggle();
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
	get $totalPrestiges() {
		// statElems[3].innerText = `Times Prestiged: ${this.totalPrestiges}`;
		return this;
	},
	get $fastestPrestige() {
		// if inifinity set text to something else
		statElems[4].innerText = `Fastest Prestige: ${(!isFinite(this.fastestPrestige))? "N/A" : `${this.fastestPrestige} seconds`}`;
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
	
	get $clicks() {
		statElems[7].innerText = `Total Clicks: ${formatNum(this.clicks)}`
		return this;
	},
	get $prestigeAmt() {
		statElems[8].innerText = `Total Prestiges: ${formatNum(this.totalPrestiges)}`
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