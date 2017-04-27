(function () {
  'use strict';

  angular.module('Cronos.pages.user')
      .controller('usersController', usersController);

    usersController.$inject = ['$scope', 'usersServices', '$q', '$state', '$uibModal'];
    function usersController($scope, usersServices, $q, $state, $uibModal) {

        $scope.modalDelete = function () {

            var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/common/message/deleteMessage.html',
                controller: 'usersControllerDelete',
                size: 'lg',
                scope: modalScope
            }).closed.then(function(){
              alert('modal closed');
            });
            modalScope.modalInstance = modalInstance;

        };

        /*$scope.modalDelete = function() {
             $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/common/message/deleteMessage.html',
                controller: 'usersControllerIndex',
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            }).closed.then(function(){
              alert('modal closed');
            });;
        };*/  

    };

})();
