'use strict';
/**
 * @ngdoc function
 * @name xtripApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')
        .controller('BlogCtrl', function($scope, facotryblogs, $rootScope, blogservice, $location, loginservice

                ) {

            $scope.blogs = $rootScope.blogs;
            loginservice.checklogin();
            if ($rootScope.blogs == null) {
                $scope.blogs = facotryblogs.getblogs().then(function(data) {
                    $rootScope.blogs = data;
                    $scope.blogs = $rootScope.blogs;
                });
            }
            else {
                $scope.blogs = $rootScope.blogs;
            }

            $scope.update = function(blog)
            {
                blogservice.init(blog);
                $location.path('/admin/');
            };
            $scope.newPost = function()
            {
                blogservice.init({});
                $location.path('/admin/');
            };
            $scope.delete = function(blog)
            {
                blogservice.delete(blog);
            };
        });
angular.module('xiaoqiaoApp')
        .controller('SliderCtrl', function($scope, $rootScope, loginservice) {

//            $scope.sliders = $rootScope.sliders;
            $scope.isForm = false;
            $scope.sliders = [{title: "Title", imgurl: "text", linkto: "linkto", desc: "asdfadfasfasfdfddddd", lasteupdate: "lasteupdate"},
                {title: "Title", imgurl: "text", linkto: "linkto", desc: "asdfadfasfasfdfddddd", lasteupdate: "lasteupdate"},
                {title: "Title", imgurl: "text", linkto: "linkto", desc: "asdfadfasfasfdfddddd", lasteupdate: "lasteupdate"},
                {title: "Title", imgurl: "text", linkto: "linkto", desc: "asdfadfasfasfdfddddd", lasteupdate: "lasteupdate"}
            ];
            loginservice.checklogin();
            $scope.switchForm = function(b) {
                $scope.isForm = b;
            };
            $scope.update = function(obj) {
                $scope.switchForm(true);
                $scope.$emit("setobject", obj);
            };
        });
angular.module('xiaoqiaoApp')
        .controller('FormCtrl', function($scope, $rootScope, loginservice) {
            $scope.obj = {};
            $scope.arr = [{label: "Title", type: "text", value: $scope.obj.title},
                {label: "Image", type: "file", value: $scope.obj.imgurl},
                {label: "Desc", type: "text", value: $scope.obj.desc},
                {label: "Last Update Time", type: "text", value: $scope.obj.lasteupdate}
            ];
            $scope.$on("setobject", function(event, args) {
                $scope.obj = data;
            });
            $scope.switchForm = function() {
              console.log("adfasdfssfsfdsf");
            };
                $scope.test = function() {
              console.log("adfasdfssfsfdsf");
            };
        });