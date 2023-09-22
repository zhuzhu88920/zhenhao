//保存数据语法：localStorage.setItem("key", "value");
//读取数据语法：var lastname = localStorage.getItem("key");
//删除数据语法：localStorage.removeItem("key");
$(function () {
    var _kfdev = qiyeis_kefu_dev;
    var _kfid = qiyeis_kefu_id;
    var _url = "handler.ashx"/*tpa=http://www.rabbitexpress.cn/kefu/handler.ashx*/;
    ////先从本地cookie中获取，存在直接取,不存在从服务器拉取
    if (_kfdev==true)
    {
        //开发者模式
        $.getJSON(_url, { want: _kfid }, function (json) {
            var qiyeis_kefu_code_escape = json.code;
            var qiyeis_kefu_code = unescape(qiyeis_kefu_code_escape);
            localStorage.setItem(_kfid, qiyeis_kefu_code_escape);
            $("body").append(qiyeis_kefu_code);
        });
    }
    else
    {
        //访客模式
        try {
            var _local_kefujs = localStorage.getItem(_kfid);
            if (_local_kefujs == "" || _local_kefujs == null) {
                $.getJSON(_url, { want: _kfid }, function (json) {
                    var qiyeis_kefu_code_escape = json.code;
                    localStorage.setItem(_kfid, qiyeis_kefu_code_escape);
                    var qiyeis_kefu_code = unescape(qiyeis_kefu_code_escape);
                    $("body").append(qiyeis_kefu_code);
                });
            }
            else {
                var qiyeis_kefu_code = unescape(_local_kefujs);
                $("body").append(qiyeis_kefu_code);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
});