var params = {
    pageSize:30,
    pageNum:1,
    searchType:1
};
var totalCount = '';
var pageNo = 1;
var params2 = {
    pageSize:30,
    pageNo:pageNo
};
var consumerId;

getConsumerSelect(3,'country');
getConsumerSelect(4,'level');
getConsumerSelect(5,'hasOrder');

var mid = [];
//加载数据
function loadConsumer(pageNum) {
    if(pageNum){
        params.pageNum = pageNum
    }
    var url ='';
    $.each(params, function(key, val) {
        if((val!=0)&&(val!=null)){
            url += '&'+key+'='+val
        }
    });
    ajax({
        type: "GET",
        url: "/api/consumer/listMyConsumer?"+url,
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
function addHtml(dataSelect) {
    var table_html='';
    for (var i = 0; i < dataSelect.length; i++) {
        var data=dataSelect[i];
        $.each(data, function (key, val) {
            if(val==undefined || val==null){
                data[key]='--'
            }
        });
        table_html += '<tr><td>'+data.consumerNo+'</td>' +
            '<td>'+data.name+'</td><td>'+data.country+'</td>' +
            '<td>'+data.level+'</td><td>'+data.email+'</td>' +
            '<td>'+data.hasOrder+'</td>' +
            '<td>'+data.contactTime+'</td><td>'+data.nextContactTime+'</td>' +
            '<td>'+data.totalOrder+'</td>' +
            '<td><a class="follow" data-id="'+data.consumerId+'"onclick="showAdmin('+data.consumerId+')">跟进</a></td>' +
                '<td><a class="call-back" data-id="'+data.consumerId+'"onclick="deleteClient('+data.consumerId+')">回收</a></td></tr>';
    }
    $('#follow1').html(table_html);
    totalCount = dataSelect[0].totalCount;
    console.log(totalCount);
}

loadConsumer(params2.pageNo);

//查询数据
$('#submit').click(function() {
    var t = $('form').serializeArray();
    $.each(t, function() {
        params[this.name] = this.value;
    });
    console.log(params);
    loadConsumer(params2.pageNo);
});

$(".follow").click(function () {
    $(".staff-follow").show();

});

//渲染分页按钮
function renderNav(pageNumber){
    var nav='<li> <a href="javascript:changePage(-1)" aria-label="Previous" id="previous"> <span aria-hidden="true">&laquo;</span> </a> </li> <li><a href="javascript:changePage2(1)" >1</a></li>';
    if(pageNumber<=10 && pageNumber){
        for (var i=1;i<pageNumber;i++){
            nav += '<li><a href="javascript:changePage2('+(i+1)+')" >'+(i+1)+'</a></li>';
        }
        $('a').css('background-color','#ffffff');
        // console.log($('ul').children('li'));
        // $('#firstNavChild').children('li').eq( params2.pageNo).children('a').css('background-color','#eeeeee');
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
            loadConsumer(params2.pageNo);
        }
    }
    else{
        if(params2.pageNo == totalCount/params.pageSize){
            return false;
        }else {
            params2.pageNo += i;
            loadConsumer(params2.pageNo);
        }
    }
}

//点击页码切换页面
function changePage2(i){
    params2.pageNo = i;
    loadConsumer(params2.pageNo);
}

function showAdmin(e) {
    consumerId = e;
    ajax({
        type: "GET",
        url: "/api/consumer/follow-record?consumerId="+e,
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var html='';
           let data2 =JSON.parse(data).data
            if(data2!=null) {
                for (var i = 0; i < data2.length; i++) {
                    html += '<tr><td>' + data2[i].followTime + '</td><td>' + data2[i].followUser + '</td><td>' + data2[i].content + '</td></tr>'
                }

            }else{
                    html += '<tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr>'
            }
            $("#follow2").html(html);
            $(".staff-follow").show();
        },
        error: function () {
            console.log("error")
        }
    })
    $(".admin-follow").show();
}

function deleteClient(e) {
    ajax({
        type: "GET",
        url: "/api/consumer/discard-consumer?consumerId="+e,
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            loadConsumer(params2.pageNo);
        },
        error: function () {
            console.log("error")
        }
    })
}

//重置按钮事件
$("#resetbtn").off().on("click", function () {
    window.location.reload();
});

function closeModal() {
    $(".staff-follow").hide();
    $(".admin-follow").hide();
}
function follow_confirm(){
    ajax({
        type: "POST",
        url: "/api/consumer/saveFollowRecord",
        dataType: "json",
        data: {
            content:$("#content").val(),
            day:$("#day").val(),
            consumerId:consumerId
        },
        success: function (data) {
            $(".staff-follow").hide();
        },
        error: function () {
            console.log("error")
        }
    })
}
function cancel() {
    $(".staff-follow").hide();
}