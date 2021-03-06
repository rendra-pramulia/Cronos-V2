(function () {
  'use strict';

  angular.module('cronos.pages.administrator')
      .controller('userSettingsUserAddController', userSettingsUserAddController);

    userSettingsUserAddController.$inject = ['$scope', '$q', '$location', '$rootScope', 'ajax', 'cronosToastr', '$stateParams'];
    function userSettingsUserAddController($scope, $q, $location, $rootScope, ajax, cronosToastr, $stateParams) {
    	
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
                    console.log('error', error);
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
        $scope.height = 300;
        $scope.userSave = true;
        $scope.userBack = true;
        $scope.isEdit = false;
        
        user.bussinessUnit = [
            {
                module: "CPM",
                bussinessUnit: "wew, wew, wew"
            },
            {
                module: "DFS",
                bussinessUnit: "ngiha, ngiha"
            }
        ];

        $scope.addBranch = function() {
            $scope.height = 300;
            user.bussinessUnit.push({
                module: "",
                bussinessUnit: ""
            });
            console.log(user.bussinessUnit);
        };

        $scope.deleteBranch = function(bu) {
            console.log(bu);
            var i = user.bussinessUnit.indexOf(bu);
            user.bussinessUnit.splice(i, 1);
            if(user.bussinessUnit.length < 1) {
                $scope.height = 0;
            } 
            //event.currentTarget.closest('tr').remove();
        };

        $scope.showBranch = function () {

            console.log($scope.businessUnit);

        };
        
        $scope.change = function() {
        	console.log('ruba', $scope.userId);
        };
        
        $scope.tipe = function() {
            console.log('WOY ',$scope.types);
        };
        
        $scope.submitUserForm = function(isValid){
            console.log(isValid);
            if(isValid){
                var data = this.user;
                console.log(data);
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
            console.log('WEW ',data);
            ajax.http('POST', data, '/api/user/getuser', 'application/json')
                .then(function(data) {
                   
                    if(data.status == 200 ){
                        console.log("datanya " ,data);
                        $scope.user = data.data[0];
                        console.log("ini getdata");
                    } else {
                        cronosToastr.error(data.status+' : '+data.message);
                    } 
                }, function(error) {
                    console.log('error', error);
                    cronosToastr.error(error.status+' : '+error.message);
            });
        };

        $scope.change = function(user) {
        	console.log($scope.user);
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
