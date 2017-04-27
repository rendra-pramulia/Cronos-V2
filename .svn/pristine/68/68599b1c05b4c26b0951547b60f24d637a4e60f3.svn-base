(function (){
	'use strict';
	
	angular
		.module('Cronos.common')
		.directive('workflowDirective', workflowDirective);
	
	workflowDirective.$inject = ['$compile'];
	function workflowDirective($compile){
		
		function refreshPlumb(instance, selector, isInit, scope, elem){
			var statusDataItems = instance.getSelector(selector);
			console.log(statusDataItems);
			instance.draggable(statusDataItems,{
				 containment: "parent"
			});
			
			instance.batch( function() {
				instance.setContainer(elem.parent());
				console.log(elem.parent());
				instance.makeSource(statusDataItems,{
					filter: ".dock",
					anchor: "Right",
					Connector : [ "State Machine", { curviness : 10, proximityLimit : 80 } ],
					connectorStyle: { strokeStyle: "#050", lineWidth: 2},
				});
				
				instance.makeTarget(statusDataItems,{
					filter: ".dock",
				    dropOptions: { hoverClass: "dragHover" },
				    anchor: "Left",
				    allowLoopback: false
				});
				
				if(isInit){
					var con = [];
					var connector = scope.connector;
					console.log("ini connector", connector)
					for(var i = 0; i < connector.length; i++){
						var a = {source: connector[i].source, target: connector[i].target};
						con.push(a);
					};
					
					var len = con.length;
					
					for(var i = 0; i < len; i++){
						instance.connect({
							source: con[i].source,
							target:	con[i].target,
							anchors: ["Right", "Left"],
							Connector: [ "State Machine", { curviness : 10, proximityLimit :80} ]
						});
					}

				}
			});
		}
		
		return {
			restrict: 'EA',	
			//isolated
			scope : {
				jsplumb: "=",
				connector: "=",
				deleteBox: "&deleteBox",
				updatePosition: "&updatePosition",
				modalDelete: "&modalDelete",
				callDelete: '&',
				deleteKotak:'&',
				addKotak:'&',
				callAdd:'&',
				addBox:'&addBox',
				modalEdit:'&',
				editBox:"&editBox"
			},
			
			
			link:function(scope,elem,attrs){
				scope.$watch("jsplumb", function(v){
					
					var jsplumb = scope.jsplumb;
					if(jsplumb){
						for(var i=0; i<jsplumb.length; i++){
							$(elem.parent()).append('<div class="shape" value='+jsplumb[i].name+' id= '+jsplumb[i].id+' style="left:'+jsplumb[i].posX+'px;top:'+jsplumb[i].posY+'px">'+jsplumb[i].name+'<div class="dock target"></div></div>');
						}
						
						jsPlumb.ready(function(){
							console.log("jsplumb ready");
							var statusDataItems;
							var instance =   jsPlumb.getInstance({
								Endpoint: ["Dot", {radius: 5}],
								PaintStyle: {strokeStyle: "1e8151", lineWidth: 2 },
								hoverPaintStyle: {strokeStyle: "1e8151", lineWidth: 2 },
								ConnectionOverlays: [
								        [ "Arrow", {
								        	location: 1,
								        	id: "arrow",
								        	length: 14,
								        	foldback: 0.8
								        }]
								],
								container: elem.parent()
							});
							
							//delete connection
							instance.bind('click', function(connection, e){
								instance.detach(connection);
							});
							
							refreshPlumb(instance,".shape", true, scope, elem);
							
							$('.shape').each( function(){
								$(this).append('<button class="status_hover_icon delete fa fa-times-circle btn-link" title="delete"></button>');
								$(this).append('<button class="status_hover_icon edit fa fa-pencil-square-o btn-link" title="edit"></button>');
							});
							
							$('.shape').on('click', 'button.edit', function(e){
								var elem = $(this).parent();
								var id = $(elem).attr('id');
								var name = $(elem).attr('value');
								
								console.log("masuk directive edit");
								scope.modalEdit();
								
								scope.editBox({id: id});
								scope.editBox({name: name});
							});
							
							//delete kotak
							$('.shape').on('click', 'button.delete', function(e){
								$(this).addClass('deletedBox');
								scope.modalDelete();
							});
							
							scope.deleteKotak = function (){
								
								var elem = $('.deletedBox').parent();
								var id = $(elem).attr('id');
							
								elem.remove();
								instance.select({source:id}).detach();
								instance.select({target:id}).detach();
							
								console.log("ini id nya", id);
								scope.deleteBox({id: id});
							}
							
							scope.callDelete({deleteBox: scope.deleteKotak});
							
							scope.addKotak = function (){
								
								console.log("ini directive add kotak");
								$(elem.parent()).append('<div class="shape" id="box baru"  style="left:0;top:0">'+$('body input[name=FirstName]').val()+'<div class="dock target"></div>'
										+'<button class="status_hover_icon delete fa fa-times-circle btn-link" title="delete"></button>'
										+'<button class="status_hover_icon edit fa fa-pencil-square-o btn-link" title="edit"></button>'+
										'</div>');
								//$('#' + id).append('<button class="status_hover_icon delete fa fa-times-circle btn-link" title="delete"></button>');
								refreshPlumb(instance, '.shape', true, scope, elem);
								//refreshPlumb(instance, "#" + id, false);
								scope.addBox();
							}
							
							scope.callAdd({addBox: scope.addKotak});
							
							/*$('.addStatusData').on('click', function(e){
								console.log("masuk directive tombol add");
								$(elem.parent()).append('<div class="shape" id= '+jsplumb[i].id+' style="left:'+jsplumb[i].posX+'px;top:'+jsplumb[i].posY+'px">'+jsplumb[i].name+'<div class="dock target"></div></div>');
														$('#' + id).append('<button class="status_hover_icon delete fa fa-times-circle btn-link" title="delete"></button>');
														refreshPlumb(instance, "#" + id, false);
							})*/
							
							/*$('#addNewNodeBtn').click( function(event){
								bootbox.prompt({
								  title: "Masukkan nama status data baru:",
								  value: "",
								  closeButton : true,
								  callback: function(name) {
									  console.log(name);
									  if(name === null){

									  }else{
									  	if(name.length == 0){
										  toastr.error('<spring:message code="error.element.empty" arguments="Status Data Name"/>','Cronos Notification');
										  return false;						  		
									  	}else if(name.length > 30){
								    		toastr.error('<spring:message code="error.element.maxLength" arguments="Status Data Name,30"/>','Cronos Notification');
								    		return false;
								    	}else{
											var workflowId = ${workflowId};
											$.post('${pageContext.request.contextPath}/admin/statusdata/addNode',
													{name: name, workflowId:workflowId}, function(result){
														var id = "box_" + result.data;
														$('#statusDataContainer').append('<div class="shape" id="'+id+'" data-id="'+result.data+'" style="left:0;top:0">'+
																name + 
																'<div class="dock target"></div>' +
																'</div>');
														$('#' + id).append('<button onclick=\'window.location.href="${pageContext.request.contextPath }/admin/statusdata/edit/'+ result.data+'?workflowId='+workflowId+'"\' class="status_hover_icon edit fa fa-pencil-square-o btn-link" title="edit"></button>');
														$('#' + id).append('<button data-href="${pageContext.request.contextPath }/admin/statusdata/deleteNode/'+ result.data+'" class="status_hover_icon delete fa fa-times-circle btn-link" title="delete"></button>');
														refreshPlumb(instance, "#" + id, false);
													}
											  );				    		
								    	}
									  }
								  }
								});	
							});*/
							
							elem.parent().on("mouseover", '.shape', function(){
								$('.status_hover_icon',$(this)).show()
							});
							
							elem.parent().on("mouseout", '.shape', function(){
								$('.status_hover_icon',$(this)).hide()
							});
							
							var id = null;
							var pos_x = 0;
							var pos_y = 0;

							elem.parent().on('mousedown','.shape :not(.delete, .edit)', function(){
								pos_x = $(this).position().left;
								pos_y = $(this).position().top;
								/*console.log('mousedown x ',pos_x);*/
							});
							
							elem.parent().on('mouseup','.shape :not(.delete, .edit)',function(){
								pos_x = $(this).position().left;
								pos_y = $(this).position().top;
								id = $(this).attr('id');
								
								/*console.log("ini pos x nya", pos_x);
								console.log("ini pos y nya", pos_y);
								console.log("ini id nya", id);*/
								
								scope.updatePosition({posX : pos_x, posY : pos_y, id : id});
								
								/*console.log('after x ',pos_x);
								console.log('after y ',pos_y);
								
								for(var i=0; i<jsplumb.length; i++){
									console.log('id jsplumb ',jsplumb[i].id);
									if(jsplumb[i].id == id){
										console.log('before x ',jsplumb[i].posX);
										console.log('before y ',jsplumb[i].posY);
										
										id	: id,
										pos_x: left,
										pos_y: top
										
										jsplumb[i].id == id;
										jsplumb[i].posX == pos_x;
										jsplumb[i].posY == pos_y;
									}
								}*/
								
							});
						});	
					}	
				})
			}	
		};	
	};
})();
