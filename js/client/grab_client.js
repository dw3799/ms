var params = {
    pageSize:30,
    pageNum:1
};

var totalCount = '';
var pageNo = 1;
var params2 = {
    pageSize:3,
    pageNo:pageNo
};

getConsumerSelect(1,'source');
getConsumerSelect(2,'type');
getConsumerSelect(3,'country');
getConsumerSelect(4,'level');
getConsumerSelect(6,'intention');


var mid = [];
var roo=[];
var consumerID=[];
//加载数据
function loadConsumer(pageNum) {
    if(pageNum){
        params.pageNum=pageNum
    }
    var url ='';
    $.each(params, function(key, val) {
        if((val!=0)&&(val!=null)){
            url += '&'+key+'='+val
        }
    });

    ajax({
        type: "GET",
        url: "/api/consumer/listPublicConsumer?"+url,
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data:{} ,
        success: function (data) {
            var table_html='';
            totalCount = data.totalCount;
            var dataSelect = JSON.parse(data).data;
            for (var i = 0; i < dataSelect.length; i++) {
                let data=dataSelect[i];
                table_html += '<tr><td>'+data.consumerNo+'</td>' +
                    '<td>'+data.name+'</td><td>'+data.country+'</td>' +
                    '<td>'+data.source+'</td><td>'+data.type+'</td>' +
                    '<td>'+data.level+'</td><td>'+data.intention+'</td>' +
                    '<td>'+data.intentionQuantity+'</td><td>'+data.mainBusiness+'</td>' +
                    '<td>'+data.totalOrder+'</td>' +
                    '<td><a onclick="grab('+data.consumerId+')">抢客户</a></td></tr>';
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

loadConsumer(params2.pageNo);

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

//查询数据
$('#submit').click(function() {
    var t = $('form').serializeArray();
    $.each(t, function() {
        params[this.name] = this.value;
    });
    console.log(params);
    loadConsumer(params2.pageNo);
});

//清空查询条件
$("#resetbtn").off().on("click",function(){
    window.location.reload();
});

//抢占客户
function grab(id) {
    ajax({
        type: "GET",
        url: "/api/consumer/grab-consumer?consumerId="+id,
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            redata=JSON.parse(data);
            if (redata.data=="success"){
                swal({
                    title:'',
                    text: redata.data,
                    closeOnConfirm: true
                });
            }else {
                swal({
                    title:'',
                    text: redata.error,
                    closeOnConfirm: true
                });
            }
        },
        error: function () {
            console.log("error");
        }
    })
}