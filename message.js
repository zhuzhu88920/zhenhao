//检验提交数据格式合法性
function checkNull() {
    var code = document.getElementById("txtCode").value;
    var title = document.getElementById("txtTitle").value;
    var realname = document.getElementById("txtRealname").value;
    var phone = document.getElementById("txtPhone").value;
    var email = document.getElementById("txtEmail").value;
    var content = document.getElementById("txtContent").value;
    if (title == "") { alert("请输入咨询主题！"); document.getElementById("txtTitle").focus(); return false; }
    if (realname == "") { alert("请输入姓名！"); document.getElementById("txtRealname").focus(); return false; }
    if (phone == "") { alert("请输入手机号码！"); document.getElementById("txtPhone").focus(); return false; }
    else if (!(/^13\d{9}$/g.test(phone)) && !(/^15\d{9}$/g.test(phone)) && !(/^18\d{9}$/g.test(phone)))
    { alert("手机号码格式不对！"); document.getElementById("txtPhone").focus(); return false; }
    if (email == "") { alert("请输入邮箱！"); document.getElementById("txtEmail").focus(); return false; }
    else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.(\w)+)*(\.(\w){2,3})$/.test(email))
    { alert("Email地址不合法！E-mail格式：123@abc.com"); document.getElementById("txtEmail").focus(); return false; }
    if (content == "") { alert("请输入留言内容！"); document.getElementById("txtContent").focus(); return false; }
    if (code == "") { alert("请输入验证码！"); document.getElementById("txtCode").focus(); return false; }
    document.getElementById('Button1').disabled = true;
    document.getElementById("divbutton").style.display = "none";
    document.getElementById("loading").style.display = "block";
    //提交信息开始
    $.ajax({
        type: "get",
        url: "/Check/CheckMessage.aspx?Title=" + escape(title) + "&Realname=" + escape(realname) + "&Phone=" + escape(phone) + "&Email=" + escape(email) + "&Content=" + escape(content) + "&Code=" + escape(code),
        success: function (msg) {
            if (msg == "success") {
                document.getElementById("divbutton").style.display = "block";
                document.getElementById("loading").style.display = "none";
                alert("恭喜你，提交成功！");
                window.location.reload();
            }
            else if (msg == "failure") {
                document.getElementById('Button1').disabled = false;
                document.getElementById("divbutton").style.display = "block";
                document.getElementById("loading").style.display = "none";
                alert("很遗憾，提交失败！");
            }
            else if (msg == "error") {
                document.getElementById('Button1').disabled = false;
                document.getElementById("divbutton").style.display = "block";
                document.getElementById("loading").style.display = "none";
                alert("您的请求带有不合法的参数，谢谢合作！");
            }
            else if (msg == "false") {
                document.getElementById('Button1').disabled = false;
                document.getElementById("divbutton").style.display = "block";
                document.getElementById("loading").style.display = "none";
                alert("验证码错误！");
            }
        }
    });
    //提交信息结束
}
//验证码，看不请，换一张
function imgchange(imgid) {
    var img = document.getElementById(imgid);
    img.src = img.src + '?' + Math.random();
}
//获得焦点
document.onkeydown = function (event) {
    e = event ? event : (window.event ? window.event : null);
    if (e.keyCode == 13) {
        document.getElementById("Button1").click();
        return false;
    }
}