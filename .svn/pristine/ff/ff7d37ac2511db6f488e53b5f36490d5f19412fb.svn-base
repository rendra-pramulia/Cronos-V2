(function (){
	'use strict';
	
	angular
		.module('Cronos.common')
		.directive('clockpickerDirective', clockpickerDirective);

	clockpickerDirective.$inject = ['$compile'];
	function clockpickerDirective($compile){

		return {
			restrict: 'A',
        	require: 'ngModel',
         	link: function (scope, element, attrs, ngModelCtrl) {
            	element.clockpicker()
					.find('input').change(function(){
						scope.clock = this.value;
						scope.$apply();
						console.log(this.value);
					});
				var input = $('.current-time').clockpicker({
					placement: 'bottom',
					align: 'left',
					autoclose: true,
					'default': 'now'
				});

        	}
		};
	};
})();