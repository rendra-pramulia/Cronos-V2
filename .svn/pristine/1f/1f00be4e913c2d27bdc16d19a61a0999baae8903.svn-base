(function () {
    'use strict';

    angular
        .module('Cronos.common')
        .factory('datatablesService', datatablesService);

    datatablesService.$inject = ['$http', '$rootScope', '$window', '$q'];
    function datatablesService($http, $rootScope, $window, $q) {
        var dtTable = {};
        
        dtTable.getTitle = function(id) {
            var formData = new FormData();
            formData.append("id", id);

            return $http({
                        method: 'POST',
                        url: $rootScope.urlCronos+'/api/datatables/get-title',
                        data: formData
                    })
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data.namecol;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }

                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });
        };

        dtTable.getData = function(id) {
            return $http({
                        method: 'POST',
                        url: $rootScope.urlCronos+'/api/datatables/get-data',
                        data: {'id':id}
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

        
        return dtTable;

    }

})();
