function change(userNo){
    parent.layer.open({
        type: 1,
        area: ["420px", "440px"],
        skin: "layui-layer-rim",
        content: '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <title>重置密码</title>\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
        '\n' +
        '    <link rel="shortcut icon" href="favicon.ico">\n' +
        '    <link href="css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">\n' +
        '    <link href="css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">\n' +
        '    <link href="css/plugins/iCheck/custom.css" rel="stylesheet">\n' +
        '    <link href="css/animate.min.css" rel="stylesheet">\n' +
        '    <link href="css/style.min862f.css?v=4.1.0" rel="stylesheet">\n' +
        '</head>\n' +
        '<body>\n' +
        '<div class="middle-box text-center loginscreen  animated fadeInDown">\n' +
        '    <div>\n' +
        '        <h3>修改密码</h3>\n' +
        '\n' +
        '        <form class="m-t login-form" role="form" id="loginform">\n' +
        '            <div class="form-group">\n' +
        '                <input type="text" class="form-control username" value='+userNo+' id="userNo" disabled>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '                <input type="password" class="form-control pwd" placeholder="原密码" required="">\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '                <input type="password" class="form-control pwd" placeholder="新密码" required="" id="newPwd1">\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '                <input type="password" class="form-control pwd" placeholder="确认密码" required="" id="newPwd2">\n' +
        '            </div>\n' +
        '            <button type="button" class="btn btn-sm btn-primary" onclick="cancel()">取消</button>\n<button type="button" class="btn btn-sm btn-primary" onclick="verify('+userNo+')">确认</button>\n' +
        '        </form>\n' +
        '    </div>\n' +
        '</div>\n' +
        '\n' +
        '</body>\n' +
        '</html>'
    })
}

function verify(userNo) {
    if ($('#newPwd1').val()==$('#newPwd2').val()) {
        changePwd(userNo);
    }else {
        alert("两次输入不一致！")
    }

}
function cancel() {
    $(".layui-layer-shade").hide();
    $(".layui-layer").hide();
}

function changePwd(userNo) {
    ajax({
        type: "POST",
        url: "/api/user/resetPwd?token=670e8a43b246801ca1eaca97b3e19189&uuid=f379eaf3c831b04de153469d1bec345e&userRoleId=1",
        dataType: "json",
        data: {
            userNo:userNo,
            pwd:  $('#newPwd1').val()
        },
        success: function (data) {
            if(data.code==0){
                alert("修改成功")
                cancel();
            }else{
                alert("更改不成功，请重新修改");
            }
        },
        error: function () {
            console.log("error")
        }
    })
}