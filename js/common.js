let userInfo = JSON.parse(localStorage.getItem('userInfo'));
if(userInfo && userInfo["userNo"] != undefined){

}else{
    if( window.location.href.indexOf("login")<=0){
        window.location.href='./login.html'
    }
}

    function ajax(){
        let url = 'http://121.43.163.161:8080'+arguments[0].url;
        if( window.location.href.indexOf("login")>0){

        }else{
            if(arguments[0].url.indexOf("?") <= 0){
                url += "?"
            }
            url += "&token="+userInfo.token+"&uuid="+userInfo.uuid+"&userRoleId="+userInfo.userRoleId
        }

    var ajaxData = {
        type:arguments[0].type || "GET",
        url:url,
        async:arguments[0].async || "true",
        headers:arguments[0].headers ||null,
        data:arguments[0].data || null,
        dataType:arguments[0].dataType || "text",
        contentType:arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend:arguments[0].beforeSend || function(){},
        success:arguments[0].success || function(){},
        error:arguments[0].error || function(){},
    }
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType=ajaxData.dataType;
    xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);
    xhr.setRequestHeader("Content-Type",ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                ajaxData.success(xhr.response)
            }else{
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data){
    if( typeof data === 'object' ){
        var convertResult = "" ;
        for(var c in data){
            convertResult+= c + "=" + data[c] + "&";
        }
        convertResult=convertResult.substring(0,convertResult.length-1)
        return convertResult;
    }else{
        return data;
    }
}

function getQueryString(name) {

    var url=window.location.href;
    var offset = url.indexOf("?");
    if (offset !== -1) {
        url = url.substr(offset);
    }
    var pairs;
    var params = {};
    if (url) {
        url = url.substr(1);
        pairs = url.split("&");
        for (var pair of pairs) {
            var list = pair.split("=");
            if (list.length == 2) {
                params[list[0]] = list[1];
            }
        }
        return params;
    }
}

function getConsumerSelect(type,name){
    ajax({
        type: "GET",
        url: "/api/consumer/consumerSelect?categoryCode="+type,
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var arr=[];
            var dataSelect = JSON.parse(data).data;
            for (var i = 0; i < dataSelect.length; i++) {
                arr[i] = dataSelect[i].dictText;
            }
            showSelect(arr,name);
        },
        error: function () {
            console.log("error")
        }
    })
}

function showSelect(arr,name) {
    var arrayHtml = $("#"+name).html();
    for(var i=0;i<arr.length;i++) {
        arrayHtml += '<option>' + arr[i]+ '</option>'
    }
    $("#"+name).html(arrayHtml);
}

function getGroupSelect(name){
    ajax({
        type: "GET",
        url: "/api/user/groupSelect",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var arr=[];
            var dataSelect = JSON.parse(data).data;
            for (var i = 0; i < dataSelect.length; i++) {
                arr[i] = dataSelect[i].groupName;
                arr[i] ={
                      name:dataSelect[i].groupName,
                      id:dataSelect[i].groupId
                }
            }

            showTeamSelect(arr,name);
        },
        error: function () {
            console.log("error")
        }
    })
}

function getUsersSelect(names,url){
    ajax({
        type: "GET",
        url: "/api/group/userFuzzyQuery?"+url,
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var arr=[];
            var dataSelect = JSON.parse(data).data;
            for (var i = 0; i < dataSelect.length; i++) {
                arr[i] ={
                    name:dataSelect[i].name,
                    id:dataSelect[i].userId
                }
            }
            showTeamSelect(arr,names);
        },
        error: function () {
            console.log("error")
        }
    })
}

function showTeamSelect(arr,name) {
    var arrayHtml = $("#"+name).html();
    for(var i=0;i<arr.length;i++) {
        arrayHtml += '<option value="'+arr[i].id+'">' + arr[i].name+ '</option>'
    }
    $("#"+name).html(arrayHtml);
}

function getRoleSelect(names){
    ajax({
        type: "GET",
        url: "/api/user/roleSelect",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var arr=[];
            var dataSelect = JSON.parse(data).data;
            for (var i = 0; i < dataSelect.length; i++) {
                arr[i] = {
                    name:dataSelect[i].description,
                    id:dataSelect[i].roleId
                }
            }
            showTeamSelect(arr,names);
        },
        error: function () {
            console.log("error")
        }
    })
}

function getLeaderSelect(names){
    ajax({
        type: "GET",
        url: "/api/group/leaderSelect",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var arr=[];
            var dataSelect = JSON.parse(data).data;
            for (var i = 0; i < dataSelect.length; i++) {
                arr[i] ={
                    name:dataSelect[i].name,
                    id:dataSelect[i].userId
                }
            }
            showTeamSelect(arr,names);
        },
        error: function () {
            console.log("error")
        }
    })
}

function getGroupCondition(name){
    ajax({
        type: "GET",
        url: "/api/consumer/groupCondition",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var arr=[];
            var dataSelect = JSON.parse(data).data;
            for (var i = 0; i < dataSelect.length; i++) {
                arr[i] = dataSelect[i].groupName;
            }
            showSelect(arr,name);
        },
        error: function () {
            console.log("error")
        }
    })
}

function getMemberCondition(name){
    ajax({
        type: "GET",
        url: "/api/consumer/memberCondition",
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        data: {},
        success: function (data) {
            var arr=[];
            var dataSelect = JSON.parse(data).data;
            for (var i = 0; i < dataSelect.length; i++) {
                arr[i] = dataSelect[i].name;
            }
            showSelect(arr,name);
        },
        error: function () {
            console.log("error")
        }
    })
}