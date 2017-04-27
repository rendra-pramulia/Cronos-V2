(function () {
  'use strict';

    angular
      .module('Cronos.common')
      .controller('datepickerController', datepickerController);

    datepickerController.$inject = ['$scope', '$rootScope', 'cronosToastr', 'ajax', '$uibModal'];
    function datepickerController($scope, $rootScope, cronosToastr, ajax, $uibModal) {

      $scope.do = function() {
        console.log($scope.date);
      };

    };
  
})();