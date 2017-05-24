
    /**
     * Created by 源志 on 2017/5/23.
     */


var box=document.getElementsByClassName("son");
var oBtn1=document.getElementById('btn1');
var oBtn2=document.getElementById('btn2');
var a,b,c;

// 生成随机颜色
function bg1() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ',' + g + ',' + b + ")";
}
function bg2() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ',' + g + ',' + b + ")";
}
function bg3() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ',' + g + ',' + b + ")";
}

function start() {
// 重置颜色
    var re = document.getElementsByClassName("son");
    for (var i = 0; i < 9; i++) {
        re[i].style.background = "#ffa600";
    }
// 0~8取3个随机数
    var num1, num2, num3;
    num1 = Math.floor(Math.random() * 9);
    num2 = Math.floor(Math.random() * 9);
    num3 = Math.floor(Math.random() * 9);
// 随机3个小方格
    if (num1 != num2 && num2 != num3 && num3 != num1) {
        a = box[num1];
        b = box[num2];
        c = box[num3];
// 给小方格分配颜色
        a.style.background = bg1();
        b.style.background = bg2();
        c.style.background = bg3();
// 清除延时
        clearInterval(stop);
// 延时
        stop=setInterval("start()",1000);
    }else{
        start();
    }
}
    function end() {
        // 取消延时
        clearInterval(stop);
        var re = document.getElementsByClassName("son");
        var i;
        for (i = 0; i < 9; i++) {
            re[i].style.background = "#ffa600";
        }
    }
    oBtn1.onclick=function () {
        start()
    };
    oBtn2.onclick=function () {
        end()
    };