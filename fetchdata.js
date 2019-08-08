let fetch = require('fetch');
let getdata = url =>
	new Promise((res, rej) => {
		fetch.fetchUrl(url, {}, (e, meta, d) => {
			res(d.toString());
		});
	});
let clean = arr => {};
function diff_minutes(dt1) {
	let dt2 = new Date();
	var diff = (dt2.getTime() - dt1.getTime()) / 1000;
	diff /= 60;
	let min = Math.abs(Math.floor(diff));
	let sec = Math.round((diff - min) * 60);
	sec=sec<10?"0"+sec:sec
	return `${min}:${sec}`;
}
let run = async () => {
	let x = await getdata('https://api.hitbtc.com/api/2/public/trades/ETHDAI');
	let data = JSON.parse(x);

	let output = [];
	let s = 'buy';
	await data.forEach(d => {
		let { price, quantity, side, timestamp } = d;
		price = Number(price);
		quantity = Number(quantity);
		let ts = new Date(timestamp);
		output.push({ price, quantity, side, time: diff_minutes(ts) });
		s = side;
	});
	return output;
};
module.exports = run;
