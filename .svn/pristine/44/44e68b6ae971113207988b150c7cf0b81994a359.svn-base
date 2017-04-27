(function () {
    'use strict';

    angular
        .module('Cronos.pages.login')
        .controller('cronosMainController', LoginController);

    LoginController.$inject = ['$location', '$scope', '$rootScope', 'cronosMainFactory', 'localStorage'];
    function LoginController($location, $scope, $rootScope, cronosMainFactory, localStorage) {
    	//$scope.state = 'auth';
    	$scope.secret = {};
    	$scope.loginForm = {};
    	$rootScope.urlCronos = 'http://localhost:8080';
        //$rootScope.urlCronos = 'http://10.1.70.134:8080'; 
        //$rootScope.urlCronos = 'http://ati-pap-m:8080'; 

    	if(localStorage.get("cronos-auth")) {
    		$rootScope.state = localStorage.get("cronos-auth").login;
    		$scope.state = $rootScope.state;
    		$location.path('/dashboard').replace();
    	}else {
    		$rootScope.state = null;
    		$scope.state = $rootScope.state;
    		$location.path('/login').replace();
    	}

        $scope.login = function() {
        	$scope.submitted = true;
        	if(!$scope.loginForm.$invalid){
        		$scope.logins($scope.secret);
        	}else{
        		$scope.error = true;
        		return;
        	}
        };

        $scope.logout = function() {
          	cronosMainFactory.logout();
          	alert('logout success');
           	$scope.state = null;
        };

        $scope.logins = function(secret) {
        	$scope.error = false;
        	cronosMainFactory.login(secret, function(user){
        		$rootScope.state = localStorage.get("cronos-auth").login;
        		$scope.state = $rootScope.state;
        		$location.path('/dashboard').replace();
        	}, function(err){
        		$scope.error = true;
        	});
        };
        
    }

})();
