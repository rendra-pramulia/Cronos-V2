(function () {
    'use strict';

    angular
        .module('BlurAdmin.theme.components')
        .directive('cronosDraggable', cronosDraggable);

    cronosDraggable.$inject = ['$document'];
    function cronosDraggable($document) {
        
        return {
          link: function(scope, element, attr) {
            $(element).draggable();
          }
        };

    };

})();

