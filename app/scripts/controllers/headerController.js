'use strict';

/**
 * @ngdoc function
 * @name xtripApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')
  .controller('headerController', function ($scope,loginService) {
      $scope.loginedUser=null;

        $scope.login=function(){
          $scope.loginedUser={
    "id": 1,
    "name": "wewe2012"

}
         var div=document.getElementById("test");
         div.innerHTML ="";
          $("#test").toggleClass("main");
    console.log(div);
    //      $scope.$broadcast("myEvent", {username: "user.username" });
	//	loginService.login(data,$scope); //call login service
	};
  });
