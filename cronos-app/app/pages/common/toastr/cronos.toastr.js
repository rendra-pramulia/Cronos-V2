(function () {
    'use strict';

    angular
        .module('Cronos.common')
        .factory('cronosToastr', cronosToastr);

    cronosToastr.$inject = ['toastr'];
    function cronosToastr(toastr) {

        var success = function (message) {
            toastr.success(message);
        };

        var info = function (message) {
            toastr.info(message);
        };

        var error = function (message) {
            toastr.error(message);
        };

        var warning = function (message) {
            toastr.warning(message);
        };

        return {
            success: success,
            info: info,
            error: error,
            warning: warning
        };
    }

})();
