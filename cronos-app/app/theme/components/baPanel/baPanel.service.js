/**
 * @author v.lugovsky
 * created on 23.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .factory('baPanel', baPanel);

  /** @ngInject */
  function baPanel() {

    /** Base baPanel directive */
    return {
      restrict: 'A',
      transclude: true,
      template: function(elem, attrs) {
        var res = '<div class="panel-body" ng-transclude></div>';
        if (attrs.baPanelTitle) {
          var titleTpl = '<div class="panel-heading clearfix"><h3 class="panel-title">' + attrs.baPanelTitle + '</h3></div>';
          res = titleTpl + res; // title should be before
        }
        if (attrs.baPanelFooter) {
          var footerTpl = '<div class="panel-footer clearfix" style="background-color: #fff; border-top: 1px">' + attrs.baPanelFooter + '</div>';
          res = res + footerTpl;
        }

        return res;
      }
    };
  }

})();
