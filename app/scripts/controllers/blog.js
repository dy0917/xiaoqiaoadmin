'use strict';
/**
 * @ngdoc function
 * @name xtripApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')
        .controller('BlogCtrl', function($scope, facotryblogs, $rootScope, blogservice, $location, loginservice, $http, statusservice
                , $filter) {
            $scope.blogs = $rootScope.blogs;
            $scope.arrblogstatus = [];
            loginservice.checklogin();
            if ($rootScope.blogs == null) {
                $scope.blogs = facotryblogs.getblogs().then(function(data) {
                    $rootScope.blogs = data;
                    $scope.blogs = $rootScope.blogs;
                });
            }
            else {
                $scope.blogs = $rootScope.blogs;
            }


            statusservice.getstatus().then(function(result) {

                $scope.arrblogstatus = [{BlogStatusid: "0", BlogStatus: "All"}];
                $scope.arrblogstatus = $scope.arrblogstatus.concat(result.data);
            });


            $scope.filterbyStatus = function(condition) {
                if (condition.BlogStatus === "All")
                {
                    $scope.blogs = $rootScope.blogs;
                } else
                {
                    $scope.blogs = $filter("filter")($rootScope.blogs, {BlogStatus: condition.BlogStatus});
                    ;
                }

            };
            $scope.update = function(blog)
            {
                blogservice.init(blog);
                $location.path('/admin/');
            };
            $scope.newPost = function()
            {
                blogservice.init({});
                $location.path('/admin/');
            };
            $scope.delete = function(blog)
            {
                blogservice.delete(blog);
            };
        });
angular.module('xiaoqiaoApp')
        .controller('SliderCtrl', function($scope, $rootScope, loginservice, $http, sliderservice) {

            $scope.isForm = false;
            $http.get(apiPath + "/slider/").then(function(result) {
                $scope.sliders = result.data;
            });
            loginservice.checklogin();
            $scope.switchForm = function(b) {
                $scope.isForm = b;
            };
            $scope.update = function(obj) {
                $rootScope.slider = obj;
                $scope.switchForm(true);
            };
            $scope.test = function() {

            };
            $scope.newslider = function() {
                $rootScope.slider = {};
                $scope.isForm = true;
            };
            $scope.delete = function(slider) {
                sliderservice.delete(slider);
            };
            $scope.removeFromlst = function(slider)
            {
//                $scope.sliders
            };
            $scope.$on('setformoff', function(event, pop) {

                $scope.isForm = false;
            });
        });



angular.module('xiaoqiaoApp')
        .controller('FormCtrl', function($scope, $rootScope, imagereadservice, servicecallback, sliderservice) {
            $scope.obj = $rootScope.slider;
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
            $scope.save = function() {

                $scope.obj.title = $scope.arr[0].value;
                $scope.obj.linkto = $scope.arr[2].value;
                $scope.obj.desc = $scope.arr[3].value;
                var path = apiPath + "/slider";
                if ($scope.obj.sliderId)
                {
                    path = apiPath + "/slider/update";
                }

                servicecallback.http(path, "POST", $scope.obj, function(data) {
//                    $scope.blog = data;
                    var popinfo = {body: "Slider Saved"
                    };
                    $rootScope.$broadcast('ispopup', popinfo);
//  
                    $scope.switchForm(false);
                }, function() {
                }
                );
            };
            $scope.delete = function() {

                sliderservice.delete($scope.obj);
            };
            $scope.upload = function() {
                var files = $("#imgPicker").prop("files");
                var name = files[0].name;
                var photoName = name.replace(/[)\(]/gi, '');
                photoName = photoName.replace(/\s/g, '_');
                var hash = CryptoJS.MD5(photoName);
                photoName = "sliders/" + hash.toString();
                var imagetype = files[0].type;
                var filesize = files[0].size;
                imagereadservice.readAndUploadImage(files[0], photoName, imagetype, function(data) {
                    $rootScope.slider.imagelUrl = data;
                    $scope.arr[1].value = data;
                    var popinfo = {body: "Image Saved"
                    };
                    $rootScope.$broadcast('ispopup', popinfo);
                }, function() {
                });
            };
        });