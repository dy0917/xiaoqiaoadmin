'use strict';

/**
 * @ngdoc function
 * @name xtripApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the xtripApp
 */
angular.module('xiaoqiaoApp')

        .controller('AdminCtrl', function($scope, $http, servicecallback, blogservice) {

            $scope.blog = {};
            $('#summernote').summernote();
            if (blogservice.getBlog())
            {
                $scope.blog = blogservice.getBlog();
                $('#summernote').code($scope.blog.body);
            }


            $scope.save = function() {
                var sHTML = $('#summernote').code();
//                var json = {body: sHTML, title: $scope.blog.title, FeatureIamge: $scope.blog.FeaturedImgURL};
                var json = JSON.stringify($scope.blog);
                var path = apiPath + "/blog/";
                if ($scope.blog.Blogid)
                {
                    var path = apiPath + "/blog/update";
                }

                servicecallback.http(path, "POST", json, function(data) {
                    $('#summernote').code("");
                    $scope.blog = null;

                }, function() {

                });


            };

            $scope.uploadimage = function() {
                var files = $("#featureImg").prop("files");

                var name = files[0].name;
                var imagetype = files[0].type;
                var filesize = files[0].size;

                var reader = new FileReader();
                reader.onload = function(e) {
                    var photoName = name.replace(/[)\(]/gi, '');
                    photoName = photoName.replace(/\s/g, '_');
                    var target = getTarget(e, "pural");
                    var src = target.result;
                    $http({
                        url: apiPath + "/test/WriteImage",
                        method: "POST",
                        data: {"imagename": photoName, "src": src, "type": imagetype},
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function(data, status, headers, config) {
                        $scope.featuredImgURL = "http://" + data;
                    }).error(function(data, status, headers, config) {

                    });

                }, reader.readAsDataURL(files[0]);
            };



//  $('#summernote').summernote(
//  {
//  onImageUpload: function(files, editor, $editable) {
//      
//      console.log("start");
//             var name = files[0].name;
//                var imagetype = files[0].type;
//             var   filesize = files[0].size;
////    console.log('image upload:', files, editor, $editable);
//            var reader = new FileReader();
//                reader.onload = function(e) {
//                        var photoName = name.replace(/[)\(]/gi, '');
//                        photoName = photoName.replace(/\s/g, '_');
//                        var target = getTarget(e, "pural");
//                        var src = target.result;
//                    
//                   $http({
//                url: apiPath+"/test/WriteImage",
//                method: "POST",
//                data:{ "imagename": photoName, "src" : src, "type" : imagetype},
//                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//            }).success(function(data, status, headers, config) {
//                console.log("end");
//                     editor.insertImage($editable, src, photoName);
//                
//              //  $scope.persons = data; // assign  $scope.persons here as promise is resolved here 
//              console.log(data);
//              console.log("ok");
//            }).error(function(data, status, headers, config) {
//               // $scope.status = status;
//               console.log("error");
//            });
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
//                    }, reader.readAsDataURL(files[0]);
//  }
//}
//  );


        });

