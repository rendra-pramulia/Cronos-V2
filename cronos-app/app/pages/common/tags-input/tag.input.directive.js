(function () {
  'use strict';

  angular.module('Cronos.common')
      .directive('tagInput', tagInput);

  function tagInput() {
    return {
      restrict: 'A',
      link: function( $scope, elem, attr) {
        $(elem).tagsinput({
          tagClass:  'label label-' + attr.tagInput
        });
      }
    };
  }
})();