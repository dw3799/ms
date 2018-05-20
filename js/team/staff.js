var params = {
    pageSize: 30,
    pageNum: 1
};

var totalCount = '';
var pageNo = 1;
var params2 = {
    pageSize:3,
    pageNo:pageNo
};

getRoleSelect('role1');
getRoleSelect('role2');
getGroupSelect('team1');

var consumerID = [];

//加载数据
function loadStaff() {
    ajax({
        type: "GET",
        url: "/api/user/listUserRole",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {
            userNo: $('#userID2').value,
            roleName: $('#role2 option:selected').val(),
            name: $('#userName2').value
        },
        success: function (data) {
            var table_html = '';
            var dataSelect = JSON.parse(data).data;
            totalCount = data.totalCount;

            for (var i = 0; i < dataSelect.length; i++) {
                console.log(dataSelect[i]);
                consumerID[i] = dataSelect[i].consumerId;
                let data = dataSelect[i];
                table_html += '<tr><td>' + "<input type=\"checkbox\" name=\"select\" value=\"1\" />" + '</td>' +
                    '<td>' + data.userNo + '</td><td>' + data.roleName + '</td>' +
                    '<td>' + data.groupName + '</td><td>' + data.createdTimeString + '</td>' +
                    '<td>' + '<a onclick="change('+data.userNo+')" class="btn btn-outline btn-default">重置密码</a>' + '</td></tr>';
            }
            $('#follow1').html(table_html);
            totalCount = dataSelect[0].totalCount;
            console.log(totalCount);
            renderNav(totalCount/params.pageSize);
        },
        error: function () {
            console.log("error")
        }
    })
}

loadStaff(params2.pageNo);

//渲染分页按钮
function renderNav(pageNumber){
    var nav='<li> <a href="javascript:changePage(-1)" aria-label="Previous" id="previous"> <span aria-hidden="true">&laquo;</span> </a> </li> <li><a href="javascript:changePage2(1)" >1</a></li>';
    if(pageNumber<=10 && pageNumber){
        for (var i=1;i<pageNumber;i++){
            nav += '<li><a href="javascript:changePage2('+(i+1)+')" >'+(i+1)+'</a></li>';
        }
        $('a').css('background-color','#ffffff');
    }else{
        for (var i=params2.pageNo;i<10;i++){
            nav += '<li><a href="#" >'+(i+1)+'</a></li>';
        }
        nav += '<li><a href="#" >...</a></li>';
    }

    nav +='<li> <a  href="javascript:changePage(1)" aria-label="Next" id="next"> <span aria-hidden="true">&raquo;</span> </a> </li>';
    $("#firstNavChild").empty();
    $("#firstNavChild").append(nav);
}


//点击左右按钮切换页面
function changePage(i){
    if(i ==-1){
        if(params2.pageNo == 1){
            return false;
        }else {
            params2.pageNo += i;
            loadStaff(params2.pageNo);
        }
    }
    else{
        if(params2.pageNo == totalCount/params.pageSize){
            return false;
        }else {
            params2.pageNo += i;
            loadStaff(params2.pageNo);
        }
    }
}

//点击页码切换页面
function changePage2(i){
    params2.pageNo = i;
    loadStaff(params2.pageNo);
}

//添加用户
$('#add').click(function (){
    let name=$('#userName1').val();
    let groupId=$('#team1').val();
    let roleIds=$('#role1').val()
    ajax({
        type: "POST",
        url: "/api/user/addUser",
        dataType: "json",
        data: {
            name: name,
            groupId: groupId,
            roleIds: roleIds
        },
        success: function (data) {
            console.log(data)
            loadStaff(params2.pageNo);
        },
        error: function () {
            console.log("error")
        }
    })
})

//获取角色ID
function getRoleID(rolename) {
    ajax({
        type: "GET",
        url: "/api/user/roleSelect",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var content = JSON.parse(data).data;
            var num;
            var roleNameList = [
                {roleId: "1", name: "业务员"},
                {roleId: "2", name: '业务主管'},
                {roleId: "3", name: "财务人员"},
                {roleId: "4", name: '出纳人员'},
                {roleId: "5", name: '采购人员'},
                {roleId: "6", name: '仓储人员'},
                {roleId: "7", name: '单证'}
            ];
            console.log(rolename);
            for (var i = 0; i < data.length; i++) {
                console.log(content[i].description);
                if (data.indexOf(rolename) > -1) {
                    num = i;
                    break;
                } else {
                    // num = content[i].roleId;

                }
            }
            console.log(content[num].roleId);
            return content[num].roleId;
        },
        error: function () {
            console.log("error")
        }
    })
}


//获取组ID
function getGroupID(GroupName) {
    ajax({
        type: "GET",
        url: "/api/user/groupSelect",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var content = JSON.parse(data).data;
            var num;
            for (var i=0;i<content.length;i++) {
                if (data.indexOf(GroupName)>-1) {
                    num = i;
                    break;
                } else {
                    // num = content[i].groupId;

                }
            }
            console.log(content[num].groupId);
            return content[num].groupId;
        },
        error: function () {
            console.log("error")
        }
    })
}

$('#submit').click(function () {
    var t = $('form2').serializeArray();
    $.each(t, function () {
        params[this.name] = this.value;
    });
    console.log(params);
    loadStaff(params2.pageNo);
});

