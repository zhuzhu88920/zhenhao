//腾云建站（www.400301.com）提供技术支持

//设置产品图鼠标点击上去背景变成灰色
$(function ()
{
    $(".img_list_301 ul li").hover(function () { $(this).css({ "background": "#f4f4f4" }) }, function () { $(this).css({ "background": "none" }) })
})

//控制图片显示
$(window).load(function ()
{
    var PCount = 3; //图片每行显示数量

    var NewListwidth = $(".NewList").width();
    $(".NewList").css({ width: NewListwidth + 15 });
    var jianbian = (PCount - 1) * 15 + PCount * 2; //计算去掉的边框
    var neikuan = NewListwidth - jianbian;
    $(".img_list_301 ul li").css({ width: neikuan / PCount });
    $(".img_list_301 ul li").css({ height: neikuan / PCount + 30 });

    var kuangzi = neikuan / PCount;
    $(".show_img").css({ "height": kuangzi });
    var alishow_img = $('.show_img img');
    alishow_img.each(function (index)
    {
        var iwidth = $(this).width();
        var iheight = $(this).height();
        if (iwidth > iheight)
        {
            $(this).css({ "width": kuangzi * 0.92 });
        }
        else
        {
            $(this).css({ "height": kuangzi * 0.92 });
        }
    });

    //控制标题超出部分显示省略号
    $(".show_img_title a").css({ "display": "block", "width": kuangzi - 10, "overflow": "hidden", "white-space": "nowrap", "text-overflow": "ellipsis" });
})