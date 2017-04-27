(function() {
  'use strict';

  angular.module('Cronos.common')
    .directive('installationWizard', installationWizard);

  /** @ngInject */
  function installationWizard() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/pages/common/installationWizard/installationWizard.html',
      controllerAs: '$installationWizardController',
      controller: 'installationWizardCtrl'
    }
  }
})();
