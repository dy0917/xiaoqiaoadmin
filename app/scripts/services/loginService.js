'use strict';
/**
 * @ngdoc overview
 * @name xtripApp
 * @description
 * # xtripApp
 *
 * Main module of the application.
 */
app.service('servicecallback', function ($http, $rootScope) {
    function private_error() {
        alert("contactkingsley");
    }
    ;
    return {
        http: function (url, method, data, successcallback, errorcallback, afterfunction)
        {
            $rootScope.$broadcast('isloading', true);
            return  $http({
                url: url,
                method: method,
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                //  $scope.persons = data; // assign  $scope.persons here as promise is resolved here 
                if (successcallback) {
                    successcallback(data);
                }
                $rootScope.$broadcast('isloading', false);
            }).error(function (data, status, headers, config) {
                private_error();
                if (errorcallback) {
                    errorcallback(data);
                }
                $rootScope.$broadcast('isloading', false);
            }).then(function (data, status, headers, config) {
                $rootScope.$broadcast('isloading', false);
                if (afterfunction) {
                    afterfunction(data);
                }
            });
        }, getmethod: function (url)
        {

            return $http.get(url).error(function () {
                private_error();
            }).then(function (result) {

                var blogs = result;
                return  blogs;
            });
        }
    };
});
app.factory('facotryblogs', function ($http) {

    var factory = [];
    var blogs;
    factory.getblogs = function () {
        return $http.get(apiPath + "/blog/").then(function (result) {
            var blogs = result.data;
            return blogs;
        });
    };
    factory.method1 = function () {
        console.log(blogs);
    };
    factory.method2 = function () {
        console.log("method2");
    };
    return factory;
});
app.factory('blogservice', function ($rootScope, servicecallback, $location) {

    var blog = {};

    return {
        init: function (blogObj)
        {
            blog = blogObj;
        },
        getBlog: function ()
        {
            return blog;
        },
        delete: function (thisblog)
        {
            var popinfo = {object: thisblog, body: "Are you sure want to do this", afteraction: function (blog) {
                    var path = apiPath + "/blog/delete";
                    servicecallback.http(path, "POST", blog, function () {

                        if ($rootScope.blogs) {
                            var index = $rootScope.blogs.indexOf(blog);
                            $rootScope.blogs.splice(index, 1);
                        }
                        $location.path('/blog/');
                    }, function () {

                    }, function () {

                    });
                }};
            $rootScope.$broadcast('isinfo', popinfo);
        },
        gettypebyid: function (arr, id) {
            var string = "";
            if (id && arr) {
                arr.forEach(function (temp) {
                    if (temp.BlogTypeid === id)
                    {

                        string = temp.BlogType;
                        return;
                    }
                });

            }
            return string;
        }
    };
});
app.factory('loginservice', function ($cookieStore, $location, servicecallback, $rootScope) {
    return {
        login: function (blogObj)
        {
            var hash = CryptoJS.MD5(blogObj.password);
            blogObj.password = hash.toString();
            var path = apiPath + "/site/login";
            var json = JSON.stringify(blogObj);
            servicecallback.http(path, "POST", json, function (data) {

                if (data.error != "ERROR_USERNAME_INVALID")
                {
                    $rootScope.user = data;
                    $rootScope.$broadcast("popuplogin", false);
                }
                else {

                    $rootScope.$broadcast("popuplogin", true);
                }


            }, function () {

            });
        },
        checklogin: function ()
        {
            if ($rootScope.user == null) {
                $location.path('/');
            }
        }
    };
});
app.factory("imagereadservice", function ($http, servicecallback) {
    return {
        readAndUploadImage: function (file, photoName, imagetype, test)
        {
            var reader = new FileReader();
            reader.onload = function (e) {

                var target = getTarget(e, "pural");
                var src = target.result;
                $http({
                    url: apiPath + "/test/WriteImage",
                    method: "POST",
                    data: {"imagename": photoName, "src": src, "type": imagetype},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data, status, headers, config) {

                    test(data);
                }).error(function (data, status, headers, config) {

                });
            }, reader.readAsDataURL(file);
        }
    };
});
app.factory("statusservice", function ($http, $rootScope) {
    return {
        getstatus: function ()
        {

            var getstatusMethod = $http.get(apiPath + "/blogstatus/");
            return getstatusMethod;
        }
    };
});
app.factory("typeservice", function ($http, $rootScope) {

    return {
        gettype: function ()
        {

            var getstatusMethod = $http.get(apiPath + "/blogtype/");
            return getstatusMethod;
        }
    };
});
app.factory("sliderservice", function (servicecallback, $rootScope, shareservice) {

    var thisdslider = {"title": "nothting"};
    return {
        newslilder: function ()
        {
            var slider = {"imagelUrl": null,
                "title": null,
                "desc": null,
                "linkto": null,
                "createtime": null,
                "lastupdatetime": null};
            return slider;
        },
        setSlider: function (slider)
        {
            thisdslider = slider;
        },
        getSlider: function ()
        {
            return thisdslider;
        },
        delete: function (slider)
        {

            var popinfo = {object: slider, body: "Are you sure want to do this", afteraction: function (obj) {
                    var path = apiPath + "/slider/delete";
                    servicecallback.http(path, "POST", obj, function () {
                        shareservice.broadcastItem('removeSlider', obj);
                    }, function () {

                    }, function () {

                    });
                }};
            shareservice.broadcastItem('isinfo', popinfo);
        }
    }
    ;
});
app.factory('shareservice', function ($rootScope) {

    var obj = {};
    return {
        setObj: function (data)
        {
            obj = data;
        },
        getObj: function ()
        {
            return obj;
        },
        broadcastItem: function (event, value) {
            $rootScope.$broadcast(event, value);
        }
    };
});
app.factory('encodeservice', function () {

    var i = 0;
    var obj = {};
    return {
        htmlEncode: function (html)
        {

            return document.createElement('a').appendChild(
                    document.createTextNode(html)).parentNode.innerHTML;
        },
        htmlDecode: function (html)
        {
            str = "";
            if (html) {
                var find = '&lt;';
                var re = new RegExp(find, 'g');
                var str = html.replace(re, '<');
                find = '&gt;';
                var re = new RegExp(find, 'g');
                str = str.replace(re, '>');
            }
            return str;

        }
    };
});