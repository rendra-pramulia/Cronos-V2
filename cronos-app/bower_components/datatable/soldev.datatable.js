/**
 *  THIS FILE CONTAINS SHARED FUNCTIONS RELATED TO DATATABLE
 */

	$.fn.initDataTable = function(properties){
			
		//add filter list if filterid is not null
	    if(typeof(properties.filterid)!=='undefined' && properties.filterid != null && properties.filterid.length != 0){
		    /* prepare wrapper for filters */
			var $wrapper = $('<div/>',{"class":"filters_wrapper"});
			$wrapper.append(
				'<div class="filter caller pull-right">' +
					'<div class="filter_trigger">Add Filter<span class="caret"></span></div>' +
					'<div class="filter_content">'+
						'<div class="filter_content_inside add_filter_content">'+
							'<form class="form"></form>'+
						'</div>'+
					'</div>' +
				'</div>'
			);
			this.before($wrapper);
			/* --prepare wrapper for filters */
				
			/* function filter data for datatable */
			var filterData = function(d){
				d.filter = [];
	            var numOfFilter = 0;
	            $('.filters_wrapper .filter:not(.caller)').each( function(){
	            	var filterElm = $(this);
	            	
	            	var value;
	            	
	            	if (filterElm.data('type') == 'range' ){
	            		value = {
	            					min: $('.dt-filter-range',filterElm).slider("values",0),
									max: $('.dt-filter-range',filterElm).slider("values",1),
	            		}
	            	}
	            	else if (filterElm.data('type') == 'daterange' ){
	            		value = {
	           					'from': $('[name=from]',filterElm).val(),
								'to'  : $('[name=to]',filterElm).val(),
	           			}
	            	}
	            	else {
	            		value = ($(':input',filterElm).val() == null)?'':$(':input',filterElm).val().toString();
	            	}
	            	
	            	var filter = {
	            		key		: filterElm.data('name'),
	            		type	: filterElm.data('type'),
	            		value	: value
	            	}
	            	d['filter'].push(filter);
	            	numOfFilter = numOfFilter + 1;
	            });
	            d.numOfFilter = numOfFilter;
			}
			/* --function data for datatable */
		
			/* get list of filters for datatable */
			$.get("${pageContext.request.contextPath}/dt/filtergroup",{groupId:properties.filterid}, function(returned){
		    	if (returned.status == 1){
	    			$.each(returned.data, function(key, filter) {
	    				$checkbox_wrapper = $("<div />",{"class":"checkbox"});
	    				$label = $('<label />');
	    				$input = $('<input />',{"type":"checkbox","class":"select_filter_"+filter.id,"value":filter.id});
	    				
	    				$input_wrapper = $label.append($input).append(filter.label); 
	    				$wrapper = $checkbox_wrapper.append($input_wrapper);
	    				    				
	    				$('.add_filter_content > form').append($wrapper);    				
	    			});
		    	}
		    	else {
		    		alert('failed');
		    	}
		    });
		    /* --get list of filters for datatable */
		}
		
		var dom ='lfrtip';
		var canSelect = true
		var selectProperties = {};
		var ajax = {};
		
		//by default kalo dom nya ga di isi maka lfrtip, tapi kalo kaya mao ngilangin search berarti tambahin dom di parameternya
		if(typeof(properties.dom)!=='undefined' && properties.dom != null && properties.dom.length != 0){
			dom = properties.dom;
		}
		
		//tambahan properties. kalo ga mau munculin text box search cukup tambahin properties inputSearch dengan nilai false
		if(typeof(properties.inputSearch)!=='undefined' && properties.inputSearch != null && properties.inputSearch.length != 0){			
			if(properties.inputSearch == false){				
				dom = 'lrtip';	
			}
		}
		
		//tambahan data
		if(typeof(properties.filterid)!=='undefined' && properties.filterid != null && properties.filterid.length != 0){
			ajax.data = filterData;
			if (typeof(properties.ajax.url)!=='undefined' && properties.ajax.url != null && properties.ajax.url.length != 0){
				ajax.url =  properties.ajax.url;
			}
			else {
				ajax.url =  properties.ajax;
			}
		}
		else {
			ajax = properties.ajax
		}
		
		var dtTblProperties = 
		 {
			 "processing": true,
			 "serverSide": true,
			 "responsive":true,
			 "ajax": ajax,
			 "ordering":true,
			 "columns" : properties.columns,
			 "dom": dom,
			 "stateSave": true
		 };	
		
		if(typeof(properties.fnCreatedRow)!=='undefinded' && typeof(properties.fnCreatedRow) == 'function'){
			 dtTblProperties.fnCreatedRow = properties.fnCreatedRow;			 
		 }

		if(typeof(properties.fnDrawCallback)!=='undefinded' && typeof(properties.fnDrawCallback) == 'function'){
			 dtTblProperties.fnDrawCallback = properties.fnDrawCallback;			 
		 }
		
		if(typeof(properties.columnDefs)!=='undefinded' && properties.columnDefs != null && properties.columnDefs.length != 0){
		 	 dtTblProperties.columnDefs = properties.columnDefs;			 
		 }
		
		if(typeof(properties.height)!=='undefinded' && properties.height != null && properties.height != 0){
			 dtTblProperties.scrollY = properties.height;			 
			 dtTblProperties.scrollCollapse = true;
		 }
		 
		 if(typeof(properties.colReorder)!=='undefined' && properties.colReorder != null && properties.colReorder !=0){
			dtTblProperties.colReorder = properties.colReorder 
		}
		
		var lang = '${user.language}';
		
		if(lang == 'in'){			
			var language = dt_lang_in;			
			dtTblProperties.oLanguage = language;			
		}
		
		 //kalau dari page nya ada porperty select dan isinya true
		if(typeof(properties.select)!=='undefined' && properties.select != null && properties.select.length != 0){
			 if(properties.select == true){
				 selectProperties.style = 'os'; 
			 }
			 else if(properties.select =='single') {
				 selectProperties.style = 'single'; 
			 }
			 else if(properties.select == 'multi'){
				 selectProperties.style ='multi';
			 }			 
		}else selectProperties.style = 'os';			
		selectProperties.info = false;				
		dtTblProperties.select = selectProperties;	
		
		if(typeof(properties.destroy)!=='undefinded' && properties.destroy != null && properties.destroy.length != 0){
		 	 dtTblProperties.destroy = properties.destroy;			 
		 }
		 
		 if(typeof(properties.responsive)!=='undefinded' && properties.responsive != null && typeof(properties.responsive) == 'boolean'){
		 	console.log('responsive is exist and the value is : ',properties.responsive);
		 	dtTblProperties.responsive = properties.responsive;
		 }
		 
		if(typeof(properties.sScrollX)!=='undefinded' && properties.sScrollX != null && properties.sScrollX != 0){
		 	dtTblProperties.sScrollX = properties.sScrollX;
		 }
		 
		if(typeof(properties.sScrollXInner)!=='undefinded' && properties.sScrollXInner != null && properties.sScrollXInner != 0){
		 	dtTblProperties.sScrollXInner = properties.sScrollXInner;
		 }
		
				
		this.dataTable(dtTblProperties);
		this.addClass('table-bordered');	
		this.find('td').css('word-wrap','break-word');
		this.css('width','100%');
		
		var oTable = this;
			    
	    /*---------START INITIALIZING DATATABLE FILTERS--------*/
	    if(typeof(properties.filterid)!=='undefined' && properties.filterid != null && properties.filterid.length != 0){
		    $('.add_filter_content').on('change','input:checkbox', function(){
		    	var isAddingNewFilter = $(this).prop('checked');
		    	var filterId = $(this).val();
		    	
		    	//if adding new filter
		    	if (isAddingNewFilter){
		    		console.log('isAddingNewFilter');
		    		$.get("${pageContext.request.contextPath}/dt/filter",{filterId:filterId}, function(returned){
		    			if (returned.status == 1){
		        			$('.filters_wrapper').addNewFilter(returned.data);
		    	    	}
		    	    	else {
		    	    		alert('failed');
		    	    	}	
		    		});
		    	}
		    	//if removing filter
		    	else {
		    		$('#filter_' + filterId).removeFilter();
		    	}
		    });
		    
		    $.fn.addNewFilter = function(filter){
		    	console.log('addFilter');
		    	this.append(
		    		'<div class="filter" id="filter_'+ filter.id +'">' +
						'<div class="filter_trigger">' + 
							filter.label + '<a class="filter_delete">&times;</a>' + 
				  		'</div>' + 
				  		'<div class="filter_content"><div class="filter_content_inside"></div></div>' + 
					'</div>');
		    	
		    	
		    	var $filterElm = $('#filter_' + filter.id);
		    	$filterElm.data('name',filter.name);
		    	$filterElm.data('type',filter.type);
		    	
		    	var wrapper = $('.filter_content_inside',$filterElm);
		    	if (filter.type == 'text'){
		    		wrapper.append(
		    			'<div class="form-inline">' +
							'<div class="form-group">' +
					    		'<input type="text" class="form-control dt-filter-text" placeholder="'+filter.label+'">' +
					    	'</div>' +
					    '</div>');
		    	}	    
		    	else if (filter.type == 'select'){
		    		var options = filter.options;
		    		var $select = $('<select/>',{'class':'dt-filter-select'});
		    		
		    		$select.attr('multiple','multiple');
		    		
		    		for (var i=0; i < options.length;i++){
		    			$select.append('<option value="'+options[i].value+'">'+ options[i].label +'</option>')	
		    		}
		    		wrapper.append($select);
		    		
		    		//apply chosen.js
		    		$('select',wrapper).chosen();
		    	}
		    	else if (filter.type == 'daterange'){
		    		wrapper.append(
		    			'<div class="form-inline">' +
							'<div class="form-group">' + 
							    '<input type="text" class="form-control dt-filter-date" name="from" placeholder="From">' +
							'</div>' +
							'<div class="form-group">' +
								'<input type="text" class="form-control dt-filter-date" name="to" placeholder="Until">' +
							'</div>' +
						'</div>'		
		    		)
					
		    		//apply datepicker
		    		$('.dt-filter-date',wrapper).datepicker({
				        format: "yyyy-mm-dd",
				        todayBtn: 'linked',
				        todayHighlight: true
				    });
		    	}
		    	else if (filter.type == 'range'){
		    		var rangeSetting = filter.options[0];
		    		
		    		wrapper.append('<div class="dt-filter-range" style="width:200px"></div>');
		    		$minLabel = $('<span/>',{class:'minLabel'});
		    		$maxLabel = $('<span/>',{class:'maxLabel'});
		    		
		    		$rangeLabel = $('<div/>',{class:'rangeLabel'});
		    		
		    		$minLabel.text(rangeSetting.min);
		    		$maxLabel.text(rangeSetting.max)
		    		
		    		$rangeLabel.append($minLabel);
		    		$rangeLabel.append(' - ');
		    		$rangeLabel.append($maxLabel);;
		    		
		    		wrapper.append($rangeLabel);
					
		    		//apply jquery ui slider
		    		$('.dt-filter-range',wrapper).slider({
		    	        range: true,
		    	        min: rangeSetting.min,
		    	        max: rangeSetting.max,
		    	        values : [rangeSetting.min,rangeSetting.max],
		    	        step: rangeSetting.step,
		    	        slide: function( event, ui ) {
		    	        	
		    	        	$minLabel.text(ui.values[0]);
		    	        	$maxLabel.text(ui.values[1]);
		    	        }
		    		});
		    	}
		    	
		    	//add buttons
		    	wrapper.append( 
		    		'<div class="filter_content_buttons">' +
		    			'<button type="button" class="btn btn-primary btn-apply">Apply</button>' +
		    		'</div>'		
		    	)
		    }
		    
		    $.fn.removeFilter = function(){
		    	var id = this.attr('id');
		    	$('.add_filter_content .select_' + id).removeAttr('checked');
		    	this.remove();
		    	oTable.api().ajax.reload();
		    }
	    
		    /*---------FINISH INITIALIZING DATATABLE FILTERS--------*/
			
			//add event listeners		
			$('.filters_wrapper').on('click','.filter_trigger', function(){
		    	$(this).closest('.filter').siblings('.filter').removeClass('hover');
		    	$(this).closest('.filter').toggleClass('hover');
		    });
		    $('.filters_wrapper').on('click','.filter_content_buttons button', function(){
		    	$(this).closest('.filter').removeClass('hover');
		    });
			$('.filters_wrapper').on('click','.btn-apply', function(){
				oTable.api().ajax.reload();
	        });
			$('.filters_wrapper').on('click','.filter_delete', function(){
		    	oTable.api().ajax.reload();
		    	$(this).closest('.filter').removeFilter();
	        });
		}
		
		return this;
	}