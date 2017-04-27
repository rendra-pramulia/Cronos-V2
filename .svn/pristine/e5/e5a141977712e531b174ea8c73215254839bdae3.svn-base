(function (){
	'use strict';
	
	angular
		.module('Cronos.common')
		.directive('datepickerDirective', datepickerDirective);

	datepickerDirective.$inject = ['$compile'];
	function datepickerDirective($compile){

		return {
			restrict: 'A',
        	require: 'ngModel',
         	link: function (scope, element, attrs, ngModelCtrl) {

            	element.datepicker({
                	dateFormat: "dd/mm/yyyy",
                	startDate: "dateToday",
                	onSelect: function (date) {
	                    scope.date = date;
	                    scope.$apply();
	                }
            	}).on('changeDate', function(ev){                 
    				element.datepicker('hide');
    			});
        	}
		};
	};
})();