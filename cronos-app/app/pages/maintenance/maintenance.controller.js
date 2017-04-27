(function () {
  'use strict';

  angular.module('Cronos.pages.maintenance')
      .controller('maintenanceController',maintenanceController);

    maintenanceController.$inject = ['$scope', '$q', '$state', '$uibModal', '$rootScope', 'loginCheck', '$stateParams', '$uibModalStack', 'ajax', 'cronosToastr'];
    function maintenanceController($scope, $q, $state, $uibModal, $rootScope, loginCheck, $stateParams, $uibModalStack, ajax, cronosToastr) {

      var modalInstance = { close: function() {}, dismiss: function() {} };
      var roleObject = [];

      var module = this;
      $scope.insertModule = true;
      $scope.editRole = false;
      $scope.deleteRole = false;

        $scope.dtConfig = {
            "processing": true,
            "serverSide": true,
            "responsive": false,
            "ajax": {
                "url": $rootScope.urlCronos+"/api/role/getrole/dt",
                "method": "POST",
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", loginCheck.users.token);
                }
            },
            "columns": [
                { "title": "Module Name", "data":  "", "className": "text-left", "defaultContent": "-"},
                { "title": "Description", "data":  "", "className": "text-left", "defaultContent": "-"},
                { "title": "Category", "data":  "", "className": "text-left", "defaultContent": "-"},
                { "title": "Version", "data":  "", "className": "text-left", "defaultContent": "-"},
                { "title": "Install Date", "data":  "", "className": "text-left", "defaultContent": "-"},
                { "title": "Restart", "data":  "", "className": "text-left", "defaultContent": "-"},
            ]
        };

        $scope.chosen = {
          effect : 'zoomin',
          position : 'br',
          method : 'dblclick',
          action : 'fire'
        };

        $scope.buttons = [{
          label: 'Delete',
          icon: 'ion-android-delete',
          href: '#'
        },{
          label: 'Edit',
          icon: 'ion-android-create',
          href: '#'
        },{
          label: 'Add',
          icon: 'ion-android-add-circle',
          href: 'test'
        }];

        function loc(href) {
          console.log('haha ',href);
        };

        function mainAction() {
          //console.log('Firing Main Action!');
        };

        function setMainAction() {
          if($scope.chosen.action === 'fire') {
            $scope.mainAction = mainAction;
          } else {
            $scope.mainAction = null;
          }
        };

        $scope.modalAdd = function(){
          $scope.action = "Upload Module File";
          modalShow();
        };

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
                $uibModalStack.dismissAll();
        };
        
        var modalShow = function(){
            console.log();
            
            var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/maintenance/maintenance.add.html',
                size: 'lg',
                scope: modalScope
            }).closed.then(function(){
               alert('modal closed');
            });
            modalScope.modalInstance = modalInstance;

        };

        $scope.restartService = function(){
          $scope.action = "Setting Restart Service & Broadcast";
          modalService();
        };

        $scope.patchProcess = function(){
          $scope.action = "Patch process Cronos V2 - Installation Wizard";
          modalPatch();
        };

        var modalPatch = function(){
            
            var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/maintenance/patchProcess.html',
                size: 'lg',
                scope: modalScope
            }).closed.then(function(){
               alert('modal closed');
            });
            modalScope.modalInstance = modalInstance;

        };

        var modalService = function(){
            
            var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/maintenance/restartService.html',
                size: 'lg',
                scope: modalScope
            }).closed.then(function(){
               alert('modal closed');
            });
            modalScope.modalInstance = modalInstance;

        };

        $scope.selectedRow = function(selected, tableData){
          var a = roleObject.indexOf(tableData.id);
          $scope.roleId = null;
          if(selected == 1) {
            roleObject = [];
            roleObject.push(tableData.id);
            $scope.roleId = roleObject[0];
            console.log( roleObject );
            $scope.editRole = true;
            $scope.deleteRole = true;
            $scope.insertRole = false;
          } else if(selected > 1) {
            $scope.editRole = false;
            $scope.insertRole = false;
            $scope.deleteRole = true;
            if(a == -1){
              roleObject.push(tableData.id);
            } else {
              roleObject.splice(a, 1);
            }   
          } else {
            $scope.editRole = false;
            $scope.insertRole = true;
            $scope.deleteRole = false;
            roleObject = [];
          }
        };
        
    };

    maintenanceController.hovered = function() {
        // toggle something on hover.
    };

    maintenanceController.toggle = function() {
        this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
    };

    maintenanceController.closeMenu = function() {
        this.menuState = 'closed';
    };



})();
