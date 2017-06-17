/**
 * Created by 源志 on 2017/6/10.
 */

localStorage.removeItem("killed");

// 身份分配数组
var aRoles = JSON.parse(localStorage.getItem("roles"));
console.log(aRoles);

// 身份牌数组
var aCard = [];
for (var j = 0, k = 1; j < aRoles.length; j++, k++){
    aCard[j]='<div class="role-box"><div class="role-wrapper"><div class="role">'+ aRoles[j] + '</div><div class="number">' + (k) + '号</div></div><div class="knife"></div></div>';
    $(".main-row").append(aCard[j]);
}

var voteStatus = JSON.parse(localStorage.getItem("voteBtn"));
var aDeadMan = JSON.parse(localStorage.getItem("aDeadPlayers"));

if ( aDeadMan !== null){
    console.log(aDeadMan.length);
    var mmp = document.getElementsByClassName('role-wrapper');
    var cnm = document.getElementsByClassName('knife');
    console.log(mmp);
    for(var y=0 ;y < aDeadMan.length ;y++){
        console.log(mmp[aDeadMan[y]]);
        mmp[aDeadMan[y]].style.background = "#83b09a";
        cnm[aDeadMan[y]].style.display = "none";
    }
    // 获取上一轮死者数据
     aDeadPlayers = JSON.parse(localStorage.getItem("aDeadPlayers"));
    console.log(aDeadPlayers[0]);
     aDeadRoles = JSON.parse(localStorage.getItem("aDeadRoles"));
     aDeadNums = JSON.parse(localStorage.getItem("aDeadNums"));
}else {
    // 新建死者玩家数组
    var aDeadPlayers = [];
    // 新建死者身份信息数组
    var aDeadRoles = [];
    // 新建死者牌号信息数组
    var aDeadNums = [];
}

// 点击小刀杀人/投死
$(".knife").click(function () {

    localStorage.setItem("killed",1);

    // 被杀玩家背景变色
    $(this).prev().addClass("die").css("background","#83b09a");
    // 再想杀其他玩家提示
    $(".knife").off("click").click(function () {
        bootbox.alert("一次只能杀一人！")
    });
    // 再次杀死玩家提示
    $(this).off("click").click(function () {
        bootbox.alert("玩家已被杀！")
    });

    // 获取被杀玩家身份牌的索引号
    var nDeadPlayer = $(this).parent().index();
    console.log(nDeadPlayer);
    // 往死者玩家数组push死者身份牌索引号
    aDeadPlayers.push(nDeadPlayer);
    console.log(aDeadPlayers.length);
    var temp1 = JSON.stringify(aDeadPlayers);
    localStorage.setItem("aDeadPlayers",temp1);

    // 获取死者身份信息
    var sDeadRole = $(".die").children(".role").html();
    aDeadRoles.push(sDeadRole);
    var temp2 = JSON.stringify(aDeadRoles);
    localStorage.setItem("aDeadRoles",temp2);
    console.log(aDeadRoles);
    // 获取死者牌号信息
    var sDeadNum = $(".die").children(".number").html();
    aDeadNums.push(sDeadNum);
    var temp3 = JSON.stringify(aDeadNums);
    localStorage.setItem("aDeadNums",temp3);
});

// 杀人确认按钮事件
$("#make_sure").click(function () {
    var killStatus = JSON.parse(localStorage.getItem("killed"));
    // 判断玩家是否点击小刀图标，未点击小刀就点确认时弹出提示
    if (killStatus === 1){
        aDeadRoles = JSON.parse(localStorage.getItem("aDeadRoles"));
        for (var i=0 ,o=0; i < aRoles.length; i++){
            if (aRoles[i] === "杀手"){
                o++;
                //o为游戏杀手总数
                localStorage.removeItem("killer");
                localStorage.setItem("killer",o);
            }
        }
        for (var m=0 ,n=0, mm=0; m < aDeadRoles.length; m++){
            if (aDeadRoles[m] === "杀手"){
                mm++;
                //mm为阵亡杀手总数
            }else {
                n++;
                //n为阵亡平民总数
            }
        }
        // 游戏结束条件判断
        if (o === mm){
            localStorage.removeItem("result");
            localStorage.setItem("result",1);
            bootbox.confirm("游戏结束，平民获胜，点击确认跳转至结果页",function (result) {
                if (result){
                    window.location.href= "http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-7.html";
                }
            });
        }else if((o-mm) === (aRoles.length-n-mm)/2){
            localStorage.removeItem("result");
            localStorage.setItem("result",0);
            bootbox.confirm("游戏结束，杀手获胜，点击确认跳转至结果页",function (result) {
                if (result){
                    window.location.href= "http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-7.html";
                }
            });
        }else{
            window.location.href = "http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-5.html";
            localStorage.setItem("sureBtn", 0);
            localStorage.setItem("dayStatus",1);
        }
    }else {
        bootbox.alert("请先选择玩家");
    }

});

// 点击投票按钮进入的页面
if (voteStatus === 1){
    $(".header p").text("投票");
    $(".tips").text("发言讨论结束，大家请投票");
    $(".option").text("点击得票数最多的人的头像");

    // 投票确认按钮事件

    $("#make_sure").off("click").on("click", function () {
        var killStatus = JSON.parse(localStorage.getItem("killed"));
        // 判断玩家是否点击小刀图标，未点击小刀就点确认时弹出提示
        if (killStatus === 1){
            aDeadRoles = JSON.parse(localStorage.getItem("aDeadRoles"));
            for (var i=0 ,o=0; i < aRoles.length; i++){
                if (aRoles[i] === "杀手"){
                    o++;
                    //o为游戏杀手总数
                    localStorage.removeItem("killer");
                    localStorage.setItem("killer",o);
                }
            }
            for (var m=0 ,n=0, mm=0; m < aDeadRoles.length; m++){
                if (aDeadRoles[m] === "杀手"){
                    mm++;
                    //mm为阵亡杀手总数
                }else {
                    n++;
                    //mm为阵亡杀手总数
                }
            }
            if (o === mm){
                localStorage.removeItem("result");
                localStorage.setItem("result",1);
                bootbox.confirm("游戏结束，平民获胜，点击确认跳转至结果页",function (result) {
                    if (result){
                        window.location.href= "http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-7.html";
                    }
                });
            }else if((o-mm) === (aRoles.length-n-mm)/2){
                localStorage.removeItem("result");
                localStorage.setItem("result",0);
                bootbox.confirm("游戏结束，杀手获胜，点击确认跳转至结果页",function (result) {
                    if (result){
                        window.location.href= "http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-7.html";
                    }
                });
            }else{
                localStorage.setItem("dayStatus",0);
                localStorage.setItem("sureBtn", 1);
                window.location.href = "http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-5.html";
            }
        }else {
            bootbox.alert("请先选择玩家");
        }

    })
} else {
    // 杀手不能自杀提示
    $(".role:contains(杀手)").parent().parent().children(".knife").mousedown(function () {
        bootbox.alert("杀手不能杀自己！")
    });
}



