'use strict';

/**
 * @ngdoc overview
 * @name xtripApp
 * @description
 * # xtripApp
 *
 * Main module of the application.
 */
var apiPath = "http://test.api.xiaoqiaonz.com/index.php";
//var apiPath = "http://local.test.api.xiaoqiaonz.com/";

var developmode = true;
var app = angular
        .module('xiaoqiaoApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
                    //  'angular-redactor'
        ])
        .config(function($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    })
                    .when('/admin', {
                        templateUrl: 'views/admin.html',
                        controller: 'AdminCtrl'
                    })
                    .when('/blog', {
                        templateUrl: 'views/blog.html',
                        controller: 'BlogCtrl'
                    })
                    .when('/slider', {
                        templateUrl: 'views/slider.html',
                        controller: 'SliderCtrl'
                    })
                    .when('/product', {
                        templateUrl: 'views/product.html',
                        controller: 'ProductCtrl'
                    })
//                    .when('/blog/:blogid', {
//                        templateUrl: 'views/oneblog.html',
//                        controller: 'OneBlogCtrl'
//                    })
                    .otherwise({
                        redirectTo: '/'
                    });

            //  redactorOptions.buttons = ['formatting', '|', 'bold', 'italic']; 
        });


