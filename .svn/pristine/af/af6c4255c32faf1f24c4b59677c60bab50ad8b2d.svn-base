(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('pageTop', pageTop);

  pageTop.$inject = ['localStorage'];
  function pageTop(localStorage) {
    return {
      scope: true,
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      link: function(scope, element, attrs){
        scope.user  = localStorage.get("cronos-auth").username;
        
        scope.logout.bind('click', function(e) {
          //event ada di login.controller.js -> logout()
          scope.$apply(scope.logout);
        });

        /*scope.logout = function(){
          //cronosMainFactory.logout();
        };*/

        scope.settings = function(){
          alert('settings');
        };

      }
    };
  }

})();