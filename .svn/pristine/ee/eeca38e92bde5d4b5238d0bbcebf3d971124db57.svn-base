(function () {
  'use strict';

  angular.module('Cronos.pages.user')
      .controller('usersControllerEdit', usersControllerEdit);

    usersControllerEdit.$inject = ['$scope', 'usersServices', '$q', '$stateParams', '$location', '$rootScope', 'cronosToastr'];
    function usersControllerEdit($scope, usersServices, $q, $stateParams, $location, $rootScope, cronosToastr) {
    	var users = this;

        $scope.userSave = true;
        $scope.userBack = true;
        $scope.isEdit = true;

        var data = {
        	id: $stateParams.id
        };

    	usersServices.selectId(data)
                .then(function(response) {
                    //promise success
                    response.password = response.confirmPassword = 'cronosantymoneylandering';
                    //response.confirmPassword = 'cronos-aml';
             		$scope.users = response;
             		$scope.role =  {'id' : response.role, 'description' : response.role};
                }, function(error) {
                    //promise rejected
                    //$scope.dtData = error;
                    console.log('error', error);
                });

        $scope.submitForm = function(isValid) {
			if(isValid) {
				var data = this.users;
				usersServices.update(data)
	                .then(function(response) {
	                    //promise success
	                    if(response.status == 200){
	                    	$rootScope.saved = true;
	                    	$location.path('/usermanagement').replace();
	                    } else {
	                    	cronosToastr.error(response.status+' : '+response.message);
	                    }
	                }, function(error) {
	                    //promise rejected
	                    cronosToastr.error(error.status+' : '+error.error);
	                });
			} else {
				alert('invalid');
			}
        };

    }

})();