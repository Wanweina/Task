/**
 * Created by wanwn on 2017/2/13.
 */

var num1;
var num2;
var num3;
var a;//存放定时器
var smallBox = document.getElementsByClassName('smallBox');
var startBtn = document.getElementById('startBtn');
var resetBtn = document.getElementById('resetBtn');
function randomNum() {
// 随机生成1~9内的三个数字，以便随机选取格子
    num1 = Math.floor(Math.random() * 9);
    num2 = Math.floor(Math.random() * 9);
    num3 = Math.floor(Math.random() * 9);
    // 去除重复的随机数，保证每次三个不同的格子变色
    if (num1 == num2 || num1 == num3 || num2 == num3) {
        randomNum();
    }
}
function start() {
//开始随机变换颜色
    var color = new Array(3);
    for (var i = 0; i < smallBox.length; i++) {
        //初始化所有小格子的颜色
        smallBox[i].style.backgroundColor = "darkorange";
    }
    for (var j = 0; j < color.length; j++) {
        color[j] = '#' + Math.floor(Math.random() * 16777215).toString(16);
        //hex颜色值从#000000到#ffffff，后面是16进制，16777215是hex最大值#ffffff的十进制数，随机选取后再转回16进制
        console.log(color[j]);//打印颜色值
    }
    randomNum();//执行函数，获取随机数
    console.log(num1 + ' ' + num2 + ' ' + num3);
    //将随机获取的颜色赋值给随机格子
    smallBox[num1].style.backgroundColor = color[0];
    smallBox[num2].style.backgroundColor = color[1];
    smallBox[num3].style.backgroundColor = color[2];
    run();
}
startBtn.onclick = function () {
    start();
};

function run() {
    clearInterval(a);//清除定时器效果
    a = setInterval(
        //每800ms执行一次start函数
        function () {
            start();
        }, 800
    )
}
resetBtn.onclick = function reset() {
    //重置所有格子的颜色
    clearInterval(a);
    for (var n = 0; n < smallBox.length; n++) {
        smallBox[n].style.backgroundColor = "darkorange";
    }
};


