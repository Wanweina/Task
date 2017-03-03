/**
 * Created by wanwn on 2017/2/28.
 */

$('#userName').on({
    //验证用户名是否符合要求
    blur: function () {
        if (this.value.length < 4) {
            $('#check').text('请输入4-10位用户名哦');
        } else {
            $('#check').text('');
        }
    }
});

$('#password').on({
    //验证密码是否符合要求
    blur: function () {
        if (this.value.length < 4) {
            $('#check').text('请输入4-20位密码哦');
            $('#password').val('');
        } else {
            $('#check').text('');
        }
    },
    focus: function () {
        $('#password').val('');
    }
});

$('#signIn').click(
    //点击登录按钮触发的函数：获取服务器返回的信息
    function () {
        $.post(
            '/carrots-admin-ajax/a/login', {
                name: $('#userName').val(),
                pwd: $('#password').val()
            }, function (value) {
                //回调函数
                var a = JSON.parse(value);
                if (a.code != 0) {
                    alert(a.message)
                } else {
                    alert(a.message)
                }
            }
        )
    }
);


