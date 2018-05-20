let ConsumerSource=[];
getConsumerSelect(1,ConsumerSource);

console.log(ConsumerSource)
// var ConsumerSource2 = getConsumerSelect(2);
// var ConsumerSource3 = getConsumerSelect(3);
// var ConsumerSource6 = getConsumerSelect(6);
// console.log(ConsumerSource1)
// console.log(ConsumerSource2)
// console.log(ConsumerSource3)
// console.log(ConsumerSource6)


var params = getQueryString();

if(params.id){
    console.log(params.id)
    $.ajax({
        type: "GET",
        url: "/api/consumer/consumerDetail/{"+params.id+"}",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        beforeSend:function (request) {},
        data: {},
        success: function (data) {
            $('#info_form').find('[name]').each(function() {
                var type = $(this)[0].nodeName.toLowerCase();
                var name = $(this).attr('name');
                $(type+"[name='"+name+"']").val(data[''+name+'']);
            });
        },
        error: function () {
            console.log("error")
            let data={
                consumerId:3,//客户ID
                consumerNo:"2018002001",//客户编号
                name:"闪电侠",//客户姓名
                country: "美国", //国籍
                mainBusiness:"鞋帽",//主营业务
                source:"社交平台", //客户来源
                type:"零售商",//客户类型
                email:"dw379936691@126.com",//邮箱
                intention:"蛇皮袋",//客户意向
                facebook:"",
                whatsapp:"",
                linkedin:"",
                wechat:"",
                qq:"",
                contacts:"13817959271;13917509898",//联系方式,多个用;隔开
                companyAddress:"杭州市西湖区",//公司地址
                companyWebsite:"www.baidu.com",//公司网址
                consignee:"收货人",//收货人
                telMobile:"",//收货人联系方式
                postalCode:"",//邮编
                receivingAddress:"",//收货地址
                level:"A",//客户等级
                isCanEdit:"1",//是否可编辑，1表示可编辑，0不可编辑
                createdTime:"2018-01-12 18:30:32",//创建时间，yyyy-mm-dd hh:mm:ss格式字符串
                updatedTime:"2018-01-12 18:30:32"//更新时间，同上

            }
            $('#info_form').find('[name]').each(function() {
                var type = $(this)[0].nodeName.toLowerCase();
                var name = $(this).attr('name');
                $(type+"[name='"+name+"']").val(data[''+name+'']);
            });
        }
    })

}else{

}


$('#submit').click(function() {
    var d = {};
    var t = $('form').serializeArray();
    $.each(t, function() {
        d[this.name] = this.value;
    });
    console.log(JSON.stringify(d));
    return false;
});
