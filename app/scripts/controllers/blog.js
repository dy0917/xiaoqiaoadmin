'use strict';
/**
 * @ngdoc function
 * @name xtripApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')
        .controller('BlogCtrl', function ($scope, facotryblogs, $rootScope, blogservice, $location, loginservice, $http, statusservice,
                typeservice, $filter) {
            $scope.blogs = $rootScope.blogs;
            $scope.arrblogstatus = [];
            loginservice.checklogin();
          
                $scope.blogs = facotryblogs.getblogs().then(function (data) {
                    $rootScope.blogs = data;
                    $scope.blogs = $rootScope.blogs;
                });
        

            statusservice.getstatus().then(function (result) {
                $scope.arrblogstatus = [{BlogStatusid: "0", BlogStatus: "All"}];
                $scope.arrblogstatus = $scope.arrblogstatus.concat(result.data);
            });
            typeservice.gettype().then(function (result) {
                $scope.blogtypes = [{BlogTypeid: "0", BlogType: "All"}];
                $scope.blogtypes = $scope.blogtypes.concat(result.data);
            });

            $scope.filterbyStatus = function (condition) {
                if (condition.BlogStatus === "All")
                {
                    $scope.blogs = $rootScope.blogs;
                } else
                {
                    $scope.blogs = $filter("filter")($rootScope.blogs, {BlogStatus: condition.BlogStatus});
                    ;
                }
            };

            $scope.filterbyType = function (condition) {
                if (condition.BlogType === "All")
                {
                    $scope.blogs = $rootScope.blogs;
                } else
                {
                    $scope.blogs = $filter("filter")($rootScope.blogs, {BlogTypeid: condition.BlogTypeid});
                    ;
                }
            };

            $scope.getTypeByid = function (id)
            {
                return blogservice.gettypebyid($scope.blogtypes, id);

            };

            $scope.update = function (blog)
            {
                blogservice.init(blog);
                $location.path('/admin/');
            };
            $scope.newPost = function ()
            {
                blogservice.init({});
                $location.path('/admin/');
            };
            $scope.delete = function (blog)
            {
                blogservice.delete(blog);
            };
        });
angular.module('xiaoqiaoApp')
        .controller('SliderCtrl', function ($scope, $rootScope, loginservice, $http, sliderservice, shareservice, servicecallback) {


            $scope.isForm = false;
            $http.get(apiPath + "/slider/").then(function (result) {
                $scope.sliders = result.data;
            });
            loginservice.checklogin();
            $scope.switchForm = function (b) {
                $scope.isForm = b;
            };
            $scope.update = function (obj) {
                sliderservice.setSlider(obj);
                $scope.switchForm(true);
            };
            $scope.newslider = function () {
                sliderservice.setSlider({});
                $scope.isForm = true;
            };
            $scope.removeFromlst = function (slider)
            {
                var i = $scope.sliders.indexOf(slider);
                if (i != -1)
                {
                    $scope.sliders.splice(i, 1);
                }
            };
            $scope.delete = function (slider) {

                sliderservice.delete(slider);
            };
            $scope.$on('setformoff', function (event, pop) {

                $scope.isForm = false;
            });
            $scope.$on('addSlider', function (event, obj) {

                $scope.sliders.push(obj);
            });
            $scope.$on('removeSlider', function (event, obj) {
                $scope.isForm = false;
                $scope.removeFromlst(obj);
            });
        });
angular.module('xiaoqiaoApp')
        .controller('FormCtrl', function ($scope, $rootScope, imagereadservice, servicecallback, sliderservice, shareservice) {
            $scope.obj = sliderservice.getSlider();
            if (!$scope.obj)
            {
                $scope.obj = sliderservice.newslilder();
                $scope.arr = [{label: "Title", type: "text", value: ""},
                    {label: "Image", type: "file", value: ""},
                    {label: "Link to", type: "text", value: ""},
                    {label: "Desc", type: "text", value: ""},
                    {label: "Last Update Time", type: "text", value: ""}
                ];
            } else {
                $scope.arr = [{label: "Title", type: "text", value: $scope.obj.title},
                    {label: "Image", type: "file", value: $scope.obj.imagelUrl},
                    {label: "Link to", type: "text", value: $scope.obj.linkto},
                    {label: "Desc", type: "text", value: $scope.obj.desc},
                    {label: "Last Update Time", type: "text", value: $scope.obj.lasteupdate}
                ];
            }
            $scope.save = function () {

                $scope.obj.title = $scope.arr[0].value;
                $scope.obj.linkto = $scope.arr[2].value;
                $scope.obj.desc = $scope.arr[3].value;
                var path = apiPath + "/slider";
                if ($scope.obj.sliderId)
                {
                    path = apiPath + "/slider/update";
                }

                servicecallback.http(path, "POST", $scope.obj, function (data) {

                    var popinfo = {body: "Slider Saved"
                    };
                    if (!$scope.obj.sliderId)
                    {
                        shareservice.broadcastItem('addSlider', data);
                    }
                    $rootScope.$broadcast('isinfo', popinfo);
                }, function () {
                }
                );
            };
            $scope.delete = function () {

                sliderservice.delete($scope.obj);
            };
            $scope.upload = function () {
                var files = $("#imgPicker").prop("files");
                var name = files[0].name;
                var photoName = name.replace(/[)\(]/gi, '');
                photoName = photoName.replace(/\s/g, '_');
                var hash = CryptoJS.MD5(photoName);
                photoName = "sliders/" + hash.toString();
                var imagetype = files[0].type;
                var filesize = files[0].size;
                imagereadservice.readAndUploadImage(files[0], photoName, imagetype, function (data) {
                    $scope.obj.imagelUrl = data;
                    $scope.arr[1].value = data;
                    var popinfo = {body: "Image Saved"
                    };
                    $rootScope.$broadcast('isinfo', popinfo);
                }, function () {
                });
            };
        });