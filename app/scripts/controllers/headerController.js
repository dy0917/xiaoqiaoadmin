'use strict';
/**
 * @ngdoc function
 * @name xtripApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')
        .controller('headerController', function($scope, loginservice, $rootScope, $q) {
            $scope.user = {};
            $scope.popup = {};
            $scope.islogindisplayed = true;
//            $rootScope.ispopup = false;
            $scope.ispopup = false;
            $scope.doesoptionboxdisplay = false;

            if (developmode == true)
            {
                $rootScope.user = {username: "test"};
                $scope.islogindisplayed = false;
            }


            $scope.login = function() {
                loginservice.login($scope.user);
            };

            $scope.execute = function()
            {
                $scope.popup.afteraction($scope.popup.object);
                $scope.ispopup = false;
            };
            $scope.notexc = function()
            {
                $scope.popup = {};
                $scope.ispopup = false;
            };
            $scope.$on('popuplogin', function(event, bool) {

                $scope.islogindisplayed = bool;
            });

            $scope.$on('isloading', function(event, bool) {

                $scope.isloading = bool;
            });

            $scope.$on('ispopup', function(event, pop) {

                $scope.doesoptionboxdisplay = false;
                $scope.popup = pop;
                $scope.ispopup = true;
                if (pop.afteraction)//optional box
                {
                    $scope.doesoptionboxdisplay = true;
                }
                else {//info box
                    $("#divpopup").fadeToggle();
                    setTimeout(function() {
                        $("#divpopup").fadeOut(500, function() {
                            $scope.ispopup = false;
                        });
                    }, 1000);
                }
            });
            $scope.$on('setoffpopup', function(event, b) {
                $scope.ispopup = b;
            });
        });
