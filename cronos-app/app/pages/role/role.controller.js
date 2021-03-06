(function () {
  'use strict';

  angular.module('Cronos.pages.role')
      .controller('roleController',roleController);

    roleController.$inject = ['$scope', '$q', '$state', '$uibModal', '$rootScope', 'loginCheck', '$stateParams', '$uibModalStack', 'ajax', 'cronosToastr', '$timeout'];
    function roleController($scope, $q, $state, $uibModal, $rootScope, loginCheck, $stateParams, $uibModalStack, ajax, cronosToastr, $timeout) {

      var modalInstance = { close: function() {}, dismiss: function() {} };
      var roleObject = [];

      var role = this;
      $scope.insertRole = true;
      $scope.editRole = false;
      $scope.deleteRole = false;
      $scope.refreshDt = false;
      console.log($scope);
      
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
              { "title": "Role ID", "data":  "roleName", "className": "text-left", "defaultContent": "-"},
              { "title": "Description Role", "data":  "roleDescription", "className": "text-left", "defaultContent": "-"},
              { "title": "Status", "data":  "status", "className": "text-left", "defaultContent": "-"},
          ]
      };

      $scope.submitRoleForm = function(isValid){
          console.log(isValid);
          if(isValid){
              this.role.createdBy = "createdBy";
              this.role.createdDate = "createdDate";
              this.role.lastUpdateBy = "updateBy";
              this.role.lastUpdateDate = "updateDate";
              var data = this.role;
              var url = "/api/role/add";
              if($scope.isEdit){
                url = "/api/role/update";
              }
              console.log(data);

              if(data.length != 0){
                  ajax.http('POST', data, url, 'application/json')
                  .then(function(data) {
                      if(data.status == 200 ){
                        $uibModalStack.dismissAll();
                        cronosToastr.success(data.status+' : '+data.message);
                      } else {
                          cronosToastr.error(data.status+' : '+data.message);
                      } 
                  }, function(error) {
                      cronosToastr.error(error.status+' : '+error.message);
                });
              } else {
                $scope.refreshDt = true;
                $scope.role = null;
              }

          } 
      };

      var modalShow = function (url) {
        $scope.refreshDt = false;
        var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: url,
                size: 'lg',
                scope: modalScope
            }).closed.then(function(){
              $scope.refreshDt = true;
            });
            modalScope.modalInstance = modalInstance;
      };

        $scope.doDelete = function() {
          $scope.deleteRoleFunction(roleObject);
        };

        $scope.modalDelete = function(){
          modalShow('app/pages/common/message/deleteMessage.html');
        };

        $scope.deleteRoleFunction = function(roleObject){
            ajax.http('POST', {id:roleObject}, "/api/role/delete", 'application/json')
              .then(function(data) {
                  if(data.status == 200 ){
                    $uibModalStack.dismissAll();
                    cronosToastr.success(data.status+' : '+data.message);
                  } else {
                      cronosToastr.error(data.status+' : '+data.message);
                  } 
              }, function(error) {
                  cronosToastr.error(error.status+' : '+error.message);
            });
        };

        $scope.modalAdd = function(){
          $scope.action = "Add Role";
          $scope.icon = "ion-plus-circled";
          $scope.isEdit = false;
          $scope.label = "Save";

          modalShows();
        };

        $scope.modalEdit = function(){
          $scope.action = "Edit Role";
          $scope.icon = "fa fa-pencil-square-o";
          $scope.isEdit = true;
          $scope.label = "Update";

          modalShows(role);
        };

        var modalShows = function(roles){
            $scope.role = "";
            
            if(roleObject.length != 0){
                ajax.http('POST', {id: roleObject[0]}, '/api/role/getrole', 'application/json')
                .then(function(data) {
                   
                    if(data.status == 200 ){
                        $scope.role = data.data[0];
                        $scope.role.id = data.data[0].id;
                    } else {
                        cronosToastr.error(data.status+' : '+data.message);
                    } 
                }, function(error) {
                    cronosToastr.error(error.status+' : '+error.message);
              });
            } else {
                $scope.role = null;
            }

            modalShow('app/pages/role/role.add.html');

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

})();
