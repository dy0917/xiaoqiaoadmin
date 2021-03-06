'use strict';

/**
 * @ngdoc function
 * @name xtripApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')
        .controller('MainCtrl', function ($scope) {

            setTimeout(function () {
                var container = document.querySelector('#container');
                var msnry = new Masonry(container, {
                    // options
                    columnWidth: 5,
                    itemSelector: '.item'
                });
            }, 300);

            // loginService.login();

            $scope.displayLogin = function () {
                console.log("login dispaly");
                //	loginService.login(data,$scope); //call login service
            };
            $scope.login = function (user) {
                console.log("login");
                //	loginService.login(data,$scope); //call login service
            };
            $scope.$on("myEvent", function (event, args) {

                console.log(event);
                console.log(args);
            });
        });


angular.module('xiaoqiaoApp')
        .controller('userCtrl', function ($scope, servicecallback) {
            $scope.getUsers = function () {
                var path = apiPath + "/user";
                servicecallback.http(path, "GET", null, function (data) {

                    $scope.users = data;
                }, function () {
                });
            };
            $scope.getUsers();
        });

angular.module('xiaoqiaoApp')
        .controller('subscriberCtrl', function ($scope, servicecallback) {
            $scope.getSubscribers = function () {
                var path = apiPath + "/subscribe";
                servicecallback.http(path, "GET", null, function (data) {

                    $scope.subscribers = data;
                }, function () {
                });
            };
            $scope.getSubscribers();
        });

angular.module('xiaoqiaoApp')
        .controller('loanratioCtrl', function ($scope, servicecallback, formcheckservice, shareservice) {
            $scope.update = function (bankinfo) {
                var path = apiPath + "/bankratio/update";
                servicecallback.http(path, "POST", bankinfo, function () {
                    var popinfo = {body: "Saved"};
                    shareservice.broadcastItem('addSlider', popinfo);
                }, function () {
                });

            };
            $scope.init = function () {
                var path = apiPath + "/bankratio";

                servicecallback.getmethod(path).then(function (result) {
                    $scope.banks = result.data;
                });

            };
            $scope.init();
            $scope.isdecimal = function (str1, str2)
            {
                return formcheckservice.isdecimal(str1) && formcheckservice.isdecimal(str2);
            };

        });