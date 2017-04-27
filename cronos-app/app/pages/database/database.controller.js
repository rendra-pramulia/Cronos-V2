(function () {
  'use strict';

  angular.module('Cronos.pages.database')
      .controller('databaseController', databaseController);

    databaseController.$inject = ['$scope', '$q', '$location', '$rootScope', 'ajax', 'cronosToastr', '$stateParams'];
    function databaseController($scope, $q, $location, $rootScope, ajax, cronosToastr, $stateParams) {
    	
    	var db = this;
        $scope.height = 300;
        $scope.heightBulk = 209;
        
        db.database = [
        	{
        		connType: "USER001",
        		connName: "TEST CUY",
        		module: "a@a.com"
        	},
        	{
        		connType:  "USER002",
        		connName: "Nyoba dulu gan",
        		module: "aasdgg@sdafhyyha.com"
        	},
        	{
        		connType: "USER003",
        		connName: "Ini lagi iseng",
        		module: "hhaasgrvv@yyasd.com"
        	}
        ];

        $scope.submitDatabaseForm = function(isValid){
            if(isValid) {
                db.database.push({
                    connType: this.connType,
                    connName: this.connName,
                    module: this.module
                });
            } 
        };

        $scope.deleteBase = function(base) {
            var i = db.database.indexOf(base);
            db.database.splice(i, 1);
            if(db.database.length < 1) {
                $scope.height = 0;
            } 
        };
    }

})();
