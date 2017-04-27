(function () {
	'use strict';
	
	angular
		.module('Cronos.pages.workflow')
		.controller('workflowController', workflowController);
	
	workflowController.$inject = ['$scope', '$rootScope', 'cronosToastr', 'ajax', '$uibModal'];
	function workflowController($scope, $rootScope, $cronosToastr, $ajax, $uibModal) {
		
		$scope.jsonVar = {
				"jsplumb": [{
				    "id" : "1",
				    "posX" : 83,
				    "posY" : 40,
				    "name" : "step 1.1",
				},
				{
				    "id" : "2",
				    "posX" : 163,
				    "posY" : 200,
				    "name" : "step 2",
				},
				{
				    "id" : "3",
				    "posX" : 323,
				    "posY" : 50,
				    "name" : "name 1.2",
				}],
				"connector": [{
				    "id" : "5",
				    "source" : "1",
				    "target" : "2"
				},
				{
				    "id" : "6",
				    "source" : "3",
				    "target" : "2"
				}]	
			};
		
		$scope.modalDelete = function(){
			
			var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/common/message/deleteMessage.html',
                size: 'lg',
                scope: modalScope
            }).closed.then(function(kotakannya){
            	
            	alert('modal closed');
            	$('body .deletedBox').removeClass('deletedBox');
            });
            modalScope.modalInstance = modalInstance;
		};
		
		$scope.modalAdd = function(){
			$scope.action = "Add";
			$scope.icon = "ion-plus-circled";
			$scope.clickAct = "addNew();";
			modalShow();
		};
		
		$scope.modalEdit = function(){
			//$scope.id = ;
			$scope.id = $scope.editBox.id;
			$scope.name = $scope.editBox.name;
			$scope.action = "Edit";
			$scope.icon = "ion-android-create";
			$scope.clickAct = "editBox();";
			modalShow();
		};
		
		var modalShow = function(){
			var modalScope = $scope.$new();
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: 'app/pages/workflow/addWorkflow.html',
                size: 'lg',
                scope: modalScope
            }).closed.then(function(){
               alert('modal closed');
            });
            modalScope.modalInstance = modalInstance;
		};
		
		
		
		$scope.tambahBox = function(addNew){
			$scope.addNew = addNew;
		}
		
		$scope.addBox = function(){
			console.log("masuk function addBox");
		}
		
		$scope.editBox = function(id, name){
			$scope.id = id;
			$scope.name = name;
			console.log("masuk function editBox "+ id + name);
		}
		
		//buat id nya
		$scope.deleteBox = function(id){
			console.log("masuk function delete box "+ id);
		};

		$scope.delBox = function(doDelete){
			console.log('delBox', doDelete);
			$scope.doDelete = doDelete;
		}
		
		$scope.updatePosition = function(posX, posY, id){
			console.log("masuk function updatePosition " + posX + posY + " id box nya " + id);
		};

        $scope.chosen = {
          effect : 'zoomin',
          position : 'br',
          method : 'click',
          action : 'fire'
        };

        $scope.buttons = [{
          label: 'Add',
          icon: 'ion-android-add-circle',
          href: 'userManagement.user'
        }];

        $scope.AddNew = function() {
        	console.log("Masuk function add new");
        	
        };
        

    }

    
})();