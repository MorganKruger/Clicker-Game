/** @type Function[] */
const runners = [];

const self = {
	loop: setInterval(() => {
		for (let i = 0; i < runners.length; i++) runners[i]();
	}, 1000),
	/** @param {Function} func */
	run(func) {
		runners.push(func);
	}
};

export default self;