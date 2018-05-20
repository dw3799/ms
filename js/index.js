//
// console.log(userInfo.uuid);
// // document.getElementById('userName').innerText=userInfo.uuid:
//
// var textNode = document.createTextNode(userInfo.uuid);
// //获取div对象
// var divNode = document.getElementById("userName");
// //给div添加文本元素
// divNode.appendChild(textNode);
//
// var textNode1 = document.createTextNode(userInfo.roleName);
// //获取div对象
// var divNode1 = document.getElementById("role");
// //给div添加文本元素
// divNode1.appendChild(textNode1);

let roleLIST = JSON.parse(localStorage.getItem('roleLIST'));

$(".admin-show").hide();
$(".staff-show").hide();
$(".superviser-show").hide();
if(userInfo.roleName=='admin'){
    $(".admin-show").show();
}else if(userInfo.roleName=='supervisor'){

    $(".superviser-show").show();
}else{

    $(".staff-show").show();
}
let arrow='<span class="fa arrow show-list" onclick="showRoleBox(1)"></span>';

function showRoleBox(i){
    $(".show-list").hide();
    $("#roleListUl").show();
}

$("#userName").html(userInfo.name);
$("#defaultRole").html(userInfo.description+arrow);

let roleListHtml ='';

for(var i=0;i<roleLIST.length;i++){
    roleListHtml += '<li class="change-role" data-id="'+roleLIST[i].roleName+'">'+roleLIST[i].description+'</li>'
}

$("#roleListUl").html(roleListHtml);


$(".change-role").click(function (e) {
    console.log(e.target.dataset.id)

    $(".show-list").show();
    $("#roleListUl").hide();
    if(e.target.dataset.id=='admin'){
        $(".admin-show").show();
        $(".staff-show").hide();
        $(".superviser-show").hide();
    }
})
$(".J_tabExit").click(function () {
    localStorage.clear();
    window.location.href ='login.html';
})