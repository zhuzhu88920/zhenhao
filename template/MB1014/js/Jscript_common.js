var _int_path = "/template/weidaic/";
var _page_url = this.location.href;
var _page_lang = "cn";//默认语言
var usr_agent = navigator.userAgent.toString();
var w_w = $(window).width();
var w_h = $(window).height();
var _b_device = "www";
var _bread_txt = "";
//清单
var _shop_listname = "_QIYEIS_LOCALLIST";
var _arr_list = [];
var _arr_sel_all = [];
//区分语言版本
$(function () {

    $(".header_lng a i").toggle(function () {
        $(this).removeClass("ico_down").addClass("ico_up");
        $(".header_lng ul").slideDown();
    }, function () {
        $(this).removeClass("ico_up").addClass("ico_down");
        $(".header_lng ul").slideUp();
    });

    _page_lang = _page_lang == null ? "cn" : _page_lang;
    $(".chglng a").addClass("css_" + _page_lang).find("i").html("<img src=\"/office/img/gq/" + _page_lang + ".jpg\"/>");
    $(".chglng a").toggle(function () {
        $(".chglng ul").slideDown();
    }, function () {
        $(".chglng ul").slideUp();
    });
    $(".chglng ul li").click(function () {
        _lang = $(this).attr("data-lang");
        localStorage.setItem("_QIYEIS_LANG", _lang);
        location.href = "../../../index.htm"/*tpa=http://www.rabbitexpress.cn/*/ + _lang + "/";
    });
});
//获取字符串
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//区分客户端
function checkMobile() {
    var pc_user_agent_list = new Array("Intel Mac OS", "Windows NT", "Nexus");
    for (var i = 0; i < pc_user_agent_list.length; i++) {
        if (usr_agent.indexOf(pc_user_agent_list[i]) >= 0) {
            return false;
        }
    }
    var pda_user_agent_list = new Array("2.0 MMP", "240320", "AvantGo", "BlackBerry", "Blazer",
        "Cellphone", "Danger", "DoCoMo", "Elaine/3.0", "EudoraWeb", "hiptop", "IEMobile", "KYOCERA/WX310K", "LG/U990",
        "MIDP-2.0", "MMEF20", "MOT-V", "NetFront", "Newt", "Nintendo Wii", "Nitro", "Nokia",
        "Opera Mini", "Opera Mobi",
        "Palm", "Playstation Portable", "portalmmm", "Proxinet", "ProxiNet",
        "SHARP-TQ-GX10", "Small", "SonyEricsson", "Symbian OS", "SymbianOS", "TS21i-10", "UP.Browser", "http://www.rabbitexpress.cn/template/MB1014/js/UP.Link",
        "Windows CE", "WinWAP", "Androi", "iPhone", "iPod", "iPad", "HUAWEI","Mobile","Windows Phone", "HTC");
    for (var i = 0; i < pda_user_agent_list.length; i++) {
        if (usr_agent.indexOf(pda_user_agent_list[i]) >= 0) {
            return true;
        }
    }
    return false;
}
if (checkMobile()) { _b_device = "wap"; }
//print
function Doprint() { $("#article_detail").jqprint(); }
//copylink
function Copylink() { var text = _page_url; clipboardData.setData("text", text); }
//区分微信扫码访问 微信模式下，支付宝支付不显示
function is_weixin() {if (usr_agent.match(/MicroMessenger/i) != 'MicroMessenger') {return false;}else {return true;}}
//载入产品讨论最新，前几项，不带页码、回复,_gnum为返回的条目
function Ajax_GetComments(_pid, strpagenum, _pgszie, _gnum) {
    var _datastr = "want=get_comments&id=" + _pid + "&page=" + strpagenum + "&psize=" + _pgszie + "&gnum=" + _gnum;
    $.ajax({
        url: "../../../common/web.ashx.htm"/*tpa=http://www.rabbitexpress.cn/common/web.ashx*/,
        data: _datastr,
        cache: false,
        success: function (html) {
            $('#comments').html(html + "<div class=\"clr\"></div>");
        }
    });
}
var imgbtn = "<a href=\"#\" class=\"close\"><img src=\"../../../images/closelabel2.gif\"/*tpa=http://www.rabbitexpress.cn/images/closelabel2.gif*/ class=\"btn_close\" title=\"Close Window\" alt=\"Close\" /></a>";
///验证表单
function NotInt(obj) {reg = /^[-+]?\d+$/;if (reg.test(obj)) {return false;} else {return true;}}
function NotEmail(obj) {reg = /^\w{3,}@\w+(\.\w+)+$/;if (reg.test(obj)) {return false;} else {return true;}}
function NotString(obj) {reg = /^[a-z,A-Z,0-9]+$/;if (!reg.test(obj)) {return false;} else {return true;}}
function NotUsername(obj) {reg = /^[a-zA-Z][a-zA-Z_]{6,15}$/;if (reg.test(obj)) {return false;} else {return true;}}
function NotPassword(obj) {reg = /^[a-zA-Z0-9]{6,15}$/;if (reg.test(obj)) {return false;} else {return true;}}
function iotTelephone(obj) {reg = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;if (reg.test(obj)) {return false;} else {return true;}}
function NotMobile(obj) {reg = /^(\+\d{2,3}\-)?\d{11}$/;if (reg.test(obj)) {return false;} else {return true;}}
function NotUrl(obj) {reg = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;if (reg.test(obj)) {return false;} else {return true;}}
function NotChinaname(obj) {reg = /^[\u4E00-\u9FA5]{2,4}$/;if (reg.test(obj)) {return false;} else {return true;}}
//图片出错替换
function ImgError() { $("img").each(function () { $(this).error(function () { $(this).attr("src", "../../../Office/img/nopic.jpg"/*tpa=http://www.rabbitexpress.cn/Office/img/nopic.jpg*/); }); }); }
function gettxtCode(imgid) {var checkcode = document.getElementById(imgid);checkcode.src = "/Common/CheckCode.aspx?" + Math.random();}
// 时间戳转多少分钟之前
function getDateDiff(dateTimeStamp) {
    // 时间字符串转时间戳
    var timestamp = new Date(dateTimeStamp).getTime();
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var year = day * 365;
    var now = new Date().getTime();
    var diffValue = now - timestamp;
    var result;
    if (diffValue < 0) {
        return;
    }
    var yearC = diffValue / year;
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (yearC >= 1) {
        result = "" + parseInt(yearC) + "年前";
    } else if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}
//日期
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
function pubdate_smart(_old_time, _time_type, _time_smart) {
    var _date = new Date(_old_time);
    var _time_new = "0000-00-00";
    switch (_time_type) {
        case "birthday":
            switch (_time_smart) {
                case "yyyy-mm-dd": _time_new = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate(); break;
                case "yy-mm-dd": _time_new = _date.getYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate(); break;
                case "mm-dd": _time_new = (_date.getMonth() + 1) + "-" + _date.getDate(); break;
            }
            break;//生日
        case "pubdate":
            switch (_time_smart) {
                case "年-月-日 时:分": _time_new = _date.getFullYear() + "年" + (_date.getMonth() + 1) + "月" + _date.getDate() + "日 " + _date.getHours() + "时" + _date.getMinutes() + "分"; break;
                case "年-月-日": _time_new = _date.getFullYear() + "年" + (_date.getMonth() + 1) + "月" + _date.getDate() + "日 "; break;
                case "月-日 时:分": _time_new = (_date.getMonth() + 1) + "月" + _date.getDate() + "日 " + _date.getHours() + "时" + _date.getMinutes() + "分"; break;
                case "月-日": _time_new = (_date.getMonth() + 1) + "月" + _date.getDate() + "日"; break;
                case "yyyy-mm-dd hh:mm": _time_new = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate() + " " + _date.getHours() + ":" + _date.getMinutes(); break;
                case "yyyy-mm-dd": _time_new = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate(); break;
                case "yy-mm-dd": _time_new = _date.getYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate(); break;
                case "mm-dd hh:mm": _time_new = (_date.getMonth() + 1) + "-" + _date.getDate() + " " + _date.getHours() + ":" + _date.getMinutes(); break;
                case "mm-dd": _time_new = (_date.getMonth() + 1) + "-" + _date.getDate(); break;
                case "yyyy/mm/dd hh:mm": _time_new = _date.getFullYear() + "/" + (_date.getMonth() + 1) + "/" + _date.getDate() + " " + _date.getHours() + ":" + _date.getMinutes(); break;
                case "yyyy/mm/dd": _time_new = _date.getFullYear() + "/" + (_date.getMonth() + 1) + "/" + _date.getDate(); break;
                case "yyyybrmm/dd": _time_new = _date.getFullYear() + "<em>" + (_date.getMonth() + 1) + "/" + _date.getDate()+"</em>"; break;
                case "yy/mm/dd": _time_new = _date.getYear() + "/" + (_date.getMonth() + 1) + "/" + _date.getDate(); break;
                case "mm/dd hh:mm": _time_new = (_date.getMonth() + 1) + "/" + _date.getDate() + " " + _date.getHours() + ":" + _date.getMinutes(); break;
                case "mm/dd": _time_new = (_date.getMonth() + 1) + "/" + _date.getDate(); break;
            }
            break;//发布日期
        default:
            return _old_time;
            break;
    }
    return _time_new;
}
//格式化日期
function Time_fmart() {
    //格式化日期
    $(".time_fmart").each(function (_ind) {
        var _time = $(this).html();
        var _type = $(this).attr("data-type");
        var _mart = $(this).attr("data-fmart");
        //var _time_n = pubdate_smart(_time, _type, _mart)
        var _time_n = new Date(_time).format(_mart);
        $(this).html(_time_n);
    });
}
//获取来路页面
function Get_referrurl() {
    var ref = '';
    if (document.referrer.length > 0) {
        ref = document.referrer;
    }
    try {
        if (ref.length == 0 && opener.location.href.length > 0) {
            ref = opener.location.href;
        }
    } catch (e) { }
    return ref;
}
function encode64(input) {
    input = escape(input);
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
}
function decode64(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
        "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return unescape(output);
}
////加载secbanner
function Loading_Secbanner(strtype, strcata) {
    var _b_html_www = '<div id="secbanner" style="background:url({PICURL}) no-repeat top center;"><a href="" title=""><img src="../../../Office/img/blank.gif"/*tpa=http://www.rabbitexpress.cn/Office/img/blank.gif*/ alt="" /></a><div class="type_name"><p><font>{TYPENAME_ENG}</font></p><h3>{TYPENAME}</h3><i></i></div></div>';
    var _b_html_wap = '<div id="secbanner" ><a href="" title=""><img src="{PICURL}" alt="" /></a><div class="type_name"><h3>{TYPENAME}</h3><p><font>{TYPENAME_ENG}</font></p></div></div>';
    if (strtype == "default") {strtype = strcata;}
    $.ajax({
        async: false,
        url: "/api/web/www.ashx?want=get_banner&en=" + strtype + "&device=" + _b_device,
        success: function (json) {
            var _json = JSON.parse(json);
            if (_json.length > 0) {
                var ja = _json[0];
                var b_name = ja.btname;
                var b_name_en = ja.btname_en;
                var b_url = ja.bpic;
                var shtml = '';
                if (w_w > 1200) {
                    shtml = _b_html_www.replace(/{PICURL}/g, b_url).replace(/{TYPENAME}/g, b_name).replace(/{TYPENAME_ENG}/g, b_name_en);
                }
                else {
                    shtml = _b_html_wap.replace(/{PICURL}/g, b_url).replace(/{TYPENAME}/g, b_name).replace(/{TYPENAME_ENG}/g, b_name_en);
                }
                $(".containerbox").before(shtml);
                $("#load").fadeOut();
            }
        },
        error: function (ex) {
            alert(ex);
        }
    });
}
//显示电子地图
//Fun_ShowEmap("iframe", "{{THEMEID}}", "{{SITENAME}}", "{{ADDRESS}}", "{{TEL}}", "{{EMAIL}}", "{{LONLAT}}");
function Fun_ShowEmap(_htmlid, _themeid, _sitename, _address, _tel, _email, _lonlat) {
    var _mapurl = "/" + _themeid + "/moudle/map.html?action=setmark&sitename=" + escape(_sitename) + "&address=" + escape(_address) + "&tel=" + _tel + "&email=" + _email + "&lonlat=" + _lonlat;
    var _mapurl_iframe = _mapurl + "&btn=off&mscroll=&showmark=1&timestamp="+new Date().getTime();
    var _mapurl_daohan = _mapurl + "&btn=on";
    $(_htmlid).attr("src", _mapurl_iframe);
}
//提交留言
function Fun_SubFeed(_mothed, _user, _tel, _addr, _fw, _prod, _shoplist_reg, _Mark, _gurl, _host, _lang, _shop_listname) {
    //大数据提交
    $.ajax({
        type: "POST",
        url: "../../../api/web/www.ashx.htm"/*tpa=http://www.rabbitexpress.cn/api/web/www.ashx*/,
        traditional: true,
        dataType: "json",
        data: {
            want: _mothed,
            user: _user,
            tel: _tel,
            addr: _addr,
            fw: _fw,
            prod: _prod,
            cart: _shoplist_reg,
            mark: _Mark,
            gurl: _gurl,
            domain: _host,
            lang: _lang,
            timestamp: new Date().getTime()
        },
        async: false,
        success: function (data) {
            var err = data.errcode;
            switch (err) {
                case "0":
                    //清除数据
                    try { localStorage.removeItem(_shop_listname); } catch (err) { };
                    $.Zebra_Dialog('成功提交,请等待公司相关人员的进一步核实！<br/>感谢您的支持...', {
                        'title': '提示',
                        'buttons': [
                                    { caption: '返回首页', callback: function () { location.href = "../../../index.htm"/*tpa=http://www.rabbitexpress.cn/*/; } }]
                    });
                    break;
                default: alert(data.desp); break;
            }
        },
        error: function () {

        }
    });
}
function Fun_Nav(w_w, _b_device) {
    //nav_Bar
    $("#menu_warp").removeAttr("style");
    $(".btn-nav").removeClass("animated");
    $(".btn-nav").toggle(function () {
        $(this).addClass("animated");
        $("#menu_warp").slideDown();
    }, function () {
        $(this).removeClass("animated");
        $("#menu_warp").slideUp();
    });
    //nav
    if (w_w < 1280) {
        //wap
        //$(".navBar ul li h3 a").after("<i>&gt;</i>");
        //$(".navBar ul li h3").eq(0).find("i").remove();
        $(".navBar ul li").each(function (_ind) {
            var _chkul = $(this).find("ul").length;
            if (_chkul > 0) {
                $(".navBar ul li").eq(_ind).find("a").eq(0).after("<i>&gt;</i>");
            }
        });
        $(".navBar ul li ul li").each(function (_ind) {
            var _chkul = $(this).find("ul").length;
            if (_chkul > 0) {
                $(".navBar ul li ul li").eq(_ind).find("a").eq(0).after("<i>&gt;</i>");
            }
        });
        $(".navBar ul li").each(function (_ind) {
            $(this).toggle(function () {
                $(this).find("i").eq(0).toggleClass("rote", true);
                $(this).find("ul").slideDown();
                $(this).find("a").click(function () {
                    var _url = $(this).attr("href");
                    location.href = _url;
                });
            },
            function () {
                $(this).find("ul").slideToggle();
                $(this).find("i").toggleClass("rote", false);
            });
        });
    }
    else {
        //$("#menu_warp").fadeIn();
        //$(".navBar_move").slideUp();
        $(".navBar ul li s").addClass("iconfont icon-arrow-down");
        //移除移动端右侧箭头指示
        $(".navBar ul li").each(function (_ind) {
            var _chkul = $(this).find("ul").length;
            if (_chkul > 0) {
                $(".navBar ul li").eq(_ind).find("h3").find("i").remove();
            }
        });
        //www
        $(".navBar ul li.m").each(function (_ind) {
            $(this).hover(function () {
                $(this).find("ul").slideDown();
            }, function () {
                $(this).find("ul").slideUp();
            });
        });
    }

    //导航当前效果
    if (_b_device == "www") {
        var _hostnameurl = window.location.protocol + "//" + window.location.hostname;
        $(".navBar h3 a").each(function (index) {
            var url = $(this).attr("href");
            if (_page_url.indexOf(url) > 0 && index != 0) {
                $(this).parents("h3").addClass("cur");
            }
            //var _purl = _page_url.indexOf("/cn/");
            //var _ckpurl = _page_url.substring(_purl);//截取定位最后的长度
            //if (_ckpurl == "/cn/" || _ckpurl == "/en/" || _ckpurl == "/html/" || _ckpurl == "") {
            //    //首页选中效果
            //    $(".navBar ul li h3").eq(0).addClass("cur");
            //}
        });
    }
}$(function () {
    //公用头部脚本，判断元素是否存在
    $.fn.exist = function () {
        if ($(this).length >= 1) {
            return true;
        }
        return false;
    };
    $.fn.Disboot = function () {
        //var wh = $(window).height(),//是文档窗口高度
            ot = $(this).offset().top,//是标签距离顶部高度
            ds =  $(document.documentElement).scrollTop();//是滚动条高度// ds = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; 
            icoimg_h = $(this).height();//是标签高度
            // bh+$("div").height()+[$("div").offset().top-$(document).scrollTop()]=$(window).height();
            bh = w_h - icoimg_h - [ot - ds];
            console.log(ot, ds, icoimg_h, bh);
            var _dis = icoimg_h + bh;
            console.log(_dis);
    };    
    //scroll effc
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0&&_b_device=="wap") {
            $("#head_warp").addClass("fixtop");
            
        } else {
            $("#head_warp").removeClass("fixtop");            
        }
    });
    //nav
    Fun_Nav(w_w, _b_device);
    //当窗口发生改变时banner变化
    $(window).resize(function () {
        w_w = $(window).width();//重置w_w
        Fun_Nav(w_w, _b_device);
        //if (w_w > 1200) {
        //    $("#menu_warp").fadeIn();
        //}
    });
    //feedback select type
    $(".step2 a").click(function () {
        $(".step2 a").removeClass("hover")
        $(this).addClass("hover");
        var v = $(this).attr("title");
        $(".step2 input#post_service").attr("value", v);
        return false;
    });
    //footmsg    
    $(".js_foot_msg").click(function () {
        var UserName = $("#foot_name").attr("value");
        if (UserName.indexOf(" ") >= 0) { alert('姓名中不能包含空格'); $("#foot_name").focus(); return false }
        if (UserName == '姓名' || UserName.length == 0) { $("#foot_name").focus(); return false }
        var TelePhone = $("#foot_tel").attr("value");
        if (TelePhone.length == 0) { $("#foot_tel").focus(); return false }
        var _Mark = $("#foot_msg").attr("value");
        if (_Mark.length == 0) { $("#foot_msg").focus(); return false }        
        var _code = $("#foot_chkcode").attr("value");
        if (_code.length == 0)
        {
            $("#foot_chkcode").focus(); return false
        }
        else
        {
            var _code_comp = $.cookie("CheckCode");
            if (_code == _code_comp) {
                var _Fw = "在线留言";
                var _prod = "";
                var _prov = "";
                var _city = "";
                var _area = "";
                var _shoplist_reg = "";
                var _timestamp = new Date().getTime();
                var _addr = "";
                var _host = location.hostname;
                var _lang = "cn";
                var _gurl = escape(_page_url);
                Fun_SubFeed("sub_feedback_online", UserName, TelePhone, _addr, _Fw, _prod, _shoplist_reg, _Mark, _gurl, _host, _lang, _shop_listname);                
            }
            else
            {
                alert('验证码输入错误！');
                $("#foot_chkcode").focus(); return false
            }
        }
    });
    //feedback    
    $("#submit_feedback").click(function () {
        var UserName = $("#post_name").attr("value");
        if (UserName.indexOf(" ") >= 0) {alert('姓名中不能包含空格');$("#post_name").focus();return false }
        if (UserName == '您的姓名' || UserName.length == 0) {$("#post_name").focus();return false }        
        var TelePhone = $("#post_tel").attr("value");
        if (TelePhone.length == 0) { $("#post_tel").focus(); return false }
        var _company = $("#post_company").attr("value");
        if (_company.length == 0) { $("#post_company").focus(); return false; }
        var _addr = "";
        //var _addr = $("#post_web").attr("value");
        //if (_addr.length == 0) { $("#post_web").focus(); return false; }
        //_addr = _addr+"("+_company+")";
        var _Fw = $("#post_service").attr("value");
        var _Mark = $("#post_message").attr("value");
        var _prod = $("#post_prod").attr("value");
        //var _prov = $("#province").find("option:selected").text();
        //var _city = $("#city").find("option:selected").text();
        //var _area = $("#area").find("option:selected").text();
        var _shoplist_reg = "";
        try {
            _shoplist_reg = localStorage.getItem(_shop_listname);
            //_shoplist_reg = JSON.stringify(_shoplist_reg);
        }
        catch (err) { }
        var _timestamp=new Date().getTime();
        //if (_prov == "请选择" || _city == "请选择") { alert("请选择区域");return false;}

        //else {
        //    _addr = _area == "请选择" ? _prov + _city + _addr : _prov + _city + _area + _addr;
        //}
        var _host = location.hostname;
        var _lang = _page_lang;
        var _gurl = escape(_page_url);
        Fun_SubFeed("sub_feedback_online", UserName, TelePhone, _addr, _Fw, _prod, _shoplist_reg, _Mark, _gurl, _host, _lang, _shop_listname);
    });
    //foot mobile link
    $("ul.ulicon li a").each(function (index) {
        //$("#content>div:eq("+index+")").addClass("consh");
        $(this).mouseover(function () {
            var get_opt = $(this).attr("rel");
            var sho_div = ".div_" + get_opt;
            $(sho_div).removeClass("none");
            $(sho_div).animate({ "top": "0px" }, 400);
        }).mouseout(function () {
            var get_opt = $(this).attr("rel");
            var sho_div = ".div_" + get_opt;
            $(sho_div).animate({ "top": "40px" }, 400);
            $(sho_div).addClass("none");
        });
    });
    //调整字体大小
    $("#contenttools a").click(function () {
        var cssFontSize = $(".helptxt").css("font-size"); //获取字体大小  
        var fontSize = parseFloat(cssFontSize); //获取字体大小的值
        var unit = cssFontSize.slice(-2);   //获取字体大小的单位  
        var className = $(this).attr("class");
        switch (className)
        {
            case "tlarger":if (fontSize <= 22) {fontSize += 2;}break;//放大
            case "tsmaller":if (fontSize >= 14 ) {fontSize -= 2;}break;//缩小
        }
        var fontLineHeight = fontSize * 2.5;
        $(".helptxt").css({ "font-size": fontSize + unit, "line-hight": fontLineHeight + unit });
    });
    /*喜欢或不喜欢*/
    $(".article_icon a").click(function () {
        var _class = $(this).attr("class");
        var _aid = $(this).attr("data-aid");
        var _want = "dofav";
        var _want_todo = null;
        var _want_text = null;
        switch (_class)
        {
            case "icon_hits":_want_todo = "hits";_want_text = "";break;
            case "icon_favs":_want_todo = "fav";_want_text = "赞";break;
            case "icon_unfavs":_want_todo = "unfav";_want_text = "踩";break;
        }
        if (_aid.length > 0)
        {
            $.getJSON("../../../api/web/www.ashx.htm"/*tpa=http://www.rabbitexpress.cn/api/web/www.ashx*/, { want: _want, todo: _want_todo, id: _aid }, function (json) {
                var _ret = json.desp;
                $(".article_icon a").each(function () {
                    var _class_comp = $(this).attr("class");
                    if (_class_comp == _class) {
                        $(this).html(_want_text + _ret);
                        $(this).attr("data-aid","");//设为空禁止再次请求
                    }
                });
            });
        }
    });
    /*header search*/
    $("#header_srh,.header_srh").toggle(function () { $(this).fadeOut(); $("#header_srh_wrap").slideDown() }, function () { $(this).fadeIn(); $("#header_srh_wrap").slideUp() });
    //$("#header_srh,.header_srh").toggle(function () { $("#header_srh_wrap").addClass("header_srh_wrap_show"); }, function () { $("#header_srh_wrap").removeClass("header_srh_wrap_show") });
    
    $(".srh_wrap_close").click(function () {
        $("#header_srh,.header_srh").fadeIn();
        //$("#header_srh_wrap").removeClass("header_srh_wrap_show");
        var _val = $("#srh_wrap_input").val();
        if (_val.length > 0) {
            $("#srh_wrap_input").val('');
            $(".srh_retlist").html('').slideUp();
        }
        else {
            $("#header_srh_wrap").slideUp();
        }
    });
    var arr_kw = srh_historyrest(_page_lang);//历史绑定      
    $("#srh_wrap_input").change(function () {
        var _val = $(this).val();
        if (_val.length > 0) {
            var _chkkw = $.inArray(_val, arr_kw);
            if (_chkkw <= -1) {
                arr_kw.push(_val);
            }
            $.cookie('localkw', escape(arr_kw), { expires: 7 });
            srh_historyrest(_page_lang);//重构搜索历史
            ////执行搜索
            $.getJSON("../../../api/web/www.ashx.htm"/*tpa=http://www.rabbitexpress.cn/api/web/www.ashx*/, { want: "get_keylist", kw: _val }, function (json) {
                //加载中关闭 写入数据        
                var _t1 = '<div class="showlist" data-rel="{INDEX}"><a class="ashowlist" href="{URL}" title="{TITLE}">{TITLE}</a></div>'
                var tcount = parseInt(json.length);
                if (tcount > 0) {
                    var _t1_ret = "";
                    for (var i = 0; i < tcount; i++) {
                        _t1_ret += _t1.replace(/{INDEX}/g, i).replace(/{TITLE}/g, json[i].title).replace(/{URL}/g, json[i].url);
                    }
                    $(".srh_retlist").html(_t1_ret).slideDown();
                }
                else {
                    $(".srh_retlist").html("<br/>没有搜索到相关数据....").slideDown();
                }
            });
        }
        else {
            $("#srh_wrap_input").focus();
            return false;
        }
    });
    //清除搜索历史
    $(".srh_history p span").live("click", function () {
        $(".srh_history p").html("<span>清除历史</span>");
        $.removeCookie('localkw');
    });
    //tag search.html
    $("#txt_tag").keypress(function (even) {
        if (even.which == 13) {
            var _key = $("#txt_tag").attr("value");
            if (_key.length > 0) {
                arr_kw.push(_key);
                $.cookie('localkw', escape(arr_kw), { expires: 7 });
                location.href = "../../../tags/index-1.htm"/*tpa=http://www.rabbitexpress.cn/tags/*/ + _key + "/?lang=" + _page_lang;
            }
        }
    });
    $(".btn-tags").live("click",function () {
        var _key = $("#txt_tag").attr("value");
        if (_key.length > 0) {
            arr_kw.push(_key);
            $.cookie('localkw', escape(arr_kw), { expires: 7 });
            location.href ="../../../index.htm"/*tpa=http://www.rabbitexpress.cn/*/+_page_lang+"/tags/" + _key + "/";
        }
    });
})
////////////////////内容页版块/////////////////////////////
/*
bid 模块引用方法名称
hid 模块ID
cid 模块样式引用
*/
var js_loading = "<div class=\"js loading\"></div>";
var spot_id = $("#proddetail").attr("rel");
//内容页—左侧栏目—联系我们|左侧广告图片
function Get_Common_UI_Lcontact(bid, hid, cid, method) {
    $.ajax({
        type: "POST",
        cache: false,
        async: false,
        url: "/api/web/www.ashx?want=get_common_ui&block=" + bid + "&htmid=" + hid + "&cssid=" + cid,
        success: function (html) {
            var str = html.split('|');
            var htmlid = "#" + str[0];
            var chkobj = $(htmlid).exist();
            if (chkobj) {
                switch (method) {
                    case "append": $(htmlid).append(str[1]); break;
                    case "html": $(htmlid).html(str[1]); break;
                    case "after": $(htmlid).after(str[1]); break;
                }
            }
        }
    });
}
function srh_historyrest(_page_lang) {
    if ($.cookie('localkw') != undefined) {
        var _localkw = unescape($.cookie('localkw'));
        var arr_kw = _localkw.split(',');
        if (arr_kw.length > 0 && arr_kw != undefined) {
            var _t = '<a href="http://www.rabbitexpress.cn/{SITELANG}/tags/{KWORDS}/">{KWORDS}</a>';
            var _t_ret = "";
            for (var i = 0; i < arr_kw.length; i++) {
                _t_ret += _t.replace(/{KWORDS}/g, arr_kw[i]).replace(/{SITELANG}/g, _page_lang);
            }
            $(".srh_history p").html(_t_ret + "<span>清除历史</span>");
        }
        return arr_kw;
    }
    else {
        return arr_kw = [];
    }
}

//边栏清单展示
function Shoplist_sidedele(_arr_list, _arr_sel_all)
{
    var _local_list = localStorage.getItem(_shop_listname);
    _arr_list = _arr_list.length > 0 ? _arr_list : JSON.parse(_local_list);

    for (var i = 0; i < _arr_sel_all.length; i++) {
        var _shopid = _arr_sel_all[i];
        for (var j = 0; j < _arr_list.length; j++) {
            var _chkid = _arr_list[j].id;
            if (_shopid == _chkid) {
                //删除操作
                console.log(_shopid, _chkid);
                _arr_list.splice(j, 1);
            }
        }
    }
    Shoplist_sideshow(_arr_list, "del");
}

function Shoplist_sideshow(_arr_list, _act_list) {
    var _html = '<li><a href="javascript:;"><input type="checkbox" id="shop_radio{ID}" name="shop_radio" value="{ID}" /><img src="{PIC}" /></a><p><strong>{TITLE}</strong><label><font  class="js_shop_delside" data-id="{ID}">-</font><input type="text" id="sideid{ID}" name="sideid{ID}" value="{NUM}" /><font class="js_shop_subside" data-id="{ID}">+</font></label><i class="js_shop_dellist" data-id="{ID}">×</i></p></li>';
    var _html_shop = "";
    if (_arr_list.length == 0) {
        switch (_act_list) {
            case "del":
                localStorage.removeItem(_shop_listname);
                $(".shoplist b").html("0");
                localStorage.setItem(_shop_listname, JSON.stringify(_arr_list));
                break;
            case "bind":
                //尝试本地获取
                try{
                    var _local_list = localStorage.getItem(_shop_listname);
                    _arr_list = _arr_list.length > 0 ? _arr_list : JSON.parse(_local_list);
                    $(".shoplist b").html(_arr_list.length);
                }
                catch(err){ }                          
                localStorage.setItem(_shop_listname, JSON.stringify(_arr_list));                
                break;
            default:
                //显示并保存
                localStorage.removeItem(_shop_listname);
                $(".shoplist b").html(_arr_list.length);
                var _arr_list2 = _arr_list;
                localStorage.setItem(_shop_listname, JSON.stringify(_arr_list2));
                break;
        }
        //return false;
    }
    var _local_list = localStorage.getItem(_shop_listname);
        _arr_list = _arr_list!=null? _arr_list : JSON.parse(_local_list);
    if (_arr_list == []||_arr_list==null) {
        $(".shoplist b").html("0");
        if (checkMobile()) {
            $(".wb_shop_a font").html("0");
        }
        _arr_list = [];
        localStorage.setItem(_shop_listname, JSON.stringify(_arr_list));
    }
    else
    {
        console.log(_arr_list);
        if (_arr_list.length > 0) {
            for (var i = 0; i < _arr_list.length; i++) {
                var _tit = _arr_list[i].title;
                var _id = _arr_list[i].id;
                var _num = _arr_list[i].num;
                var _pic = _arr_list[i].thmurl;
                _html_shop += _html.replace(/{PIC}/g, _pic).replace(/{ID}/g, _id).replace(/{TITLE}/g, _tit).replace(/{NUM}/g, _num)
            }
        }
        $(".siderlist ul").html(_html_shop);
        $(".shoplist b").html(_arr_list.length);
        if (checkMobile()) {
            $(".wb_shop_a font").html(_arr_list.length);
        }
        //显示并保存
        localStorage.removeItem(_shop_listname);
        $(".shoplist b").html(_arr_list.length);
        var _arr_list2 = _arr_list;
        localStorage.setItem(_shop_listname, JSON.stringify(_arr_list2));
    }
}