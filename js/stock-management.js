jQuery(document).ready(function($){
	
	/*
	 * tabs managing
	 */
    $("#block-on-pallet-tab1").click(function(){
    	
    	$("#display-tab-name").text(i18nStockSupplierTab);
    	if( !$(this).hasClass("selected")){
	    	$(".tab").removeClass("selected");
	    	$(this).addClass("selected");    	

	    	/**
			 * TODO action on the first tab
			 */ 
    	 
    	}
    });
    
    $("#block-on-pallet-tab2").click(function(){    	
    	
    	$("#display-tab-name").text(i18nInStockTab);
    	if( !$(this).hasClass("selected")){
	    	$(".tab").removeClass("selected");
	    	$(this).addClass("selected"); 
    	
	    	/**
			 * TODO action on the second tab
			 */  
    	 
    	 } 	
    });
    
    $("#block-on-pallet-tab3").click(function(){
    	
    	$("#display-tab-name").text(i18nStockPalletTab);
    	if( !$(this).hasClass("selected")){    		
	    	$(".tab").removeClass("selected");
	    	$(this).addClass("selected");    	
    	 	
	    	/**
			 * TODO action on the thrid tab
			 */
    	
    	}
    });
});

var contextPath = "";

var i18nSelectDeviceType;
var i18nSelectDomain;
var i18nSelectDeviceModel;
var i18nSelectStockSite;
var i18nerrorPleaseChooseMandatoryFields
var i18nerrorPleaseChooseCategory;
var i18nerrorPleaseChooseBreakup;
var i18nerrorChartError;
var i18nId;
var i18nName;
var i18nType;
var i18nInfo;
var i18nAddress;
var i18nPostCode;
var i18nPostAddress;
var i18nContactPerson;
var i18nContactWorkPhone;
var i18nContactMobilePhone;
var i18nStockAll;
var i18nOptionSelectEntityShown;
var i18nOptionSelectDivideEntity;
var i18nOptionSelectEntityShownFromSupplier;

function onLoadSpecial() {			  			
	// init();
	$("#display-tab-name").text(i18nStockSupplierTab);
	updateUnitStatus("fromSupplier");
	loadDomainList();	
	loadDeviceTypesList();

/*	populateSelectModelsList("#block-on-pallet-select-entity-shown", i18nOptionSelectEntityShownFromSupplier);
	populateSelectModelsList("#block-on-pallet-select-divide-entity", i18nOptionSelectDivideEntity);*/
}


function populateSelectModelsList(modelListId, items) {	
	$(""+modelListId+"").empty();
	$(""+modelListId+"").html(items);
}


function errorDetails(data) {
	alert(i18nerrorChartError);
}

function clearWarehousesList() {
	var items = '<option value=null>'+i18nSelectStockSite+'</option>';
	$("#filter-multiselect-stock-site").empty();
	$("#filter-multiselect-stock-site").html(items);
	$("#filter-multiselect-stock-site").multiselect("refresh");
}

function clearDeviceModelsList() {
	var items = '<option value=null>'+i18nSelectDeviceModel+'</option>';
	$("#filter-multiselect-device-model").empty();
	$("#filter-multiselect-device-model").html(items);
	$("#filter-multiselect-device-model").multiselect("refresh");
}

function loadDomainList() {	
	var obj= {};
	obj.url=contextPath+"/std/GetDomains.action";		
	obj.successfunc = function(data) {
		var items='';
		
		$.each(data, function(i, item) {
			items += '<option value="' + item.id + '">'	+ item.name + '</option>';
			});
		$("#filter-multiselect-domain").html(items);
		$("#filter-multiselect-domain").multiselect("refresh");
		
	};
	obj.errorfunc = errorDetails;
	run_ajax_json(obj);
	return;	
}

function loadDeviceModelsList(domainCode) {
	
	var obj= {};
	obj.url=contextPath+"/std/GetDeviceModels.action";
	obj.pdata = "dc="+domainCode;
	obj.successfunc = function(data) {
			clearDeviceModelsList();
			var items;			

			
			$.each(data, function(i, item) {
				items += '<option value="' + item.id + '">'
						+ item.name + '</option>';
			});
			$("#filter-multiselect-device-model").html(items);
			$("#filter-multiselect-device-model").multiselect("refresh");
			

		};
	obj.errorfunc = errorDetails;
	run_ajax_json(obj);
	return;
					
}

function loadDeviceTypesList() {
	var obj= {};
	obj.url=contextPath+"/std/GetDeviceTypes.action";		
	obj.successfunc = function(data) {
		var items;
		
		$.each(data, function(i, item) {
			items += '<option value="' + item.id + '">'	+ item.name + '</option>';
			});
		$("#filter-multiselect-device-type").html(items);
		$("#filter-multiselect-device-type").multiselect("refresh");

	};
	obj.errorfunc = errorDetails;
	run_ajax_json(obj);
	return;	
}

function loadWarehousesList(domainCode) {
	
	var obj= {};
	obj.url=contextPath+"/std/GetWarehouses.action";
	obj.pdata = "dc="+domainCode;
	obj.successfunc = function(data) {
	
			var items;			
			$.each(data, function(i, item) {
				items += '<option value="' + item.id + '">'
						+ item.name + '</option>';
			});

			$("#filter-multiselect-stock-site").html(items);
			$("#filter-multiselect-stock-site").multiselect("refresh");

		};
	obj.errorfunc = errorDetails;
	run_ajax_json(obj);
	return;
}


function displayInfo(id) {
		// alert(id);
		$("#warehouses").val(id);
		// submitLogistics();
	}


function infoDataCallback(id) {
	var returnData;
	var obj= {};
	obj.url=contextPath+"/std/GetStockInformation.action";
	obj.pdata = "id="+id;
	obj.successfunc = function(msg){ 
   		if(msg == "") {
			return;
		}
		var o = eval(msg);
		if(o == null)
			return;
		
		
		
		/*html = "<div id='bubble' class='bubble-stock-management text-grey'>";
			html += "<div id='bubble-header'></div>";
		
			html += "<div id='bubble-content'>";
				html += "<div class='bubble-line'>";
					html += "<div class='bubble-category'>"+i18nId+" :</div>";
					html += "<div class='bubble-value text-light-grey' id='map-bubble-stock-id'>" + v(o.id) +"</div>";
				html += "</div>";
				html += "<div class='bubble-line'>";
					html += "<div class='bubble-category'>"+i18nName+" :</div>";
					html += "<div class='bubble-value text-light-grey' id='map-bubble-name'>" + v(o.name) +"</div>";
				html += "</div>";
				html += "<div class='bubble-line'>";
					html += "<div class='bubble-category'>"+i18nType+" :</div>";
					html += "<div class='bubble-value text-light-grey' id='map-bubble-type'>" + v(o.type) +"</div>";
				html += "</div>";
			html += "</div>";
			html += "<div id='bubble-arrow'></div>";
		html += "</div>";	*/	
		
		html = "<div style=\"font-size:.8em;background-color:#ffffff;filter:alpha(opacity=80);opacity:.8;border-radius: 5px;\">";
		html += "<div id='bubble-header'></div>";
		html += "<div> <b>"+i18nId+" : </b>" + v(o.id) +"</div> ";
		html += "<div> <b>"+i18nName+" : </b>" + v(o.name) +"</div> ";
		html += "<div> <b>"+i18nType+" : </b>" + v(o.type) +"</div> ";
		/*html += "<div> "+i18nInfo+":" + v(o.info) +"</div> ";
		html += "<div> "+i18nAddress+":" + v(o.address) +"</div> ";
		html += "<div> "+i18nPostCode+":" + v(o.postCode) +"</div> ";
		html += "<div> "+i18nPostAddress+":" + v(o.postAddress) +"</div> ";
		html += "<div> "+i18nContactPerson+":" + v(o.contactPerson) +"</div> ";
		html += "<div> "+i18nContactMobilePhone+":" + v(o.cellPhone) +"</div> ";
		html += "<div> "+i18nContactWorkPhone+":" + v(o.workPhone) +"</div> ";*/
		html += "</div>";
		returnData =  html;
		
		function v(d) {
			if(d == null || d == "undefined") {
				return "";
			}
			return d;
		}		
   };
	obj.errorfunc = errorDetails;
	run_ajax_Sync(obj);
	return returnData;
}

function onChangeDomain()
{
	var ls_domain = $("#filter-multiselect-domain").val();
	// alert(ls_domain);
	if(null != ls_domain) {			
		loadDeviceModelsList(ls_domain);
		loadWarehousesList(ls_domain);
	} else {
		clearDeviceModelsList();
		clearWarehousesList();
	}
	//loadPoints(ls_domain);
}
	

function submitLogistics() {
		
	var validation = false; 
	validation = stockValidation();
	if(validation) {
		var ls_domain = $("#filter-multiselect-domain").val();
		var ls_devicetypes = $("#filter-multiselect-device-type").val();
		var ls_devicemodels = $("#filter-multiselect-device-model").val();
		var ls_warehouses = $("#filter-multiselect-stock-site").val();
		var ls_breakup = $("#block-on-pallet-select-divide-entity").val();
		var ls_category = $("#block-on-pallet-select-entity-shown").val();
		
		loadPoints(ls_domain,ls_warehouses);
					
		var obj= {};
		obj.url=contextPath+"/std/GetStockChart.action";
		obj.pdata = 'domain='+ls_domain+'&xaxis='+ls_category+'&yaxis='+ls_breakup+'&warehouses='+ls_warehouses+
		   		'&devicemodels='+ls_devicemodels+'&devicetypes='+ls_devicetypes+'&devicestatus='+deviceStatus;
		obj.successfunc = drawChart;	
		obj.errorfunc = errorDetails;
		run_ajax(obj);
		return;	
	}

	
}
	
function stockValidation() {
		
	var ls_domain = $("#filter-multiselect-domain").val();
	var ls_devicetypes = $("#filter-multiselect-device-type").val();
	var ls_devicemodels = $("#filter-multiselect-device-model").val();
	var ls_warehouses = $("#filter-multiselect-stock-site").val();
		
	if(ls_domain==null||ls_warehouses==null||ls_devicemodels==null||ls_devicetypes==null) {
		alert(i18nerrorPleaseChooseMandatoryFields);
		return false;
	}		
		
	return true;		
}
	
var stockChart;
var chartType = "Stacked3D";
var suffix = 0;
	
function drawChart(data) {
			
	stockChart = new FusionCharts(contextPath+"/js/fusionchartsxt/charts/StackedColumn2D.swf", "stockchartId"+suffix, "100%","445");
	//data = "<graph caption='Model Per Model' subCaption='Divide per Model' xAxisName='Model' yAxisName='Model' plotGradientColor=' ' decimalPrecision='0' rotateNames='1' legendBorderColor='E9E9E9' showAlternateHGridColor='0' legendShadow='0' bgColor='E9E9E9,E9E9E9' legendPosition='RIGHT' labelDisplay='Rotate' slantLabels='1' showValues='0' formatNumberScale='0' showPercentInToolTip = '0'><categories><category name='ASD' /><category name='sim_2_serial' /><category name='meter_ct_rs_rc' /><category name='sim_1_giai' /></categories><dataset seriesName='ASD' color='#FF0000' showValues='0'><set value='2.0' /><set value='0' /><set value='0' /><set value='0' /></dataset><dataset seriesName='sim_2_serial' color='#0174DF' showValues='0'><set value='0' /><set value='1.0' /><set value='0' /><set value='0' /></dataset><dataset seriesName='meter_ct_rs_rc' color='#D7DF01' showValues='0'><set value='0' /><set value='0' /><set value='1.0' /><set value='0' /></dataset><dataset seriesName='sim_1_giai' color='#B45F04' showValues='0'><set value='0' /><set value='0' /><set value='0' /><set value='2.0' /></dataset></graph>";
	stockChart.setDataXML(data);
	//stockChart.setDataXML("<graph caption='Business Results 2005 v 2006' PYAxisName='Revenue' SYAxisName='Quantity'xAxisName='Month' showValues='0' decimalPrecision='0' bgcolor='F3f3f3' bgAlpha='70' showColumnShadow='1' divlinecolor='c5c5c5' divLineAlpha='60' showAlternateHGridColor='1' alternateHGridColor='f8f8f8' alternateHGridAlpha='60' SYAxisMaxValue='750' showPercentInToolTip='1'> <categories><category name='Jan' /><category name='Feb' /><category name='Mar' /><category name='Apr' /><category name='May' /><category name='Jun' /><category name='Jul' /><category name='Aug' /> <category name='Sep' /> <category name='Oct' /><category name='Nov' /><category name='Dec' /></categories><dataset seriesName='2006' parentYAxis='P' color='c4e3f7' numberPrefix='$'><set value='27400' /><set value='29800' /><set value='25800' /><set value='26800' /><set value='29600' /><set value='32600' /><set value='31800' /><set value='36700' /><set value='29700' /><set value='31900' /><set value='34800' /><set value='24800' /></dataset><dataset seriesName='2005' parentYAxis='P' color='Fad35e' numberPrefix='$'><set value='10000' /><set value='11500' /><set value='12500' /><set value='15000' /><set value='11000' /><set value='9800'  /><set value='11800' /><set value='19700' /><set value='21700' /><set value='21900' /><set value='22900' /><set value='20800' /></dataset><dataset seriesName='Total Quantity' parentYAxis='S' color='8BBA00' anchorSides='10' anchorRadius='3' anchorBorderColor='009900' ><set value='270' /><set value='320' /><set value='290' /><set value='320' /><set value='310' /><set value='320' /><set value='340' /><set value='470' /><set value='420' /><set value='440' /><set value='480 '/><set value='360' /> </dataset></graph>");
	//myChart.setDataXML("<graph caption='Monthly Unit Sales' xAxisName='Month' yAxisName='Units' showNames='1' decimalPrecision='0' formatNumberScale='0'><set name='Jan' value='462' color='AFD8F8' /><set name='Feb' value='857' color='F6BD0F' /><set name='Mar' value='671' color='8BBA00' /><set name='Apr' value='494' color='FF8E46'/><set name='May' value='761' color='008E8E'/><set name='Jun' value='960' color='D64646'/><set name='Jul' value='629' color='8E468E'/><set name='Aug' value='622' color='588526'/><set name='Sep' value='376' color='B3AA00'/><set name='Oct' value='494' color='008ED6'/><set name='Nov' value='761' color='9D080D'/><set name='Dec' value='960' color='A186BE'/></graph>");
	stockChart.render("block-on-pallet-chart-view");
	suffix=suffix+1;
}

var deviceStatus='fromSupplier';
function updateUnitStatus(deviceSts)
{
	deviceStatus =  deviceSts;	
	
	
	if(deviceSts != "fromSupplier") {
		populateSelectModelsList("#block-on-pallet-select-entity-shown", i18nOptionSelectEntityShown);
	} else {
		populateSelectModelsList("#block-on-pallet-select-entity-shown", i18nOptionSelectEntityShownFromSupplier);
	}
	onChangeEntity();
	submitLogistics();
}

/*function onChangeEntity()
{
	alert("onChangeEntity() default status:"+deviceSts);
	var ls_entity = $("#block-on-pallet-select-entity-shown").val();		
	alert("ls_entity="+ls_entity);			
	
	alert("onChangeEntity() -> device status:"+deviceStatus);
//	if(("#block-on-pallet-tab1").hasClass("tab selected") == true){
	 if(deviceStatus == "fromSupplier") {
		alert("From supplier");
		//populateSelectModelsList("#block-on-pallet-select-entity-shown", i18nOptionSelectEntityShownFromSupplier);
		populateSelectModelsList("#block-on-pallet-select-divide-entity", i18nOptionSelectEntityShownFromSupplier);
	
	}else{
		//populateSelectModelsList("#block-on-pallet-select-entity-shown", i18nOptionSelectEntityShown);
		populateSelectModelsList("#block-on-pallet-select-divide-entity", i18nOptionSelectDivideEntity);
	}	
	
	$("#block-on-pallet-select-divide-entity > option ").each(function()
	{
        if(ls_entity!=null && $(this.val==ls_entity))
        {
           $("#block-on-pallet-select-divide-entity option[value=" + ls_entity + "]").remove();
        }				        
	});
}	 */
	