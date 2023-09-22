$(function () {
    //baidu tongji
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "../../../../hm.baidu.com/hm.js-524412c784ccc71efe2c04bd52e42d46"/*tpa=https://hm.baidu.com/hm.js?524412c784ccc71efe2c04bd52e42d46*/;
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
    })();
    //leftmenu  扩展
    $('#jj_left_menu .box_02 ul li[data-type="contmenu"]').each(function (_ind) {
        var _chkul = $(this).find("ul").text();
        if (_chkul.length > 0) {
            $(this).append("<i class=\"close\">+</i>");
            $(this).find("ul").addClass("uhide");
        }
    });

    $("#jj_left_menu .box_02 ul li i.close").each(function (_ind) {
        $(this).toggle(function () {
            $(this).parent().find("ul").removeClass("uhide").addClass("ushow");
            $(this).removeClass("close").addClass("open").html("-");
        }, function () {
            $(this).parent().find("ul").removeClass("ushow").addClass("uhide");
            $(this).removeClass("open").addClass("close").html("+");
        });
    });
    //禁止复制
    //document.oncontextmenu = new Function("event.returnValue=false");
    //document.onselectstart = new Function("event.returnValue=false");
    //时间格式化
    Time_fmart();
    //wow
    new WOW().init({});
    //news
    $(".showbox303021").each(function (_ind) {
        var _imgbg = $(this).eq(_ind).attr("data-thmurl");
        if (_imgbg != undefined) {            
            var _imgbg_css = "url(" + _imgbg + ") no-repeat center center 100% 100%";
            //console.log(_imgbg_css);
            $(".showbox303021").eq(_ind).css({ "background": _imgbg_css });
        }
    });
    $(".showbox30403 img").each(function (_ind) {
        var _imgurl = $(this).attr("src");
        console.log(_imgurl);
        if (_imgurl.indexOf("nopic")>0) {
            $(".showbox30403 .showbox_pic").eq(_ind).css({"display":"none"});
            $(".showbox30403 .showbox_tit").eq(_ind).css({"width":"82.5%","padding-left":"0","float":"left"});            
        }
    });
    //案例展示
    $(".defwork_parm").each(function (_ind) {
        var _parmtxt = $(this).text();
        //var _kehu = $(this).find(".parameter_con").eq(0).text();
        var _item = $(this).find(".parameter_con").eq(1).text();
        //if (_kehu.length == 0) { _kehu = "融邦品牌创意"; }
        if (_item.length == 0) { _item = "待更新..."; }
        $(".showbox303032 .showbox_tit p span").eq(_ind).html(_item);            
    });
    //下载中心
    $(".down_con").click(function () {
        var _durl = $(this).attr("data-url");
        window.open(_durl, "_blank");
    });
    /*品牌客户*/
    var _num_team = _b_device == "www" ? 6 : 3;
    var swiper_team = new Swiper('.defteam_wrap', {
        slidesPerView: _num_team,
        slidesPerGroup: _num_team,
        spaceBetween: 1,
        slidesPerColumn: 3,
        //resizeReInit: true,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 6,
                slidesPerGroup: 6,
                slidesPerColumn: 3,
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
    });
    /*showlist_index_con*/
    $(".showlist_index_con").each(function () {
        var _valhtml = $(this).text().trim();        
        if (_valhtml =="")
        {
            $(this).parents("ul").remove();
        }
    });
    //parameter
    var _parmlilng = 0;
    try
    {
        _parmlilng=$(".parameter_ul li").length;
        if(_parmlilng>8)
        {
            $(".parameter_ul li").addClass("on");
        }
    }
    catch
    {

    }
    $(".parameter_ul li").each(function (_ind) {
        var _partli = $(this).height();
        console.log(_partli);
        //$(this).find("span").attr( "height", _partli );
    });
    /*edm*/
    $(".js_letter").click(function () {
        var _mail = $("input[type='email']").attr("value");
        if (_mail.length <= 0) {
            $("input[type='email']").focus();
            return false;
        }
        else {
            if (NotEmail(_mail)) {
                $("input[type='email']").focus();
                return false;
            }
            else {
                var _domain = location.hostname;
                var _lang = "cn";
                $.getJSON("../../../api/web/www.ashx.htm"/*tpa=http://www.rabbitexpress.cn/api/web/www.ashx*/, { want: "sub_letter", email: _mail, domain: _domain, lang: _lang }, function (json) {
                    if (json.err == "0") {
                        alert(json.dsp);
                    }
                });
            }
        }
    });
    //search.html
    $("#txt_tag").keypress(function (even) {
        if (even.which == 13) {
            var _key = $("#txt_tag").attr("value");
            if (_key.length > 0) {
                location.href = "../../../index.htm"/*tpa=http://www.rabbitexpress.cn/*/ + _page_lang + "/tags/" + _key + "/";
            }
        }
    });
    $(".btn-tags").click(function () {
        var _key = $("#txt_tag").attr("value");
        if (_key.length > 0) {
            location.href = "../../../index.htm"/*tpa=http://www.rabbitexpress.cn/*/ + _page_lang + "/tags/" + _key + "/";
        }
    });
    $(".submitst").click(function(){
        var _key = $(".searchst").attr("value");
        if (_key.length == 0) {
            $(".searchst").focus();
            return false;           
        }
        location.href = "../../../index.htm"/*tpa=http://www.rabbitexpress.cn/*/ + _page_lang + "/tags/" + _key + "/";
    });
    //辅助筛选
    var _filterarr = [];
    try {
        var _spam = getQueryString("spam");
        var _spamarr = JSON.parse(_spam);
        _filterarr = _spam.length > 0 ? _spamarr : [];
    } catch (e) {

    }
    $(".page_filter .list li a").each(function (_ind) {
        //绑定
        var _type = $(this).attr("data-type");
        var _val = $(this).attr("data-value");
        for (var i = 0; i < _filterarr.length; i++) {
            var q_name = _filterarr[i].name;
            var q_value = _filterarr[i].value;
            if (q_name == _type && _val == q_value) {
                $(this).parent().parent().find("li").eq(0).removeClass("cur");
                $(this).parent().addClass("cur");
            }
        }
        //点击
        $(this).click(function () {
            $("http://www.rabbitexpress.cn/template/MB1014/js/.page_filter .list").each(function (_ind1) {
                var _type_comp = $("http://www.rabbitexpress.cn/template/MB1014/js/.page_filter .list").eq(_ind1).attr("data-type");
                if (_type_comp == _type) {
                    $("http://www.rabbitexpress.cn/template/MB1014/js/.page_filter .list").eq(_ind1).find("li").removeClass("cur");

                }
            });
            $(this).parent().addClass("cur");
            var _putinstr = { "name": _type, "value": _val };
            var _chkindex = JSON.stringify(_filterarr).indexOf(_type);
            if (_chkindex <= 0) {
                _filterarr.push(_putinstr);
            }
            else {
                for (var i = 0; i < _filterarr.length; i++) {
                    var _comp = _filterarr[i].name
                    if (_type == _comp) {
                        _putinstr = { "name": _type, "value": _val };
                        if (_val == "all") {
                            //全部则移除删除
                            _filterarr.splice(i, 1);
                        }
                        else {
                            //不同则替换
                            _filterarr.splice(i, 1, _putinstr);
                        }
                    }
                }
            }
            //重构参数传递
            var _qwords = "";
            var _pageurl = "";
            var _querystr = [];
            for (var i = 0; i < _filterarr.length; i++) {
                var _querytmp = { "name": escape(_filterarr[i].name), "value": escape(_filterarr[i].value) };
                _querystr.push(_querytmp);
            }
            _pageurl = _pageurl + "?spam=" + JSON.stringify(_querystr);
            location.href = _pageurl;
        });
    });

   Cut_showboxp("mould30201");
   /*内容列表页*加载更多*/
   var _AID = $(".waterfall-wrap a");
       _AID.on("click",function(){
        $(".waterfall-loading").fadeIn();
        //get_newspage&total=15&cur=1&catalogue=zucheanli&en=jssp&pno=15&kw=
        var _catalogue = _AID.attr("data-catalogue");
        var _en = _AID.attr("data-en");
        var _total = _AID.attr("data-totalpage");
        var _cur = _AID.attr("data-curpage");
        var _pgsize = _AID.attr("data-pagesize");
        var _pgkw = _AID.attr("data-kw").trim();
        var _cut = parseInt(_AID.attr("data-cutlng"));
        //var _templates = _AID.attr("data-mouldhtml");
        var _templates =unescape($(".waterfall-template").html());
        var _templates_ret = "";
        var i_total = parseInt(_total);
        var i_cur = parseInt(_cur);
        if (i_cur <= i_total - 1) {
            i_cur = i_cur + 1;
            _en = _en == "default" ? "def" : _en
            $.getJSON("../../../api/web/www.ashx.htm"/*tpa=http://www.rabbitexpress.cn/api/web/www.ashx*/, { want: "get_newspage", catalogue: _catalogue, en: _en, total: _total, cur: i_cur, pno: _pgsize, kw: _pgkw }, function (json) {

                var tcount = parseInt(json.newslist.length);
                for (var i = 0; i < tcount; i++) {
                    var _ind = i_cur * parseInt(_pgsize) + i;
                    if (_pgkw.length > 0)
                    {
                        json.newslist[i].thmurl = "<img src=\""+json.newslist[i].thmurl+"\" />";
                    }
                    var _cont = json.newslist[i].content;
                    _cont = _cut < _cont.length && _cut > 0 ? _cont.substring(0, _cut - 1) : _cont;
                    _templates_ret += _templates.replace(/{{MOULDID}}/g, json.moulid_id).replace(/{{INDEX}}/g, _ind).replace(/{{URL}}/g, json.newslist[i].url).replace(/{{TITLE}}/g, json.newslist[i].title).replace(/{{THMURL}}/g, json.newslist[i].thmurl).replace(/{{PUBDATE}}/g, json.newslist[i].pubdate).replace(/{{TYPENAME}}/g, json.newslist[i].typename).replace(/{{PRICE_PT}}/g, json.newslist[i].price_pt).replace(/{{PRICE_YH}}/g, json.newslist[i].price_yh).replace(/{{PRICE_PT}}/g, json.newslist[i].price_pt).replace(/{{HITS}}/g, json.newslist[i].hits).replace(/{{TAGS}}/g, json.newslist[i].tags).replace(/{{VIDEO_TIMES}}/g, json.newslist[i].vtime).replace(/{{PICURL}}/g, json.newslist[i].picurl).replace(/{{PRODVIEW_DIYPARM}}/g, json.newslist[i].parameter).replace(/{{CONTENT}}/g, _cont) + "\n";
                }
                $(".waterfall-loading").fadeOut();
                /*tags*/
                if ($(".panel_tags_bytag").exist()) {
                    $(".panel_tags_bytag ul li:last").after(_templates_ret);
                }
                else
                {
                    /*page*/
                    $("#jj_right_con div.pagemould").eq(0).append(_templates_ret);
                }                
                _AID.attr("data-curpage", i_cur);
                if (i_cur == i_total)
                {
                    _AID.addClass("waterfall-end").text("THE END").fadeOut();
                }
                //裁剪
                //Cut_showboxp("mould30201");
            });
        }
    });
    //构建title
    var _gettit = $(".breadcrumb a:last-child").text();
    //if (!$(".page_index_list").exist()) {
    //    $("h4.tit_detail").eq(0).html("<small>" + _gettit + "</small>");
    //}
    //if (_page_url.indexOf('http://www.rabbitexpress.cn/template/MB1014/js/address.html') <= 0 && _page_url.indexOf('http://www.rabbitexpress.cn/template/MB1014/js/feedback.html') <= 0 && checkMobile() == false) {
    //    $("#jj_right_con").before("<h1 class=\"bulid_title\"><i></i>" + _gettit + "</h1>");
    //}
    var _slinkwd = $(".slink").width();
    //timespan
    if ($("#console").exist()) {console.log($("#console").html());}
    //article type
    $(".helptag span:first-child").click(function () {var _url = $(this).attr("data-url");location.href = _url;});
    //自定义复选
    $(".trdcon").each(function (_index) {
        $(".trdcon span").eq(_index).toggle(function () {
            $(this).html("-");
            $(this).addClass("on");
            $(".thrdmenu tr td.trdcon").eq(_index).css({ "height": "auto" });
        }, function () {
            $(this).html("+");
            $(this).removeClass("on");
            $(".thrdmenu tr td.trdcon").eq(_index).css({ "height": "30px" });
        });
    });
    if (!$(".thrdmenu").exist()) {
        $("#html_keyword").css({ "margin": "2.5% 0 2.5% 0" });
    }
    //招聘
    $("http://www.rabbitexpress.cn/template/MB1014/js/dl.zpbox dt .opt").addClass("icon-arrow-down");
    $("dl.zpbox").each(function (_ind) {
        //if (_ind == 0)
        //{
        //    $("dl.zpbox").eq(_ind).find("dt").removeClass("icoDown");
        //    $("dl.zpbox").eq(_ind).find("dt").addClass("icoUp");
        //    $("dl.zpbox").eq(_ind).find("dd").slideDown();
        //}
        $(this).click(function () {
            $("http://www.rabbitexpress.cn/template/MB1014/js/dl.zpbox dt .opt").removeClass("icon-arrow-up").removeClass("icon-arrow-down");
            $("http://www.rabbitexpress.cn/template/MB1014/js/dl.zpbox dt .opt").addClass("icon-arrow-down");
            $("dl.zpbox dd").slideUp()
            $("dl.zpbox").eq(_ind).find("dt").find(".opt").removeClass("icon-arrow-down").addClass("icon-arrow-up");
            $("dl.zpbox").eq(_ind).find("dd").slideDown();
        });
    });
    ////内容图片强制比例恢复原始处理
    if ($("#article_detail").exist()) {if ($("#article_detail img").attr("width") != "undefined") {$("#article_detail img").removeAttr("style").removeAttr("width").removeAttr("height");}}
    //流程图
    $(".process-box").each(function (_ind) {
        var _md_ind = _ind + 1;
        var _modin = _md_ind % 2;
        //$(this).find(".process-bar").html(_md_ind);
        switch (_modin)
        {
            case 1:$(this).addClass("pfl");break;
            default:$(this).addClass("pfr");break;
        }
    });
    //加入清单    
    //addnum
    $(".js_shop_sub").live("click", function () {
        var _shopid = $(this).attr("data-id");
        var _shopid_input = "#shopnum" + _shopid;
        var _shopid_num = parseInt($(_shopid_input).attr("value"));
        _shopid_num++;
        $(_shopid_input).attr("value", _shopid_num);
    });
    ////delnum
    $(".js_shop_del").live("click", function () {
        var _shopid = $(this).attr("data-id");
        var _shopid_input = "#shopnum" + _shopid;
        var _shopid_num = parseInt($(_shopid_input).attr("value"));
        if (_shopid_num >= 2)
        {
            _shopid_num--;            
        }
        $(_shopid_input).attr("value", _shopid_num);
    });
    //add list
    //var _arr_list = [];
    $(".js_shop_list").on("click", function () {        
        try {
            var g_local_list = localStorage.getItem(_shop_listname);
            var g_jsonshop = JSON.parse(g_local_list);
            _arr_list = g_jsonshop;
        }catch(err){}
        var _shopid = $(this).attr("data-id");
        var _shopid_input = "#shopnum" + _shopid;
        var _shopid_num = parseInt($(_shopid_input).attr("value"));
        var _shopid_title = $(this).attr("data-tit");;
        var _shopid_thmurl = $(this).attr("data-img");
        var _obj=new Object();
        _obj = { id: _shopid, num: _shopid_num, title: _shopid_title, thmurl: _shopid_thmurl };
        if (_arr_list!=[])
        {
            var _checkin = 0;
            //先检查当中是否存在ID
            for (var i = 0; i < _arr_list.length; i++)
            {
                if (_arr_list[i].id == parseInt(_shopid))
                {
                    var _newnum = _shopid_num + _arr_list[i].num;
                    _obj = { id: _shopid, num: _newnum, title: _shopid_title, thmurl: _shopid_thmurl };
                    _arr_list.splice(i, 1, _obj);//删除并插入新的数组     
                    _checkin = 1;
                }                
            }
            if (_checkin == 0)
            {
               _arr_list.push(_obj);
            }
        }
        else
        {
            _arr_list.push(_obj);
        }
        Shoplist_sideshow(_arr_list,"add");
    });

    //客户订购
    $(".btn_orderask").click(function () {
        //var _pid = $(this).attr("data-pid");
        //var _url = "/html/feedback/?id=" + _pid;
        location.href = "tel:15000666432";
    });
    //详情table选项卡效果
    $(".prod_tit span").eq(0).addClass("cur");
    $(".prod_txt").eq(0).addClass("cur");
    $(".prod_tit span").each(function (_ind) {
        $(this).click(function () {
            var _en = $(this).attr("data-en");
            switch (_en)
            {
                case "zn":
                    $.getJSON("../../../api/web/www.ashx.htm"/*tpa=http://www.rabbitexpress.cn/api/web/www.ashx*/, { want: "get_proddetail", en: _en }, function (json) {
                        var tcount = parseInt(json.length);
                        if (tcount > 0) {
                            for (var i = 0; i < tcount; i++) {
                                $(".prod_txt").eq(_ind).html(json[i].content);
                            }
                        }
                        else {
                            $(".prod_txt").eq(_ind).html('敬请期待，此栏目正在进行建设中....');
                        }
                    });
                    break;
                case "faq":
                    default:
                    $.getJSON("../../../api/web/www.ashx.htm"/*tpa=http://www.rabbitexpress.cn/api/web/www.ashx*/, { want: "get_proddetail", en: _en,istop:"0" }, function (json) {
                        var tcount = parseInt(json.length);
                        var _html = "<dl><dt>{TITLE}</dt><dd>{CONTENT}</dd></dl>";
                        var _html_out = "";
                        if (tcount > 0) {
                            for (var i = 0; i < tcount; i++) {
                                var _tit = json[i].title;
                                var _con = json[i].content;
                                _html_out += _html.replace(/{TITLE}/g, _tit).replace(/{CONTENT}/g, _con);                                
                            }
                            $(".prod_txt").eq(_ind).html(_html_out);
                            //填充后点击阅读
                            $(".prod_txt dl dt").each(function (_index) {                                
                                $(this).toggle(function () {
                                    $(".prod_txt dl dd").slideUp();
                                    $(".prod_txt dl dd").eq(_index).slideDown();
                                }, function () {
                                    $(".prod_txt dl dd").eq(_index).slideUp();
                                });
                            });
                        }
                        else {
                            $(".prod_txt").eq(_ind).html('敬请期待，此栏目正在进行建设中....');
                        }
                    });
                    break;
            }
            $(".prod_tit span").removeClass("cur");
            $(".prod_txt").slideUp();
            $(this).addClass("cur");
            $(".prod_txt").eq(_ind).slideDown();
        });
    });
    //效果跳转
    $("http://www.rabbitexpress.cn/template/MB1014/js/.hover .link").click(function(){
        var _url=$(this).attr("rel");
        location.href=_url;
    });   
    //WAP客户端时生效
    if (_b_device=="wap") {
        $(".wb_catalogue a").toggle(function () {$("#wap_menu").css({ left: "-100%" }).animate({ left: "0" }, 500);}, function () {$("#wap_menu").css({ left: "0" }).animate({ left: "-100%" }, 500);});
        $(".wap_menu_close").click(function () {$("#wap_menu").css({ left: "0" }).animate({ left: "-100%" }, 500);});
        $("#wm_srh").blur(function () {var _wmval = $(this).attr("value");if (_wmval.length == 0) {$(this).focus();return false;}else {location.href = "../../../tags/index-1.htm"/*tpa=http://www.rabbitexpress.cn/tags/*/ + _wmval + "/";}});
    }
    ///页脚WAP菜单
    if (w_w < 1200 || _b_device == "wap") {
        ////面包屑
        //$(".breadcrumb").append("<div class=\"secmenu\">+</div>");
        //$(".secmenu").toggle(function () {
        //    $(this).addClass("ondrp");
        //    $("#jj_left").slideDown();
        //}, function () {
        //    $(this).removeClass("ondrp");
        //    $("#jj_left").slideUp();
        //});
        //页脚菜单
        $(".f_item dt").each(function (index) {
            $(this).toggle(function () {
                var temp_height = ($(this).parents("dl").children().length) * (28+1) + "pt";
                $(this).addClass("on");
                $(this).parents("dl").parents("li").css({ height: "28pt" }).animate({ height: temp_height }, 500);
            }, function () {
                var temp_height = ($(this).parents("dl").children().length) * (28 + 1) + "pt";
                $(this).removeClass("on");
                $(this).parents("dl").parents("li").css({ height: temp_height }).animate({ height: "28pt" }, 500);
            });
        });
    }
    //video
    $(".popvideo").click(function () {
        //var popID = $(this).attr('rel'); //Get Popup Name
        var popURL = $(this).attr('data-src'); //Get Popup href to define size
        var videoID = $(this).attr('title');
        //Pull Query & Variables from href URL
        var query = popURL.split('?');
        var dim = query[1].split('&');
        var popWidth = dim[0].split('=')[1]; //Gets the first query string value
        popWidth = w_w > 1200 ? popWidth : "100%";
        var _title = '<div class=\"popwin video\"><video src="' + popURL.replace(/#/g, '') + '" width="' + popWidth + '" style="margin:0px auto;" controls="controls" autoplay="autoplay"></video></div>';
        $(".popwin").fadeIn();            
        var _zebra_width = parseInt(popWidth) + 30;
        var _zebra_width_wap = parseInt(w_w) * 0.8 + "px";
        _zebra_width = w_w > 1200 ? _zebra_width : _zebra_width_wap;
        $.Zebra_Dialog(_title, { 'type': 'error', width: _zebra_width, 'button': false, 'title': videoID });
        $(".ZebraDialog_ButtonsOuter").css({ "display": "none" });
    });
    var _video = $('.video-js').attr("id", "pvideo");
    $("video").each(function (_ind) {
        var v_h = $(this).attr("height");
        var v_w = $(this).attr("width");
        var v_b = v_w / v_h;
        var s_w = w_w * 0.95;
        var s_h = s_w / v_b;
        //移动端下重置播放器大小
        if (w_w < 1200) {
            $(this).attr("width", s_w).attr("height", s_h).removeAttr("preload");
        }
        else
        {
            $(this).removeAttr("preload");
        }
        $(this).attr("autoplay", "autoplay");
    });

    $(".mould202_00").append("<div class=\"clr\"></div>");

    //移除内容中的视频，重构
    $('#videodetail .video-js').remove();
    $(".vtitle small").toggle(function () {
        $('#videodetail').slideDown();
    }, function () {
        $("#videodetail").slideUp();
    });
    //无链接WAP展示
    //www
    if ($(".mould104").exist() && _b_device == "www")
    {
        //动态加载 CSS 文件
        dynamicLoading.css(_int_path+"css/jquery.lightbox-0.5.css");
        //动态加载 JS 文件
        $.getScript(_int_path+"Js/jquery.lightbox-0.5.js", function () {
            $('http://www.rabbitexpress.cn/template/MB1014/js/.showbox a.pic').lightBox();
        });        
    }
    //wap
    var _viewtemp = "<div class=\"w_mobileview\"><i class=\"wclose\">×</i><div id=\"wslideBox\" class=\"wslideBox\"><div class=\"bd\"><ul>{DATA}</ul></div><div class=\"hd\"><span class=\"prev\">&lt;</span><span class=\"next\">&gt;</span></div></div>";
    $(".mould104").click(function () {
        if (_b_device == "wap")
        {
            $(".mould104").find("a").attr("href", "javascript:;");
            var _pdata = "";
            var _ptitl = "";
            var _phtml = "";
            $(".mould104 img").each(function (_ind) {
                _pheight = w_w * 0.8 * 0.75;
                _pmargin = (w_h - _pheight) / 2;
                _phtml += "<li><a class=\"pic\" href=\"#\"><img style=\"height:" + _pheight + "px;margin-top:" + _pmargin + "px;\" src=\"" + $(this).attr("data-original") + "\" /></a><a class=\"tit\" href=\"#\">" + $(this).attr("alt") + "</a></li>";
            });
            _viewtemp = _viewtemp.replace(/{DATA}/g, _phtml);
            document.body.scrollTop = 0
            $("body").append(_viewtemp);
            $("body").css({ "overflow": "hidden" });
            TouchSlide({ slideCell: "#wslideBox", mainCell: ".bd ul", effect: "leftLoop" });
        }
    });

    $(".wclose").on("click", function () { $(".w_mobileview").remove(); $("body").removeAttr("style"); });
});
//search.html kw replace
function Kw_replace(_kw) {
    $(".panel_tags_bytag ul li a").each(function (_ind) {
        var _tit = $(this).html();
        if (_kw.indexOf(" ") > 0) {
            var _kwarr = _kw.split(' ');
            for (var i = 0; i < _kwarr.length; i++) {
                var reg = new RegExp(_kwarr[i], "g");//g,表示全部替换。
                _tit = _tit.replace(reg, "<font color=\"red\">" + _kwarr[i] + "</font>");
            }
        }
        else {
            var reg = new RegExp(_kw, "g");//g,表示全部替换。
            _tit = _tit.replace(reg, "<font color=\"red\">" + _kw + "</font>");
        }
        $(this).html(_tit);
    });
}
//截取长度裁剪
function Cut_showboxp(_mouldcss)
{
    var _opp_mould = $("." + _mouldcss);
    if (_opp_mould.exist())
    {
        var _opp_mould_p = $("." + _mouldcss + " .showbox p");
        var _cut = checkMobile()==true?50:120;        
        _opp_mould_p.each(function () {
            var _htm = $(this).html();
            var _lng = parseInt(_htm.length);
            if (_lng > _cut) {
                _htm = _htm.substring(0, _cut - 1);
                $(this).html(_htm);
            }
        });
    }
}
//当前菜单JS
var obj = null;
$(function () {
    //breadcrumb
    $(".breadcrumb strong").addClass("iconfont icon-company").html(_bread_txt);
    //box_02--HEN
    //var _left_lng1 = 130 * $(".box_02 ul li").length;
    //var _left_lng2 = 130 * ($(".box_02 ul li:first-child").length - 1);
    //var _left_lng_ck = $(".box_02 ul li").find("ul").length;
    //var _left_lng = _left_lng_ck > 0 ? _left_lng2 : _left_lng1;
    //console.log(_left_lng);
    //$(".box_02").css({ "width": _left_lng, "margin": "0px auto" });
    ////var _left_lng_tit = (_left_lng - 200) < 240 ? 240 : _left_lng;
    //var _left_lng_tit =240;
    //$(".left_title").css({ "width": _left_lng_tit });
    // $(".left_title").html($(".lthis01 a").text()+"<span>"+$(".lthis01 a").attr("data-ten")+"</span>");
    $(".left_title").html($(".breadcrumb a:last-child").text() + "<span>" + $(".breadcrumb a:last-child").attr("data-ten") + "</span>");

    //概述
    $(".project_mark a").click(function () {
        var _rel = $(this).attr("rel");
        switch (_rel) {
            case "1"://收缩
                $(".project_mark").removeClass("project_mark_on").addClass("project_mark_off");
                $(this).attr("rel", "0").removeClass("off");
                break;
            case "0"://展开
                $(".project_mark").removeClass("project_mark_off").addClass("project_mark_on");
                $(this).attr("rel", "1").addClass("off");
                break;
            default://展开
                $(".project_mark").removeClass("project_mark_off").addClass("project_mark_on");
                $(this).attr("rel", "1").addClass("off");
                break;
        }
    });
    //重构上一篇，下一篇
    var _plink_tit = $(".prev_link").attr("title");
    if (_plink_tit == "{{TITLE_PREV}}") {$(".prev_link").parents("li").remove();}
    var _nlink_tit = $(".next_link").attr("title");
    if (_nlink_tit == "{{TITLE_NEXT}}"){$(".next_link").parents("li").remove();}
    //索引页去除相关项
    $(".showlist_index").each(function (_ind) {
        var _ck_nothing = $(".showlist_index").eq(_ind).text();
        if (_ck_nothing.indexOf("nothing") > 0) {
            $(".showlist_index").eq(_ind).fadeOut();
        }
    });
    //城市
    $(".cw_list a").each(function () {
        var _curl = $(this).attr("href");
        if (_page_url.indexOf(_curl) > 0)
        {
            $(this).addClass("cur");
        }
    });
    //用手机查看-仅支持PC端
    if (_b_device=="www") {
        $(".breadcrumb").append("<a class=\"js_see_wap\" href=\"javascript:;\"><span class=\"iconfont icon-QRcode\"></span>用手机查看</a>");
        $(".js_see_wap").toggle(function () {
            var _imgurl = "/common/QrCode.aspx?ptype=DIY&size=220&amp;data=" + _page_url;
            $(this).append("<label><img src=\"" + _imgurl + "\"/></label>");
        }, function () {
            $(this).find("label").remove();
        });
    }
    //网址链接地址
    $(".locationurl").html(_page_url);
    //left_menu
    var _contmenu = $(".box_02 ul").text().trim();
    if (_contmenu.length > 0) {
        $(".box_02 ul li a").each(function (_ind) {
            var las = $(this).attr("href");
            if (_page_url.indexOf(las) >= 0) {
                $(".box_02 ul li").eq(_ind).addClass("lthis01");
            }            
        });
        $(".box_02 ul li.lthis01 ul li.lthis01").parent().removeClass("uhide").addClass("ushow");
    }
    else {
        $(".box_02").remove();
    }
    ////三级菜单定位
    //var _linum = 0;
    //$(".box_02 ul li").each(function (_ind) {
    //    var _menu_type = $(".box_02 ul li").eq(_ind).attr("data-type");        
    //    if (_menu_type == "contmenu") {            
    //        var _pleft = "-" + (_linum * 100).toFixed(2) + "%";
    //        $(".box_02 ul li").eq(_ind).find("ul").css({ "left": _pleft });
    //        _linum++;
    //    }
    //});

});
/*动态加载脚本css or js*/
var dynamicLoading = {
    css: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
}