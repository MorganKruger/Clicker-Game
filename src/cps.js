// import primary from "./primary.js";
import clock from "./clock.js";
import stats from "./stats.js";

const cpsTxt = $("#cps");

const self = {
	cps: 0,
	get $cps() {
		cpsTxt.innerText = `Clicks/Second: ${this.cps}`;
		return this;
	},
};

//? Cash Per Second
// let hold = 0;
// clock.run(()=>{
// 	const diff = primary.points - hold;
// 	hold = primary.points;
// 	console.log(diff);
// });

let hold = 0;
clock.run(()=>{
	self.cps = Math.max(stats.clicks - hold, 0);
	hold = stats.clicks;
	self.$cps;

	if (self.cps > stats.highestCps) stats.highestCps = self.cps;
	stats.$highestCps;
});

export default self;