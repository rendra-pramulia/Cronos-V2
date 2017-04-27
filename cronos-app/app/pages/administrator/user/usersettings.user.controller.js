(function () {
  'use strict';

  angular.module('cronos.pages.administrator')
      .controller('userSettingsUserController', userSettingsUserController);

    userSettingsUserController.$inject = ['$scope', '$q', '$state', '$uibModal', '$rootScope', 'loginCheck'];
    function userSettingsUserController($scope, $q, $state, $uibModal, $rootScope, loginCheck) {

      var userObject = [];

      $scope.insertUser = true;
      $scope.editUser = false;
      $scope.deleteUser = false;

        $scope.dtConfig = {
            "processing": true,
            "serverSide": true,
            "responsive": false,
            "ajax": {
                "url": $rootScope.urlCronos+"/api/user/getuser/dt",
                "method": "POST",
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", loginCheck.users.token);
                }
            },
            "columns": [
                { "title": "User ID", "data":  "username", "className": "text-left", "defaultContent": "-"},
                { "title": "Name", "data":  "fullName", "className": "text-left", "defaultContent": "-"},
                { "title": "Email", "data":  "email", "className": "text-left", "defaultContent": "-"},
                { "title": "Type", "data":  "", "isAdmin": "text-left", "defaultContent": "-"},
                { "title": "Status", "data":  "status", "className": "text-left", "defaultContent": "-"},
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

        $scope.modalDelete = function(){
      
            var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/common/message/deleteMessage.html',
                size: 'lg',
                scope: modalScope
            }).closed.then(function(){
              
              alert('modal closed');
              
            });
            modalScope.modalInstance = modalInstance;
        };

        $scope.selectedRow = function(selected, tableData){
          var a = userObject.indexOf(tableData.id);
          $scope.userId = null;
          if(selected == 1) {
            userObject = [];
            userObject.push(tableData.id);
            $scope.userId = userObject[0];
            console.log( userObject );
            $scope.editUser = true;
            $scope.deleteUser = true;
            $scope.insertUser = false;
          } else if(selected > 1) {
            $scope.editUser = false;
            $scope.insertUser = false;
            $scope.deleteUser = true;
            if(a == -1){
              userObject.push(tableData.id);
              console.log( userObject );
            } else {
              userObject.splice(a, 1);
              console.log( userObject );
            }   
          } else {
            $scope.editUser = false;
            $scope.insertUser = true;
            $scope.deleteUser = false;
            userObject = [];
          }
        };
        
    };

    userSettingsUserController.hovered = function() {
        // toggle something on hover.
    };

    userSettingsUserController.toggle = function() {
        this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
    };

    userSettingsUserController.closeMenu = function() {
        this.menuState = 'closed';
    };



})();
