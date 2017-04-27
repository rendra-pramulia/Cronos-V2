(function () {
    'use strict';

    angular
        .module('Cronos.common')
        .factory('ajax', ajaxService);

    ajaxService.$inject = ['$http', '$q', '$rootScope', 'cronosToastr', 'cronosMainFactory', '$location'];
    function ajaxService($http, $q, $rootScope, cronosToastr, cronosMainFactory, $location) {

    	var ajax = {};
        
        ajax.http = function(method, data, url, contentType) {

            return $http({
                        method: method,
                        url: $rootScope.urlCronos+''+url,
                        data: data,
                        headers: {'Content-Type': contentType}
                    })
                    .then(function(response) {
                        console.log('success ',response);
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        cronosToastr.error(response.data.status+' : '+response.data.message);
                        // something went wrong
                        if(response.data.status == 401){
                            cronosMainFactory.triggerLogout();
                        } else {
                            cronosMainFactory.logout();    
                        }
                        $rootScope.state = null;
                        //return $q.reject(response.data);
                    });

        };

        ajax.upload = function(data, url) {

            var request = {
                    method: 'POST',
                    url: $rootScope.urlCronos+''+url,
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: data,
                    data: {
                        data: data,
                        file: data
                    }
                };

            return $http(request).then(function(response) {
                        return response.data;
                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });

            /*return $http.post($rootScope.urlCronos+''+url, data, {
                    enctype: 'multipart/form-data',
                    prosesData: false,
                    cache: false,
                    headers: {'Content-Type': undefined}
                }).then(function(response) {
                        return response.data;
                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });*/

            /*return $http({
                        method: method,
                        url: $rootScope.urlCronos+''+url,
                        data: data,
                        transformRequest: angular.identity,
                        transformResponse: angular.identity,
                        headers: {'Content-Type': undefined}
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
                    });*/

        };

        return ajax;

    }

})();
