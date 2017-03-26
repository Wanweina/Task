/**
 * Created by wanwn on 2017/3/16.
 */
angular.module('formApp', ['ngMessages', 'textAngular'])
    .controller('formCtrl',
        function ($scope, $state, $http, category, eduction, experience, compensation, recommend) {
            //表单绑定的参数们
            $scope.companyName = 'XXX有限公司';//默认公司名称为test
            $scope.statusOption = 0;//默认该公司职位上架
            $scope.category = category;
            $scope.education = eduction;
            $scope.experience = experience;
            $scope.recommend = recommend;
            $scope.compensation = compensation;
            $scope.changeSub = function (categoryOption) {
                //职位类别二级级联
                $scope.subCategory = categoryOption.sub;
            };
            //HTML里要用的函数们
            $scope.formReset = function () {
                //重置按钮，点击将表单所有内容清空
                $scope.professName = '';
                $scope.categoryOption = null;
                $scope.subCategoryOption = null;
                $scope.educationOption = null;
                $scope.experienceOption = null;
                $scope.recommendOption = null;
                $scope.compensationOption = null;
                $scope.responsibilityText = null;
                $scope.requisiteText = null;
                $scope.boonText = null;
            };
            $scope.formSubmit = function () {
                //点击添加按钮，将数据传回服务器
                // console.log($scope.professName, $scope.categoryOption.num, $scope.subCategoryOption.num,
                //     $scope.educationOption, $scope.experienceOption, $scope.recommendOption
                //     , $scope.compensationOption, $scope.responsibilityText, $scope.requisiteText, $scope.boonText);
                $scope.params = {
                    profession: {
                        companyId: 156,
                        companyName: 'XXX有限公司',
                        name: $scope.professName,
                        category: $scope.categoryOption.num,
                        subCategory: $scope.subCategoryOption.num,
                        education: $scope.educationOption,
                        experience: $scope.experienceOption,
                        recommend: $scope.recommendOption,
                        compensation: $scope.compensationOption,
                        responsibility: $scope.responsibilityText,
                        requisite: $scope.requisiteText,
                        boon: $scope.boonText
                    },
                    tags: [{
                        companyId:156,
                        tag:'test'
                    },{
                        companyId:156,
                        tag:'test2'
                    }]
                };
                $http(
                    {
                        method: 'POST',
                        url: '/carrots-admin-ajax/a/u/profession',
                        headers: {'Content-Type': 'application/json;charset=utf-8'},
                        data: JSON.stringify($scope.params)
                    }
                ).then(function (mes) {
                    $scope.mes = mes.data;
                    console.log($scope.mes);
                    if ($scope.mes.code == 0) {
                        alert($scope.mes.message)
                    } else {
                        alert($scope.mes.message)
                    }
                })
            }

        })



    //常量们
    .constant('category', [
        {
            'num': 1,
            'value': '产品',
            'sub': [{'num': 1, 'value': '初级'},
                {'num': 2, 'value': '中级'},
                {'num': 3, 'value': '高级'},
                {'num': 4, 'value': '总监'}]
        }, {
            'num': 2,
            'value': 'UI',
            'sub': [{'num': 1, 'value': '初级'},
                {'num': 2, 'value': '中级'},
                {'num': 3, 'value': '高级'},
                {'num': 4, 'value': '总监'}]
        }, {
            'num': 3,
            'value': 'ANDROID',
            'sub': [{'num': 1, 'value': '初级'},
                {'num': 2, 'value': '中级'},
                {'num': 3, 'value': '高级'}]
        }, {
            'num': 4,
            'value': 'IOS',
            'sub': [{'num': 1, 'value': '初级'},
                {'num': 2, 'value': '中级'},
                {'num': 3, 'value': '高级'}]
        }, {
            'num': 5,
            'value': 'CSS',
            'sub': [{'num': 1, 'value': '初级'},
                {'num': 2, 'value': '中级'},
                {'num': 3, 'value': '高级'}]
        }, {
            'num': 6,
            'value': 'JS',
            'sub': [{'num': 1, 'value': '初级'},
                {'num': 2, 'value': '中级'},
                {'num': 3, 'value': '高级'}]
        }, {
            'num': 7,
            'value': 'JAVA',
            'sub': [{'num': 1, 'value': '初级'},
                {'num': 2, 'value': '中级'},
                {'num': 3, 'value': '高级'}]
        }, {
            'num': 8,
            'value': 'QA',
            'sub': [{'num': 1, 'value': '初级'},
                {'num': 2, 'value': '中级'},
                {'num': 3, 'value': '高级'}]
        }, {
            'num': 9,
            'value': 'OP',
            'sub': [{'num': 1, 'value': '初级'},
                {'num': 2, 'value': '中级'},
                {'num': 3, 'value': '高级'}]
        }
    ])
    .constant('eduction', {
        0: "大专",
        1: "本科",
        2: "硕士",
        3: "博士"
    })
    .constant('experience', {
        0: "应届",
        1: "1~2年",
        2: "3~5年",
        3: "6~9年",
        4: "4~10年及以上"
    })
    .constant('compensation', {
        0: "0~8K",
        1: "8~15K",
        2: "16~25K",
        3: "26K及以上"
    })
    .constant('recommend', {
        0: "普通",
        1: "推荐"
    });