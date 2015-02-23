'use strict';
/**
 * @ngdoc overview
 * @name xtripApp
 * @description
 * # xtripApp
 *
 * Main module of the application.
 */
app.service('servicecallback', function($http, $rootScope) {
    return {
        http: function(url, method, data, successcallback, errorcallback, afterfunction)
        {
            $rootScope.$broadcast('isloading', true);

            $http({
                url: url,
                method: method,
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data, status, headers, config) {
                //  $scope.persons = data; // assign  $scope.persons here as promise is resolved here 

                successcallback(data);
            }).error(function(data, status, headers, config)
            {
                // $scope.status = status;
                $rootScope.$broadcast('isloading', false);
                errorcallback(data);
            }).then(function() {
                $rootScope.$broadcast('isloading', false);
                if (afterfunction) {
                    afterfunction();
                }
            });
        },
        test: function()
        {
            console.log("test");
        }
    };
});
app.factory('facotryblogs', function(servicecallback, $http) {

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
app.factory('blogservice', function($rootScope, servicecallback, $location) {

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
        },
        delete: function(thisblog)
        {
            var popinfo = {object: thisblog, body: "Are you sure want to do this", afteraction: function(blog) {
                    var path = apiPath + "/blog/delete";
                    servicecallback.http(path, "POST", blog, function() {
                        if ($rootScope.blogs) {
                            var index = $rootScope.blogs.indexOf(blog);
                            $rootScope.blogs.splice(index, 1);
                        }
                        $location.path('/blog/');
                    }, function() {
                    }, function() {
                        var popinfo = {body: "Deleted"
                        };
                        $scope.$emit("ispopup", popinfo);
                    });
                }};

            $rootScope.$broadcast('ispopup', popinfo);
        },
        removeFromList: function() {
        }
    };
});

app.factory('loginservice', function($cookieStore, $location, servicecallback, $rootScope) {
    return {
        login: function(blogObj)
        {
            var hash = CryptoJS.MD5(blogObj.password);
            blogObj.password = hash.toString();
            var path = apiPath + "/site/login";
            var json = JSON.stringify(blogObj);
            servicecallback.http(path, "POST", json, function(data) {

                if (data.error != "ERROR_USERNAME_INVALID")
                {

                    $rootScope.user = data;
                    $rootScope.$broadcast("popuplogin", false);
                }
                else {

                    $rootScope.$broadcast("popuplogin", true);
                }


            }, function() {

            });


        },
        checklogin: function()
        {
            if ($rootScope.user == null) {
                $location.path('/');
            }
        }
    };
});

app.factory("imagereadservice", function($http, servicecallback) {
    return {
        readAndUploadImage: function(file, photoName, imagetype, test)
        {
            var reader = new FileReader();
            reader.onload = function(e) {

                var target = getTarget(e, "pural");
                var src = target.result;
                $http({
                    url: apiPath + "/test/WriteImage",
                    method: "POST",
                    data: {"imagename": photoName, "src": src, "type": imagetype},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data, status, headers, config) {

                    test(data);
                }).error(function(data, status, headers, config) {

                });



            }, reader.readAsDataURL(file);
        }
    }
});