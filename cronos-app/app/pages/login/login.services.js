(function () {
    'use strict';

    angular
        .module('Cronos.pages.login')
        .factory('cronosMainFactory', LoginFactory);

    LoginFactory.$inject = ['$http', '$rootScope', 'localStorage', 'loginCheck', '$location'];
    function LoginFactory($http, $rootScope, localStorage, loginCheck, $location) {
    	var authService = {};
        
        authService.login = function(user, success, error) {

            var data = {
                username: user.username,
                password: user.password
            };

            return $http.post($rootScope.urlCronos+'/login', data)
                .then(function (response) {
                    console.log(response);
                    loginCheck.setStorage(user.username, response.data.data.token);
                    return success(username);
                });

        };

        authService.logout = function(){
            return $http.post($rootScope.urlCronos+'/auth_logout').then(function (response) {
                  localStorage.remove("cronos-auth");
                  $location.path('/login').replace();
               });
        };

        authService.triggerLogout = function() {
            localStorage.remove("cronos-auth");
            $location.path('/login').replace();
        };

        return authService;

    }

})();
