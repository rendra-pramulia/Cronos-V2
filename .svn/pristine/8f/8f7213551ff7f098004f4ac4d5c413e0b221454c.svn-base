(function () {
  'use strict';

  angular.module('cronos.pages.administrator')
      .controller('userSettingsUserEditController', userSettingsUserEditController);

    userSettingsUserEditController.$inject = ['$scope', '$stateParams', '$q', '$location', '$rootScope', 'ajax', 'cronosToastr'];
    function userSettingsUserEditController($scope, $stateParams, $q, $location, $rootScope, ajax, cronosToastr) {
    	
    	var user = this;
        $scope.userSave = true;
        $scope.userBack = true;
        $scope.isEdit = false;
    	
        //$scope.types = 'manual';      
        var data = {
            id: $stateParams.id
        }

        $scope.submitUserForm = function(isValid){
            console.log(isValid);
            if(isValid){
                var data = this.user;
                console.log(data);
            } 
        };


        
        
        ajax.http('POST', {}, '/api/role/getrole', 'application/json')
            .then(function(data) {
                //promise success
                if(data.status == 200){
                    console.log("datanya " ,data);
                    $scope.listRole = data.data;
                } else {
                    cronosToastr.error(data.status+' : '+data.message);
                } 
            }, function(error) {
                //promise rejected
                console.log('error', error);
                cronosToastr.error(error.status+' : '+error.message);
        });

        ajax.http('POST', {}, '/api/group/getgroup', 'application/json')
            .then(function(data) {
                if(data.status == 200){
                    $scope.listGroup = data.data;
                } else {
                    cronosToastr.error(data.status+' : '+data.message);
                }
            }, function(error) {
                cronosToastr.error(error.status+' : '+error.message);   
        })

    }

})();
