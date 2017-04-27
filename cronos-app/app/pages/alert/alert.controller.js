(function () {
  'use strict';

  angular.module('Cronos.pages.alert')
      .controller('alertController', alertController);

    alertController.$inject = ['$scope', '$q', '$rootScope', 'cronosToastr', 'loginCheck', 'ajax'];
    function alertController($scope, $q, $rootScope, cronosToastr, loginCheck, ajax) {

        $scope.listUser = null;
        var dataDelete = new Object();
        var id = [];

        /*ajax.http('GET', '', '/api/get-data', 'application/json')
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
                });*/

        $scope.dtConfig = {
            "processing": true,
            "serverSide": true,
            "responsive": false,
            "ajax": {
                "url": $rootScope.urlCronos+'/api/datatables/get-data',
                "method": "POST"
            },
            "columns": [
                { "title": "Party Key", "data":  "party_key", "className": "text-left", "defaultContent": "-"},
                { "title": "Party Name", "data":  "party_first_name", "className": "text-left", "defaultContent": "-"},
                { "title": "Party ID", "data":  "primary_party_id", "className": "text-left", "defaultContent": "-"}
            ]
        };
        
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

    alertController.prototype.hovered = function() {
        // toggle something on hover.
    };

    alertController.prototype.toggle = function() {
        this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
    };

    alertController.prototype.closeMenu = function() {
        this.menuState = 'closed';
    };

})();
