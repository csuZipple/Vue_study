import Observer from './Observer'
import Compiler from './Compiler'

//listen mvvm data
/* data format
new Mvvm({
    el: '#app',
    data: {
        message: "hello myVue"
    }
})*/
class Mvvm {
    constructor(options){
        this.$options = options;
        this.$el = options.el;
        this.data = options.data;

        Object.keys(this.data).forEach(key=>{
            this.listen(key);
        });
        //对data属性进行监听
        new Observer(this.data);
        new Compiler(this.$el,this);
    }

    listen(key) {
        //监听options的属性,方便通过options.name==>options.data.name
        let self = this;
        Object.defineProperty(self,key,{
            get(){
                return self.data[key];
            },
            set(newval){
                self.data[key] = newval;//此处触发data的set方法
            }
        })
    }
}

export default Mvvm;