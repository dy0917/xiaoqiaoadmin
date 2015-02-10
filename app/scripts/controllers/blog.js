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



            $scope.blogs = [];

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
            $scope.getBlogs = function()
            {

            };
            $scope.update = function(blog)
            {

                blogservice.init(blog);
                $location.path('/admin/');
                ;
            }
        });
