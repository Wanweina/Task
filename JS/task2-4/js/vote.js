/**
 * Created by wanwn on 2017/2/24.
 */
$('#sing').click(
    // 播放音频
    function () {
        var audio = document.getElementById('music');
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
);
//打印玩家身份牌
var statusAll = sessionStorage.oStatus;
var oStatus = JSON.parse(statusAll);
console.log(oStatus);
var play = '';//存放玩家身份牌信息
for (var i = 0; i < oStatus.length; i++) {
    play += '<div class="main-content-part"><div class="main-content-part-role-name">'
        + oStatus[i].identity + '</div><div class="main-content-part-role-num">' + oStatus[i].num + '号'
        + '</div>' + '</div> ';
    $('#main-content').html(play);
}
var allName = document.getElementsByClassName("main-content-part-role-name");
var diePeople = 0;//存放死亡玩家人数
var killPeople;//死亡玩家号码
for (var j = 0; j < oStatus.length; j++) {
    //先把已经死亡的玩家标记出来
    if (oStatus[j].status == "killed" || oStatus[j].status == 'voted') {
        allName[j].style.background = "#9b9b9b";
        diePeople++;
        console.log(diePeople);
    }
}
var x;
for (x = 0; x < allName.length; x++) {
    allName[x].index = x;
    allName[x].onclick = function () {
        //如果该玩家被点击，则触发此函数
        if (oStatus[this.index].status == "killed" || oStatus[this.index].status == 'voted') {
            alert('该玩家已死亡，你难道还想让他再死一次吗？');
        } else {
            if (killPeople != undefined) {
                allName[killPeople].style.background = "#f5c97b";
                oStatus[killPeople].status = "alive";
            }
            allName[this.index].style.background = 'red';
            killPeople = this.index;
            oStatus[this.index].status = 'voted';
            console.log(oStatus);
        }
    }
}

//判断是否有选身份
$('#vote').click(
    function () {
        if (killPeople == undefined) {
            alert("请选择一个玩家");
        } else {
            for (var m = 0; m < oStatus.length; m++) {
                if (oStatus[m].status == 'alive') {
                    oStatus[m].day++;
                    console.log(oStatus[m].day);
                }
            }
            statusAll = JSON.stringify(oStatus);
            sessionStorage.oStatus = statusAll;
            console.log(statusAll);
            window.location.href = "daytime.html";
        }
    }
);

