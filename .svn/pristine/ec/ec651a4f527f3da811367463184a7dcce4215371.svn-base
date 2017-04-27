(function () {
  'use strict';

  angular.module('cronos.pages.administrator')
      .controller('groupSettingsGroupController', groupSettingsGroupController);

    groupSettingsGroupController.$inject = ['$scope', '$q', '$state', '$uibModal', '$rootScope', 'loginCheck', '$stateParams', '$uibModalStack', 'ajax', 'cronosToastr'];
    function groupSettingsGroupController($scope, $q, $state, $uibModal, $rootScope, loginCheck, $stateParams, $uibModalStack, ajax, cronosToastr) {

      var modalInstance = { close: function() {}, dismiss: function() {} };
      var groupObject = [];

      var group = this;
      $scope.insertGroup = true;
      $scope.editGroup = false;
      $scope.deleteGroup = false;

        $scope.dtConfig = {
            "processing": true,
            "serverSide": true,
            "responsive": false,
            "ajax": {
                "url": $rootScope.urlCronos+"/api/group/getgroup/dt",
                "method": "POST",
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", loginCheck.users.token);
                }
            },
            "columns": [
                { "title": "Group ID", "data":  "groupName", "className": "text-left", "defaultContent": "-"},
                { "title": "Description Group", "data":  "groupDescription", "className": "text-left", "defaultContent": "-"},
                { "title": "Role ID", "data":  "listRoleName", "className": "text-left", "defaultContent": "-"},
                { "title": "Location", "data":  "groupLocation", "className": "text-left", "defaultContent": "-"},
                { "title": "Status", "data":  "status", "className": "text-left", "defaultContent": "-"},
            ]
        };

        $scope.submitGroupForm = function(isValid){
            if(isValid){
              this.group.createdBy = "createdBy";
              this.group.createdDate = "createdDate";
              this.group.lastUpdateBy = "updateBy";
              this.group.lastUpdateDate = "updateDate";
              var data = this.group;
              var url = "/api/group/add";
              if($scope.isEdit){
                url = "/api/group/update";
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

        ajax.http('POST', {}, '/api/role/getrole', 'application/json')
            .then(function(data) {
                if(data.status == 200){
                    $scope.listRole = data.data;
                } else {
                    cronosToastr.error(data.status+' : '+data.message);
                } 
            }, function(error) {
                cronosToastr.error(error.status+' : '+error.message);
        });

        $scope.modalDelete = function(){
      
            var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/common/message/deleteMessage.html',
                size: 'lg',
                scope: modalScope
            }).closed.then(function(){

              $scope.deleteGroupfunction(groupObject);
              $scope.refreshDt = true;
              $scope.insertGroup = true;
              $scope.editGroup = false;
              $scope.deleteGroup = false; 
              alert('modal closed');
              
            });
            modalScope.modalInstance = modalInstance;
        };

        $scope.deleteGroupfunction = function(groupObject){
          console.log("masuk function delete group "+ groupObject);
            ajax.http('POST', {id:groupObject}, "/api/group/delete", 'application/json')
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
          $scope.refreshDt = true;
        };

        $scope.modalAdd = function(){
          $scope.action = "Add Group";
          $scope.icon = "ion-plus-circled";
          $scope.isEdit = false;
          $scope.refreshDt = true;
          $scope.label = "Save";

          modalShow();
        };

        $scope.modalEdit = function(){
          $scope.action = "Edit Group";
          $scope.icon = "fa fa-pencil-square-o";
          $scope.isEdit = true;
          $scope.label = "Update";

          modalShow(group);
        };

        var modalShow = function(group){

            if(groupObject.length != 0){
                ajax.http('POST', {id: groupObject[0]}, '/api/group/getgroup', 'application/json')
                .then(function(data) {
                   
                    if(data.status == 200 ){
                        $scope.group = data.data[0];
                    } else {
                        cronosToastr.error(data.status+' : '+data.message);
                    } 
                }, function(error) {
                    cronosToastr.error(error.status+' : '+error.message);
              });
            } else {
                $scope.group = null;
            }


            var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/administrator/group/group.add.html',
                size: 'lg',
                scope: modalScope
            }).closed.then(function(){

                alert('modal closed');
                $scope.refreshDt = true;
            });
            modalScope.modalInstance = modalInstance;

        };

        $scope.selectedRow = function(selected, tableData){
          var a = groupObject.indexOf(tableData.id);
          $scope.groupId = null;
          if(selected == 1) {
            groupObject = [];
            groupObject.push(tableData.id);
            $scope.groupId = groupObject[0];
            $scope.editGroup = true;
            $scope.deleteGroup = true;
            $scope.insertGroup = false;
          } else if(selected > 1) {
            $scope.editGroup = false;
            $scope.insertGroup = false;
            $scope.deleteGroup = true;
            if(a == -1){
              groupObject.push(tableData.id);
            } else {
              groupObject.splice(a, 1);
            }   
          } else {
            $scope.editGroup = false;
            $scope.insertGroup = true;
            $scope.deleteGroup = false;
            groupObject = [];
          }
        };
        
    };

})();
