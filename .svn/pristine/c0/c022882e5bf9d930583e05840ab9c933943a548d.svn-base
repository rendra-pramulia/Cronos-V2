(function () {
    'use strict';

    angular
        .module('Cronos.common')
        .directive('formValidations', formValidations);

    formValidations.$inject = ['$compile'];
    function formValidations($compile) {
        return {
          restrict: 'E',
          scope: {
            form: '='
          },
          link: function($scope, $element, $attrs, wizard) {
            
            function submit() {
                $scope.form && $scope.form.$setSubmitted(true);
            }

          }
        };
    }

})();
