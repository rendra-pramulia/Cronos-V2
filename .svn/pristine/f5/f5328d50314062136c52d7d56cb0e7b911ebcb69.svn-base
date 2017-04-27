(function () {
  'use strict';

  angular.module('cronos.pages.administrator')
      .controller('groupSettingsGroupAddController', groupSettingsGroupAddController);

    userSettingsUserAddController.$inject = ['$scope', '$q', '$location', '$rootScope', 'ajax', 'cronosToastr', '$stateParams'];
    function groupSettingsGroupAddController($scope, $q, $location, $rootScope, ajax, cronosToastr, $stateParams) {
    	
        function getRoleGroup(ids){
            ajax.http('POST', {}, '/api/role/getrole', 'application/json')
                .then(function(data) {
                    if(data.status == 200){
                        $scope.listRole = data.data;
                        getGroup(ids);
                    } else {
                        cronosToastr.error(data.status+' : '+data.message);
                    } 
                }, function(error) {
                    cronosToastr.error(error.status+' : '+error.message);
            });
            
        }

        function getGroup(ids){
            ajax.http('POST', {}, '/api/group/getgroup', 'application/json')
                .then(function(data) {
                    if(data.status == 200){
                        $scope.listGroup = data.data;
                        if(ids){
                             getUserData(ids);
                         }
                    } else {
                        cronosToastr.error(data.status+' : '+data.message);
                    }
                }, function(error) {
                    cronosToastr.error(error.status+' : '+error.message);   
            });
        }
        
    	var user = this;
        $scope.height = 0;
        $scope.userSave = true;
        $scope.userBack = true;
        $scope.isEdit = false;
        
        user.bussinessUnit = [];

        $scope.addBranch = function() {
            $scope.height = 300;
            user.bussinessUnit.push({
                module: "WEW",
                bussinessUnit: "London,Berlin,Paris,Rome,Munich"
            });
        };

        $scope.deleteBranch = function(event) {
            event.currentTarget.closest('tr').remove();
        };

        $scope.showBranch = function () {

            /*var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/common/message/deleteMessage.html',
                size: 'lg',
                scope: modalScope
            }).closed.then(function(){
                alert('modal closed');
            });
            modalScope.modalInstance = modalInstance;*/

        };
        
        $scope.change = function() {
            //$scope.username = '';
        };
        
        $scope.tipe = function() {
        }; 

        $scope.submitUserForm = function(isValid){
            if(isValid){
                var data = this.user;
            } 
        };
        
        $scope.submitUserForm = function(isValid){
            if(isValid){
                var data = this.user;
            } 
        };
        
        
        if($stateParams.id) {
            $scope.isEdit = true;
            getRoleGroup($stateParams.id);

        } else {
            getRoleGroup();
        };
        
        function getUserData(ids){
            var data = {
                id: ids
            };
            ajax.http('POST', data, '/api/user/getuser', 'application/json')
                .then(function(data) {
                   
                    if(data.status == 200 ){
                        $scope.user = data.data[0];
                    } else {
                        cronosToastr.error(data.status+' : '+data.message);
                    } 
                }, function(error) {
                    cronosToastr.error(error.status+' : '+error.message);
            });
        };

        $scope.change = function(user) {
            $scope.user.username = '';
            $scope.user.password = '';
            $scope.user.confirmPassword = '';
            $scope.user.username = '';
            $scope.user.employeeId = '';
            $scope.user.email = '';
            $scope.user.phone = '';
            $scope.user.status = '';
            $scope.user.roleId = '';
            $scope.user.groupId = '';
        };

    }

})();
