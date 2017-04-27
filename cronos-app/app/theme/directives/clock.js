(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .directive('clock', clock);

  /** @ngInject */
  function clock($interval) {
    return {
      scope: true, // isolate
      transclude: true, // bring in any text or elements
      template: "<span class='clock'><span class='clock-text' ng-transclude></span><span class='clock-time'>{{date.now() | date: timeFormat}}</span></span>",
      link: function (scope, element, attr) {
          scope.timeFormat = (attr.format === '12') ? 'dd-MM-yyyy, hh:mm:ss a' : 'dd-MM-yyyy, HH:mm:ss';
          scope.date = Date;
          $interval(null, 1000);
      }
    };
  }

})();