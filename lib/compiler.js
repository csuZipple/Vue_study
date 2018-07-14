import Watcher from "./watcher"

const REG = /\{\{(.*)\}\}/;
class Compiler {
    constructor(el,vm){
        this.el = document.querySelector(el);
        this.vm = vm;

        this.frag = this.createFragment();//为了提高dom操作的性能
        this.el.appendChild(this.frag);
    }

    createFragment() {
        let frag = document.createDocumentFragment();
        let child;
        while(child = this.el.firstChild){
            this.compile(child);
            frag.appendChild(child);
        }
        return frag;
    }

    compile(node){
        switch(node.nodeType){
            case 1://node
                let attr = node.attributes;
                let self = this;
                if (attr.hasOwnProperty("v-model")){
                    let name = attr["v-model"].nodeValue;
                    node.addEventListener("input",function (e) {
                        self.vm[name] = e.target.value;//触发set事件 调用update
                    });
                    node.value = this.vm[name];
                }
                break;
            case 3://element
                if(REG.test(node.nodeValue)){
                    let name = RegExp.$1;//返回第一个匹配的子串
                    new Watcher(node,name.trim(),this.vm);
                }
                break;
            default:
                console.log("compile node error .default nodeType.")
        }
    }
}
export default Compiler;