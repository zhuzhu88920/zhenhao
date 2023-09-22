//Banner_show
function Banner_show(w_w, _scale, _b_device) {
    var _swiper_height = w_w * _scale;
    //defbammer
    $(".Banner-container,#defbanner .swiper-slide").css({ "height": _swiper_height });
    // Init Swiper
    var _effect = _b_device == "www" ? 'slide' : 'fade';
    var _initial = _page_url.indexOf('search') > 0 ? 4 : 0;
    var _autoplay = _page_url.indexOf('search') > 0 ? { delay: 10000, disableOnInteraction: false } : { delay: 5000, disableOnInteraction: false };
    var swiper = new Swiper('#defbanner .swiper-container', {
        effect: _effect,
        parallax: true,
        initialSlide: _initial,
        autoplay: _autoplay,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });    
}
$(function () {
    //defbanner
    //$("#defbanner .swiper-slide a img").eq(0).load(function () {
        var _banner_img_width = $("#defbanner .swiper-slide a img").eq(0).attr("data-width");
        var _banner_img_height = $("#defbanner .swiper-slide a img").eq(0).attr("data-height");
        var _scale = _banner_img_height / _banner_img_width;
        //switch (_b_device) {
        //    case "www": _scale = _banner_img_height / _banner_img_width; break;
        //    default: _scale = 500 / 960; break;
        //}
        Banner_show(w_w, _scale, _b_device);
    //});
    if (_b_device == "www") {
        var _num_news = _b_device == "www" ? 1 : 1;
        var swiper_news = new Swiper('.newsitemwrap', {
            autoplay: true,//等同于以下设置
            slidesPerView: _num_news,
            spaceBetween: 0,
            keyboard: {
                enabled: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        var projectLogo = new Swiper('.certitemwrap', {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20,
            slidesPerColumn: 2,
            resizeReInit: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    slidesPerColumn: 2,
                },
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    slidesPerColumn: 2,
                },
                640: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    slidesPerColumn: 2,
                },
                460: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    slidesPerColumn: 1,
                }
            }
        })
    }

    //in-total
    $(".timer").countTo({
        lastSymbol: "", //显示在最后的字符
        from: 0,  // 开始时的数字
        speed: 2000,  // 总时间
        refreshInterval: 100,  // 刷新一次的时间
        beforeSize: 0, //小数点前最小显示位数，不足的话用0代替 
        decimals: 0,  // 小数点后的位数，小数做四舍五入
        onUpdate: function () {
        },  // 更新时回调函数
        onComplete: function () {
            for (i in arguments) {
                //console.log(arguments[i]);
            }
        }
    });
    //产品或案例展示
    //var _fhtml = "<div class=\"showbox10102\" data-rel=\"{INDEX}\"><div class=\"showbox_pic\"><a class=\"pic\" href=\"{URL}\" title=\"{TITLE}\"><img src=\"{PIC}\" alt=\"{TITLE}\"> <\/a><em>{TYPENAME}<\/em><\/div><div class=\"showbox_tit\"><a href=\"{URL}\"><span class=\"faa\">{TITLE}<\/span>{CONTENT}<\/a><i><\/i><\/div><\/div>\n";
    var _fhtml = "<div class=\"defnew{INDEX} swiper-slide wow zoomIn\"><a class=\"img\" href=\"{URL}\"><img src=\"{PIC}\" alt=\"{TITLE}\"><\/a><p><strong class=\"time_fmart\" data-type=\"pubdate\" data-fmart=\"mm/dd\">{PUBDATE}<\/strong> <span class=\"time\"><a class=\"ltit\"  href=\"{URL}\">{TITLE}<\/a><\/span><\/p><i><\/i><\/div>\n";
    var _pall = $(".defnews_list").html();
    $(".glink").click(function () {
        $(".glink").each(function () { $(this).removeClass("cur"); });
        $(this).addClass("cur");
        //弹出加载中...
        var _type = $(this).attr("rel");
        var _catalogue = $(this).attr("data-catalogue");
        var _gnum = parseInt($(this).attr("data-getnum"));
        var _lang = $(this).attr("data-lang");
        var _cut = $(this).attr("data-cutlng");
        switch (_type) {
            case "def":
                $(".defnews_list").html(_pall);
                Time_fmart();
                break;
            default:
                $.getJSON("../../../api/web/www.ashx.htm"/*tpa=http://www.rabbitexpress.cn/api/web/www.ashx*/, { want: "get_newslist", catalogue: _catalogue, en: _type, num: _gnum, istop: 0, isthm: 0, lang: _lang, cut: _cut }, function (json) {
                    //加载中关闭 写入数据        
                    var catalogu = json.catalogue;
                    var count = json.length;
                    if (count > 0) {
                        var _thtml = "";
                        for (var i = 0; i < count; i++) {
                            _thtml += _fhtml.replace(/{INDEX}/g, json[i].id).replace(/{URL}/g, json[i].url).replace(/{PIC}/g, json[i].thmurl).replace(/{CONTENT}/g, json[i].content).replace(/{TITLE}/g, json[i].title).replace(/{TYPENAME}/g, json[i].typename).replace(/{PUBDATE}/g, json[i].pubdate);
                        }
                        $(".defnews_list").html(_thtml);
                        Time_fmart();
                    }
                    else {
                        $(".defnews_list").html('<pre>There is nothing...</pre>');
                    }
                });
                break;
        }
    });
    var show_h;//banner height
    //当窗口发生改变时banner变化
    $(window).resize(function () {
        w_w = $(window).width();//重置w_w
        _banner_img_width = $("#defbanner .swiper-slide a img").eq(0).attr("data-width");
        _banner_img_height = $("#defbanner .swiper-slide a img").eq(0).attr("data-height");
        _scale = _banner_img_height / _banner_img_width;
        Banner_show(w_w, _scale, _b_device);
    });
    //切换日期
    $("span.month").each(function (_ind) {
        var _mon_arr = ["January", "February", "March ", "April ", "May", "June ", "July", "August", "September", "October", "November", "December"];
        var _mon_no = $(this).text();
        var _mon_i = parseInt(_mon_no) - 1;
        var _mon_en = _mon_arr[_mon_i];
        $(this).html(_mon_en);
    });
    //格式化日期
    Time_fmart();
    //解决方案
    $(".def_bgsoultion .def_bgsoultion_img").css({ "background": "url(" + $(".showbox303031").eq(0).find("img").attr("data-srcurl") + ") no-repeat center center", "background-size": "100% 100%", "top": "0%" });
    $(".def_bgsoultion .showbox303031").each(function (_ind) {
        $(this).hover(function () {
            var _imgurl = $(this).find("img").attr("data-srcurl");
            $(".def_bgsoultion_img").css({ "background": "url(" + _imgurl + ") no-repeat center center", "background-size": "100% 100%", "top": "0%" }).animate({ "top": "0" }, 300);
        });
    });
    //partner
    var _page_tit = "{{TITLE}}";
    /*主打产品*/
    var _num_top = _b_device == "www" ? 4 : 1;
    var swiper_top = new Swiper('.defitemwrap', {
        autoplay: true,//等同于以下设置
        slidesPerView: _num_top,
        spaceBetween: 60,
        keyboard: {
            enabled: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

});