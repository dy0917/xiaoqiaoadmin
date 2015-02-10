'use strict';

/**
 * @ngdoc function
 * @name xtripApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')
        .controller('headerController', function($scope, loginservice, $rootScope) {
            $scope.user = {};
            $scope.islogindisplayed = true;

            $scope.login = function() {
                loginservice.login($scope.user);
            };

            $scope.$on('popuplogin', function(event, bool) {
                console.log(bool);
                $scope.islogindisplayed = bool;
            });

        });
