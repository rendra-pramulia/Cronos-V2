(function (){
	'use strict';
	
	angular
		.module('Cronos.common')
		.directive('daterangepickerDirective', daterangepickerDirective);

	daterangepickerDirective.$inject = ['$compile'];
	function daterangepickerDirective($compile){

		return {
      scope:{
        range:'&range'
      },
      
			restrict: 'A',
        	require: 'ngModel',
         	link: function (scope, element, attrs, ngModelCtrl) {
            	element.daterangepicker({
                	dateFormat: "DD/MM/YYYY",
                  minDate: "dateToday",
                  autoUpdateInput: false,
                  autoClose: true,
                  locale: {
                      cancelLabel: 'Clear'
                  }
            	},
              function(start,end,label){
                  console.log(start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
                  var start = start.format('YYYY-MM-DD');
                  var end = end.format('YYYY-MM-DD');

                  scope.range({start: start, end: end});
              });

              element.on('apply.daterangepicker', function(ev, picker) {
                  $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
              });

              element.on('cancel.daterangepicker', function(ev, picker) {
                  $(this).val('');
              });
	
        	}
		};
	};

})();