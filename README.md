## 实现Vue数据双向绑定的一些心得
### 创建项目
由于项目采用ES6语法进行开发，我们需要构建一个基于webpack的项目
```
    1. npm init -y
    2. npm install -D webpack webpack-command
```
<!-- more -->
然后创建[代码结构](https://github.com/csuZipple/Vue_study),添加[webpack.config.js](https://www.webpackjs.com/)
```javascript
module.exports = {
    entry: "./app.js",
    mode:"development",
    output: {
        filename: "./bundle.js",
    },
    watch: true
};
```

### 数据双向绑定原理
参考链接：[https://github.com/DMQ/mvvm](https://github.com/DMQ/mvvm)

`vue.js` 是采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
总的来说，就以下几个步骤：
1. 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者 
2. 实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数 
3. 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图 
4. mvvm入口函数，整合以上三者

### 实现Observer.js
采用ES6语法编写这个文件
```javascript
class Obverser {
    constructor(obj){
        this.data = obj;
        if (!this.data || typeof this.data !== 'object') return;
        Object.keys(this.data).forEach(key=>{
            console.log(key);
            this._listen(key,this.data[key]);//使用箭头函数绑定this
        })
    }
     _listen(key, val){
        new Obverser(val);
        Object.defineProperty(this.data,key,{
            enumerable:true,
            configurable:false,
            /*   set:function (newval) {
                   console.log("the key "+key+" set new value:",newval);
                   val = newval;
               },
               get:function () {
                   return val;
               }*///以上设置特权函数的方法也是可以的，下面采用es6的写法
            set(newval){
                val = newval;
            },
            get(){
                return val;
            }
        });
    }
}

export default Obverser;
```
