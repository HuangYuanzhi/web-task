/**
 * Created by 源志 on 2017/6/8.
 */
// 身份分配数组
var aRoles = JSON.parse(localStorage.getItem("roles"));
console.log(aRoles);


// 身份牌数组
var aCard = [];
for (var j = 0, k = 1; j < aRoles.length; j++, k++){
    aCard[j]='<div class="role-wrapper"><div class="role">'+ aRoles[j] + '</div><div class="number">' + (k) + '号</div></div>';
    $(".main-row").append(aCard[j]);
}

$("#start_game").click(function () {
    window.location.href="http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-5.html"
});
