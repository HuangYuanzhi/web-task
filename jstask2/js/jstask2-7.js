/**
 * Created by 源志 on 2017/6/15.
 */

// 判断获胜方
    var results = JSON.parse(localStorage.getItem("result"));
if (results === 1){
    $("#winner").text("平民获胜");
    $("#words").text("太棒了!平民找出了所有的卧底，获得了最终胜利！")
}
// 杀手总数
var nKiller = localStorage.getItem("killer");
// 身份分配数组
var aRoles = JSON.parse(localStorage.getItem("roles"));
console.log(aRoles);
$("#killer").text(nKiller);
$("#farmer").text(aRoles.length - nKiller);

// 死者身份数组
var aDeadRoles = JSON.parse(localStorage.getItem("aDeadRoles"));
// 死者牌号数组
var aDeadNums = JSON.parse(localStorage.getItem("aDeadNums"));
var aNight = [];
var aDay = [];
// 游戏日志输出
for (var i = 0, m =1; i<aDeadRoles.length ; i=i+2,m=m+2){
    aNight[i] = '<p class="night">黑夜：' + aDeadNums[i]+'被杀死了，真实身份是'+ aDeadRoles[i] +'</p>';
    $("#game-log").append(aNight[i]);
    if (m < aDeadRoles.length ){
        aDay[m] = '<p class="day-light">白天：'+ aDeadNums[m] +'被投死了，真实身份是'+ aDeadRoles[m] +'</p></div>';
        $("#game-log").append(aDay[m]);
    }
}
