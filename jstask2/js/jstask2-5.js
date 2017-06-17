/**
 * Created by 源志 on 2017/6/10.
 */

localStorage.removeItem("voteBtn");
var aDeadRoles = JSON.parse(localStorage.getItem("aDeadRoles"));
var aDeadNums = JSON.parse(localStorage.getItem("aDeadNums"));
var dayStatus = JSON.parse(localStorage.getItem("dayStatus"));
var sureBtn = JSON.parse(localStorage.getItem("sureBtn"));
console.log(dayStatus);

// 有限状态机
// 判断是否从杀人页面进入
if (dayStatus === 1){
    fsm = StateMachine.create({
        initial: 'killed',
        error: function (eventName, from, to, args, errorCode, erroeMassage) {
            console.log('event' + eventName + 'was naughty:-' + erroeMassage);
        },
        events: [
            {name: 'say', from: 'killed', to: 'said'},
            {name: 'discuss', from: 'said', to: 'discussed'},
            {name: 'vote', from: 'discussed', to: 'voted'}
        ],
        callbacks: {
            onaftersay: function () {
                bootbox.confirm("请死者亮明身份并发表遗言",function (result) {
                    if(result){
                        $(".die .flow_words").css("background","#83b09a");
                        $(".die .l_triangle").css("border-right-color","#83b09a");

                    }
                })
            },
            onafterdiscuss: function () {
                bootbox.confirm("玩家依次发言讨论",function (result) {
                    if (result){
                        $(".speak .flow_words").css("background","#83b09a");
                        $(".speak .l_triangle").css("border-right-color","#83b09a");
                    }
                });
            },
            onaftervote: function () {
                window.location.href = "http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-6.html";
                localStorage.setItem("voteBtn", 1);
            }
        }
    });
}else {
    fsm = StateMachine.create({
        initial: 'voted',
        error: function (eventName, from, to, args, errorCode, erroeMassage) {
            console.log('event' + eventName + 'was naughty:-' + erroeMassage);
        },
        events: [
            {name: 'kill', from: 'voted', to: 'killed'}
        ],
        callbacks: {
            onafterkill: function () {
                window.location.href="http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-6.html";
            }
        }
    });
}


// 四个流程按钮添加点击事件
$(".kill").on("click",function () {
    fsm.kill();
});
$(".die").on("click",function () {
    var status1 = $(".kill .flow_words").css("backgroundColor");
    var deadColor = "rgb(131, 176, 154)";
    if(status1 === deadColor){
        fsm.say();
    }else{
        bootbox.alert("请杀手先杀人");
    }
});
$(".speak").on("click",function () {
    var status1 = $(".kill .flow_words").css("backgroundColor");
    var deadColor = "rgb(131, 176, 154)";
    if(status1 == deadColor){
        var status2 = $(".die .flow_words").css("backgroundColor");
        if(status2 == deadColor){
            fsm.discuss();
        }else{
            bootbox.alert("请先死者发言");
        }
    }else{
        bootbox.alert("请杀手先杀人");
    }
});
$(".vote").on("click",function () {
    var status1 = $(".kill .flow_words").css("backgroundColor");
    var deadColor = "rgb(131, 176, 154)";
    console.log(status1 === deadColor);
    if(status1 == deadColor){
        var status2 = $(".die .flow_words").css("backgroundColor");
        if(status2 == deadColor){
            var status3 = $(".speak .flow_words").css("backgroundColor");
            if(status3 === deadColor){
                fsm.vote();
            }else{
                bootbox.alert("请先玩家依次发言");
            }
        }else{
            bootbox.alert("请先死者发言");
        }
    }else{
        bootbox.alert("请杀手先杀人");
    }
});

// 判断是否从杀人后进入页面
if ( dayStatus === 1){

    var killLog = '<div class="kill-log">' + aDeadNums[aDeadNums.length-1] + '被杀手杀死，真实身份是' + aDeadRoles[aDeadNums.length-1] + '</div>';
    $(".kill").after(killLog);
    $(".day").text("白天");
    $(".kill .flow_words").css("background","#83b09a");
    $(".kill .l_triangle").css("border-right-color","#83b09a");
    $(".sun").css("top",".95rem");
    $(".line").css("height","2.2rem");

    // 判断是否从投票后进入页面
}else if(aDeadNums !== null && dayStatus === 0 && sureBtn === 1){
    // 显示前一天游戏日志
    var log = '<div class="game-log"><div class="log-tt"><p>前一天</p><span></span></div><div class="log-detail"><p class="night">黑夜：' + aDeadNums[aDeadNums.length-2]+'被杀死了，真实身份是'+ aDeadRoles[aDeadRoles.length-2] +'</p><p class="day-light">白天：'+ aDeadNums[aDeadNums.length-1] +'被投死了，真实身份是'+ aDeadRoles[aDeadRoles.length-1] +'</p></div></div>';
    //新建游戏日志数组
    var aGameLog = [];
    aGameLog.push(log);
    var temp1 = JSON.stringify(aGameLog);
    localStorage.setItem("aGameLog", temp1);
    aGameLog = JSON.parse(localStorage.getItem("aGameLog"));

    for (var i = (aGameLog.length-1); i >= 0; i--){
        $(".day").parent().before(aGameLog[i]);
        console.log("mmp")
    }
    // 从开始游戏进入页面
}else{
    aGameLog = JSON.parse(localStorage.getItem("aGameLog"));
    if (aGameLog !== null){
        for (var k = (aGameLog.length-1); k >= 0; k--){
            $(".day").parent().before(aGameLog[k]);
        }
    }
}

// 游戏日志,点击隐藏
$(".log-tt").click(function () {
    $(".log-detail").toggle();
});