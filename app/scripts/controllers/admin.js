'use strict';

/**
 * @ngdoc function
 * @name xtripApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')

        .controller('AdminCtrl', function($scope, $http, servicecallback, blogservice, loginservice, imagereadservice, $rootScope, $location) {

            loginservice.checklogin();
            $scope.blog = {BlogStatusid: 3, BlogStatus: "draft"};
            $scope.blog.BlogStatus = "draft";

//            $scope.blog = {BlogStatusid: 3, BlogStatus: "draft"};
            $scope.arrblogstatus = {};
            if (typeof blogservice.getBlog().Blogid != "undefined")
            {
                $scope.blog = blogservice.getBlog();
            }
            console.log($scope.blog);
            $scope.arrblogstatus = $rootScope.arrblogstatus;
            if (!$rootScope.arrblogstatus)
            {
                $http.get(apiPath + "/blogstatus/").then(function(result) {
                    $rootScope.arrblogstatus = result.data;
                    $scope.arrblogstatus = $rootScope.arrblogstatus;
                });

            }
            $('#summernote').summernote(
                    {
                        onImageUpload: function(files, editor, $editable) {
                            var name = files[0].name;
                            var photoName = name.replace(/[)\(]/gi, '');
                            photoName = photoName.replace(/\s/g, '_');
                            var hash = CryptoJS.MD5(photoName);
                            photoName = hash.toString();
                            var imagetype = files[0].type;
                            var filesize = files[0].size;
                            var reader = new FileReader();
                            imagereadservice.readAndUploadImage(files[0], photoName, imagetype, function(data) {
                                var imageurl = "http://" + data;
                                editor.insertImage($editable, imageurl, photoName);
                            });

                        }
                    }
            ).code($scope.blog.body);



            $scope.save = function() {
                var sHTML = $('#summernote').code();
                var find = '<';
                var re = new RegExp(find, "g");
                sHTML = sHTML.replace(re, "&lt;");
                var find = '>';
                var re = new RegExp(find, "g");
                sHTML = sHTML.replace(re, "&gt;");

                var path = apiPath + "/blog/";
                var method = "POST";
                $scope.blog.body = sHTML;

                if ($scope.blog.Blogid)
                {
                    var path = apiPath + "/blog/update";
                }

                servicecallback.http(path, method, $scope.blog, function(data) {
//                 
                    $scope.blog = data;
                    if ($rootScope.blogs) {
                        $rootScope.blogs.unshift($scope.blog);
                    }
                }, function() {
                }, function() {
                    var popinfo = {body: "Saved"
                    };
                    $scope.$emit("ispopup", popinfo);
                }
                );

            };

            $scope.back = function() {

                $scope.blog = {};
                $location.path('/blog/');
            };
            $scope.saveandback = function()
            {
                $scope.save();
                $location.path('/blog/');
            }

            $scope.uploadimage = function() {
                var files = $("#featureImg").prop("files");
                var name = files[0].name;
                var photoName = name.replace(/[)\(]/gi, '');
                photoName = photoName.replace(/\s/g, '_');
                var hash = CryptoJS.MD5(photoName);
                photoName = hash.toString();
                var imagetype = files[0].type;
                var filesize = files[0].size;

                imagereadservice.readAndUploadImage(files[0], photoName, imagetype, function(data) {
                    $scope.blog.FeatureIamge = data;
                }, function() {
                }, function() {
                });

            };

            $scope.setStatus = function(status) {
                console.log(status);
                $scope.blog.BlogStatusid = status.BlogStatusid;
                $scope.blog.BlogStatus = status.BlogStatus;

            };

//            $scope.feedback = function() {
//                var popinfo = {isoptionalbox: true, test: function(data) {
//                        console.log(data);
//                    }};
//
//                $scope.$emit('ispopup', popinfo);
//            };

            $scope.delete = function() {

                blogservice.delete($scope.blog);
            };

//            $('#summernote').summernote(
//                    {
//                        onImageUpload: function(files, editor, $editable) {
//
//                            console.log("start");
//                            var name = files[0].name;
//                            var imagetype = files[0].type;
//                            var filesize = files[0].size;
////    console.log('image upload:', files, editor, $editable);
//                            var reader = new FileReader();
//                            reader.onload = function(e) {
//                                var photoName = name.replace(/[)\(]/gi, '');
//                                photoName = photoName.replace(/\s/g, '_');
//                                var target = getTarget(e, "pural");
//                                var src = target.result;
//
//                                $http({
//                                    url: apiPath + "/test/WriteImage",
//                                    method: "POST",
//                                    data: {"imagename": photoName, "src": src, "type": imagetype},
//                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//                                }).success(function(data, status, headers, config) {
//                                    console.log("end");
//                                    editor.insertImage($editable, src, photoName);
//
//                                    //  $scope.persons = data; // assign  $scope.persons here as promise is resolved here 
//                                    console.log(data);
//                                    console.log("ok");
//                                }).error(function(data, status, headers, config) {
//                                    // $scope.status = status;
//                                    console.log("error");
//                                });
//
//
//
////                           var currentdate = new Date();
////                        var guid = createGuid();
////                        var uploadingdisplaystring = "![" + guid + "]()";
////                        that.insertTextAtCursor(el, uploadingdisplaystring + "\n\r");
////                        requiredBackEnd("imageCreate", "writeimage", '{"src":"' + src + '","type":"' + type + '","userid":"' + userid
////                                + '","imagename":"' + photoName + '"}', "post", function(params) {
////                                    el.value = el.value.replace(uploadingdisplaystring, "![" + guid + "](" + params + ")");
////                                    var blog = that.get("controller").get('blog');
////                                    blog.set("body", el.value);
////                                });
//                            }, reader.readAsDataURL(files[0]);
//                        }
//                    }
//            );


        });

