/* Created by Wanwn on 2017/3/15.*/
angular.module('myApp', [])
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.bind('change', function (event) {
                    scope.file = (event.srcElement || event.target).files[0];
                    scope.getFile();
                });
            }
        };
    }])
    //input使用file-model属性，指令file-model所在的元素绑定了change事件
    .controller('Upload', function ($scope, fileReader, $http, uploadFileService, loginService) {
        //这里做文件上传限制
        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                    $scope.imgSrc = result;
                });
        };
        $scope.uploadImg = function () {
            //实列一个FotmData对象
            var fd = new FormData();
            fd.append("file", $scope.file);
            //先登录再传图片至服务器
            loginService.login({name: 'user', pwd: '123123'}).then(function (res) {
                if (res.data.code == 0) {
                    uploadFileService.uploadFile(fd).then(function (res) {
                        if (res.data.code == 0) {
                            alert("图片上传成功");
                            $scope.img = res.data.data.url;
                        } else {
                            alert(res.data.message);
                        }
                    });
                }
                else {
                    alert(res.data.message);
                }
            });

        }
    })
    //定制fileReader服务完成生成获取到的文件的url地址，返回到view进行预览
    .factory('fileReader', ["$q", "$log", function ($q, $log) {
        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };
    }])
    //定制图片上传服务
    .factory('uploadFileService', function ($http) {
        return {
            uploadFile: function (formData) {
                return $http.post('/carrots-admin-ajax/a/u/img/MultipartFile', formData, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                })
            }
        }
    })
    //定制登陆账号服务
    .factory('loginService', function ($http) {
        return {
            login: function (params) {
                return $http.post('/carrots-admin-ajax/a/login', $.param(params), {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
                })
            }
        }
    });


