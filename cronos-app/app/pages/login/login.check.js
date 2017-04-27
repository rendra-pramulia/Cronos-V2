(function () {
    'use strict';

    angular
        .module('Cronos.pages.login')
        .factory('loginCheck', loginCheck);

    loginCheck.$inject = ['localStorage'];
    
    function loginCheck(localStorage) {
        var keyStorage = 'cronos-auth';
        
        var setStorage = function(username, token){
            users.username = username;
            users.token = token;
            users.login = 'auth';
            localStorage.add(keyStorage, users);
        };

        var init = function(){
            var user = {
                username: "",
                token: ""
            };

            var localUser = localStorage.get(keyStorage);
            if (localUser) {
                user.username = localUser.username;
                user.token = localUser.token;
            }

            return user;
        };

        var users = init();

        return {
            setStorage: setStorage,
            users: users
        };
    	
    };

})();
