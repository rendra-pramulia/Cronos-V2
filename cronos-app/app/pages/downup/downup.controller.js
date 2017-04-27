(function () {
  'use strict';

  angular.module('Cronos.pages.downup')
      .controller('downupController', downupController);

    downupController.$inject = ['$scope','$q', '$rootScope', 'cronosToastr', 'ajax'];
    function downupController($scope, $q, $rootScope, cronosToastr, ajax) {

        $scope.upload = function() {
            var file = $scope.myFile;
            var fd = new FormData(file);

            console.log('ini ', fd);
            ajax.upload(fd, '/api/upload')
                .then(function(data) {
                    //promise success
                    if(data.status == 200){
                        cronosToastr.success('Data has been uploaded');
                    } else {
                        cronosToastr.error(data.status+' : '+data.message);
                    } 
                }, function(error) {
                    //promise rejected
                    console.log('error', error);
                    cronosToastr.error(error.status+' : '+error.message);
                });
        };

    }

})();
