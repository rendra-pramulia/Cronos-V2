(function () {
    'use strict';

    angular
        .module('Cronos.pages.user')
        .factory('usersServices', usersServices);

    usersServices.$inject = ['$http', '$rootScope', '$window', 'localStorage', '$q'];
    function usersServices($http, $rootScope, $window, localStorage, $q) {
        var userAction = {};
        
        userAction.getAll = function() {

            return $http({
                        method: 'GET',
                        url: $rootScope.urlCronos+'/api/user/selectall'
                        //url: './data.json'
                    })
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });

        };

        userAction.selectId = function(data) {
            return $http({
                        method: 'POST',
                        url: $rootScope.urlCronos+'/api/user/selectuser',
                        data: data
                    })
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });
        };

        userAction.update = function(data) {

            return $http({
                        method: 'POST',
                        url: $rootScope.urlCronos+'/api/user/updateonedit',
                        data: data
                    })
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });            

        };

        userAction.insert = function(data){

            return $http({
                        method: 'POST',
                        url: $rootScope.urlCronos+'/api/user/insert',
                        data: data
                    })
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });

        };

        userAction.delete = function(data){

            return $http({
                        method: 'POST',
                        url: $rootScope.urlCronos+'/api/user/delete',
                        data: data
                    })
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });

        };
        
        return userAction;

    }

})();
