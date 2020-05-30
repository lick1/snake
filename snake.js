(function(window) {
    "use strict";
    
    //  蛇的代码
    //  分析蛇对象
    //      属性
    //       1. width 一节的宽
    //       2. height：一节的高
    //       3. headBgc： 蛇头的背景颜色
    //       4. bodyBgc： 蛇身体的背景颜色
    //       5. 蛇的每一节信息  body
    //          [
    //              {x: 2, y: 0}
    //              {x: 1, y: 0}
    //              {x: 0, y: 0}
    //          ]
    //       6. direction 蛇的移动方向

    //      方法
    //  render  把蛇渲染到地图上（根据蛇的实例对象去渲染）
    //  move   蛇移动  采取的是管理蛇头和蛇尾即可

    function Snake(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.headBgc = options.headBgc || "red";
        this.bodyBgc = options.bodyBgc || "blue";
        this.body = options.body || [
            { x: 4, y: 0 },
            { x: 3, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 0 }
        ];
        this.direction = options.direction || "right";
				this.score = options.score || 0;
    }

    // 参数target ： 表示把创建出来添加到哪去
    Snake.prototype.render = function(target) {
        // 根据body数组的长度去创建蛇
        // this ==> s
        for (var i = 0; i < this.body.length; i++) {
            // console.log(this.body[i]); // 蛇的每一节信息

            var span = document.createElement("span");

            span.style.width = this.width + "px";
            span.style.height = this.height + "px";

            // span.innerText = i;

            span.style.position = "absolute";
            span.style.left = this.body[i].x * this.width + "px";
            span.style.top = this.body[i].y * this.height + "px";

            span.style.backgroundColor = i == 0 ? this.headBgc : this.bodyBgc;
						span.style.borderWidth = 1 + "px";
						span.style.borderStyle = "solid";
						span.style.borderColor = '#fff';
            span.style.zIndex = i == 0 ? 999 : 1;

            target.appendChild(span);
        }
    }

    // 蛇移动
    // 参数food 是食物的实例对象，需要获取到食物的x，y坐标，从而判断蛇有没有迟到食物
    Snake.prototype.move = function(target, food) {

        // console.log(food); // 食物的实例对象

        // 1. 复制当前蛇头，得到一个新的蛇头  叫做 newHead
        // 2. 根据蛇的移动方向去确定newHead 的坐标
        // 3. 把newHead 添加到body数组，unshift
        // 4. 移出掉蛇尾
        // 5. body数组每一节的坐标发生了改变，就需要让蛇重新渲染一次。（render）

        // 1.
        // this ==> s
        var newHead = {
            x: this.body[0].x,
            y: this.body[0].y
        }

        // 2.
        switch (this.direction) {
            case "right":
                // 把newHead的x++
                newHead.x++;
                break;
            case "left":
                newHead.x--;
                break;
            case "up":
                newHead.y--;
                break;
            case "down":
                newHead.y++;
                break;
        }


        // 蛇吃食物的代码逻辑
        // newHead ==> 在这里是最新的坐标，是移动后的坐标
        if (newHead.x == food.x && newHead.y == food.y) {
            // 蛇吃到食物
            // console.log("蛇吃到食物");

            // 1. 把地图中的食物删除掉，在重新渲染一份添加到地图中
            // 2. 把蛇变长一节

            // 找到地图中的食物
            // 坑： 从整个页面中找到的div是地图
            // var div = document.querySelector("div");
            // console.log(div);            
            var div = target.querySelector("div");
            target.removeChild(div);

            // 重新渲染食物（render）
            food.render(target);
						this.score++;
						document.querySelector('.score span').innerText = this.score;
        } else {
            // 蛇没有吃到食物

            // 4.
            // 删除蛇尾是有条件的，蛇移动的时候没有吃到食物需要删除掉
            this.body.pop();
        }

        // 3.
        this.body.unshift(newHead);


        // 在渲染之前，把地图中的蛇的每一节找到并且移出掉
        var spans = target.querySelectorAll("span");
        for (var i = 0; i < spans.length; i++) {
            target.removeChild(spans[i]);
        }

        // 5.
        // 形参和实参是相对的概念：
        this.render(target);

        // console.log(this.body);
    }

    window.Snake = Snake;
})(window)