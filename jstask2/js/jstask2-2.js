/**
 * Created by 源志 on 2017/6/2.
 */
var clickSet = document.getElementById('clickSet');
var dealCards = document.getElementById('deal-cards');
var decrease = document.getElementById('decrease');
var increase = document.getElementById('increase');
var player_num = document.getElementById('player-num');
var myRange = document.getElementById('myRange');
var role = document.getElementById('showBoard');
var killer;
var people;
// 人数检验
function numAlert() {
    var a = player_num.value;
    if(a < 4 || a > 18){
        bootbox.alert("请输入正确的玩家数量");
        player_num.value = 4;
        myRange.value = 4;
    }else {
        myRange.value = a;
    }
}

// 输入框动作
player_num.onblur=function () {
    numAlert();
};
player_num.onchange=function () {
    role.innerHTML="";
    // 移除发牌点击事件
    dealCards.onclick=null;
};

// 滑块动作
myRange.onchange=function () {
    player_num.value = myRange.value;
    role.innerHTML="";
    // 移除发牌点击事件
    dealCards.onclick=null;
};
// 加减按钮动作
decrease.onclick=function () {
    var a = player_num.value;
    a--;
    player_num.value = a;
    numAlert();
    role.innerHTML="";
    // 移除发牌点击事件
    dealCards.onclick=null;
};
increase.onclick=function () {
    var a = player_num.value;
    a++;
    player_num.value = a;
    numAlert();
    role.innerHTML="";
    // 移除发牌点击事件
    dealCards.onclick=null;
};

// 身份及人数展示
function showRole() {
    role.innerHTML="<p><span class='square square1'></span>杀 手 <span id='killer'></span> 人</p><p><span class='square square2'></span>水 民 <span id='people'></span> 人</p>";
    var kNode=document.getElementById('killer');
    kNode.innerHTML= killer;
    var pNode=document.getElementById('people');
    pNode.innerHTML= people;
}
// 点击设置动作
clickSet.onclick=function () {
    // 清空储存数据
    localStorage.clear();

    var a = player_num.value;
    i = Number(a);
    // 确定杀手平民人数
    if(i < 4 || i > 18){
        bootbox.alert("请输入正确的玩家数量");
    }
    else if(i <= 6){
        killer = 1;
        people = i-1;
        showRole();

    }
    else if(i <= 12){
        killer=2;
        people=i-2;
        showRole();
    }
    else if(i <= 18){
        killer=3;
        people=i-3;
        showRole();
    }
// 构造数组
    var j = new Array(killer);
    var k = new Array(people);
    for (var m=0;killer > m;m++ ){
        j[killer-(m+1)] = "杀手";
    }
    for (var n=0;people > n;n++ ){
        k[people-(n+1)] = "平民";
    }
    var role = j.concat(k);
// 数组乱序
    role.sort(function(aa,bb){ return Math.random()>.5 ? -1 : 1;});
    role = JSON.stringify(role);
    console.log(role);

    localStorage.setItem("roles",role);
    // 添加发牌点击事件
    dealCards.onclick=function () {
        window.location.href="http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-3.html";
    };
};
dealCards.onclick=function () {
    window.alert("请先设置人数");
};




