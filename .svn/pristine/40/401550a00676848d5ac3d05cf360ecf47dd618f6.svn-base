(function () {
  'use strict';

  angular.module('cronos.pages.administrator')
      .controller('userSettingsUserAddBulkController', userSettingsUserAddBulkController);

    userSettingsUserAddBulkController.$inject = ['$scope', '$q', '$location', '$rootScope', 'ajax', 'cronosToastr', '$stateParams', '$uibModal', '$uibModalStack'];
    function userSettingsUserAddBulkController($scope, $q, $location, $rootScope, ajax, cronosToastr, $stateParams, $uibModal, $uibModalStack) {
    	
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
        $scope.heightBulk = 209;
        $scope.userSave = true;
        $scope.userBack = true;
        $scope.isEdit = false;
        
        user.bussinessUnit = [
            {
                module: 1,
                bussinessUnit: "wew, wew, wew"
            },
            {
                module: 3,
                bussinessUnit: "ngiha, ngiha"
            }
        ];

        $scope.module = [
            {
                id: 1,
                label: "AML-TRM",
                inUse: false
            },
            {
                id: 2,
                label: "AML-CPM",
                inUse: false
            },
            {
                id: 3,
                label: "AML-DFS",
                inUse: false
            }
        ];

        user.userBulk = [
        	{
        		userId: "USER001",
        		userName: "TEST CUY",
        		emails: "a@a.com"
        	},
        	{
        		userId:  "USER002",
        		userName: "Nyoba dulu gan",
        		emails: "aasdgg@sdafhyyha.com"
        	},
        	{
        		userId: "USER003",
        		userName: "Ini lagi iseng",
        		emails: "hhaasgrvv@yyasd.com"
        	}
        ];

        $scope.addBU = function() {
            $scope.height = 300;
            user.bussinessUnit.push({
                module: "",
                bussinessUnit: ""
            });
        };

        $scope.deleteBU = function(bu) {
            console.log(bu);
            var i = user.bussinessUnit.indexOf(bu);
            user.bussinessUnit.splice(i, 1);
            if(user.bussinessUnit.length < 1) {
                $scope.height = 0;
            } 
        };
        
        $scope.showBU = function(bulk) {
        	var i = user.bussinessUnit.indexOf(bulk);
        	console.log(i);
        	console.log(user.bussinessUnit[i]);
        };

        $scope.moduleChange = function(bulk) {
            var i = user.bussinessUnit.indexOf(bulk);
            var check = user.bussinessUnit[i].module;
            for(var x=0; x<= user.bussinessUnit.length; x++) {
                console.log(check+" == "+user.bussinessUnit[x].module);
            }
        };

        $scope.addBulk = function() {
            $scope.height = 209;
            modalShow('app/pages/administrator/user/addbulk.html');
        };

        $scope.deleteBulk = function(bulk) {
            var i = user.userBulk.indexOf(bulk);
            user.userBulk.splice(i, 1);
            if(user.userBulk.length < 1) {
                $scope.height = 0;
            } 
        };

        $scope.uploadBulk = function() {
        	modalShow('app/pages/administrator/user/uploadbulk.html');
        };

        $scope.submitUserBulk = function(isValid){
            if(isValid) {
            	user.userBulk.push({
	                userIdd: this.userid,
	        		userName: this.name,
	        		emails: this.emails	
	            });
	            $uibModalStack.dismissAll();
            } 
        };

        $scope.submitUpload = function(isValid) {
        	if (isValid) {
        		console.log('valid');
        	}
        };
        
        getRoleGroup();

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

        function modalShow(temp){
            var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: temp,
                size: 'md',
                scope: modalScope
            }).closed.then(function(){
               
            });
            modalScope.modalInstance = modalInstance;

	    };

    }

})();
