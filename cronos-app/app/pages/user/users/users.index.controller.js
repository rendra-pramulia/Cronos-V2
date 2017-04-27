(function () {
  'use strict';

  angular.module('Cronos.pages.user')
      .controller('usersControllerIndex', usersControllerIndex);

    usersControllerIndex.$inject = ['$scope', 'usersServices', 'datatablesService','$q', '$rootScope', 'cronosToastr', 'loginCheck', 'ajax'];
    function usersControllerIndex($scope, usersServices, datatablesService, $q, $rootScope, cronosToastr, loginCheck, ajax) {

        $scope.listUser = null;
        var dataDelete = new Object();
        var id = [];
        var xTable;        
        var columns;
        //$uibModalInstance = modalInstance
        if($rootScope.saved){
            cronosToastr.success('Data has been saved');
            $rootScope.saved = false;
        };

        ajax.http('GET', '', '/api/user/selectall', 'application/json')
            .then(function(data) {
                    //promise success
                    if(data.status == 200){
                        $scope.dtData = data.data;
                        $scope.listUser = data.data;
                    } else {
                        cronosToastr.error(data.status+' : '+data.message);
                    } 
                }, function(error) {
                    //promise rejected
                    //$scope.dtData = error;
                    console.log('error', error);
                    cronosToastr.error(error.status+' : '+error.error);
                });
                

        /*$scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
             // Either you specify the AjaxDataProp here
             // dataSrc: 'data',
             url: $rootScope.urlCronos+'/api/datatables/get-data',
             type: 'POST',
             data: {'id':1}
         })
         // or here
         .withDataProp('data')
            .withOption('processing', true)
            .withOption('serverSide', true)
            .withPaginationType('full_numbers');
            
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID'),
            DTColumnBuilder.newColumn('username').withTitle('UserName'),
            DTColumnBuilder.newColumn('role').withTitle('Role')
        ];*/        

        /*$scope.dtConfig = {
            "bDestroy" : true,
            "ajax" : ajax,
            "columns" : columns
        };*/

        /*$('#table-user').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": ajax,
            "columns": [
                { "title": "ID", "data":  "id", "className": "text-left", "defaultContent": "-"},
                { "title": "Username", "data":  "username", "className": "text-left", "defaultContent": "-"},
                { "title": "Role", "data":  "role", "className": "text-left", "defaultContent": "-"}
            ]
        });*/

        $scope.dtConfig = {
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": $rootScope.urlCronos+'/api/user/selectall',
                "method": "GET"
            },
            "columns": [
                { "title": "ID", "data":  "id", "className": "text-left", "defaultContent": "-"},
                { "title": "Username", "data":  "username", "className": "text-left", "defaultContent": "-"},
                { "title": "Role", "data":  "role", "className": "text-left", "defaultContent": "-"}
            ]
        };

        /*$scope.dtConfig = {
            bStateSave: true,
            bJQueryUI: false,
            bPaginate: true,
            //bServerSide: true,
            bProcessing: true,
            //ajax: ajax,
            columns: [
                { "sTitle": "ID", "mData":  "id", "sClassName": "text-left", "sDefaultContent": "-"},
                { "sTitle": "Username", "mData":  "username", "sClassName": "text-left", "sDefaultContent": "-"},
                { "sTitle": "Role", "mData":  "role", "sClassName": "text-left", "sDefaultContent": "-"}
            ]/*,
            columnDefs: [
                {
                    targets: 2,
                    data: null,
                    bSortable: false,
                    defaultContent: "<a data-ng-click='clickMeInternal ()'>Click me:10000</a>"
                }            
            ]
        };*/
        
        $scope.clickMe = function (selected, data) {
            $scope.userId = null;
            if(selected == 1){
                $scope.userId = data.id;
                $scope.userAddDisabled = true;
                $scope.userEditDisabled = false;
                $scope.userDeleteDisabled = false;
            } else if(selected > 1) {
                $scope.userAddDisabled = true;
                $scope.userEditDisabled = true;
                $scope.userDeleteDisabled = false;
            }else {
                $scope.userAddDisabled = false;
                $scope.userEditDisabled = true;
                $scope.userDeleteDisabled = true;
            }
            var a = id.indexOf(data.id);
            if(a == -1){
                id.push(data.id);
            } else {
                id.splice(a, 1);
            }
            dataDelete.id = id;
            $rootScope.userDelete = dataDelete;
        };

        $scope.userAddDisabled = false;
        $scope.userEditDisabled = true;
        $scope.userDeleteDisabled = true;

        $scope.menuState = 'closed';
        $scope.loc = loc;
        $scope.setMainAction = setMainAction;
        $scope.mainAction = mainAction;

        $scope.chosen = {
          effect : 'zoomin',
          position : 'br',
          method : 'click',
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
          href: '#'
        }];

        function loc(href) {
          
        }

        function mainAction() {
          //console.log('Firing Main Action!');
        }

        function setMainAction() {
          if($scope.chosen.action === 'fire') {
            $scope.mainAction = mainAction;
          } else {
            $scope.mainAction = null;
          }
        }

    }

    usersControllerIndex.prototype.hovered = function() {
        // toggle something on hover.
    };

    usersControllerIndex.prototype.toggle = function() {
        this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
    };

    usersControllerIndex.prototype.closeMenu = function() {
        this.menuState = 'closed';
    };

})();
