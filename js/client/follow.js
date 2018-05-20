
console.log("hello");

var clientID = localStorage.getItem("clientID");
var userID = localStorage.getItem("userID");

//后台请求数据3.1.11

var followTime = "20180321";
var followUser = "李晓光";
var content = "没钱了";

var arr1 = new Array(followTime,followUser,content);
var tr2 = "";
for (var i = 0; i < arr1.length; i++) {
    tr2 += "<td>" + arr1[i] + "</td>";
}
console.log(tr2);
document.getElementById('follow2').innerHTML = tr2;

function follow_confirm() {

    //保存跟进记录，后台请求数据3.1.13


    localStorage.clear();
    self.location.href = "../client/client.html";

}

function goback(){
    localStorage.clear();
    self.location.href = "../client/client.html";
}