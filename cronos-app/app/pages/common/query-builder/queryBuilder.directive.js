(function () {
    'use strict';

    angular
        .module('Cronos.common')
        .directive('queryBuilder', queryBuilder);

    //queryBuilder.$inject = ['$compile'];
    function queryBuilder() {
        
        return {
            restrict: "AE",
            scope: {
                options: "=",
                builder: "="
            },
            link:function(scope,elem,attr){
                scope.$watch("builder", function(v){
                    //tunggu sampai promise ajax si builder selesai
                    if(scope.builder){
                        console.log('ada');
                        //qb
                        $(elem).queryBuilder(scope.options);
                        console.log($(elem).queryBuilder('getSQL',false));

                    } else {
                            console.log('kosong');
                            return false;
                    }            
                    
                })
            }
        };

    };

})();
