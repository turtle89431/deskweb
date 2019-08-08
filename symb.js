let fetch = require('fetch');
let fs = require('fs');
let path = require('path');
Number.prototype.mmap = function(in_min, in_max, out_min, out_max) {
	return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

let getdata = url =>
	new Promise((res, rej) => {
		fetch.fetchUrl(url, {}, (e, meta, d) => {
			res(d.toString());
		});
	});
let show = async (syms = []) => {
	let out = {};
	var ci = 0;
	while (ci < syms.length) {
		let s = syms[ci];
		await getdata(`https://api.hitbtc.com/api/2/public/trades/${s}`).then(x => {
			out[`${s}`] = {};
			out[`${s}`].price = JSON.parse(x).map(y => Number(y.price));
			out[`${s}`].sum = out[`${s}`].price.reduce((a, b) => a + b);
			out[`${s}`].avg = out[`${s}`].sum / out[`${s}`].price.length;
			let ts = out[`${s}`].avg;
			delete out[`${s}`].sum;
			let min = 100000000000;
			let max = 0;

			out[`${s}`] = out[`${s}`].price.map(y => y / ts);
	
			ci++;
		});
	}
	// await syms.forEach(async s => {
	// 	let tmp = await getdata(`https://api.hitbtc.com/api/2/public/trades/${s}`);
	// 	out[`${s}`] = JSON.parse(tmp);
	// });
	return out;
};
module.exports = show;
