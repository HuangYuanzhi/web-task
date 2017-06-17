/**
 * Created by 源志 on 2017/6/7.
 */

// 身份分配数组
var aRoles = JSON.parse(localStorage.getItem("roles"));
console.log(aRoles);

var j=0;
var i=2;

// 查看身份牌
$(".look").click(function () {
    $(".before").toggle();
    $(".after").toggle();
    $("button").toggle();
    if (j < aRoles.length){
        $(".role span").text(aRoles[j]);
        if ((j+2) <= aRoles.length){
            $(".next span").text(j+2);
        }else {
            $(".next").text("法官查看").click(function () {
                window.location.href="http://119.10.57.69:880/jnshu3937/jstask2/html/jstask2-4.html"
            });
        }
        console.log(j);
        j++;
    }
});
// 传递给下一位
$(".next").click(function () {
    if (i < (aRoles.length+1)){
        $("button").toggle();
        $(".before").toggle();
        $(".after").toggle();
        $("#number").text(i);
        $(".look span").text(i);
        i++;
    }
});