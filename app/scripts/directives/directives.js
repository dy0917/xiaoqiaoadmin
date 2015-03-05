/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
app.directive('aside', function() {
    return{
        templateUrl: 'views/partials/aside.html'
    };
});

app.directive('loginandregisterdirective', function() {
    return{
        templateUrl: 'views/partials/loginAndRegisterLightbox.html'
    };
});
app.directive('popupbox', function() {
    return{
        templateUrl: 'views/partials/popupbox.html'
    };
});
app.directive('summernote', function() {
    return{
        templateUrl: 'views/partials/summernote.html'
    };
});

app.directive('popupform', function() {
    return{
        templateUrl: 'views/partials/form.html'
    };
});

app.directive('validFile', function() {
    return {
        require: 'ngModel',
        link: function(scope, el, attrs, ngModel) {

            el.bind('change', function() {
                scope.$apply(function() {

                    if (!el.val())
                    {

                        scope.isFileExist = true;
                    } else {
                        scope.isFileExist = false;

                    }
                });
            });
        }

    };

});