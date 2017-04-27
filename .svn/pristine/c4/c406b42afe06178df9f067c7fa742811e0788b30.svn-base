(function () {
  'use strict';

  angular.module('Cronos.pages.user')
      .controller('usersControllerDelete', usersControllerDelete);

    usersControllerDelete.$inject = ['$scope', 'usersServices', '$q', '$rootScope', 'cronosToastr', '$uibModalInstance'];
    function usersControllerDelete($scope, usersServices, $q, $rootScope, cronosToastr, $uibModalInstance) {

        $scope.test = function() {
            $uibModalInstance.dismiss();
        };

        $scope.doDelete = function() {
                        usersServices.delete($rootScope.userDelete)
                    .then(function(response) {
                        //promise success
                        if(response.status == 200){
                            $uibModalInstance.close();
                            cronosToastr.success('Data has been deleted');
                        } else {
                            cronosToastr.error(response.status+' : '+response.message);
                        }
                        $rootScope.userDelete = null;
                    }, function(error) {
                        //promise rejected
                        $rootScope.userDelete = null;
                        cronosToastr.error(error.status+' : '+error.error);
                    });
            
        };

    }

})();
