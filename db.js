const fs = require('fs');
const path = require('path');

class db {
	constructor() {
		this.filepath = path.join(__dirname, 'db.json');
        this.filetxt = fs.readFileSync(this.filepath);
        this.data = JSON.parse(this.filetxt)
        this.update=this.update.bind(this)
    }
    build(arr){
        
       
        arr.forEach((element,i) => {

            let k=element.pop()
            this.data[`${k}`]=[]
            this.data[`${k}`][i]={}
            this.data[`${k}`][i].time=element.pop()
            element.pop()
            element.pop()
            this.data[`${k}`][i].high = element.pop()
            this.data[`${k}`][i].low = element.pop()
            element.pop()
            this.data[`${k}`][i].last = element.pop()
        });
        return this.data
    }
    update(data){
        let tt = data[0].map(z=>Object.values(z))
        //let out =[ask,bid,last,open,high,low,symbol]
        //console.log(tt)
        
        this.build(tt)
        fs.writeFileSync(this.filepath,JSON.stringify(this.data))
       
    }
}
module.exports=db