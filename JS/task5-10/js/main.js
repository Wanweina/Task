/**
 * Created by wanwn on 2017/3/9.
 */
var app = angular.module('myApp', ['ui.router', 'oc.lazyLoad', 'textAngular']);
app.config(function ($stateProvider, $urlRouterProvider) {
    //懒加载
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        }
    };
    $urlRouterProvider.when('', '/login');
    $stateProvider
        .state('login', {
            //默认显示登录页面
            url: '/login',
            templateUrl: 'login.html',
            resolve: {
                loadMyFile: _lazyLoad(
                    //懒加载登录的js和css文件
                    ['js/login.js', 'css/login.css']
                )
            }
        })
        .state('pageTab', {
            //登录成功后可跳转到pageTab页面
            url: '/pageTab',
            templateUrl: 'pageTab.html',
            resolve: {
                loadMyFile: _lazyLoad(
                    //懒加载pageTab.css
                    ['js/sidenav.js', 'css/sidenav.css']
                )
            }
        })
        .state('pageTab.list', {
            //配置列表页路由
            url: '/list/:page/:industry/:financing',
            templateUrl: 'list.html',
            resolve: {
                loadMyFile: _lazyLoad(
                    //懒加载pageTab.css
                    ['js/list.js', 'css/list.css']
                )
            }
        })
        .state('pageTab.upload', {
            //配置图片上传页面
            url: '/upload',
            templateUrl: 'upload.html',
            resolve: {
                loadMyFile: _lazyLoad(
                    //懒加载pageTab.css
                    ['js/upload.js', 'css/upload.css']
                )
            }
        })
        .state('pageTab.form', {
            //配置表单页路由
            url: '/form',
            templateUrl: 'form.html',
            resolve: {
                loadMyFile: _lazyLoad(
                    //懒加载pageTab.css
                    ['js/form.js', 'css/form.css']
                )
            }
        })
});