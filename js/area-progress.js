var contextPath = "";
var criteria ="";
var from_err_msg="";
var to_err_msg="";
var i18nerrorFromDateOlderThanToDate;
var domain_err_msg="";
var areatype_err_msg="";
var area_err_msg="";
var workordertype_err_msg="";
var dateinterval_err_msg="";
var filters_msg="";
var areaWOMapInfoRParams;
var pgCode = 9;
var area_name1 = "";
var defaultStr = "default";
jQuery(document).ready(function($){
	
	/*
	 * tabs managing
	 */
    $("#block-work-order-tab1").click(function(){
    	
    	if( !$(this).hasClass("selected")){
	    	$(".tab").removeClass("selected");
	    	$(this).addClass("selected");    	

	    	/**
	    	 * TODO
	    	 * action on the first tab 
	    	 */ 
    	 
    	}
    });
    
    $("#block-work-order-tab2").click(function(){
    	
    	if( !$(this).hasClass("selected")){
	    	$(".tab").removeClass("selected");
	    	$(this).addClass("selected"); 
    	
	    	/**
	    	 * TODO
	    	 * action on the second tab 
	    	 */  
    	 
    	 } 	
    });
    
});



function loadvalues(){
	if(area_name1!=null&&area_name1!='') {
		$("#area-name").val(area_name1);
	}
	populateAPDateIntervalFilters();	
	loadDomainList();
	loadAreaTypes2();	
	getAreas(defaultStr);
	loadWorkOrderTypes();
	loadDefaultTabs();	
	
	//getAreas();
	
}

function populateAPDateIntervalFilters() {

	var ap_dateInterval = $.cookie(pgCode+"ap_dateInterval");		
	if(ap_dateInterval!=null && ap_dateInterval!='') {
		//var dataarray = ap_dateInterval.split(",");
		$("#filter-select-date-interval").val(ap_dateInterval);
	}
	show();
	
	if(ap_dateInterval == "custominterval") {
		var ap_dateFrom = $.cookie(pgCode+"ap_dateFrom");		
		if(ap_dateFrom!=null && ap_dateFrom!='') {
			//var dataarray = ap_dateFrom.split(",");
			$("#filter-date-from").val(ap_dateFrom);
		}
		
		var ap_dateTo = $.cookie(pgCode+"ap_dateTo");		
		if(ap_dateTo!=null && ap_dateTo!='') {
			//var dataarray = ap_dateFrom.split(",");
			$("#filter-date-to").val(ap_dateTo);
		}
	}
	
	var ap_unplanned = $.cookie(pgCode+"ap_unplanned");
	$("#filter-checkbox-unplanned").attr('checked', ap_unplanned);
	
	return true;
}

function domainChanged(){
	getAreas("Domain changed");
}

function areaTypeChanged(){
	getAreas("Area type changed");
}


function loadDomainList() {	
	var obj= {};
	obj.url=contextPath+"/std/GetDomains.action";		
	obj.successfunc = function(data) {
		/*var items;
		
		$.each(data, function(i, item) {
			items += '<option value="' + item.id + '">'	+ item.name + '</option>';
			});				
		$("#filter-multiselect-domain").html(items);
				
		var ap_domain = $.cookie(pgCode+"ap_domain");		
		if(ap_domain!=null && ap_domain!='') {
			var dataarray = ap_domain.split(",");
			$("#filter-multiselect-domain").val(dataarray);
		}
		
		$("#filter-multiselect-domain").multiselect("refresh");  */   
		
		var items;	
		var savedData = $.cookie(pgCode+"ap_domain");	
		var selected = '" > ';
		
		if(savedData == null || savedData == ''){
			selected = '" selected > ';
		}
			
		$.each(data, function(i, item) {
			items += '<option value="' + item.id +selected + item.name + '</option>';
			
		});
		
		populateSavedMultiSelectBox("#filter-multiselect-domain", items,savedData);
	};
	obj.errorfunc = errorDetails;
	run_ajax_json(obj);
	return;	
}

function errorDetails(data) {

	alert("Error : " + data.responseText);

	}

function loadAreaTypes(){
	var obj1= {};
	obj1.url=contextPath+"/std/AlertManagementAreaTypes.action";
	obj1.successfunc = function(data){
	/*var items1;
	$.each(data, function(i, item1) {
		items1 += '<option value="' + item1.id + '">' + item1.name + '</option>';
	});
	$("#filter-multiselect-area-type").html(items1);
	
	var ap_areaType = $.cookie(pgCode+"ap_areaType");		
	if(ap_areaType!=null && ap_areaType!='') {
		var dataarray = ap_areaType.split(",");
		$("#filter-multiselect-area-type").val(dataarray);
	}
	
	$("#filter-multiselect-area-type").multiselect("refresh");*/
	
	var items;	
	var savedData = $.cookie(pgCode+"ap_areaType");	
	var selected = '" > ';
	
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	populateSavedMultiSelectBox("#filter-multiselect-area-type", items,savedData);	
	/*$("#filter-multiselect-area").attr('disabled','false');	
	getAreas();*/
	};
	obj1.errorfunc = errorDetails;
	run_ajax_json(obj1);	
	return;
	
		
	}


function loadAreaTypes2(){
	var obj1= {};
	obj1.url=contextPath+"/std/AlertManagementAreaTypes.action";
	obj1.successfunc = function(data){
	/*var items1;
	$.each(data, function(i, item1) {
		items1 += '<option value="' + item1.id + '">' + item1.name + '</option>';
	});
	$("#filter-multiselect-area-type").html(items1);
	
	var ap_areaType = $.cookie(pgCode+"ap_areaType");		
	if(ap_areaType!=null && ap_areaType!='') {
		var dataarray = ap_areaType.split(",");
		$("#filter-multiselect-area-type").val(dataarray);
	}
	
	$("#filter-multiselect-area-type").multiselect("refresh");*/
	
	var items;	
	var savedData = $.cookie(pgCode+"ap_areaType");	
	var selected = '" > ';
	
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	populateSavedMultiSelectBox("#filter-multiselect-area-type", items,savedData);	
	
	/*$("#filter-multiselect-area").attr('disabled','false');	
	getAreas();*/
	};
	obj1.errorfunc = errorDetails;
	run_ajax_json(obj1);	
	return;
	
		
	}

function loadWorkOrderTypes(){
	var obj2= {};
	obj2.url=contextPath+"/std/getWorkOrderTypes.action";
	obj2.successfunc = populateWorkOrderTypes;
	obj2.errorfunc = errorDetails;
	run_ajax_json(obj2);	
	return;
	
		
}

function populateWorkOrderTypes(data){
	/*var items2;
	$.each(data, function(i, item2) {
		items2 += '<option value="' + item2.id + '">' + item2.name + '</option>';
	});
	$("#filter-multiselect-work-order-type").html(items2);
	
	var ap_workOrderType = $.cookie(pgCode+"ap_workOrderType");		
	if(ap_workOrderType!=null && ap_workOrderType!='') {
		var dataarray = ap_workOrderType.split(",");
		$("#filter-multiselect-work-order-type").val(dataarray);
	}
	
	$("#filter-multiselect-work-order-type").multiselect("refresh");*/
	
	var items;	
	var savedData = $.cookie(pgCode+"ap_workOrderType");	
	var selected = '" > ';
	
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	populateSavedMultiSelectBox("#filter-multiselect-work-order-type", items,savedData);	
}

function getAreas(requestType) {
	
	var ap_domain = $("#filter-multiselect-domain").val();
	var ap_areaType = $("#filter-multiselect-area-type").val();
	
	if(requestType == defaultStr){
		ap_domain = ap_areaType = requestType;
	}
	
	var obj = {};
	obj.url = contextPath + "/std/AlarmManagementAreas.action";
	/*var domainCode= (ap_domain==null ? null : ap_domain);
	var areaCode = (ap_areaType==null ? null : ap_areaType);*/
	
	obj.pdata = "domainCode=" + ap_domain + "&areaTypeCode=" + ap_areaType;
	obj.successfunc = fillAreas;
	obj.errorfunc = errorDetails;
	run_ajax_json(obj);

	return;
}

function fillAreas(data) {
	/*var items;
	$("#filter-multiselect-area").find('option').remove();
	$("#filter-multiselect-area").multiselect('refresh');
	var msareas = $("#filter-multiselect-area").multiselect();	
	$.each(data, function(i, item) {
		items += '<option value="' + item.id + '">' + item.name + '</option>';
	});	
	msareas.append(items);
	
	
	var ap_area = $.cookie(pgCode+"ap_area");		
	if(ap_area!=null && ap_area!='') {
		var dataarray = ap_area.split(",");
		$("#filter-multiselect-area").val(dataarray);
	}
	
	msareas.multiselect('refresh');	*/
	
	var items;	
	var savedData = $.cookie(pgCode+"ap_area");	
	var selected = '" > ';
	
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	populateSavedMultiSelectBox("#filter-multiselect-area", items,savedData);	
}
		

function filter_submit() {
	
		var ap_dateInterval = $("#filter-select-date-interval").val();
		var ap_dateFrom = $("#filter-date-from").val();
		var ap_dateTo = $("#filter-date-to").val();
		var ap_domain = $("#filter-multiselect-domain").val();
		var ap_areaType = $("#filter-multiselect-area-type").val();
		var ap_workOrderType = $("#filter-multiselect-work-order-type").val();
		var ap_unplanned = $("#filter-checkbox-unplanned").prop('checked');
		var ap_area = $("#filter-multiselect-area").val();
		
		if(ap_dateInterval == "custominterval"){
				
				
				if(!validateInputs(ap_dateFrom,from_err_msg)){
					return false;
				}
				
				if(!validateInputs(ap_dateTo,to_err_msg)){
					return false;
				}
				
				if(new Date(ap_dateFrom) > new Date(ap_dateTo)){
					alert(i18nerrorFromDateOlderThanToDate);
					return false;
				}
				
		}
		
		 if(!validateInputs(ap_domain,domain_err_msg)){
				return false;
		 } 
		 if(!validateInputs(ap_areaType,areatype_err_msg)){
				return false;
		 }
		 if(!validateInputs(ap_workOrderType,workordertype_err_msg)){
				return false;
		 }
		 if(!validateInputs(ap_area,area_err_msg)){
				return false;
		 }
		 
		 if($("#filter-multiselect-area").text()!=null&&$("#filter-multiselect-area").text()!='') {
				$("#area-name").val(area_name1);
			}
		saveAPFilters(ap_dateInterval,ap_dateFrom,ap_dateTo,ap_domain,ap_areaType,ap_workOrderType,ap_unplanned,ap_area);
		
		//Removing old data for summaryWorkOrder
		$("#block-summary-content-wo-count").html("");	
		$("#summary-workordertypes-selected").html("");
		
		//Removing old charts
		refreshChart1();
		refreshChart2();
		
		var obj3= {};
		obj3.url=contextPath+"/std/WorkOrderStatusChart.action";
		obj3.pdata = 'dateInterval='+ap_dateInterval+'&dateFrom='+ap_dateFrom+'&dateTo='+ap_dateTo+'&domain='+ap_domain+
		   		'&areaType='+ap_areaType+'&workOrderType='+ap_workOrderType+'&unplanned='+ap_unplanned+'&area='+ap_area;
		
		var orderType = $.cookie(pgCode+"block-work-order-tab");	
		 
		if(orderType != "undefined" && orderType != null && orderType != ""){

			if(orderType == "progress"){
				updateStatusTab("#block-work-order-tab1","#block-work-order-tab2");
				obj3.successfunc = drawChart1;	
				//run_ajax(obj3);
				
			}else if(orderType == "status"){
				updateStatusTab("#block-work-order-tab2","#block-work-order-tab1");
				obj3.successfunc = drawChart2;	
				//run_ajax(obj3);			
			
			} 
		}else{
		
			obj3.successfunc = drawChart1;	
			//run_ajax(obj3);
			
		}
		
		obj3.errorfunc = errorDetails;
		run_ajax(obj3);
		
		loadPoints(ap_dateInterval,ap_dateFrom,ap_dateTo,ap_domain,ap_areaType,ap_workOrderType,ap_unplanned,ap_area);
		return;	
}

function cleanPage(){
	
}

function loadPoints(ap_dateInterval,ap_dateFrom,ap_dateTo,ap_domain,ap_areaType,ap_workOrderType,ap_unplanned,ap_area) {
	
	var obj= {};
	obj.url=contextPath+"/std/getAreaPoints.action";
	obj.pdata = 'dateInterval='+ap_dateInterval+'&dateFrom='+ap_dateFrom+'&dateTo='+ap_dateTo+'&domain='+ap_domain+
		'&areaType='+ap_areaType+'&workOrderType='+ap_workOrderType+'&unplanned='+ap_unplanned+'&area='+ap_area;
	obj.successfunc = loadPointsSuccess;
	obj.errorfunc = errorDetails;
	run_ajax(obj);
	return;
					
}

/*function submitValidation() {
	var bool = true;
	var dateInterval = $("#filter-select-date-interval").val();
	var dateFrom = $("#filter-date-from").val();
	var dateTo = $("#filter-date-to").val();
	var domain = $("#filter-multiselect-domain").val();
	var areaType = $("#filter-multiselect-area-type").val();	
	var workOrderType = $("#filter-multiselect-work-order-type").val();
	var area = $("#filter-multiselect-area").val();
	
	
	
	if((dateInterval=='Custom interval'&&dateFrom==null)||(dateInterval=='Custom interval'&&dateFrom=='')) {
		criteria += from_err_msg;		
		bool = false;
	}
	if((dateInterval=='Custom interval'&&dateTo==null)||(dateInterval=='Custom interval'&&dateTo=='')) {
		criteria += to_err_msg;		
		bool = false;
	}	
	if(domain==null||domain=='') {
		criteria += domain_err_msg;
		bool = false;
	}
	if(areaType==null||areaType=='') {
		criteria += areatype_err_msg;
		bool = false;
	}
	if(area==null||area=='') {
		criteria += area_err_msg;
		bool = false;
	}	
	if(workOrderType==null||workOrderType=='') {
		criteria += workordertype_err_msg;
		bool = false;
	}
	if(dateInterval=='Custom interval'&&dateFrom!=null&&dateTo!=null&&!(dateFrom <= dateTo)) {
		criteria += dateinterval_err_msg;		
		bool = false;
	}
		
	    return bool;		
}*/

function xyz(data) {
	
	var respdata = eval(data);
	var noOfWorkOrders = respdata.noOfWorkOrders;
	var workOrderTypes = respdata.workOrderTypes;
	var areaProgressMap = respdata.areaProgressMap;
	var workOrderProgressChartxml = respdata.workOrderProgressChartxml;
	var detailedProgressxml = respdata.detailedProgressxml;
	
	
}

function show(){
	
	if($("#filter-select-date-interval").val()=="custominterval"){		
		//document.getElementById("filter-custom-date-interval").style.visibility="visible";	
		showDate();
			//$('#filter-custom-date-interval').css("visibility","visible");
		} else {
			hideDate();
			//document.getElementById("filter-custom-date-interval").style.visibility="hidden";	
			//$('#filter-custom-date-interval').css("visibility","hidden");
		}
}

function hideDate()
{
	
	
	//$("#block_from_and_to_date").hide();
	
	$("#filter-date-from").hide();
	$("#filter-date-to").hide();
}

function showDate(){
	
	//$("#block_from_and_to_date").show();
	$("#filter-date-from").show();
	$("#filter-date-to").show();
}

function showWorkOrderTypes(data){
	var items2;
	$.each(data, function(i, item2) {
	  
		items2 +='<div class="sub-block-summary-content">'+item2.workOrderTypeTOList+'</div>';
	});
	$("#filter-multiselect-work-order-type").html(items2);
	$("#filter-multiselect-work-order-type").multiselect("refresh");
	}

function drawChart1(data) {
	
	showWorkOrderProgressCharts();
	
	$("#block-summary-content-wo-count").html(eval(data).totalNoOfWorkOrders);
	
	var summaryWorkOrderId = "#summary-workordertypes-selected";
	
	//Removing old data for summaryWorkOrder
	$(summaryWorkOrderId).html("");
	
	var workOrderTypeVals = document.getElementById('filter-multiselect-work-order-type');
	var ordersLength = workOrderTypeVals.options.length;		
	
	for ( var i = 0; i < ordersLength; i++) 
	{
		if (workOrderTypeVals.options[i].selected) 
		{
			 $(summaryWorkOrderId).append(workOrderTypeVals.options[i].text+"<br/>");	
		}
	} 
	
	
	/*for(i =0; i< 50; i++){
	 $("#summary-workordertypes-selected").append("temp            value:"+i+"<br/>");
	}*/
	//summary-workordertypes-selected
	
	/*var items3="";
	for(var i=0;i<document.getElementById("filter-multiselect-work-order-type").options.length;i++){		
		if(document.getElementById("filter-multiselect-work-order-type").options[i].selected){			
			items3 +='<div class="sub-block-summary-content">'+document.getElementById("filter-multiselect-work-order-type").options[i].text+'</div>';		
		}		
	}
	$("#summary-workordertypes-selected").html(items3);
	*/
	var randomNum = Math.random(); 
	//Work Order Progress
	
	var stockChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/Doughnut2D.swf", "Work Order Progress"+randomNum,"930","513");
	stockChart.setDataXML(data.workOrderProgress);
	stockChart.render("block-work-order-chart-view");
	
	stockChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/MSCombi2D.swf", "Weekly DetailedProgress"+randomNum,"930","513");
	stockChart.setDataXML(data.detailedProgress);
	stockChart.render("block-work-order-chart-view2");
	
}

function refreshChart1(){
	
	var randomNum = Math.random(); 
	//Work Order Progress
	
	var stockChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/Doughnut2D.swf", "Work Order Progress"+randomNum,"930","513");
	stockChart.setDataXML("");
	stockChart.render("block-work-order-chart-view");
	
	stockChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/MSCombi2D.swf", "Weekly DetailedProgress"+randomNum,"930","513");
	stockChart.setDataXML("");
	stockChart.render("block-work-order-chart-view2");
	
}

/*function appendDynamicChildDiv(divClassName,divText,parentDivId){
    
    var iDiv = document.createElement('div');
    iDiv.className = divClassName;
    iDiv.innerHTML = divText;
    document.getElementById(parentDivId).appendChild(iDiv);
}*/
function updateWorkOrder(orderType){
	
	var ap_dateInterval = $("#filter-select-date-interval").val();
	var ap_dateFrom = $("#filter-date-from").val();
	var ap_dateTo = $("#filter-date-to").val();
	var ap_domain = $("#filter-multiselect-domain").val();
	var ap_areaType = $("#filter-multiselect-area-type").val();
	var ap_workOrderType = $("#filter-multiselect-work-order-type").val();
	var ap_unplanned = $("#filter-checkbox-unplanned").prop('checked');
	var ap_area = $("#filter-multiselect-area").val();

	if(ap_dateInterval == "custominterval"){
			
			
			if(!validateInputs(ap_dateFrom,from_err_msg)){
				return false;
			}
			
			if(!validateInputs(ap_dateTo,to_err_msg)){
				return false;
			}
			
			if(new Date(ap_dateFrom) > new Date(ap_dateTo)){
				alert(i18nerrorFromDateOlderThanToDate);
				return false;
			}
			
	}
	
	 if(!validateInputs(ap_domain,domain_err_msg)){
			return false;
	 } 
	 if(!validateInputs(ap_areaType,areatype_err_msg)){
			return false;
	 }
	 if(!validateInputs(ap_workOrderType,workordertype_err_msg)){
			return false;
	 }
	 if(!validateInputs(ap_area,area_err_msg)){
			return false;
	 }
	 
	saveAPFilters(ap_dateInterval,ap_dateFrom,ap_dateTo,ap_domain,ap_areaType,ap_workOrderType,ap_unplanned,ap_area);
	saveAreaProgressFilter("block-work-order-tab",orderType );
	
	//Removing old charts
	refreshChart1();
	refreshChart2();
	
	var obj3= {};
	obj3.url=contextPath+"/std/WorkOrderStatusChart.action";
	obj3.pdata = 'dateInterval='+ap_dateInterval+'&dateFrom='+ap_dateFrom+'&dateTo='+ap_dateTo+'&domain='+ap_domain+
	   		'&areaType='+ap_areaType+'&workOrderType='+ap_workOrderType+'&unplanned='+ap_unplanned+'&area='+ap_area;
		
	if(orderType != "undefined" && orderType != null && orderType != ""){
		var stockChart;
		if(orderType == "progress"){
			updateStatusTab("#block-work-order-tab1","#block-work-order-tab2");
			/*$("#block-work-order-tab1").addClass("tab selected");
			$("#block-work-order-tab2").removeClass("tab selected");
			$("#block-work-order-tab2").addClass("tab");*/
			obj3.successfunc = drawChart1;	
			obj3.errorfunc = errorDetails;
			run_ajax(obj3);
			
		}else if(orderType == "status"){
			updateStatusTab("#block-work-order-tab2","#block-work-order-tab1");
			
			obj3.successfunc = drawChart2;	
			obj3.errorfunc = errorDetails;
			run_ajax(obj3);
			
			
		} 
		
	}
	
	return;	
}

function drawChart2(data){
	
	showWorkOrderStatusCharts();	
	
	$("#block-summary-content-wo-count").html(eval(data).totalNoOfWorkOrders);
	
	var summaryWorkOrderId = "#summary-workordertypes-selected";
	
	//Removing old data for summaryWorkOrder
	$(summaryWorkOrderId).html("");
	
	var workOrderTypeVals = document.getElementById('filter-multiselect-work-order-type');
	var ordersLength = workOrderTypeVals.options.length;		
	
	for ( var i = 0; i < ordersLength; i++) 
	{
		if (workOrderTypeVals.options[i].selected) 
		{
			 $(summaryWorkOrderId).append(workOrderTypeVals.options[i].text+"<br/>");	
		}
	} 
	
	var randomNum = Math.random(); 
	//Work Order Status Overview
	stockChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/Pie2D.swf", "Work Order Status"+randomNum, "680", "545");
	stockChart.setDataXML(data.workOrderStatus);
	//alert("Work Order status xml " + data.workOrderStatus);
	stockChart.render("block-work-order-status-chart");
	
	//Work Order Status - Not Performed
	stockChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/StackedColumn2D.swf", "Not Performed"+randomNum,"260","500");
	stockChart.setDataXML(data.notPerformedDetail);
	//alert("Work Order NP " + data.notPerformedDetail);
	stockChart.render("block-work-order-status-chart-right");
	
}

function refreshChart2(){
	var randomNum = Math.random(); 
	//Work Order Status Overview
	stockChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/Pie2D.swf", "Work Order Status"+randomNum, "680", "545");
	stockChart.setDataXML("");
	//alert("Work Order status xml " + data.workOrderStatus);
	stockChart.render("block-work-order-status-chart");
	
	//Work Order Status - Not Performed
	stockChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/StackedColumn2D.swf", "Not Performed"+randomNum,"260","500");
	stockChart.setDataXML("");
	//alert("Work Order NP " + data.notPerformedDetail);
	stockChart.render("block-work-order-status-chart-right");
	
}


//Common method for validating the inputs
function validateInputs(inputVal,errorMessage){
	//var inputVal = $(selectName).val();
	if(inputVal == null || inputVal == ""){
		alert(errorMessage);
		return false;
	}	
	return true;
}

function showWorkOrderStatusCharts(){
	//Hide Work Order Progress charts
	$("#block-work-order-chart-view").hide();
	$("#block-work-order-chart-view2").hide();
	//Show Work Order Status charts
	$("#block-work-order-status-chart").show();
	$("#block-work-order-status-chart-right").show();
	
	
}
	
function showWorkOrderProgressCharts(){
	
	//Hide Work Order Status charts
	$("#block-work-order-status-chart").hide();
	$("#block-work-order-status-chart-right").hide();
	
	//Show Work Order Progress charts
	$("#block-work-order-chart-view").show();
	$("#block-work-order-chart-view2").show();
	//$("#from_date").hide();
	
}	

//Populate the multi-select box with the given data for the given id
function populateSavedMultiSelectBox(idName, items,savedData){
	
	$(idName).find('option').remove();
	$(idName).multiselect('refresh');
	
	var selectData = $(idName).multiselect();	
	selectData.append(items);
	
	if(savedData!=null && savedData!='') {
		var dataArray = savedData.split(",");
		$(idName).val(dataArray);
	}
	
	selectData.multiselect('refresh');	
		
}

function updateStatusTab(tabId1,tabId2){
	
	var tabSelected = "tab selected";
	
	//if(statusType == "progress"){
		$(tabId1).addClass(tabSelected);
		$(tabId2).removeClass(tabSelected);
		$(tabId2).addClass("tab");
	//}else if(statusType == "status"){
		
		/*$("#block-work-order-tab1").removeClass(tabSelected);
		$("#block-work-order-tab1").addClass("tab");
		$("#block-work-order-tab2").addClass(tabSelected);*/
	//}	
}

function loadDefaultTabs(){
	
	var orderType = $.cookie(pgCode+"block-work-order-tab");	
	 
	
	if(orderType != "undefined" && orderType != null && orderType != ""){

		if(orderType == "progress"){
			updateStatusTab("#block-work-order-tab1","#block-work-order-tab2");
						
		}else if(orderType == "status"){
			updateStatusTab("#block-work-order-tab2","#block-work-order-tab1");
		
		} 
	}
}

function saveAPFilters(ap_dateInterval,ap_dateFrom,ap_dateTo,ap_domain,ap_areaType,ap_workOrderType,ap_unplanned,ap_area) {	
	$.cookie(pgCode+"ap_dateInterval",ap_dateInterval,{ expires: 7 });
	$.cookie(pgCode+"ap_dateFrom",ap_dateFrom,{ expires: 7 });
	$.cookie(pgCode+"ap_dateTo",ap_dateTo,{ expires: 7 });
	$.cookie(pgCode+"ap_domain",ap_domain,{ expires: 7 });
	$.cookie(pgCode+"ap_areaType",ap_areaType,{ expires: 7 });
	$.cookie(pgCode+"ap_workOrderType",ap_workOrderType,{ expires: 7 });
	$.cookie(pgCode+"ap_unplanned",ap_unplanned,{ expires: 7 });
	$.cookie(pgCode+"ap_area",ap_area,{ expires: 7 });
}

function saveAreaProgressFilter(key,value){
	$.cookie(pgCode+key,value,{ expires: 7 });	
}
