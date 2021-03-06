<!DOCTYPE html>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title><s:text name='webportal.head.title'/></title>
		<link rel="shortcut icon" type="image/png" href="<%=request.getContextPath()%>/images/favicon.png" />
		<!-- Enable html5 tags for 6-7-8 -->
		<!--[if lte IE 8]>
		<script type="text/javascript">
		document.createElement("header");
		document.createElement("footer");
		document.createElement("section");
		document.createElement("aside");
		document.createElement("nav");
		document.createElement("article");
		document.createElement("figure");
		</script>
		<![endif]-->
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/color.css"/>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/general.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/header.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/content-block.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/footer.css" />		
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/content-installation.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/style.tidy.css" />		
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-migrate-1.1.1.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/sesp_ajax.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/init.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/colResizable-1.3.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/installation.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/search-results.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/OpenLayers.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/map.js"></script>
	
		<script src="<%=request.getContextPath()%>/js/spin.js"></script>
		<script src="<%=request.getContextPath()%>/js/ajax-loader.js"></script>
		<script type="text/javascript">

			$(function(){	
				
				renderTable("#overview-table");
				renderTable("#block-cases-table");
				renderTable("#block-multipoint-measurepoints-table");
	
			});	
			
  		</script>
	</head>
	<body>
	<script>
        contextPath = "<%=request.getContextPath()%>";       
        id="<%=request.getAttribute("id")%>"; 
        mapServerUrl= "<%=application.getAttribute("MAP_SERVER_URL")%>";   
        isAjaxSearch = false;    	
    </script>

		<div id="wrapper">
		<%@ include file="headerv311.inc"%>			
			<div id="main-content">

				<div class="title-large-block large-block text-grey">
					<s:text name="webportal.installation.installationid"/>: <span id="installation-id" class=" text-light-grey">458785</span>
				</div>

				<div class="small-block block retractable" id="block-overview">
					<div class="block-title">
						<span class="block-title-picto"></span>
						<span class="block-title-name text-blue"><s:text name="webportal.common.overview"/></span>
						<span class="block-arrow open"></span>
					</div>
					<div class="content-wrapper">
						<div class="content">	
							
							<div class="legend-block text-grey">
							<table id="overview-table">	
								<tr>								
									<td><div class="legend-block-title"><s:text name="webportal.installation.installationcode"/> :</div></td>
									<td><div class="legend-block-content text-light-grey" id="block-overview-installation-code"></div></td>
								</tr>
								<tr>
									<td><div class="legend-block-title"><s:text name="webportal.installation.externalcode"/> :</div></td>
									<td><div class="legend-block-content text-light-grey" id="block-overview-external-code"></div></td>
								</tr>
								<tr>
									<td><div class="legend-block-title"><s:text name="webportal.installation.type"/> :</div></td>
									<td><div class="legend-block-content text-light-grey" id="block-overview-type"></div></td>
								</tr>
								<tr>
									<td><div class="legend-block-title"><s:text name="webportal.installation.domain"/> :</div></td>
									<td><div class="legend-block-content text-light-grey" id="block-overview-domain"></div></td>
								</tr>
								<tr>
									<td><div class="legend-block-title"><s:text name="webportal.installation.keynumber"/>:</div></td>
									<td><div class="legend-block-content text-light-grey" id="block-overview-key-number"></div></td>
								</tr>
								<tr>
									<td><div class="legend-block-title"><s:text name="webportal.installation.keyinfo"/> :</div></td>
									<td><div class="legend-block-content text-light-grey" id="block-overview-key-info"></div></td>
								</tr>
								<tr>
									<td><div class="legend-block-title"><s:text name="webportal.installation.accessibletotech"/> :</div></td>
									<td><div class="legend-block-content text-light-grey" id="block-overview-accessible-tech"></div></td>
								</tr>
							</table>
							</div>
							
							<div class="status text-green" id="block-overview-status"></div>
						</div>
					</div>
				</div>
				<div class="small-block block retractable" id="block-location">
					<div class="block-title">
						<span class="block-title-picto"></span>
						<span class="block-title-name text-blue"><s:text name="webportal.common.location"/></span>
						<span class="block-arrow open"></span>
					</div>
					<div class="content-wrapper">
						<div class="content">
							<div id="osmap" style="width:444px; height:205px">
							
								<!-- <iframe width="444" height="195" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://www.openstreetmap.org/export/embed.html?bbox=-1.55302,47.19581,-1.50817,47.22307&amp;layer=mapnik&amp;marker=47.21659,-1.53457"></iframe>  -->
							</div>
							<div class="legend">
								<div class="address legend-block text-grey">
									<div class="legend-block-title"><s:text name="webportal.installation.address"/> :</div>
									<div class="legend-block-content text-light-grey" id="block-location-address"></div>
								</div>
								<div class="area legend-block text-grey">
									<div class="legend-block-title"><s:text name="webportal.installation.area"/> :</div>
									<div class="legend-block-content text-light-grey" id="block-location-area"></div>									
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="large-block block retractable" id="block-cases">
					<div class="block-title">
						<span class="block-title-picto"></span>
						<span class="block-title-name text-blue"><s:text name="webportal.installation.cases.cases"/></span>
						<span class="block-title-number text-blue"><span id="block-cases-number-value"></span></span>
						<span class="block-arrow open"></span>
					</div>
					<div class="content-wrapper">
						<div class="content">
							<table class="big-table cases" id="block-cases-table">
							<thead>
								<tr class="table-title">
									<th class="col1"> &nbsp;&nbsp;&nbsp; <s:text name="webportal.installation.cases.id"/></th>
									<th class="col2"><s:text name="webportal.installation.cases.externalid"/></th>
									<th class="col3"><s:text name="webportal.installation.cases.casetype"/></th>
									<th class="col4"><s:text name="webportal.installation.cases.user"/></th>
									<th class="col5"><s:text name="webportal.installation.cases.domain"/></th>
									<th class="col6"><s:text name="webportal.installation.cases.lastchanged"/></th>
									<th class="col7"><s:text name="webportal.installation.cases.status"/></th>
								</tr>
							</thead>
							<tbody>
							</tbody>								
							</table>
							<div class="center-wrapper">
								<a href="javascript:showMoreInstCases();" id="block-cases-link-more" class="text-blue"><s:text name="webportal.installation.cases.showmore"/></a>
							</div>
						</div>
					</div>
				</div>

				<div class="large-block block retractable" id="block-multipoint-measurepoints">
					<div class="block-title">
						<span class="block-title-picto"></span>
						<span class="block-title-name text-blue"><s:text name="webportal.installation.multimeasurepoint.multipointandmeasurepoints"/></span>
						<span class="block-title-number text-blue"><span id="block-multipoint-measurepoints-number-value"></span></span>
						<span class="block-arrow open"></span>
					</div>
					<div class="content-wrapper">
						<div class="content">
							<table class="big-table cases" id="block-multipoint-measurepoints-table">
							<thead>
								<tr class="table-title">
									<th class="col1"></th>
									<th class="col2"><s:text name="webportal.installation.multimeasurepoint.id"/></th>
									<th class="col3"><s:text name="webportal.installation.multimeasurepoint.code"/></th>
									<th class="col4"><s:text name="webportal.installation.multimeasurepoint.type"/></th>
									<th class="col5"><s:text name="webportal.installation.multimeasurepoint.utility"/></th>
									<th class="col5"><s:text name="webportal.installation.multimeasurepoint.status"/></th>
								</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
							<div class="center-wrapper">
								<a href="javascript:showMoreInstMultiMeasurePoints();" id="block-multipoint-measurepoints-link-more" class="text-blue"><s:text name="webportal.installation.multimeasurepoint.showmore"/></a>
							</div>
						</div>
					</div>
				</div>

			</div>
		<%@ include file="footerv311.inc"%>
		</div>
       <script>
       initInstallation();
       </script>  
	</body>
</html>
