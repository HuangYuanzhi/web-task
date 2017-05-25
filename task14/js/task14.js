/**
 * Created by 源志 on 2017/5/25.
 */
var open=document.getElementById("nav_btn_open");
var close=document.getElementById("nav_btn_close");
var li=document.getElementsByClassName("nav_li");
var i;
var drop=document.getElementById("nav_wrapper");
var collapse=document.getElementById("collapse");
var j;
// 点击按钮打开导航栏
open.onclick=function () {

    drop.style.height="2.6rem";
    collapse.style.margin="0";
    for (i=0;i<4;i++){
        li[i].style.display="block";
        li[i].style.width="100%";
        li[i].style.float="none";
    }
    for (j=0;j<4;j++){
        li[j].style.height=".5rem";
        li[j].style.lineHeight=".5rem";
    }
    open.style.zIndex=("-1");
    close.style.display=("block");
    close.style.zIndex=("999");

};
// 点击按钮关闭导航栏（恢复原有样式）
close.onclick=function () {
    drop.style.height=".6rem";
    collapse.style.marginLeft="-15px";
    collapse.style.marginRight="-15px";
    for (i=0;i<4;i++){
        li[i].style.display="inline-block";
        li[i].style.width="1rem";
    }
    for (j=0;j<4;j++){
        li[j].style.height="1rem";
        li[j].style.lineHeight="1rem";
    }

    open.style.zIndex=("999");
    close.style.zIndex=("-1");
};