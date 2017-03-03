/**
 * Created by wanwn on 2017/2/26.
 */
var statusAll = sessionStorage.oStatus;
var oStatus = JSON.parse(statusAll);
console.log(oStatus);
var killer = 0;//活着的杀手人数
var people = 0;//活着的平民人数
var dieKiller = 0;//死亡的杀手人数
var diePeople = 0;//死亡的平民人数
for (var i = 0; i < oStatus.length; i++) {
    //计算存活和死亡的杀手人数和平民人数
    if (oStatus[i].identity == '杀手' && oStatus[i].status == 'alive') {
        killer++;
    } else if (oStatus[i].identity == '杀手' && oStatus[i].status == 'voted') {
        dieKiller++;
    }
    else if (oStatus[i].identity == '平民' && oStatus[i].status == 'alive') {
        people++;
    } else if (oStatus[i].identity == '平民' && (oStatus[i].status == 'killed' || oStatus[i].status == 'voted')) {
        diePeople++;
    }
}
console.log(killer, dieKiller, people, diePeople);
$('#main-middle-num').html('杀&nbsp;&nbsp;&nbsp;手' + (dieKiller + killer) + '人&nbsp;&nbsp; &nbsp;警&nbsp;&nbsp;&nbsp;察0人&nbsp;&nbsp;&nbsp;平&nbsp;&nbsp;&nbsp;民' + (people + diePeople) + '人');
if (killer != 0) {
    $('.main-top').html('<div class="main-top-img"><br><br>杀手胜利</div><p><strong>太棒了！你知道么？在杀人游戏中只有20%的杀手取得游戏最终的胜利哦！</strong></p>');
} else {
    $('.main-top').html('<div class="main-top-img"><br><br>平民胜利</div><p><strong>太棒了！你打败了杀手！在杀人游戏中取得了游戏最终的胜利哦！</strong></p>');
}

var chineseNum = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]; //声明一个大写中文数字数组，用于第几天
var a = 1;
var b = "平民";
var c = 1;
var d = "平民";
var day = 1;
var play = '';
//循环生成从第一天至游戏结束的过程中，死亡玩家的死亡方式和真实身份
for (var x = 0; x < (dieKiller + diePeople) / 2; x++) {
    for (var j = 0; j < oStatus.length; j++) {
        if (oStatus[j].day == day) {
            if (oStatus[j].status == "killed") {
                a = oStatus[j].num;
                b = oStatus[j].identity;
            }
            if (oStatus[j].status == "voted") {
                c = oStatus[j].num;
                d = oStatus[j].identity;
            }
        }
    }
    day++;
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    if (a != 0 && b != 0 && c != 0 && d != 0) {
        play += '<div class="main-bottom-day"><h3>第' + chineseNum[day - 2] + '天</h3><span>0小时07分</span><p>晚上:' +
            a + '号被杀手杀死，' + a + '号是' + b + '</p><p>白天:' + c + '号被全民投票投死，' + c + '号是' + d + '</p></div>';
    } else {
        play += '<div class="main-bottom-day"><h3>第' + chineseNum[day - 2] + '天</h3><span>0小时07分</span>' +
            '<p>晚上:' + a + '号被杀手杀死，' + a + '号是' + b + '</p></div>';
    }
    $('#main-bottom').html(play);
    a = 0;
    b = 0;
    c = 0;
    d = 0;
}
