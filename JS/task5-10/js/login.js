/**
 * Created by wanwn on 2017/2/28.
 */
var myApp = angular.module('login', ['ngMessages']);
myApp.controller('loginCtrl', ['$scope', '$state', function ($scope, $state) {
    $('#signIn').click(
        //点击登录按钮触发的函数：获取服务器返回的信息
        function () {
            $.post(
                '/carrots-admin-ajax/a/login', {
                    name: $scope.userName,
                    pwd: $scope.password
                }, function (value) {
                    //回调函数
                    var a = JSON.parse(value);
                    if (a.code == 0) {
                        alert(a.message);
                        $state.go('pageTab')
                    } else {
                        alert(a.message)
                    }

                }
            )
        }
    );
}]);
