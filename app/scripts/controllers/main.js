'use strict';

/**
 * @ngdoc function
 * @name xtripApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')
        .controller('MainCtrl', function($scope, loginService) {

            setTimeout(function() {
                var container = document.querySelector('#container');
                var msnry = new Masonry(container, {
                    // options
                    columnWidth: 5,
                    itemSelector: '.item'
                });
            }, 300);

            // loginService.login();

            $scope.displayLogin = function() {
                console.log("login dispaly");
                //	loginService.login(data,$scope); //call login service
            };
            $scope.login = function(user) {
                console.log("login");
                //	loginService.login(data,$scope); //call login service
            };
            $scope.$on("myEvent", function(event, args) {

                console.log(event);
                console.log(args);
            });
        });
