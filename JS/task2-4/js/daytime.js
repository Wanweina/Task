/**
 * Created by wanwn on 2017/2/26.
 */
var statusAll = sessionStorage.oStatus;
var oStatus = JSON.parse(statusAll);
console.log(oStatus);
// 读取所有玩家的信息
var killer = 0;//存放活着的杀手人数
var person = 0;//存放活着的平民人数
var diePeople = 0;//存放死亡玩家人数
var play = '';
for (var i = 0; i < oStatus.length; i++) {
    //显示死亡玩家身份信息
    if (oStatus[i].status == 'killed') {
        play += oStatus[i].num + '号被杀手杀死了，其真实身份是' + oStatus[i].identity + '<br>';
        $('#main-content').html(play);
    }
    if (oStatus[i].status == 'voted') {
        play += oStatus[i].num + '号被投票投死了，其真实身份是' + oStatus[i].identity + '<br>';
        $('#main-content').html(play);
    }
}
for (var n = 0; n < oStatus.length; n++) {
    //记录总共死亡人数
    if (oStatus[n].status == 'killed' || oStatus[n].status == 'voted') {
        diePeople++;
    }
}
console.log(diePeople);
for (var m = 0; m < oStatus.length; m++) {
    // 记录存活的杀手人数和平民人数
    if (oStatus[m].status == 'alive') {
        if (oStatus[m].identity == '平民') {
            person++;
        } else {
            killer++;
        }
    }
}
console.log(person, killer);
if (person <= killer) {
    $('#gotoVote').text('杀手获胜，查看结果').click(function () {
        window.location.href = 'result.html';
    });
} else if (killer == 0) {
    $('#gotoVote').text('平民获胜，查看结果').click(function () {
        window.location.href = 'result.html';
    });
} else if ((diePeople + 2) % 2 == 0) {
    $('#gotoVote').text('第' + (diePeople + 2) / 2 + '天').click(function () {
        window.location.href = 'goKill.html';
    });
} else {
    $('#gotoVote').text('去投票').click(function () {
        window.location.href = 'vote.html';
    });
}
