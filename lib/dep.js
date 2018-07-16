
class Dep {
    constructor(){
        this.subs=[];
    }

    listen(sub){
        this.subs.push(sub);
        console.log("dep添加sub成功,当前维护的subs length="+this.subs.length);
    }

    notify(){
        console.log("检测到属性修改,model修改触发view修改");
        this.subs.forEach(function (sub, index, array) {
            console.log(sub);
            sub.update();
        })
    }
}

Dep.prototype.target=null;//表示当前对象是否已监听

export default Dep;