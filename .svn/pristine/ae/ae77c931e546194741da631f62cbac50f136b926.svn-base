(function () {
    'use strict';

    angular
        .module('Cronos.pages.login')
        .factory('loginInterceptor', loginInterceptor)
        .config(function($httpProvider) {
            $httpProvider.interceptors.push("loginInterceptor");
        });

    loginInterceptor.$inject = ['$q', 'loginCheck'];
    function loginInterceptor($q, loginCheck) {

        var request = function (config) {
            if (loginCheck.users.username) {
                config.headers.Authorization = loginCheck.users.token;
            }
            return $q.when(config);
        };

        return {
            request: request,
            //"Content-Type": "text/plain"
            //"Content-Type": "application/json"
        };

    };

})();

