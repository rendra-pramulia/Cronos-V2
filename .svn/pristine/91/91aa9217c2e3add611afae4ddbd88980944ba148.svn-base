/**
 * @author Rendra Pramulia
 * created on 07.11.2016
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('cronosButtonAction', cronosButtonAction);

  cronosButtonAction.$inject = ['localStorage'];
  function cronosButtonAction(localStorage) {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'app/theme/components/cronosButtonAction/cronosButtonAction.html',
      //controller: 'usersControllerIndex',
      link: function(scope, element, attrs, controller){

        console.log(scope);
        console.log(scope.buttons);
        console.log('cronosButtonAction directive ',controller);

      }
    };
  }

})();