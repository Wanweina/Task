/**
 * Created by wanwn on 2017/3/12.
 */
var app = angular.module('myApp', []);
app.controller('listCont', function ($scope, $http, $state, $stateParams, financing, industry) {
    $scope.text = $stateParams.page || 1;//默认输入框为1
    $scope.page = $stateParams.page || 1;
    $scope.financingOption = $stateParams.financing || '';
    $scope.industryOption = $stateParams.industry || '';
    $scope.financing = financing;
    $scope.industry = industry;
    $scope.getMsg = function () {
        //发送http请求
        $http.get('/carrots-admin-ajax/a/company/search?page=' + $scope.page + '&industry=' + $scope.industryOption + '&financing=' + $scope.financingOption)
            .then(function (mes) {
                $scope.mesAll = mes.data;
                $scope.mes = mes.data.data;
                $scope.total = mes.data.total;
                if ($scope.mesAll.code != 0) {
                    alert($scope.mesAll.message)
                }
            })
    };
    $scope.choosePage = function () {
        //选择页面后显示页面内容
        $state.go('pageTab.list', {'page': $scope.page}, {reload: true});
    };

    $scope.search = function () {
        //点击搜索按钮
        $state.go('pageTab.list', {
            'page': 1,
            'industry': $scope.industryOption,
            'financing': $scope.financingOption
        }, {reload: true});
        console.log($scope.industryOption, $scope.financingOption);
    };
    $scope.getMsg();

    //页面跳转控制按钮们
    $scope.firstPage = function () {
        //点击首页按钮
        if ($scope.page == 1) {
            alert('前面没有敌军了！往后走啊兄弟们！');
        } else {
            $scope.page = 1;
            $scope.text = 1;
            $scope.choosePage();
        }
    };
    $scope.prePage = function () {
        //点击上一页按钮
        if ($scope.page == 1) {
            alert('前面没有敌军了！往后走啊兄弟们！');
        } else {
            $scope.page--;
            $scope.text = $scope.page;
            $scope.choosePage();
        }
    };
    $scope.inputPage = function () {
        //页码输入框失焦事件
        if ($scope.text < 1) {
            alert('前面没有敌军了！往后走啊兄弟们！');
            $scope.text = 1;
        } else if ($scope.text >= 1 && $scope.text <= Math.ceil($scope.total / 10)) {
            $scope.page = $scope.text;
            $scope.choosePage();
        } else {
            alert('敌军在前面！往前走啊兄弟们！');
            $scope.text = Math.ceil($scope.total / 10);
        }

    };
    $scope.nextPage = function () {
        //点击下一页按钮
        if ($scope.page >= Math.ceil($scope.total / 10)) {
            alert('敌军在前面！往前走啊兄弟们！');
            $scope.page = Math.ceil($scope.total / 10);
            $scope.text = $scope.page;
        } else {
            $scope.page++;
            $scope.text = $scope.page;
            $stateParams.page = $scope.page;
            $scope.choosePage();
            console.log($stateParams.page)
        }
    };
    $scope.lastPage = function () {
        //点击末页按钮
        if ($scope.page == Math.ceil($scope.total / 10)) {
            alert('敌军在前面！往前走啊兄弟们！')
        } else {
            $scope.page = Math.ceil($scope.total / 10);
            $scope.text = $scope.page;
            $scope.choosePage();
        }
    };

});


//常量们
app.constant('financing', {
    0: "无需融资",
    1: "天使轮",
    2: "A轮",
    3: "B轮",
    4: "C轮",
    5: "D轮及以上",
    6: "上市公司"
});
app.constant('industry', {
    0: "移动互联网",
    1: "电子商务",
    2: "企业服务",
    3: "020",
    4: "教育",
    5: "金融",
    6: "游戏"
});

//过滤器函数们
app.filter('approve', function () {
    //认证状态过滤
    return function (approveNum) {
        var approveText = '';
        if (approveNum == 0) {
            approveText = '未认证';
            return approveText;
        } else {
            approveText = '已认证';
            return approveText;
        }
    }
});
app.filter('finance', function () {
    //融资规模过滤
    return function (financeNum) {
        var financeText = '';
        switch (financeNum) {
            case 0:
                financeText = '无需融资';
                return financeText;
                break;
            case 1:
                financeText = '天使轮';
                return financeText;
                break;
            case 2:
                financeText = 'A轮';
                return financeText;
                break;
            case 3:
                financeText = 'B轮';
                return financeText;
                break;
            case 4:
                financeText = 'C轮';
                return financeText;
                break;
            case 5:
                financeText = 'D轮及以上';
                return financeText;
                break;
            case 6:
                financeText = '上市公司';
                return financeText;
                break;
        }
    }
});

app.filter('industry', function () {
    //公司行业过滤
    return function (industryNum) {
        var industryText = [];
        for (var i = 0; i < industryNum.length; i++) {
            switch (industryNum[i]) {
                case 0:
                    industryText[i] = '移动互联网';
                    break;
                case 1:
                    industryText[i] = '电子商务';
                    break;
                case 2:
                    industryText[i] = '企业服务';
                    break;
                case 3:
                    industryText[i] = '020';
                    break;
                case 4:
                    industryText[i] = '教育';
                    break;
                case 5:
                    industryText[i] = '金融';
                    break;
                case 6:
                    industryText[i] = '游戏';
                    break;
            }
        }
        return industryText.join(',');
    }
});