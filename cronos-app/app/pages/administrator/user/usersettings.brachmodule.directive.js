(function () {
    'use strict';

    angular
        .module('cronos.pages.administrator')
        .directive('branchModule', branchModule);

    branchModule.$inject = ['$compile'];
    function branchModule($compile) {
        return {
            restrict: "E",
            scope: {},
            templateUrl: "app/pages/administrator/user/user.branchmodule.html", 
            controller: function($scope, $element) {  
                $scope.delete = function() {
                    $element.remove();
                    $scope.destroy();
                }
            },
            link:function ($scope, $element, $attrs, controller){
                
            }
        };
    }

})();
