import Dep from "./dep";

// this file is used to listen data modified
class Observer {
    constructor(obj){
        this.data = obj;
        if (!this.data || typeof this.data !== 'object') return;
        Object.keys(this.data).forEach(key=>{
            console.log(key);
            this._listen(key,this.data[key]);//use arrow function to bind this.
        })
    }

     _listen(key, val){
        new Observer(val);
        let dep = new Dep();
        Object.defineProperty(this.data,key,{
            enumerable:true,
            configurable:false,
            set(newval){
                if (newval===val) return;//do not need notify
                console.log("the key "+key+" set new value:",newval);
                val = newval;
                dep.notify();
            },
            get(){
                console.log("to get val.",val);
                if (Dep.target) dep.listen(Dep.target);//此处必须是Dep
                return val;
            }
        });
    }
}

export default Observer;