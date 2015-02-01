'use strict';

/**
 * @ngdoc overview
 * @name xtripApp
 * @description
 * # xtripApp
 *
 * Main module of the application.
 */
app.factory('loginService', function($http) {
    return {
        
        login: function()
        {
            $http({
                url: apiPath+"/test",
                method: "POST",
                data: "asdfasdfa",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status, headers, config) {
              //  $scope.persons = data; // assign  $scope.persons here as promise is resolved here 
              console.log("ok");
            }).error(function(data, status, headers, config) {
               // $scope.status = status;
               console.log("error");
            });

        },
        
    };

});
