//公共变量
var win_w = $(window).width();
var w_w = $(window).width();
var win_h = $(window).height();
var win_c = $(".office_content").height();
var win_m = $("#man_zone").height();
var _page_url = location.href;
var _host = location.hostname;
var usr_agent = navigator.userAgent.toString();
var _b_device = "www";
var _vreg_num = "^[0-9]+$";
var _vreg_char = "^[a-zA-Z]+$";
var _vreg_cn = "^[\u4E00-\u9FA5]{0,}$";
var _vreg_mail = "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$";
var _vreg_phone = "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$";
var _vreg_cert = "^((d{18})|([0-9x]{18})|([0-9X]{18}))$";
var _office_cookie; //管理系统cookie
//区分客户端
function checkMobile() {
    var pda_user_agent_list = new Array("2.0 MMP", "240320", "AvantGo", "BlackBerry", "Blazer",
        "Cellphone", "Danger", "DoCoMo", "Elaine/3.0", "EudoraWeb", "hiptop", "IEMobile", "KYOCERA/WX310K", "LG/U990",
        "MIDP-2.0", "MMEF20", "MOT-V", "NetFront", "Newt", "Nintendo Wii", "Nitro", "Nokia",
        "Opera Mini", "Opera Mobi",
        "Palm", "Playstation Portable", "portalmmm", "Proxinet", "ProxiNet",
        "SHARP-TQ-GX10", "Small", "SonyEricsson", "Symbian OS", "SymbianOS", "TS21i-10", "UP.Browser", "http://www.rabbitexpress.cn/Office/js/UP.Link",
        "Windows CE", "WinWAP", "Androi", "iPhone", "iPod", "iPad", "HUAWEI", "Mobile", "Windows Phone", "HTC");
    for (var i = 0; i < pda_user_agent_list.length; i++) {
        if (usr_agent.indexOf(pda_user_agent_list[i]) >= 0) {
            return true;
        }
    }
    return false;
}
if (checkMobile()) { _b_device = "wap"; }
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
function getStrLength(str) {
    var cArr = str.match(/[^\x00-\xff]/ig);
    return str.length + (cArr == null ? 0 : cArr.length);
}
// JScript 文件
function Setaid_Cookie(strnum) {SetCookie("aid_num", strnum);location.href = "JScript_office.js-aid="/*tpa=http://www.rabbitexpress.cn/Office/js/JScript_office.js?aid=*/ + strnum;}
function show_srh(strnum, strvalue) { Delaid_Cookie(strnum);SetCookie(strnum, strvalue);}
//写cookies函数 
function SetCookie(name, value)
{
    var Days = 1; //此 cookie 将被保存1 天 
    var exp = new Date();    //new Date("December 31, 9998"); 
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
}
//删除cookie 
function Delaid_Cookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//取cookies函数 
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
}
//删除左右两端的空格
String.prototype.trim = function () {return this.replace(/(^\s*)|(\s*$)/g, '');}
String.prototype.ltrim = function () {return this.replace(/(^\s*)/g, '');}
String.prototype.rtrim = function () {return this.replace(/(\s*$)/g, '');}
/**当前时间**/
function msg_CurentTime() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日       
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分       
    var ss = now.getSeconds();          //秒     
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + " ";
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}
function setTab(name, cursel, n) {
    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);/* sxw1 */
        var con = document.getElementById("con_" + name + "_" + i);/* con_sxw_1 */
        menu.className = i == cursel ? "hover" : "";/*三目运算 等号优先*/
        con.style.display = i == cursel ? "block" : "none";
    }
}

function Check_Alogin(_int_seconds)
{
    //会员登录状态  30s检测一次
    setInterval(function () {
        var _login_info = "";
        try
        {
            _login_info = $.cookie("_QIYEIS_Alogin");
            if (_login_info.length > 0) {
                $.getJSON("http://www.98web.net/", { want: "check_login", data: _login_info }, function (json) {
                    //console.log(json);
                    var _err = json.errcode;
                    if (_err != "0") {
                        location.href = "../login-1.aspx.htm"/*tpa=http://www.rabbitexpress.cn/office/login.aspx*/;
                    }
                });
            }
            else {
                location.href = "../login-1.aspx.htm"/*tpa=http://www.rabbitexpress.cn/office/login.aspx*/;
            }
        }
        catch (e) {
            location.href = "../login-1.aspx.htm"/*tpa=http://www.rabbitexpress.cn/office/login.aspx*/;
        }
    }, _int_seconds * 1000);
}
$(function () {
    //管理权限
    var _login = ""
    var _cookie_obj;
    var _lang;
    var _power;
    try {
        _login = $.cookie("_QIYEIS_Alogin");
        _cookie_obj = JSON.parse($.base64.decode(_login));
    }
    catch (e) {
        console.log(e.message);
    }
    //var _cookie_obj = JSON.parse($.base64.decode(_login));
    _power = "-" + _cookie_obj.power + "-";/*权限列表*/
    _lang = _cookie_obj.language;/*语言版本*/
    var _admin = _cookie_obj.usr;/*管理员账号*/
    $("#topnav .t_usr").html(_admin);
    //console.log(_power, _lang);
    //权限检验
    if (_page_url.indexOf("http://www.rabbitexpress.cn/Office/js/login.aspx") < 0)
    {
        Check_Alogin(60);
    }
    //公用头部脚本，判断元素是否存在
    $.fn.exist = function () {
        if ($(this).length >= 1) {
            return true;
        }
        return false;
    };

    //公用头部脚本，判断元素是否存在
    $.fn.pop2021 = function (p_tit, p_html)
    {
        if ($(".pop2021").exist() == false) {
            $("body").append("<div class=\"pop2021\"><h3>" + p_tit + "<a href=\"javascript:;\" class=\"pop2021_close\">×</a></h3><p>" + p_html + "</p></div>")
            $(".pop2021").fadeIn()
        }
    };
    $.fn.hid2021 = function () {
        $(".pop2021").fadeOut();
        $(".pop2021").remove();
    };
    //$.cookie("office_cookie", "undefined");
    //载入读取cookie，展开菜单
    var _office_cookie_str;
    try
    {
        _office_cookie_str= $.cookie("office_cookie");
    }
    catch(e){

    }
    if (_office_cookie_str == "undefined" || _office_cookie_str == undefined) {
        _office_cookie = { "sidecolor": "#465161", "leftmenu": "01" }
        $.cookie("office_cookie", JSON.stringify(_office_cookie));
    }
    else {
        _office_cookie = JSON.parse(_office_cookie_str);
    }
    var _varcolor = $.cookie("_QIYEIS_Color");
    //var _varcolor = Office_Cookieget("office_cookie", "sidecolor");
    var _varleft = Office_Cookieget("office_cookie", "leftmenu");
    $(".office_left").css({ "background": _varcolor });
    $("#pagingbar").find(".current").css({ "background": _varcolor });
    //背景色
    
    $(".side_color ul li").each(function () {
        var _color = $(this).attr("data-color");
        if (_color == _varcolor) {
            console.log(_color, _varcolor);
            $(".office_left").css({ "background": _color });
            $(this).append("<i style=\"display:block;width:12px;height:12px;border:4px solid " + _color + "; border-radius:100%;background:"+_color+"\"></i>");
        }
        else
        {
            $(this).append("<i style=\"display:block;width:12px;height:12px;border:4px solid " + _color + "; border-radius:100%;background:#fff\"></i>");
        }
        $(this).click(function () {
            $(".office_left").css({ "background": _color });
            $(".side_color ul li i").css({ "background": "#Fff" });
            $(this).find("i").css({ "background": _color });
            //_office_cookie=Office_Cookieset("office_cookie", "sidecolor", _color);
            $.cookie("_QIYEIS_Color", _color);
        });
        if (_color == _varcolor)
        {
            $(this).find("i").css({ "background":_varcolor });
        }
    });

    //列表交替变换
    $(".gridview_css td").each(function () {
        $(this).hover(function () {
            $(this).parents("tr").css("background-color", "#f6f7fb");
        },
        function () {
            $(this).parents("tr").css("background-color", "#ffffff");
        });
    });
    //右上角语言版本
    $(".js_lang").each(function (_ind) {
        var _class = $(this).attr("value").toLowerCase();
        if (_class.indexOf(_lang) > 0) {
            $(".js_lang").eq(_ind).addClass("js_lang_cur");
        }
    });
    //左侧导航
    $(".sideMenu a").each(function () {
        var _avar = $(this).attr("href").toLowerCase();
        _avar = _avar.substring(0, _avar.indexOf('.aspx'));
        if (_power.indexOf(_avar) <= 0) {
            $(this).parents("li").remove();
        }
    });
    //控制面板
    $(".tpanel_box a").each(function () {
        var _avar = $(this).attr("href").toLowerCase();
        _avar = _avar.substring(0, _avar.indexOf('.aspx'));
        if (_power.indexOf(_avar) < 0) {
            $(this).parent("div").remove();
        }
    });
    //左侧导航
    $(".sileUl li i").each(function (_ind) {
        $(this).toggle(function () {
            $(this).addClass("cur");
            $(this).parent().find("p").slideDown();
        }, function () {
            $(this).removeClass("cur");
            $(this).parent().find("p").slideUp();
        });
    });

    //左侧菜单导航   
    $(".sideMenu h3").each(function (_index) {
        var _hcls = $(this).attr("class");
        if (_hcls.indexOf(_varleft) > 0)
        {
            //展开操作
            $(this).addClass("on");
            $(this).next().slideDown();
        }
        else {
            $(this).removeClass("on");
        }
        $(this).toggle(function () {
            $(".sileUl").slideUp();
            $(".sileUl").eq(_index).slideDown();
            var _grel = $(this).next().attr("rel");
            _office_cookie=Office_Cookieset("office_cookie", "leftmenu", _grel);
            _varleft = Office_Cookieget("office_cookie", "leftmenu");
        }, function () {
            $(".sileUl").eq(_index).slideUp();
        });
    });
    //点击写入COOKIE
    $(".sileUl li a").click(function () {
        var _grel = $(this).parents("li").parents("ul").attr("rel");
        _office_cookie=Office_Cookieset("office_cookie", "leftmenu", _grel);
    });
    ////设置内容区最小高度
    //var min_h = win_h - 144;
    //$(".office_content").css({ "min-height": min_h });

    switch (_b_device)
    {
        case "wap":
            $(".btn-nav").toggle(function () {
                var _menu = $(".office_warp .office_left .wrapper").html();
                $(".office_content").before(_menu);
                $(".sideMenu").css({ "left": "0%", "background": _varcolor });
                $("#bottom").remove();
                $(".sideMenu h3").each(function (_index) {
                    $(this).toggle(function () {
                        $(".sileUl").slideUp();
                        $(".sileUl").eq(_index).slideDown();                        
                    }, function () {
                        $(".sileUl").eq(_index).slideUp();
                    });
                });
            }, function () {
                $(".office_right").find(".sideMenu").remove();
                $("#bottom").remove();

            });
            //$(".office_warp .office_left h4").toggle(function () {
            //    var _menu = $(".office_warp .office_left .wrapper").html();
            //    $(".office_content").before(_menu);
            //    $(".sideMenu").css({ "left": "0%" });
            //    $(".sideMenu h3").each(function (_index) {
            //        $(this).toggle(function () {
            //            $(".sileUl").slideUp();
            //            $(".sileUl").eq(_index).slideDown();
            //        }, function () {
            //            $(".sileUl").eq(_index).slideUp();
            //        });
            //    });
            //}, function () {
            //    $(".office_right").find(".sideMenu").remove();
            //});
            break;
        default:
            $(".office_left").css({ "min-height": win_h });
            ////导航浮动
            $(window).scroll(function () {

                var _left_wd = $(".office_left").width();
                if ($(window).scrollTop() >= 0) {
                    $('.office_left').addClass("hidiv");
                    if ($(".btn-nav").attr("class").indexOf("animated") > 0) {
                        $(".office_right .office_content").css({ "margin-top": "calc(1% + 60px)" });
                    }
                } else {
                    $('.office_left').removeClass("hidiv");
                }
            });
            $(".side_menu").toggle(function () {
                $(this).find(".btn-nav").addClass("animated");
                $(".office_left").animate({ "position": "relative", "left": "-12%", "width": "0%" }, 'slow');
                $(".office_right").animate({ "left": "0%", "top": "0%" }, 'slow').animate({ "width": "100%" }, 'slow');
                $(".office_right #topnav").css({ "position": "fixed", "width": "99%", "z-index": "99999" });

            }, function () {
                $(this).find(".btn-nav").removeClass("animated");
                $(".office_left").animate({ "position": "relative", "left": "0%", "width": "12%" }, 'slow');
                if ($(".btn-nav").attr("class").indexOf("animated") > 0) {
                    $(".office_right #topnav").css({ "position": "fixed", "width": "87%", "z-index": "99999" });
                    $(".office_right").animate({ "width": "88%" }, 'slow').animate({ "left": "12%", "top": "0%" }, 'slow');
                }
                else {
                    $(".office_right #topnav").css({ "position": "fixed", "width": "87%", "z-index": "99999" });
                    $(".office_right").animate({ "width": "88%" }, 'slow').animate({ "left": "0%", "top": "0%" }, 'slow');
                }
            });
            break;
    }
    //排序正则
    $(".txtSort").keyup(function () {
        this.value = this.value.replace(/\D/g, '');
    });

    //列表展示
    $(".desp_device").each(function (_ind) {
        var _type = $(this).text();
        switch (_type) {
            case "www": $(this).html("PC端"); break;
            case "wap": $(this).html("移动端"); break;
            case "app": $(this).html("小程序"); break;
        }
    });
    //管理员操作历史入库
    var _title = $("#pagetitle h1").text();
    if (_title.indexOf("后台管理系统") <= 0 && _title.length > 0) {
        $.getJSON("../../api/Office/catalogue.ashx"/*tpa=http://www.rabbitexpress.cn/api/Office/catalogue.ashx*/, { action: "opthistory", title: _title, url: this.location.href, num: 10 }, function (json) {
            show_history(json);
        });
    }
    $("#office_history div i").live("click", function () {
        var _tit = $(this).attr("rel");
        //获取操作历史
        $.getJSON("../../api/Office/catalogue.ashx"/*tpa=http://www.rabbitexpress.cn/api/Office/catalogue.ashx*/, { action: "removehistory", title: _tit }, function (json) {
            show_history(json);
        });
    });

    /*****************************************************Themes_Mange******************************************************/
    $(".desp_lock").each(function (_ind) {
        var _rel = $(this).text();
        switch (_rel) {
            case "0": $(this).html("×"); break;
            case "1": $(this).html("√"); break;
        }
    });
    $(".btn_mbjh").each(function (_ind) {
        var _rel = $(this).attr("data-usemd");
        if (_rel == "0") { $(this).remove(); }
    });
    //应用模板
    $(".theme_set").click(function () {
        $(".desp_lock").html("×");
        var _themeid = $(this).parent().attr("data-themeid");
        $.getJSON("../login.aspx.htm"/*tpa=http://www.rabbitexpress.cn/Office/control/handler.ashx*/, { want: "set_theme", id: _themeid }, function (json) {
            var _err = json.errcode;
            if (_err == "0") {
                $(".theme_set").each(function (_ind) {
                    var cop_themeid = $(this).parent().attr("data-themeid");

                    if (_themeid == cop_themeid) {
                        $(".desp_lock").eq(_ind).html("√");
                        console.log(_ind, _themeid, cop_themeid);
                    }

                });
            }
        });
    });
    //净化模板
    $(".btn_mbjh").click(function () {
        var _rel = $(this).attr("data-usemd");
        if (_rel == "1") {
            var _fdurl = $(this).attr("data-folder");
            $.getJSON("../login.aspx.htm"/*tpa=http://www.rabbitexpress.cn/Office/control/handler.ashx*/, { want: "jh_theme", furl: _fdurl, lang: _lang }, function (json) {
                var _err = json.errcode;
                if (_err == "0") {
                    alert("成功净化...");
                    console.log(json.list);
                }
            });
        }
    });
    //净化页面
    $(".btn_pgjh").click(function () {
        var _rel = $(this).attr("data-usemd");
        if (_rel == "1") {
            var _fdurl = $(this).attr("data-folder");
            $.getJSON("../login.aspx.htm"/*tpa=http://www.rabbitexpress.cn/Office/control/handler.ashx*/, { want: "jh_html", furl: _fdurl, lang: _lang }, function (json) {
                var _err = json.errcode;
                if (_err == "0") {
                    alert("成功净化...");
                    console.log(json.list);
                }
            });
        }
    });
    //清理缓存
    $(".btn_temp").click(function () {
        var _rel = $(this).attr("data-usemd");
        if (_rel == "1") {
            var _fdurl = $(this).attr("data-folder");
            $.getJSON("../login.aspx.htm"/*tpa=http://www.rabbitexpress.cn/Office/control/handler.ashx*/, { want: "jh_temp", furl: _fdurl, lang: _lang }, function (json) {
                var _err = json.errcode;
                if (_err == "0") {
                    alert("成功净化...");
                    console.log(json.list);
                }
            });
        }
    });
    //清理数据-慎用！
    $(".btn_data").click(function () {
        if (confirm("确实需要进行数据清理吗？此操作不可逆！")) {
            $.getJSON("../login.aspx.htm"/*tpa=http://www.rabbitexpress.cn/Office/control/handler.ashx*/, { want: "jh_data" }, function (json) {
                    var _err = json.errcode;
                    if (_err == "0") {
                        alert("成功清除数据...");
                    }
                    else {
                        alert("清除数据操作失败...");
                    }
                });
        }
    });  
});
//显示历史记录
function show_history(json)
{
    if (json.errcode == "0") {
        var _showlist = "<div><a href=\"javascript:;\">清除全部</a><i rel=\"all\">×</i></div>";;
        var _data = json.rows;
        for (var i = 0; i < _data.length; i++) {
            _showlist += "<div><a href=\"" + _data[i].url + "\">" + _data[i].tit + "</a><i rel=\"" + _data[i].tit + "\">×</i></div>";
        }
        if ($("#office_history").exist())
        {
            $("#office_history").html("<h1>操作历史</h1>" + _showlist );
        }
        else {
            $(".office_right").append("<div id=\"office_history\"><h1>操作历史</h1>" + _showlist + "</div><div class=\"clr\"></div>");
        }
    }
}
function showimg_over(imgdiv) {
    var strdimg = '#' + imgdiv;
    $(strdimg).fadeIn();
}
function showimg_out(imgdiv) {
    var strdimg = '#' + imgdiv;
    $(strdimg).fadeOut();
}
function page_goto(strurl) {
    this.location.href = strurl;
}
/*--------------------------------上传图片 ajaxFileUpload-------------------------------------------*/
function ajaxFileUpload(varhtmlid, picview, mbuid, fileuploadid) {
    $.ajaxFileUpload
    (
        {
            url: '../../api/Office/imgupload.ashx'/*tpa=http://www.rabbitexpress.cn/api/Office/imgupload.ashx*/, //用于文件上传的服务器端请求地址
            type: 'post',
            data: { want: 'upload', id: '123', rsn: mbuid }, //此参数非常严谨，写错一个引号都不行
            secureuri: false, //一般设置为false
            fileElementId: fileuploadid, //文件上传空间的id属性  <input type="file" id="file" name="file" />
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status)  //服务器成功响应处理函数
            {
                $(varhtmlid).attr("value", data.imgurl);
                if (picview.length > 0) {
                    $(picview).attr("src", data.imgurl);
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
        }
    )
    return false;
}
//修改cookie属性值
function Office_Cookieset(_cookiename, _item, _value) {
    var _office_cookie = $.cookie(_cookiename);
    var obj = JSON.parse(_office_cookie);
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        if (key == _item) {
            obj[key] = _value;
        }
    }
    //重新设置
    $.cookie(_cookiename, JSON.stringify(obj));
    return obj;
}
//获取cookie属性值
function Office_Cookieget(_cookiename, _item) {
    var _office_cookie = $.cookie(_cookiename);
    var obj = JSON.parse(_office_cookie);
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        if (key == _item) {
            return obj[key];
        }
    }
}