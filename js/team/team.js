var params = {
    pageSize: 30,
    pageNum: 1,
};
var totalCount = '';
var pageNo = 1;
var params2 = {
    pageSize:30,
    pageNo:pageNo
};

getGroupSelect('groupName');
getLeaderSelect('leaderName');

//调用列表接口
function loadGroup(pageNum) {

    if (pageNum) {
        params.pageNum = pageNum
    }
    var url = '';
    $.each(params, function (key, val) {
        if ((val != 0) && (val != null)) {
            url += '&' + key + '=' + val
        }
    });

    ajax({
        type: "GET",
        url: "/api/group/listGroup?"+url,
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            totalCount = data.totalCount;
            addHtml(JSON.parse(data).data);
            renderNav(totalCount/params.pageSize);
        },
        error: function () {
            console.log("error")
        }
    })
}

//渲染列表
function addHtml(dataSelect) {
    var table_html = '';
    for (var i = 0; i < dataSelect.length; i++) {
        var data = dataSelect[i];
        $.each(data, function (key, val) {
            if(val==undefined || val==null){
                data[key]='--'
            }
        });
        table_html += '<tr><td>' + data.groupNo + '</td>' + '<td>' + data.groupName + '</td><td>' + data.leaderName + '</td>' + '<td><a class="follow" data-id="' + data.groupId + '" href="../../html/team/edit_team.html?groupId=' + data.groupId + '">修改</a></td></tr>';
    }
    $('#follow1').html(table_html);
    totalCount = dataSelect[0].totalCount;
    console.log(totalCount);
}

//初始化页面列表
loadGroup(params.pageNum);

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
            loadGroup(params2.pageNo);
        }
    }
    else{
        if(params2.pageNo == totalCount/params.pageSize){
            return false;
        }else {
            params2.pageNo += i;
            loadGroup(params2.pageNo);
        }
    }
}

//点击页码切换页面
function changePage2(i){
    params2.pageNo = i;
    loadGroup(params2.pageNo);
}

$('#submit').click(function () {
    var t = $('form').serializeArray();
    $.each(t, function () {
        params[this.name] = this.value;
    });
    console.log(params);
    loadGroup(params2.pageNo);
});
