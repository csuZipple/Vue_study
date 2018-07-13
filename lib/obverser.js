// this file is used to listen data modified
class Obverser {
    constructor(obj){
        this.data = obj;
        if (!this.data || typeof this.data !== 'object') return;
        Object.keys(this.data).forEach(key=>{
            console.log(key);
            this._listen(key,this.data[key]);//use arrow function to bind this.
        })
    }

     _listen(key, val){
        new Obverser(val);
        Object.defineProperty(this.data,key,{
            enumerable:true,
            configurable:false,
            set(newval){
                console.log("the key "+key+" set new value:",newval);
                val = newval;
            },
            get(){
                return val;
            }
        });
    }
}

export default Obverser;