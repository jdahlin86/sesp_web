jQuery(document).ready(function($){
	
	$("#block-planning-periods .table-line").click(function() {
		if($(this).hasClass("selected")){
			$(this).removeClass("selected");
		}else{
			$(this).addClass("selected");
		}
	});
	
	$(".block-title-button-select-all").click(function(e){
		$("#block-planning-periods .table-line").addClass("selected");
		
		e.stopPropagation();
		return false;
	});
	
	$(".block-title-button-select-none").click(function(e){
		$("#block-planning-periods .table-line").removeClass("selected");
		e.stopPropagation();
		return false;
	});
});

var i18nErrorSelectArea;
var i18nErrorSelectDomain;
var i18nErrorSelectAreaType;
var i18nErrorSelectUtilityType;
var i18nErrorSelectDeviceType;
var i18nErrorSelectWorkOrderType;
var i18nErrorSelectDeviceModel;
var i18nErrorSelectPlanningPeriod;
var contextPath="";
var pageCode = "Res_Proj";
var domainCodes = "";
var deviceAssertChart;
var devAssetPieChart;
var SELECTED = "selected";
//var allRowIds = "";


function loadDefaultData(){
	//alert("loading");
	defaultDateInterval();
	getDomainList();
	getUtilityTypes();	
	getWorkOrderTypes();
	getArea();
	getAreaType();
	getDeviceType();
	getDeviceModels();
	
}

function defaultDateInterval(){
	
	populateSavedValue("#block-time-select-date-interval",$.cookie(pageCode+"block-time-select-date-interval"));
	populateSavedValue("#block-time-date-from",$.cookie(pageCode+"block-time-date-from"));
	populateSavedValue("#block-time-date-to",$.cookie(pageCode+"block-time-date-to"));
		
	onDateIntervalSelect();
	
}

function onDateIntervalSelect() {
	
	if ($("#block-time-select-date-interval").val() == "custominterval") {
		showDate();
	} else {
		hideDate();
	}
}

function hideDate()
{
	
	
	//$("#block_from_and_to_date").hide();
	
	$("#block-time-date-from").hide();
	$("#block-time-date-to").hide();
}

function showDate(){
	
	//$("#block_from_and_to_date").show();
	$("#block-time-date-from").show();
	$("#block-time-date-to").show();
}

function getDomainList() {	
	var obj= {};
	obj.url=contextPath+"/std/GetDomains.action";	
	obj.successfunc = fillDomain;	
	obj.errorfunc = errorAutoFill;
	run_ajax_json(obj);
	return;	
}


function getArea() {
	
	if(domainCodes == null || domainCodes == ""){
		return false;
	}	
	var obj= {};
	obj.url=contextPath+"/std/AnalyzeWorkOrderArea.action";	
	obj.pdata = "domainCodes=" + domainCodes;	
	obj.successfunc = fillArea;	
	obj.errorfunc = errorAutoFill;
	run_ajax_json(obj);
	return;	
}


function getUtilityTypes(){
	
	var obj= {};
	obj.url=contextPath+"/std/AlertManagementUtilityTypes.action";	
	//obj.url=contextPath+"/std/ResourceProjectionAction.action";
	
//	alert("resource domain:url :"+obj.url);
	obj.successfunc = fillUtilityTypes;	
	obj.errorfunc = errorAutoFill;
	run_ajax_json(obj);
	return;
	
}

function getAreaType(){
	var obj= {};
	obj.url=contextPath+"/std/AlarmManagementAreaTypes.action";	
	//obj.url=contextPath+"/std/ResourceProjectionAction.action";
	
//	alert("resource domain:url :"+obj.url);
	obj.successfunc = fillAreaType;	
	obj.errorfunc = errorAutoFill;
	run_ajax_json(obj);
	return;
}

function getDeviceType(){
	var obj= {};
	obj.url=contextPath+"/std/GetDeviceTypes.action";	
	//obj.url=contextPath+"/std/ResourceProjectionAction.action";
	
//	alert("resource domain:url :"+obj.url);
	obj.successfunc = fillDeviceType;	
	obj.errorfunc = errorAutoFill;
	run_ajax_json(obj);
	return;
}

function getWorkOrderTypes(){
	var obj= {};
	obj.url=contextPath+"/std/getWorkOrderTypes.action";	
	//obj.url=contextPath+"/std/ResourceProjectionAction.action";
	
//	alert("resource domain:url :"+obj.url);
	obj.successfunc = fillWorkOrderTypes;	
	obj.errorfunc = errorAutoFill;
	run_ajax_json(obj);
	return;
}

function getDeviceModels(){
	
	if(domainCodes == null || domainCodes == ""){
		return false;
	}
	var obj= {};
	obj.url=contextPath+"/std/GetDeviceModels.action";	
	obj.pdata = "dc="+domainCodes;	
	obj.successfunc = fillDeviceModels;	
	obj.errorfunc = errorAutoFill;
	run_ajax_json(obj);
	return;
}

function fillDeviceModels(data){

	/*var items;
	$.each(data, function(i, item) {
		items += '<option value="' + item.id + '" selected>' + item.name + '</option>';
	});
	populateMultiSelectBox("#filter-multiselect-device-model", items);*/
	
	var items;	
	var savedData = $.cookie(pageCode+"filter-multiselect-device-model");	
	var selected = '" > ';
	
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	populateSavedMultiSelectBox("#filter-multiselect-device-model", items,savedData);
	
}

function fillWorkOrderTypes(data){

	/*var items;
	$.each(data, function(i, item) {
		items += '<option value="' + item.id + '" selected>' + item.name + '</option>';
	});
	populateMultiSelectBox("#filter-multiselect-work-order-type", items);*/
	
	var items;	
	var savedData = $.cookie(pageCode+"filter-multiselect-work-order-type");	
	var selected = '" > ';
	
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	populateSavedMultiSelectBox("#filter-multiselect-work-order-type", items,savedData);
	
}

function fillDeviceType(data){

	/*var items;
	$.each(data, function(i, item) {
		items += '<option value="' + item.id + '" selected>' + item.name + '</option>';
	});
	populateMultiSelectBox("#filter-multiselect-device-type", items);*/
	
	var items;	
	var savedData = $.cookie(pageCode+"filter-multiselect-device-type");	
	var selected = '" > ';
	
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	populateSavedMultiSelectBox("#filter-multiselect-device-type", items,savedData);
	
}

function fillArea(data){

	/*var items;
	$.each(data, function(i, item) {
		items += '<option value="' + item.id + '" selected>' + item.name + '</option>';
	});
	populateMultiSelectBox("#filter-multiselect-area", items);*/
	
	var items;	
	var savedData = $.cookie(pageCode+"filter-multiselect-area");	
	var selected = '" > ';
	
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	populateSavedMultiSelectBox("#filter-multiselect-area", items,savedData);
	
}

function fillAreaType(data){

	/*var items;
	$.each(data, function(i, item) {
		items += '<option value="' + item.id + '" selected>' + item.name + '</option>';
	});
	populateMultiSelectBox("#filter-multiselect-area-type", items);*/
	
	var items;	
	var savedData = $.cookie(pageCode+"filter-multiselect-area-type");	
	var selected = '" > ';
	
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	populateSavedMultiSelectBox("#filter-multiselect-area-type", items,savedData);
	
}

function fillUtilityTypes(data){
	
	/*var items;
	$.each(data, function(i, item) {
		items += '<option value="' + item.id + '" selected>' + item.name + '</option>';
	});
	populateMultiSelectBox("#filter-multiselect-utility-type", items);*/
	
	var items;	
	var savedData = $.cookie(pageCode+"filter-multiselect-utility-type");	
	var selected = '" > ';
	
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	populateSavedMultiSelectBox("#filter-multiselect-utility-type", items,savedData);
	
}



function domainChanged(){
	
	domainCodes = $("#block-time-multiselect-domain").val();
	if(domainCodes != null && domainCodes != ""){
	    getArea();
	    getDeviceModels();
	}else{
		refreshMultiSelectBox("#filter-multiselect-area");
		refreshMultiSelectBox("#filter-multiselect-device-model");
	}
	
	
}

function updatePlanningPeriod(){
	
	var paramData = "";
	
	//Remove the old table for Planning periods
	$("#block-planning-periods-table").children().remove();

	 //Replace with the new table
	/* $('#block-planning-periods-table').append(
	    		'<tr class="table-title" style="position:fixed;">	<th class="col1">'+i18nplanningname+
	    		'</th>	<th class="col2">'+i18nplanningstartdate+
	    		'</th>	<th class="col3">'+i18nplanningenddate+
	    		'</th>	<th class="col4">'+i18nplanningdomain+'</th></tr>');

	 $('#block-planning-periods-table').append('<div style="height:240px; overflow:auto">');*/	
	
	 //Domain Validation
	 if(!validateInputs("#block-time-multiselect-domain",i18nErrorSelectDomain)){
			return false;
	 }
		
	
	 domainChanged();
	 	 
	 var dateInterval = $("#block-time-select-date-interval").val();
	 paramData = "domains="+domainCodes+"&dateInterval="+dateInterval;
	
	 saveResourceProjectionFilter("block-time-multiselect-domain",domainCodes);
	 saveResourceProjectionFilter("block-time-select-date-interval",dateInterval);
	 
	 if(dateInterval == "custominterval"){
	
				
		if(!validateInputs("#block-time-date-from",i18nerrorPleaseselectfromdate)){
			return false;
		}
		
		if(!validateInputs("#block-time-date-to",i18nerrorPleaseselecttodate)){
			return false;
		}
		
		if(new Date($("#block-time-date-from").val()) > new Date($("#block-time-date-to").val())){
			alert(i18nerrorFromDateOlderThanToDate);
			return false;
		}
		
		paramData = paramData + "&loadFromDate="+$("#block-time-date-from").val()+
		            "&loadToDate="+$("#block-time-date-to").val();
	}
	
	 saveResourceProjectionFilter("block-time-date-from",$("#block-time-date-from").val());
	 saveResourceProjectionFilter("block-time-date-to",$("#block-time-date-to").val());
	//paramData = paramData + "&domains="+domainCodes;
	
	var obj= {};
	obj.url=contextPath+"/std/getResourceProjectionPlanningPeriods.action";	
	obj.pdata = paramData;	
	obj.successfunc = fillPlanningPeriodsData;	
	obj.errorfunc = errorAutoFill;
	run_ajax_json(obj);
	return;
	
	
	/*$('#block-planning-periods-table').append(
			 '<tr class="table-line line-grey">	<td>Month</td><td>2013-03-01</td><td>2013-03-01</td>	<td>Domain #1</td>	</tr>');
	
	$('#block-planning-periods-table').append(
	 '<tr class="table-line">	<td>Month</td><td>2013-03-01</td><td>2013-03-01</td>	<td>Domain #1</td>	</tr>');
	*/
}

function fillPlanningPeriodsData(data){
	
	if(data != null){
		//$('#block-planning-periods-table').append('<div style="height:240px; overflow:auto"> <tbody >');
		for(var i=0; i < data.length; i++){
			var planningPeriod = data[i];
			var className = i%2 == 0 ? 'table-line line-grey' : 'table-line';
			var tableData = '<tr onclick="selectRow('+planningPeriod.planningPeriodId+');" id="'+ planningPeriod.planningPeriodId +
			'" class="'+ className+'">'+
			  '<td style="text-align:left !important;width:170px;overflow:hidden;">'+planningPeriod.planningName+'</td>'+
			  '<td style="text-align:left !important;width:110px;overflow:hidden;">'+planningPeriod.planningStartDate.substring(0,10)+'</td>'+
			  '<td style="text-align:left !important;width:100px;overflow:hidden;">'+planningPeriod.planningEndDate.substring(0,10)+'</td>'+
			  '<td style="text-align:left !important;width:200px;overflow:hidden;">'+planningPeriod.domainName+'</td>';
			//alert("tableData:"+tableData);
			$('#block-planning-periods-table').append(tableData);
		/*	if(i == 0){
			   allRowIds =  planningPeriod.planningPeriodId;
			}else{
				allRowIds += "," +  planningPeriod.planningPeriodId;
			}	*/			
		}
		
		//$('#block-planning-periods-table').append('</div></tbody>');
			
	}
	
	
}

function fillDomain(data){
	//alert("filling domain");
	var items;
	
	var savedData = $.cookie(pageCode+"block-time-multiselect-domain");	
	var selected = '" > ';
	if(savedData == null || savedData == ''){
		selected = '" selected > ';
	}
		
	$.each(data, function(i, item) {
		items += '<option value="' + item.id +selected + item.name + '</option>';
		
	});
	
	//populateMultiSelectBox("#block-time-multiselect-domain", items);
	
	populateSavedMultiSelectBox("#block-time-multiselect-domain", items,savedData);
	
	/*$("#block-time-multiselect-domain").find('option').remove();
	$("#block-time-multiselect-domain").multiselect('refresh');
	var domains = $("#block-time-multiselect-domain").multiselect();	
	$.each(data, function(i, item) {
		items += '<option value="' + item.id + '">' + item.name + '</option>';
	});	
	domains.append(items);
	
	
	var ap_area = $.cookie(pageCode+"block-time-multiselect-domain");		
	if(ap_area!=null && ap_area!='') {
		var dataarray = ap_area.split(",");
		$("#block-time-multiselect-domain").val(dataarray);
	}
	
	domains.multiselect('refresh');*/	
}

//Populate the multi-select box with the given data for the given id
function populateSavedMultiSelectBox(idName, items,savedData){
	
	/*$(idName).html(items);
	$(idName).multiselect("refresh");*/
	
	$(idName).find('option').remove();
	$(idName).multiselect('refresh');
	var selectData = $(idName).multiselect();	
	/*$.each(data, function(i, item) {
		items += '<option value="' + item.id + '">' + item.name + '</option>';
	});	*/
	selectData.append(items);
		
	//var savedData = $.cookie(pageCode+idName);		
	if(savedData!=null && savedData!='') {
		var dataArray = savedData.split(",");
		$(idName).val(dataArray);
	}
	
	selectData.multiselect('refresh');	
		
}

//Populate the multi-select box with the given data for the given id
function populateMultiSelectBox(idName, items){
	
	$(idName).html(items);
	$(idName).multiselect("refresh");
}

function errorAutoFill(data) {
	alert("Error : " + data.responseText);
}



function selectRow(id){
	
	/*var table = document.getElementById("block-planning-periods-table");
	
	var row = table.rows[1];
	alert(row.id);*/
	
	
	//alert("row selected:"+id);
	//alert($('#6')."));
	//var isValid = 1;
	var rowId = "#"+id;
	
	if($(rowId).hasClass(SELECTED) == true){
		$(rowId).removeClass(SELECTED);
		//isValid = 0;
	}else{
		//isValid = 1;
		$(rowId).addClass(SELECTED);
	}
	
}



function processProjections(){
		
	// Removing old images/charts
	//Assets
    //device-assets-projections-per-month
    drawStackedBarChart("","block-device-assets-projections-per-month-view","75%","500");	
	//device-assets-projections-total
    drawPieChart("","block-device-assets-projections-total-view","75%","500");
    
    //Resources
    //resource-projections-per-month
    drawStackedBarChart("","block-resource-projections-per-month-view","75%","500");
    //resource-projections-total
	drawPieChart("","block-resource-projections-total-view","75%","500");
	
	//Getting the selected Planning Period IDs
	var table = document.getElementById("block-planning-periods-table");
	
	var rowId = "";
	var selectRowIds = "";
	
	for(i = 0; i < table.rows.length ; i++ ){
		
		rowId = table.rows[i].id;		
		if($('#'+rowId).hasClass(SELECTED) == true){
			
			selectRowIds = selectRowIds.length == 0 ? rowId : ( selectRowIds + "," + rowId );
			
		}
		
	}	
	//alert(selectRowIds);
	
	if(selectRowIds.length == 0){
		alert(i18nErrorSelectPlanningPeriod);
		return;
	}
	
	if(!validateInputs("#filter-multiselect-utility-type",i18nErrorSelectUtilityType)){
		return ;
	}
	
	
	
	if(!validateInputs("#filter-multiselect-area-type",i18nErrorSelectAreaType)){
		return ;
	}
	
	if(!validateInputs("#filter-multiselect-work-order-type",i18nErrorSelectWorkOrderType)){
		return ;
	}
	
	if(!validateInputs("#filter-multiselect-area",i18nErrorSelectArea)){
		return ;
	}
	
	if(!validateInputs("#filter-multiselect-device-type",i18nErrorSelectDeviceType)){
		return ;
	}
	
	if(!validateInputs("#filter-multiselect-device-model",i18nErrorSelectDeviceModel)){
		return ;
	}
	
	
	
	var utilityType = $("#filter-multiselect-utility-type").val();
	var area = $("#filter-multiselect-area").val();
	var areaType = $("#filter-multiselect-area-type").val();
	var workOrderType = $("#filter-multiselect-work-order-type").val();
	var deviceType = $("#filter-multiselect-device-type").val();
	var deviceModel = $("#filter-multiselect-device-model").val();
	
	saveResourceProjectionFilter("filter-multiselect-utility-type", utilityType);
	saveResourceProjectionFilter("filter-multiselect-area", area);
	saveResourceProjectionFilter("filter-multiselect-area-type", areaType);
	saveResourceProjectionFilter("filter-multiselect-work-order-type", workOrderType);
	saveResourceProjectionFilter("filter-multiselect-device-type", deviceType);
	saveResourceProjectionFilter("filter-multiselect-device-model", deviceModel);
	
	
	
	var paramData = "utilityType="+utilityType+"&area="+area+"&areaType="+areaType+"&workOrderType="+workOrderType+
	"&deviceType="+deviceType+"&deviceModel="+deviceModel+"&planningPeriodIds="+selectRowIds;
	//alert("param data for Projections:"+paramData);
	
	var obj= {};
	obj.url=contextPath+"/std/getResourceProjectionsData.action";	
	obj.pdata = paramData;	
	obj.successfunc = fillResourceProjectsData;	
	obj.errorfunc = errorAutoFill;
	run_ajax_json(obj);
	return;
	
	
	
}

function fillResourceProjectsData(data){

	//alert("filling rp");
	if(data != null){
	
		
	//var stackedData = data.deviceAssetsPerMonth;
	//alert("data:"+stackedData);
	/*alert("data-filling rp:"+deviceAssetsList);
	var daLength = 2;//deviceAssetsList.size();
	var concenDataSet = "";
	var directDataSet = "";
	var troubleDataSet = "";
	var ctDataSet = "";
	
	for(var i = 0; i < daLength; i++){
		
		var deviceAsset = deviceAssetsList[i];
		concenDataSet = concenDataSet +"<set value='"+deviceAsset.getConInstallation()+"'/>";
		directDataSet = directDataSet +"<set value='"+deviceAsset.getDirectMeasured()+"'/>";
		troubleDataSet = troubleDataSet +"<set value='"+deviceAsset.getTroubleMeasurePoint()+"'/>";
		ctDataSet = ctDataSet +"<set value='"+deviceAsset.getCtMeaured()+"'/>";
	}
	var stackedData = "<chart caption='' xAxisName='' yAxisName='' showAlternateVGridColor='0' canvasBorderThickness='1' canvasBgColor='E9E9E9' vdivLineColor='E9E9E9'  ><categories><category label='Jan' /><category label='Feb' /><category label='Mar' /><category label='Apr' /><category label='May' /><category label='Jun' /><category label='Jul' /><category label='Aug' /><category label='Sep' /><category label='Oct' /><category label='Nov' /><category label='Dec' /></categories>"+
	"<dataset seriesName='Concentrator Installation' color='AFD8F8' showValues='1' alpha='90' thickness='1' ><set value='270' /><set value='298'/><set value='258' /><set value='268' /><set value='296' /><set value='326' /><set value='318' /><set value='367' /><set value='297' /><set value='319' /><set value='329' /><set value='348' /></dataset>"+
	"<dataset seriesName='Direct measured' color='F984A1' showValues='1' alpha='90'  ><set value='270' /><set value='298'/><set value='258' /><set value='268' /><set value='296' /><set value='326' /><set value='318' /><set value='367' /><set value='297' /><set value='319' /><set value='329' /><set value='348' /></dataset>"+
	"<dataset seriesName='Troubleshoot measurepoint' color='8BBA00' showValues='1' alpha='90' ><set value='270' /><set value='298'/><set value='258' /><set value='268' /><set value='296' /><set value='326' /><set value='318' /><set value='367' /><set value='297' /><set value='319' /><set value='329' /><set value='348' /></dataset>"+
	"<dataset seriesName='CT measured' color='F6BD0F' showValues='1' alpha='90' ><set value='270' /><set value='298'/><set value='258' /><set value='268' /><set value='296' /><set value='326' /><set value='318' /><set value='367' /><set value='297' /><set value='319' /><set value='329' /><set value='348' /></dataset>"+
	//"<dataset seriesName='2001' color='F6BD0F' showValues='1'><set value='450'/><set value='650'/><set value='760' /><set value='680' /><set value='118' /><set value='197' /><set value='217' /><set value='219' /><set value='229' /><set value='298' /></dataset>" +
	"</chart>";
	
	var stackedData = "<chart caption='' xAxisName='' yAxisName='' showAlternateVGridColor='0' canvasBorderThickness='1' canvasBgColor='E9E9E9' vdivLineColor='E9E9E9'  ><categories><category label='Jan' /><category label='Feb' /><category label='Mar' /><category label='Apr' /><category label='May' /><category label='Jun' /><category label='Jul' /><category label='Aug' /><category label='Sep' /><category label='Oct' /><category label='Nov' /><category label='Dec' /></categories>"+
	"<dataset seriesName='Concentrator Installation' color='AFD8F8' showValues='1' alpha='90' thickness='1' >"+concenDataSet+"</dataset>"+
	"<dataset seriesName='Direct measured' color='F984A1' showValues='1' alpha='90'  >"+directDataSet+"</dataset>"+
	"<dataset seriesName='Troubleshoot measurepoint' color='8BBA00' showValues='1' alpha='90' >"+troubleDataSet+"</dataset>"+
	"<dataset seriesName='CT measured' color='F6BD0F' showValues='1' alpha='90' >"+ctDataSet+"</dataset>"+
	//"<dataset seriesName='2001' color='F6BD0F' showValues='1'><set value='450'/><set value='650'/><set value='760' /><set value='680' /><set value='118' /><set value='197' /><set value='217' /><set value='219' /><set value='229' /><set value='298' /></dataset>" +
	"</chart>";*/
	
//	///<chart bgColor='E9E9E9' outCnvBaseFontColor='666666' caption='Monthly Sales Summary Comparison' xAxisName='Month' yAxisName='Sales' numberPrefix='$' showValues='0' numVDivLines='10' showAlternateVGridColor='1' AlternateVGridColor='e1f5ff' divLineColor='e1f5ff' vdivLineColor='e1f5ff' baseFontColor='666666' toolTipBgColor='F3F3F3' toolTipBorderColor='666666' canvasBorderColor='666666' canvasBorderThickness='1' showPlotBorder='1' plotFillAlpha='80'><categories><category label='Jan' /><category label='Feb' /><category label='Mar' /><category label='Apr' /><category label='May' /><category label='Jun' /><category label='Jul' /><category label='Aug' /><category label='Sep' /><category label='Oct' /><category label='Nov' /><category label='Dec' /></categories><dataset seriesName='2004' color='B1D1DC' plotBorderColor='B1D1DC'><set value='27400' /><set value='29800'/><set value='25800' /><set value='26800' /><set value='29600' /><set value='32600' /><set value='31800' /><set value='36700' /><set value='29700' /><set value='31900' /><set value='32900' /><set value='34800' /></dataset><dataset seriesName='2003' color='C8A1D1' plotBorderColor='C8A1D1'><set /><set /><set value='4500'/><set value='6500'/><set value='7600' /><set value='6800' /><set value='11800' /><set value='19700' /><set value='21700' /><set value='21900' /><set value='22900' /><set value='29800' /></dataset><trendlines><line startValue='22000' endValue='58000' color='999999' displayValue='Target' dashed='1' thickness='2' dashGap='6' alpha='100' showOnTop='1'/></trendlines><styles><definition><style type='animation' name='TrendAnim' param='_alpha' duration='1' start='0' /></definition><application><apply toObject='TRENDLINES' styles='TrendAnim' /></application></styles></chart>Reload Chart View chart in: Flash JavaScript
	//<chart palette='2' caption='Product Comparison' showLabels='1' showvalues='0' numberPrefix='$' showSum='1' decimals='0' useRoundEdges='1' legendBorderAlpha='0'><categories>
	//drawDeviceAssetStackedChart("<chart palette='2' caption='Product Comparison' showLabels='1' showvalues='0' numberPrefix='$' showSum='1' decimals='0' useRoundEdges='1' legendBorderAlpha='0'><categories>");
	//	//<chart caption='Airline Delay Causes' showPercentageInLabel='1' showValues='0' showLabels='0' showLegend='1'><set value='14.94' label='Weather' color='429EAD'/><set value='19.17' label='Volume' color='4249AD'/><set value='7.14' label='Closed Runway' color='AD42A2'/><set value='7.75' label='Others' color='D4AC31'/></chart>
    /*var pieData = "<chart caption='' showValues='1' showLabels='0' showLegend='1'>"+
	"<set value='14.94' label='Concentrator Installation' color='AFD8F8' showValues='1'/><set value='19.17' label='Direct measured' color='F984A1'/>"+
	"<set value='7.14' label='Troubleshoot measurepoint' color='8BBA00'/><set value='7.75' label='CT measured' color='F6BD0F'/></chart>";*/
	
	//Assets
	var monthlyAssets = data.deviceAssetsPerMonth;
	var totalAssets = data.totalDeviceAssets;
	
	//Resources
	var monthlyResources = data.resouresPerMonth;	
	var totalResoures = data.totalResources;
	
	//Assets
    //device-assets-projections-per-month
    drawStackedBarChart(monthlyAssets,"block-device-assets-projections-per-month-view","75%","500");	
	//device-assets-projections-total
    drawPieChart(totalAssets,"block-device-assets-projections-total-view","75%","500");
    
    //Resources
    //resource-projections-per-month
    drawStackedBarChart(monthlyResources,"block-resource-projections-per-month-view","75%","500");
    //resource-projections-total
	drawPieChart(totalResoures,"block-resource-projections-total-view","75%","500");
	
	}
}

//Generic method for Stacked Bar 2D chart
function drawStackedBarChart(data,idName,percentage, hight){
	var randomNum = Math.random(); 
	//alert(randomNum);
	deviceAssertChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/StackedBar2D.swf", idName+randomNum, percentage,hight);
	deviceAssertChart.setDataXML(data);
	deviceAssertChart.render(idName);
}
//Generic method for Pie chart
function drawPieChart(data,idName,percentage, hight){
	var randomNum = Math.random(); 
	//alert(randomNum);
	devAssetPieChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/Pie2D.swf", idName+randomNum, percentage,hight);
	devAssetPieChart.setDataXML(data);
	devAssetPieChart.render(idName);
}



//Common method for validating the inputs
function validateInputs(idName,errorMessage){
	var tempVal = $(idName).val();
	if(tempVal == null || tempVal == ""){
		alert(errorMessage);
		return false;
	}	
	return true;
}

function refreshMultiSelectBox(idName){
	
	$(idName).empty();
	$(idName).multiselect("refresh");	
}

function saveResourceProjectionFilter(key,value){
	$.cookie(pageCode+key,value,{ expires: 7 });	
}

function populateSavedValue(nameId,value){

	if( value != null && value !=''){
		$(nameId).val(value);
		return true;
	}
	return false;
}

/*function saveResourceProjectionsFilters(ap_dateInterval,ap_dateFrom,ap_dateTo,ap_domain,ap_areaType,ap_workOrderType,ap_unplanned,ap_area) {	
	$.cookie(pgCode+"ap_dateInterval",ap_dateInterval,{ expires: 7 });
	$.cookie(pgCode+"ap_dateFrom",ap_dateFrom,{ expires: 7 });
	$.cookie(pgCode+"ap_dateTo",ap_dateTo,{ expires: 7 });
	$.cookie(pgCode+"ap_domain",ap_domain,{ expires: 7 });
	$.cookie(pgCode+"ap_areaType",ap_areaType,{ expires: 7 });
	$.cookie(pgCode+"ap_workOrderType",ap_workOrderType,{ expires: 7 });
	$.cookie(pgCode+"ap_unplanned",ap_unplanned,{ expires: 7 });
	$.cookie(pgCode+"ap_area",ap_area,{ expires: 7 });
}*/