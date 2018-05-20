var params = {
    pageSize: 30,
    pageNum: 1
};
$("#groupNoBox").hide();
getLeaderSelect('leaders');

getUsersSelect('candidate', 'searchString=0');


var params = getQueryString();
if (params.groupId) {
    $("#groupNoBox").show();
    $('#groupNo').val(params.groupId);
    ajax({
        type: "GET",
        url: "/api/group/getGroup/" + params.groupId,
        dataType: "json",
        success: function (data) {
            $('#groupName').val(data.data.groupName);
            $('#leaders').val(data.data.leaderId);
        },
        error: function () {
            console.log("error")
        }
    })
    getGroupMember();
} else {

}

//新建组及更新组
$('#submit').click(function createTeam() {
    // var groupNo = $('#groupNo').val();
    var groupname = $('#groupName').val();
    var leaderid = $('#leaders').val();
    var member = getSelectedMember();
    //通过组名判断该组是否存在，如果存在，点击保存按钮进行更新组操作，如果不存在，点击按钮进行新建组操作
    // if (isExist($('#teamName').value)>0){
    //     //存在，不操作
    //     alert("该组已存在！")
    //
    // }else {

    if (params.groupId) {
        ajax({
            type: "POST",
            url: "/api/group/updateGroup",
            dataType: "json",
            data: {
                groupId: groupid,
                groupName: groupname,
                leaderId: leaderid,
                members: member
            },
            success: function (data) {
                if (data) {
                    alert(JSON.parse(data).data);
                }
            },
            error: function () {
                console.log("error")
            }
        })
    } else {
        //进行新建组操作
        ajax({
            type: "POST",
            url: "/api/group/addGroup",
            dataType: "json",
            data: {
                groupName: groupname,
                leaderId: leaderid,
                members: member
            },
            success: function (data) {
                if (data) {
                    alert(JSON.parse(data).data);
                }
            },
            error: function () {
                console.log("error")
            }
        })
    }

    // }
})

//判断该组是否存在
function isExist(GroupName) {
    var x = 0;
    ajax({
        type: "GET",
        url: "/api/user/groupSelect",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var content = JSON.parse(data).data;
            console.log(content);
            for (var i = 0; i < content.length; i++) {
                if (content.indexOf(GroupName) > -1) {
                    x = 1;
                }
            }
        },
        error: function () {
            console.log("error")
        }
    })
    console.log(x);
    return x;
}

sortitems = 1;  // Automatically sort items within lists? (1 or 0)

//多选框操作
function move(fbox, tbox) {
    for (var i = 0; i < fbox.options.length; i++) {
        if (fbox.options[i].selected && fbox.options[i].value != "") {
            var no = new Option();
            no.value = fbox.options[i].value;
            no.text = fbox.options[i].text;
            tbox.options[tbox.options.length] = no;
            fbox.options[i].value = "";
            fbox.options[i].text = "";
        }
    }
    BumpUp(fbox);
    if (sortitems) SortD(tbox);
}

function BumpUp(box) {
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].value == "") {
            for (var j = i; j < box.options.length - 1; j++) {
                box.options[j].value = box.options[j + 1].value;
                box.options[j].text = box.options[j + 1].text;
            }
            var ln = i;
            break;
        }
    }
    if (ln < box.options.length) {
        box.options.length -= 1;
        BumpUp(box);
    }
}

function SortD(box) {
    var temp_opts = new Array();
    var temp = new Object();
    for (var i = 0; i < box.options.length; i++) {
        temp_opts[i] = box.options[i];
    }
    for (var x = 0; x < temp_opts.length - 1; x++) {
        for (var y = (x + 1); y < temp_opts.length; y++) {
            if (temp_opts[x].text > temp_opts[y].text) {
                temp = temp_opts[x].text;
                temp_opts[x].text = temp_opts[y].text;
                temp_opts[y].text = temp;
                temp = temp_opts[x].value;
                temp_opts[x].value = temp_opts[y].value;
                temp_opts[y].value = temp;
            }
        }
    }
    for (var i = 0; i < box.options.length; i++) {
        box.options[i].value = temp_opts[i].value;
        box.options[i].text = temp_opts[i].text;
    }
    this.getSelectedMember();
}

//获取已选人员
function getSelectedMember() {
    var selectMember = $("#selectMem option").map(function () {
        return $(this).val();
    }).get().join(";");
    return selectMember;
}

//监听搜索组员
$("#members-search").change(function () {
    let url = "groupId=";
    url += $("#members-search").val();
    $('#candidate').empty();
    getUsersSelect('candidate', url);
});

function getGroupMember() {
    ajax({
        type: "GET",
        url: "/api/group/getGroup/" + params.groupId,
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var arr = [];
            var arrayHtml = $("#selectMem").html();
            var dataSelect = JSON.parse(data).data.members;
            for (var i = 0; i < dataSelect.length; i++) {
                arr[i] = dataSelect[i].name;
            }
            for(var i=0;i<arr.length;i++) {
                arrayHtml += '<option>' + arr[i]+ '</option>'
            }
            $("#selectMem").html(arrayHtml);
        },
        error: function () {
            console.log("error");
        }
    })
}