(function(window) {

    "use strict";

    // 分析食物对象：
    //   属性
    //      1. width  食物的宽度
    //      2. height： 食物的高度
    //      3. bgc   食物的背景颜色
    //      4. x     食物的水平坐标
    //      5. y     食物的垂直坐标
    //              可以根据食物的坐标计算出来食物的位置信息（left、top值）
    //   方法: 能做的事情：
    //      根据食物对象的属性把食物创建出来添加到地图中（随机的位置）
    //      render

    function Food(options) {
        options = options || {};

        this.width = options.width || 20;
        this.height = options.height || 20;
        this.bgc = options.bgc || "blue";
        this.x = options.x || 0;
        this.y = options.y || 0;

        // 造成了内存浪费
        // this.render = function () {}
    }

    // 把render 方法添加到Food的原型上
    // 好处：
    //  1. 所有的食物对象都可以访问到原型上的render方法
    //  2. 避免内存浪费
    //  参数 target ： 目标，把创建的食物元素添加到哪
    Food.prototype.render = function(target) {
        // 根据食物对象的属性把食物创建出来添加到地图中（随机的位置）

        // 面向对象：封装的目的，好复用
        // 面向过程：实现功能的
        // 1. 创建一个div。div表示食物元素
        // 2. div设置样式（width、heigth、、、），样式值来源于实例对象f
        // 3. 把div添加到地图上

        // 1.
        var div = document.createElement("div");

        // 2.
        // 谁调用，指向谁，
        // this ==> 实例对象f
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.bgc;

        // 设置div的位置（left、top）
        // 细节问题： left、top必须要有定位才能起到效果
        div.style.position = "absolute";

        // 食物的坐标的范围限制：[0, 39]
        //  随机得到一个x坐标，x的坐标范围是在 [0, 39]之间，根据x坐标可以计算出来食物的left位置
        //   公式：left = x * 食物的宽度

        // 随机x坐标
        //  Math.random() ==> [0, 1)
        this.x = parseInt(Math.random() * target.offsetWidth / this.width);
        this.y = parseInt(Math.random() * target.offsetHeight / this.height);
        // console.log(this.x, this.y);

        div.style.left = this.x * this.width + "px";
        div.style.top = this.y * this.height + "px";

        // 3.
        target.appendChild(div);
    }

    // 暴露到全局使用
    window.Food = Food;
})(window)