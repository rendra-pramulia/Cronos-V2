(function () {
  'use strict';

  angular.module('Cronos.pages.user')
      .controller('usersControllerAdd', usersControllerAdd);

    usersControllerAdd.$inject = ['$scope', 'usersServices', '$q', '$location', '$rootScope', 'cronosToastr'];
    function usersControllerAdd($scope, usersServices, $q, $location, $rootScope, cronosToastr) {
    	var users = this;
    	$scope.userSave = true;
        $scope.userBack = true;
        $scope.isEdit = false;

        $scope.submitForm = function(isValid) {
			if(isValid && (users.confirmPassword == users.password)) {
				var data = this.users;
				usersServices.insert(data)
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

        /*$scope.submit = function() {
		    // you can check is form valid with help of $valid parameter
		    console.log($scope.usersForm.$valid);
		    if($scope.usersForm.$valid){
		        alert('valid')
		    } else {
		      alert('invalid')
		    }
		}*/

		users.equal = function(){
			if(users.confirmPassword == users.password){
				return true;
			} else {
				return false;
			}
		};
	    
	    users.areuserPasswordsEqual = function () {
	      	return users.confirmPassword && users.password == users.confirmPassword;
	    };
    }

})();