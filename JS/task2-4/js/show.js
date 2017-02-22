/**
 * Created by wanwn on 2017/2/18.
 */
var allPlayer = sessionStorage.all;
var all = JSON.parse(allPlayer);//获取上个页面的身份信息
console.log(all);//打印所有玩家身份
var clickNum = 1;//定义点击按钮被点击的次数
var playNum = 2;//定义玩家的号数
$('#btnShow').click(
    function () {
        if (clickNum > 2 * all.length - 1) {
            //每个玩家查看身份及传递身份需要点击两次按钮，第一个页面不用点击隐藏，所以当点击总次数超过玩家人数*2-1时，跳转到下一个页面
            window.location.href = 'judge.html';
        } else if (clickNum % 2 == 0) {
            //当点击次数为偶数次时，显示隐藏身份页面
            $('.main-show-cover').show();
            $('.main-show-open').hide();
            $('#playerRole').hide();
            $('.main-show-open-warn').hide();
            $('#playerNum').text(playNum);
            $('#btnShow').text('查看' + playNum + '号身份');
            playNum++;
        } else {
            //当点击次数为奇数次时，显示n号玩家身份信息
            $('.main-show-cover').hide();
            $('.main-show-open').show();
            $('.main-show-open-warn').show();
            $('#playerRole').show().text('角色：' + all[playNum - 2]);
            if (playNum < all.length + 1) {
                $('#btnShow').text('隐藏并传递给' + playNum + '号');
            } else {
                $('#btnShow').text('查看法官台本');
            }
        }
        clickNum++;//一次点击事件结束后总次数加1
    }
);


