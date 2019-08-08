let fetch = require('fetch');
let db = require("./db")
let datadb = new db();
let getdata = url =>
	new Promise((res, rej) => {
		fetch.fetchUrl(url, {}, (e, meta, d) => {
			res(d.toString());
		});
	});
let allData = [];

async function rtn(syms = []) {
	let x = await getdata('https://api.hitbtc.com/api/2/public/ticker');
    let data = JSON.parse(x);
    //let tmp = data.map(di => ({ symbol: di.symbol, last: di.last }));
    let tmp = data
	let tmp2 = [];
	tmp.forEach(s => {
		syms.forEach(x => {
			if (s.symbol == x) tmp2.push(s);
		});
	});
    allData.push(tmp2);
    datadb.update(allData)
	return datadb.data;
}
module.exports = rtn;
