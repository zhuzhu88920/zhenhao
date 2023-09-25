var zh_default = 'n'; //默认语言，请不要改变  
var zh_choose = 't'; //当前选择  

//违禁字符 
var strChar = ['最佳', '最具', '最爱', '最赚', '最优', '最优秀', '最好', '最大', '最大程度', '最高', '最高级', '最高档', '最奢侈', '最低', '最低级', '最低价', '最强大', '最便宜', '时尚最低价', '最流行', '最受欢迎', '最时尚', '最聚拢', '最符合', '最舒适', '最先', '最先进', '最先进科学', '最先进加工工艺', '最先享受', '最后', '最后一波', '最新', '最新科技', '最新科学', '第一', '中国第一', '全网第一', '销量第一', '排名第一', '唯一', '第一品牌', 'NO.1', 'TOP.1', '独一无二', '全国第一', '一流', '仅此一款', '仅此一次', '最后一波', '最', '国家级', '国家级产品', '全球级', '宇宙级', '世界级', '顶级', '顶尖', '尖端', '顶级工艺', '顶级享受', '极品', '极佳', '绝对', '绝佳', '终极', '极致', '首个', '首选', '独家', '独家配方', '首发', '全网首发', '全国首发', '首次', '首款', '全国销量冠军','国家级产品', '国家免检', '国家领导人', '填补国内空白', '中国驰名', '驰名商标', '国际品质', '大牌', '金牌', '名牌', '王牌', '领袖品牌', '世界领先', '领先', '领导者', '缔造者', '创领品牌', '领先上市', '巨星', '著名', '掌门人', '至尊', '巅峰', '奢侈', '资深', '领袖', '之王', '王者', '冠军', '史无前例', '前无古人', '永久', '万能', '祖传', '特效', '无敌', '纯天然', '超赚', '老字号', '中国驰名商标', '特供', '专供', '专家推荐', '质量免检', '无需国家质量检测', '免抽检', '点击领奖', '恭喜获奖', '全民免单', '点击有惊喜', '点击获取', '点击转身', '点击试穿', '点击翻转', '领取奖品', '秒杀', '抢爆', '再不抢就没了', '不会更便宜了', '错过就没机会了', '万人疯抢', '全民疯抢', '全民抢购', '卖疯了', '抢疯了', '随时结束', '随时涨价', '马上降价', '世界之首', '国家千人计划'];
//替换违禁字符
function tran (text) {
    for (var i = 0; i < strChar.length; i++) {
        var reg = eval("/" + strChar[i] + "/g");
        //text = text.replace(/ /g, '').replace(reg, '***');
        text = text.replace(reg, '***');
    }
    return text;
    
}

function zh_tranBody(obj) {
    var o = (typeof (obj) == "object") ? obj.childNodes : document.childNodes;
    //var o = (typeof (obj) == "object") ? obj.childNodes : document.body.childNodes;
    for (var i = 0; i < o.length; i++) {
        var c = o.item(i);
        if ('||BR|HR|TEXTAREA|SCRIPT|STYLE|'.indexOf("|" + c.tagName + "|") > 0) continue;
        
        if (c.title != '' && c.title != null) c.title = tran(c.title);
        if (c.alt != '' && c.alt != null) c.alt = tran(c.alt);
        if (c.tagName == "INPUT" && c.value != '' && c.type != 'text' && c.type != 'hidden' && c.type != 'password') c.value = tran(c.value);
        if (c.nodeType == 3) {
            c.data = tran(c.data);
        } else {
            zh_tranBody(c);
        }
    }
}
function zh_tran(go) {
    if (go) zh_choose = go;

    if (go == 'n') {
        window.location.reload();
    } else {
        zh_tranBody();
    }
}
function zh_init() {
    if (zh_choose != zh_default) {
        if (window.onload) {
            window.onload_before_zh_init = window.onload;
            window.onload = function () {
                zh_tran(zh_choose);
                
                window.onload_before_zh_init();
            };
        } else {
            window.onload = function () {
                zh_tran(zh_choose);
            };
        }
    }
}
zh_init();
