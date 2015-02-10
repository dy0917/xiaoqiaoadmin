'use strict';

/**
 * @ngdoc function
 * @name xtripApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')
        .controller('ProductCtrl', function($scope, loginservice) {

            loginservice.checklogin();
//            $scope.blogs = facotryblogs.getFamily2().then(function(data) {
//                $scope.blogs = data;
//            });
        });
