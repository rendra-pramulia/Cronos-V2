(function () {
    'use strict';

    angular
        .module('Cronos.common')
        .directive('dtTable', dtTable);

    dtTable.$inject = ['$compile'];
    function dtTable($compile) {

        return {
            scope: {
                dataTableConfig: "=dtTable",
                data: "=dtData",
                clickMe: "&clickMe",
                selectedRow: "&",
                refreshDt: "="
            },
            controller: function($scope, $element) {  
                /*var _that = this;
                this.dConfig = $scope.dataTableConfig;
                
                this.dConfig["fnRowCallback"] = function(row, aData, iDisplayIndex, iDisplayIndexFull) {
                    
                    var table = $($element)['DataTable']();
                    */
                    /*$('td', row).unbind('click');
                    $('td', row).bind('click', function (eventObject) {

                        //var colPos = _that.dataTableInstance.fnGetPosition( this ) [1];
                        //var rowPos = _that.dataTableInstance.fnGetPosition( this ) [0];
                        //console.log ("Row click in directive:" + rowPos + ":" + colPos);
                        console.log (this);
                        console.log (eventObject);
                        
                        $scope.clickMe ({rowPos:1, colPos:1});
                    });*/

                    /*$(row).off('click');
                    $(row).on('click', function(e) {
                        $(this).toggleClass('selected');
                        var datas = _that.dataTableInstance.fnGetData(row);
                        var selected = $(this).closest('tbody').find('tr.selected').length; 
                        $scope.clickMe({selected: selected, data: datas});
                    });

                    var clickMeArea = $(row);
                    if (clickMeArea) {
                        var fnLink = $compile (clickMeArea);
                        if (fnLink){
                            fnLink ($scope);
                        }
                    }
                };
                
                $scope.clickMeInternal=function () {
                    console.log ("clickMeInternal called");
                }*/
            },
            link:function ($scope, $element, $attrs, controller){
                
                $scope.$watch($scope.dataTableConfig, function (value   ){
                    $element.initDataTable($scope.dataTableConfig);
                });

                $($element).on('click','tbody tr',function(){
                    var table = $($element).DataTable();
                    var tableData = table.row( this ).data();
                    var selected = $(this).closest('tbody').find('tr.selected').length;
                    $scope.selectedRow({tableData : tableData, selected : selected});                     
                });

                //tblName.api().ajax.reload();

                $scope.$watch('refreshDt', function(newVal, oldVal) {
                    if(newVal) {
                        console.log('refresh');
                        $element.api().ajax.reload();
                    } else {
                        console.log('not refresh');
                    }
                },true);

                //watch for data change
                /*$scope.$watch ("data", function (value){
                    if($scope.data) {
                        var val = value || null;
                        if (val) {
                            var table = $($element)['DataTable']();
                            controller.dataTableInstance.fnClearTable();
                            controller.dataTableInstance.fnAddData($scope.data);
                            //table.rows.add($scope.data).draw();
                        }    
                    }
                    //console.log ("Data changed, refresh table:" + angular.toJson ($scope.data));
                });*/
            }
        };
    }

})();
