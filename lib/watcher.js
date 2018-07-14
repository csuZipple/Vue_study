import Dep from "./dep"
class Watcher {
    constructor(node,name,vm){
        this.node = node;
        this.name = name;
        this.vm = vm;

        Dep.target = this;
        this.update();//触发observer，添加订阅
        Dep.target = null;
    }
    update(){
        console.log("watch name ",this.name);
        this.node.nodeValue = this.vm[this.name];//触发data中key的get方法
    }
}
export default Watcher;