'use strict';
/**
 * @ngdoc overview
 * @name xtripApp
 * @description
 * # xtripApp
 *
 * Main module of the application.
 */
app.service('servicecallback', function($http) {
    return {
        http: function(url, method, data, successcallback, errorcallback)
        {
            $http({
                url: url,
                method: method,
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status, headers, config) {
                //  $scope.persons = data; // assign  $scope.persons here as promise is resolved here 
                successcallback(data);
            }).error(function(data, status, headers, config) {
                // $scope.status = status;
                errorcallback(data);
            });
        },
        test: function()
        {
            console.log("test");
        }
    };
});
app.factory('facotryblogs', function(servicecallback, $http) {

//    var blogs = [{name: "adfafdadf"}, {name: "wwwwwwwwwwwwwwwerwer"}];
    var factory = [];
    var blogs;
    var that = this;
    factory.getblogs = function() {
        return $http.get(apiPath + "/blog/").then(function(result) {
            var blogs = result.data;
            return blogs;
        });
    };
    factory.method1 = function() {
        console.log(blogs);
    };
    factory.method2 = function() {
        console.log("method2");
    };
    return factory;
});
app.factory('blogservice', function() {

//    var blogs = [{name: "adfafdadf"}, {name: "wwwwwwwwwwwwwwwerwer"}];
    var blog = {};
    return {
        init: function(blogObj)
        {
            blog = blogObj;
        },
        getBlog: function()
        {
            return blog;
        },
        settitle: function(title) {
            blog.title = title;
        },
        getTitle: function() {
            return  blog.title;
        }

    };
});