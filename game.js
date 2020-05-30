(function(window) {
    "use strict";
    
    // 游戏对象，理解成裁判
    //  游戏对象能够管理和整个游戏相关的对象（蛇、食物对象、地图对象）
    //  属性：
    //      1. 蛇对象
    //      2. 食物对象
    //      3. 地图
    //  方法：
    //      可以让游戏开始  startGame
    //      游戏结束


    function Game(target) {
        // 把蛇的实例对象添加到游戏对象的snake属性
        this.snake = new Snake();
        this.food = new Food();
        this.map = target;
    }

    Game.prototype.render = function() {
        // 把蛇和食物渲染到地图上
        // this ==> g
        this.snake.render(this.map);
        this.food.render(this.map);
    }

    Game.prototype.startGame = function() {
        var that = this;
				var timerid = '';
        // 开启了定时器，让蛇移动起来了
				var bnt1 = document.querySelector('.btn1');
			
        timerid = setInterval(function() {
            // 定时器中的function的this指向了window

            // console.log(this);
            // 拿到蛇的move方法
            that.snake.move(that.map, that.food);

            // 添加蛇撞墙的逻辑
            // 1. 获取到蛇头的坐标
            // 2. 才能做判断

            // 获取到蛇头的坐标
            var head = that.snake.body[0];

            if (
                head.x > that.map.offsetWidth / that.snake.width - 1 ||
                head.x < 0 ||
                head.y < 0 ||
                head.y > that.map.offsetHeight / that.snake.height - 1
            ) {
                // 蛇头撞到墙
                clearInterval(timerid);
                alert("Game Over！！！");
            }

            // 蛇头撞到自己  蛇头坐标和蛇身体坐标
            // 注意： i必须从1开始，因为遍历的是蛇的身体

            // 这里的i没有必要必须从1开始。i 从4 开始，减少了几次不必要的foe循环
            for (var i = 4; i < that.snake.body.length; i++) {
                var temp = that.snake.body[i]; // 蛇身体的每一节坐标信息

                if (head.x == temp.x && head.y == temp.y) {
                    clearInterval(timerid);
                    alert("Game Over！！！");
                }
            };

        }, 200);
				
				bnt1.onclick = function(){
					if(timerid){
						clearInterval(timerid);
						bnt1.innerText = '继续';
						timerid = ''
					}else{
						bnt1.innerText = '暂停';
						timerid = setInterval(function() {
            that.snake.move(that.map, that.food);
            var head = that.snake.body[0];

            if (
                head.x > that.map.offsetWidth / that.snake.width - 1 ||
                head.x < 0 ||
                head.y < 0 ||
                head.y > that.map.offsetHeight / that.snake.height - 1
            ) {
                clearInterval(timerid);
                alert("Game Over！！！");
            }
            for (var i = 4; i < that.snake.body.length; i++) {
                var temp = that.snake.body[i]; // 蛇身体的每
                if (head.x == temp.x && head.y == temp.y) {
                    clearInterval(timerid);
                    alert("Game Over！！！");
                }
            };
        }, 200);
					}
				}
        // 控制蛇移动
        document.onkeyup = function(e) {
            // console.log(this);  // document

            var keycode = e.keyCode;
            if (keycode == 37) {
                // 左
                if (that.snake.direction == "right") {
                    // 此时蛇正在往右移动
                    return;
                }

                that.snake.direction = "left";
            } else if (keycode == 38) {
                // 上
                if (that.snake.direction == "down") {
                    // 此时蛇正在往下移动
                    return;
                }

                that.snake.direction = "up";
            } else if (keycode == 39) {
                // 右
                if (that.snake.direction == "left") {
                    // 此时蛇正在往左移动
                    return;
                }

                that.snake.direction = "right";
            } else if (keycode == 40) {
                // 下
                if (that.snake.direction == "up") {
                    // 此时蛇正在往上移动
                    return;
                }

                that.snake.direction = "down";
            }
        }
    }

    window.Game = Game;
})(window)