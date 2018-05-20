
getConsumerSelect(1,'source');
getConsumerSelect(2,'type');
getConsumerSelect(3,'country');
getConsumerSelect(6,'intention');


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
    ajax({
        type: "POST",
        url: "/api/consumer/addConsumer",
        dataType: "json",
        data: d,
        success: function (data) {
            // window.location.href='client.html'
            console.log(data)
        },
        error: function () {
            console.log("error");
            return false;
        }
    })
});
