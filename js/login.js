$("#login-btn").click(function(){
    userNo=$(".username").val();
    pwd = $(".pwd").val();
    roleSelected = $("#roleListBox").val();
    var params={
        userNo:userNo,
        pwd:pwd,
        role:roleSelected
    }
    ajax({
        type:"POST",
        url:"/api/user/login",
        dataType:"json",
        data:{
            "userNo":userNo,
            "pwd":pwd,
            "role":roleSelected
        },
        success:function(data){
            if(data.code==1){
                swal({
                    title:'',
                    text: data.error,
                    closeOnConfirm: true
                });
            }else{
                var userInfo={
                    userNo:userNo,
                    token:data.data.token,
                    uuid:data.data.uuid,
                    userRoleId:data.data.userRoleId,
                    roleName:data.data.roleName,
                    name:data.data.userName,
                    description:data.data.description
                }
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                window.location='index.html'
            }

        },
        error:function(){
            console.log("error")
        }
    })
});

$("#login-role").click(function(){
    userNo=$(".username").val();
    ajax({
        type:"GET",
        url:"/api/user/listRole?userNo="+userNo,
        dataType:"jsonp",
        jsonp:"jsonpCallback",
        data:{},
        success:function(redata){

            let data=JSON.parse(redata);
            if(data.code==1){
                swal({
                    title:'',
                    text: data.error,
                    closeOnConfirm: true
                });
            }else {
                var roleLIST = data.data;
                var htmlRole = '';
                for (var i = 0; i < roleLIST.length; i++) {
                    htmlRole += '<option value="' + roleLIST[i].roleName + '">' + roleLIST[i].description + '</option>'
                }
                localStorage.setItem('roleLIST', JSON.stringify(roleLIST));
                document.getElementById('roleListBox').innerHTML = htmlRole;
                $(".before-login").hide();
                $(".after-login").show();
            }
        },
        error:function() {
            console.log("error")
        }
    })
})