var _winh = $(window).height();
var _winw = $(window).width();
var _pic_yinsu = 0.75;
$(function () {
    Fun_Baoming();
    //prodview
    var pw_w = $(".prod_picshow,.caseview").width();
    var pw_h = pw_w * _pic_yinsu + pw_w / 4 * _pic_yinsu;
    //var pw_h = pw_w * _pic_yinsu ;
    $(".gallery-top").css({ "height": pw_w * _pic_yinsu });
    $(".gallery-thumbs").css({ "height": pw_w / 4 * _pic_yinsu });
    $("#preview").css({ "width": pw_w, "height": pw_h });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        loop: true,
        freeMode: true,
        loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: galleryThumbs,
        },
    });

    //回复
    $(".reply_comment").live("click", function () {
        location.href = "#bbs_pub";
        var _crel = $(this).attr("rel");
        var _lc = $(this).parents("p").find("span.spn_usr").html();
        $("#txt_comid").attr("value", _crel);
        $(".pub_bbs h3.lc_tit").html("回复讨论：" + _lc);
        $(".comtab_rank,.comtab_mail,.comtab_noname").css("display", "none");
        $(".btn_bbs").html("回复讨论");
    });
    $(".com_pic img").each(function () {
        var _imgsrc = $(this).attr("src");
        if (_imgsrc.length == 0) {
            $(this).attr("src", "../../default/images/nousr.jpg"/*tpa=http://www.rabbitexpress.cn/template/default/images/nousr.jpg*/);
        }
    });
    //提交讨论
    $(".btn_bbs").click(function () {
        var struid = $("#txt_usrid").attr("value");
        if (struid.length == 0) {
            new $.Zebra_Dialog('您不是本商品相关购买人员（或未登录）\n禁止在此区参与讨论!', { 'buttons': false, 'auto_close': 2000 });
            return false;            
        }
        var strcont = $("#txt_cont").attr("value");
        if (strcont.length <= 0) {
            $("#txt_cont").focus();
            return false;
        }
        var stremail = $("#txt_email").attr("value");
        if (!NotEmail(stremail)) {
            $("#txt_email").focus();
            new $.Zebra_Dialog('不是有效的E-mail地址!', { 'buttons': false, 'auto_close': 2000 });
            //return false;
        }
        var strusrname = $("#txt_usrname").attr("value");
        if (strusrname.length <= 0) {
            $("#txt_usrname").focus();
            return false;
        }
        var strpid = $("#txt_prodid").attr("value");
        var strpidname = $("#txt_prodname").attr("value");
        var strrank = $("#txt_rank").attr("value");
        if ($("input[type='checkbox']").attr("checked") == true) {
            //匿名
            strusrname = "匿名用户";
        }
        var strcid = $("#txt_comid").attr("value");
        $.getJSON("../../../common/web.ashx.htm"/*tpa=http://www.rabbitexpress.cn/common/web.ashx*/, {want:"add_bbs",uid: struid, uname: strusrname, pid: strpid, pname: strpidname, email: stremail, rank: strrank, cont: strcont,cid:strcid }, function (json) {
            var _err = json.errcode;
            var _dsp = json.desp;
            new $.Zebra_Dialog(_dsp, { 'buttons': false, 'auto_close': 2000 });
        });
    });
});
/**培训报名**/
function Fun_Baoming() {
    var Jusr = ["赵先生", "孙小姐", "林女士", "钱先生", "刘先生", "朱先生", "董先生", "陈先生", "程小姐", "周女士", "杨先生", "熊小姐", "吴先生", "王小姐", "谢先生", "石先生", "段先生", "卞先生", "裴大姐", "郭先生"];
    var Jtim = ["3分钟", "8分钟", "12分钟", "21分钟", "30分钟", "42分钟", "57分钟", "1小时", "1小时10分钟", "2小时", "4小时", "5小时", "6小时", "7小时", "9小时", "14小时", "21小时", "22小时", "1天", "2天", "4天"];
    var _html_scroll = "";
    $.getJSON("../../../api/web/www.ashx.htm"/*tpa=http://www.rabbitexpress.cn/api/web/www.ashx*/, { want: "get_newsrand", catalogue: "pxkc", num: "20" }, function (json) {
        console.log(json);
        for (var i = 0; i < json.length; i++) {
            _html_scroll += "<div class=\"swiper-slide\">" + Jusr[i] + "于" + Jtim[i] + "前提交了【<a target=\"_blank\" href=\"" + json[i].url + "\">" + json[i].title + "</a>】报名.</div>";
        }
        $(".NoticeSwiper .swiper-wrapper").html(_html_scroll);
        var notice_swiper = new Swiper(".NoticeSwiper", {
            //autoplay: true,//等同于以下设置
            autoplay: {
                delay: 1000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            loop: true,
            direction: "vertical",
            slidesPerView: 8,
            spaceBetween: 0,
            mousewheel: true,
        });
    });
}