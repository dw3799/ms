
var content = [];//全局变量，存放JSON返回值
getRule();//加载规则

//更新规则
function postRule(id,sta,day) {
    ajax({
        type: "POST",
        url: "/api/rule/update-rule",
        dataType: "json",
        data: {
            ruleId: id,
            status: sta,
            days: day,
        },
        success: function (data) {
            if (data) {
                // alert(JSON.parse(data).data);
            }
            getRule();
        },
        error: function () {
            console.log("error")
        }
    })
}

//加载规则
function getRule() {
    ajax({
        type: "GET",
        url: "/api/rule/list-rules",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            content = JSON.parse(data).data;
            showRules(content);//显示规则
        },
        error: function () {
            console.log("error")
        }
    })
}

//显示规则
function showRules(dataSelect) {
    var table_html='';
    //循环列表，显示每一个策略
    for (var i = 0; i < dataSelect.length; i++) {
        var data=dataSelect[i];
        var str=data.ruleDetail;
        //将输入框加载至规则字符串中
        str = str.replace(/N/, '<input type="number"  size="2" class="input-number" disabled id="form'+data.id+'" value ='+data.days+'>');
        //加载状态栏，如果该规则已启用，标签栏为已启用，反之为已失效
        if (data.status > 0) {
            str2 = '<label class="col-md-2" id="status1">已启用</label><a class="btn btn-primary btn-xs col-md-1" type="submit"  id="statusbtn'+data.id+'" onclick="changeStatus('+data.id+',0)">关闭</a><a class="btn btn-primary btn-xs col-md-1" type="submit" style="margin-left:10px;" id="modify'+data.id+'" onclick="modify('+data.id+')">修改</a><a class="btn btn-primary btn-xs col-md-1" type="submit" id="saveBtn'+data.id+'" style="margin-left:10px;background:#008855;display: none" onclick="modify('+data.id+')">保存</a>';
        } else {
            str2 = '<label class="col-md-2" id="status1">已失效</label><a class="btn btn-primary btn-xs col-md-1" type="submit" id="statusbtn'+data.id+'" onclick="changeStatus('+data.id+',1)">开启</a><a class="btn btn-primary btn-xs col-md-1" type="submit" style="margin-left:10px;" id="modify'+data.id+'" onclick="modify('+data.id+')">修改</a><a class="btn btn-primary btn-xs col-md-1" type="submit" id="saveBtn'+data.id+'" style="margin-left:10px;background:#008855; display: none" onclick="modify('+data.id+')">保存</a>';
        }
        table_html += '<tr><td>'+str+'</td>' + '<td class="col-md-6 col-md-pull-9"><div class="row">' + str2 + '</div></td></tr>';
        $("#savebtn"+data.id+"").hide();
        $("#modify"+data.id+"").show();
    }
    $('#form1').html(table_html);
}

//启用或失效按钮事件
function changeStatus(id,sta) {
    var days = $("#form"+id+"").val();
    postRule(id,sta,days);
    // getRule();
}

//修改时间输入框功能
function modify(id) {
    var sta = "";
    if($("#form"+id+"").prop("disabled")==true){
        $("#form"+id+"").attr("disabled",false);
        $("#statusbtn"+id+"").attr("disabled",false);
        $("#form"+id+"").css("color","red");
        $("#modify"+id+"").hide();
        $("#saveBtn"+id+"").show();

    }else {
        var days = $("#form"+id).val();
        postRule(id,sta,days)
        $("#form"+id+"").attr("disabled",true);
        $("#form"+id+"").css("color","black");
        $("#modify"+id+"").show();
        $("#saveBtn"+id+"").hide();
    }
}
