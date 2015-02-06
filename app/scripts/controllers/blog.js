'use strict';

/**
 * @ngdoc function
 * @name xtripApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')
        .controller('BlogCtrl', function($scope, facotryblogs, $http, $rootScope, blogservice, $location) {

            $scope.blogs = [];


            if ($rootScope.blogs == null) {
                $scope.blogs = facotryblogs.getblogs().then(function(data) {
                    $rootScope.blogs = data;
                    $scope.blogs = $rootScope.blogs;
                });
            }
            else {
                $scope.blogs = $rootScope.blogs;
            }
            $scope.getBlogs = function()
            {
                console.log("adfadfas");
            };
            $scope.update = function(blog)
            {

                blogservice.init(blog);
                console.log(blogservice);
                $location.path('/admin/');

            }
        });
