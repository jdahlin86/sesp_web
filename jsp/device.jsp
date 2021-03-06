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
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/content-device.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/style.tidy.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/colResizable.css" />
		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-migrate-1.1.1.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/colResizable-1.3.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.treeTable.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/init.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/sesp_ajax.js"></script>		
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/search-results.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/device.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/OpenLayers.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/map.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/spin.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/ajax-loader.js"></script>
		
		
	</head>
	<body>
	<script>
        contextPath = "<%=request.getContextPath()%>";   
        deviceId="<%=request.getAttribute("id")%>";  
        mapServerUrl= "<%=application.getAttribute("MAP_SERVER_URL")%>";    
        overviewPalletTitle = "<s:text name='webportal.device.overview.device.pallet'/>";
        overviewStockTitle = "<s:text name='webportal.device.overview.device.stock'/>";
        overviewMeasurepointTitle = "<s:text name='webportal.device.overview.device.mep.id'/>";
        overviewMultipointTitle = "<s:text name='webportal.device.overview.device.mup.id'/>";
        i18nerrorNoDeviceData = "<s:text name='webportal.device.results.error.noresults'/>";        
    </script>
    
		<div id="wrapper">
		
			<!--  Header -->
			<%@ include file="headerv311.inc"%>			

			<div id="main-content">

				<div class="title-large-block large-block text-grey">
					<s:text name='webportal.device.results.title'/> : <span id="device-id" class=" text-light-grey"></span>
				</div>

				<div class="small-block block retractable" id="block-overview">
					<div class="block-title">
						<span class="block-title-picto"></span>
						<span class="block-title-name text-blue"><s:text name='webportal.device.overview.device.title'/></span>
						<span class="block-arrow open"></span>
					</div>
					<div class="content-wrapper">
						<div class="content">
						
						<div class="legend-block text-grey">
						
							<table id="overview-table">
							<tr>
								<td> <div class="legend-block-title"> <s:text name='webportal.device.overview.device.type'/> : </div> </td>
								<td> <div class="legend-block-content text-light-grey" id="block-overview-device-type"> </div> </td>
							</tr>
							<tr>
								<td> <div class="legend-block-title"> <s:text name='webportal.device.overview.device.model'/> : </div> </td>
								<td> <div class="legend-block-content text-light-grey" id="block-overview-device-model"> </div> </td>
							</tr>
							<tr>
								<td> <div id="block-measurepoint-multipoint-title" class="legend-block-title"> </div> </td>
								<td> <div class="legend-block-content text-light-grey" id="block-overview-measurepoint-id">  </div> </td>
							</tr>
							<tr>
								<td> <div class="legend-block-title"> <s:text name='webportal.device.overview.device.giai'/> : </div> </td>
								<td> <div class="legend-block-content text-light-grey" id="block-overview-giai"> </div> </td>
							</tr>
							<tr>
								<td> <div class="legend-block-title"> <s:text name='webportal.device.overview.device.serial.number'/> : </div> </td>
								<td> <div class="legend-block-content text-light-grey" id="block-overview-serial-number"></div> </td>
							</tr>
							<tr>
								<td> <div class="legend-block-title"> <s:text name='webportal.device.overview.device.property.number'/> : </div> </td>
								<td> <div class="legend-block-content text-light-grey" id="block-overview-property-number"></div> </td>
							</tr>
							<tr>
								<td> <div class="legend-block-title"> <s:text name='webportal.device.overview.device.domain'/> : </div> </td>
								<td> <div class="legend-block-content text-light-grey" id="block-overview-domain"> </div> </td>
							</tr>
							<tr>
								<td> <div class="legend-block-title"> <s:text name='webportal.device.overview.device.pallet'/> : </div> </td>
								<td> <div class="legend-block-content text-light-grey" id="block-overview-pallet"></div> </td>
							</tr>
						    <tr>
								<td> <div class="legend-block-title"> <s:text name='webportal.device.overview.device.stock'/> :  </div> </td>
								<td> <div class="legend-block-content text-light-grey" id="block-overview-stock-site"></div> </td>
							</tr>
							</table>
	
							</div>
							<div class="status text-green" id="block-overview-status"> </div>
						</div>
					</div>
				</div>
				<div class="small-block block retractable" id="block-location">
					<div class="block-title">
						<span class="block-title-picto"></span>
						<span class="block-title-name text-blue"><s:text name='webportal.device.location.title'/></span>
						<span class="block-arrow open"></span>
					</div>
					<div class="content-wrapper">
						<div class="content">
							<div id="block-device-location-map-wrapper" style="width:444px; height:250px">
								<!-- <iframe width="444" height="204" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://www.openstreetmap.org/export/embed.html?bbox=-1.55302,47.19581,-1.50817,47.22307&amp;layer=mapnik&amp;marker=47.21659,-1.53457"></iframe> -->
							</div>
							<div class="legend">
								<div class="address legend-block text-grey">
									<div class="legend-block-title"><s:text name='webportal.device.location.address'/> :</div>
									<div class="legend-block-content text-light-grey" id="block-device-location-adress"></div>
								</div>
								<div class="area legend-block text-grey">
									<div class="legend-block-title"><s:text name='webportal.device.location.area'/> :</div>
									<div class="legend-block-content text-light-grey" id="block-device-location-area"></div>									
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="large-block block retractable" id="block-hardware-configuration">
					<div class="block-title">
						<span class="block-title-picto"></span>
						<span class="block-title-name text-blue"><s:text name='webportal.device.hardwareconfig.title'/></span>
						<span class="block-arrow open"></span>
					</div>
					<div class="content-wrapper">
						<div class="content">
							<table class="big-table hardware-conf tree" id="hardware-configuration-table">
							<thead>	
								<tr class="table-title">
									<th class="col1"> &nbsp;&nbsp;&nbsp; <s:text name='webportal.device.hardwareconfig.type'/></th>
									<th class="col2"><s:text name='webportal.device.hardwareconfig.id'/></th>
									<th class="col3"><s:text name='webportal.device.hardwareconfig.code'/></th>
									<th class="col4"><s:text name='webportal.device.hardwareconfig.info'/></th>
								</tr>
							</thead>
							<tbody>
							</tbody>
							</table>
						</div>
					</div>
					<br/>
				</div>

				<div class="large-block block block-accordion" id="block-history">
					<div class="block-title">
						<span class="block-title-picto"></span>
						<span class="block-title-name text-blue"><s:text name='webportal.device.history.title'/></span>
						<a href="#" class="block-title-button-open-all text-blue"><s:text name='webportal.device.results.options.openall'/></a>
						<a href="#" class="block-title-button-close-all text-blue"><s:text name='webportal.device.results.options.closeall'/></a>
					</div>
					<div class="content-wrapper">
						<div class="content">

							<ul class="accordion">
								<li class="toggleSubMenu" id="block-history-installation">
									<span class="accordion-title">&#149; <span class="accordion-title-name"><s:text name='webportal.device.history.installation.title'/></span> <span id="block-device-installations-number" class="number"> </span><div class="accordion-arrow close"></div></span>
									<ul class="subMenu">
										<table id="device-installation-table" class="text-grey history-table">
										<thead>	
											<tr class="table-title">
												<th class="col1"> &nbsp;&nbsp;&nbsp; <s:text name='webportal.device.history.installation.id'/></th>
												<th class="col2"><s:text name='webportal.device.history.installation.code'/></th>
												<th class="col3"><s:text name='webportal.device.history.installation.mepid'/></th>
												<th class="col4"><s:text name='webportal.device.history.installation.mepcode'/></th>
											</tr>
										</thead>
										<tbody>
										</tbody>
										</table>
										<div class="center-wrapper">
											<a href="javascript:showMoreDeviceResults('INST')" id="block-device-installation-link-more" class="link-more text-blue"><s:text name='webportal.device.history.installation.options.showmore'/></a>
										</div>
									</ul>
								</li>
								<li class="toggleSubMenu" id="block-history-status">									
									<span class="accordion-title">&#149; <span class="accordion-title-name"><s:text name='webportal.device.history.status.title'/></span> <span id="block-device-status-number" class="number"></span> <div class="accordion-arrow close"></div></span>
									<ul class="subMenu">
										<table id="device-status-table" class="text-grey history-table">
										<thead>	
											<tr class="table-title">
												<th class="col1"> &nbsp;&nbsp;&nbsp; <s:text name='webportal.device.history.status.type'/></th>
												<th class="col2"><s:text name='webportal.device.history.status.start.timestamp'/></th>
												<th class="col3"><s:text name='webportal.device.history.status.end.timestamp'/></th>
												<th class="col4"><s:text name='webportal.device.history.status.reason'/></th>
											</tr>
										</thead>
										<tbody>
										</tbody>
										</table>
										<div class="center-wrapper">
											<a href="javascript:showMoreDeviceResults('STATUS')" id="block-device-status-link-more" class="link-more text-blue"><s:text name='webportal.device.history.status.options.showmore'/></a>
										</div>
									</ul>
								</li>
								<li class="toggleSubMenu" id="block-history-stock-site">									
									<span class="accordion-title">&#149; <span class="accordion-title-name"><s:text name='webportal.device.history.stocksite.title'/></span> <span id="block-device-stock-site-number" class="number"></span><div class="accordion-arrow close"></div></span>
									<ul class="subMenu">
										<table id="device-stock-site-table" class="text-grey history-table">
										<thead>
											<tr class="table-title">
												<th class="col1"> &nbsp;&nbsp;&nbsp; <s:text name='webportal.device.history.stocksite.stock.id'/></th>
												<th class="col2"><s:text name='webportal.device.history.stocksite.stock.name'/></th>
												<th class="col3"><s:text name='webportal.device.history.stocksite.start.timestamp'/></th>
												<th class="col4"><s:text name='webportal.device.history.stocksite.end.timestamp'/></th>
											</tr>
										</thead>
										<tbody>
										</tbody>
										</table>
										<div class="center-wrapper">
											<a href="javascript:showMoreDeviceResults('STOCK_SITE')" id="block-device-stock-site-link-more" class="link-more text-blue"><s:text name='webportal.device.history.stocksite.options.showmore'/></a>
										</div>
									</ul>
								</li>
								<li class="toggleSubMenu" id="block-history-pallet">									
									<span class="accordion-title">&#149; <span class="accordion-title-name"><s:text name='webportal.device.history.pallet.title'/></span> <span id="block-device-pallet-number" class="number"></span><div class="accordion-arrow close"></div></span>
									<ul class="subMenu">
										<table id="device-pallet-table" class="text-grey history-table">
										<thead>
											<tr class="table-title">
												<th class="col1"> &nbsp;&nbsp;&nbsp; <s:text name='webportal.device.history.pallet.code'/></th>
												<th class="col2"><s:text name='webportal.device.history.pallet.type'/></th>
												<th class="col3"><s:text name='webportal.device.history.pallet.status'/></th>
												<th class="col4"><s:text name='webportal.device.history.pallet.sending'/></th>
												<th class="col5"><s:text name='webportal.device.history.pallet.destination'/></th>
												<th class="col6"><s:text name='webportal.device.history.pallet.receiving'/></th>
												<th class="col7"><s:text name='webportal.device.history.pallet.start.timestamp'/></th>
												<th class="col8"><s:text name='webportal.device.history.pallet.end.timestamp'/></th>
											</tr>
										</thead>
										<tbody>
										</tbody>
										</table>
										<div class="center-wrapper">
											<a href="javascript:showMoreDeviceResults('PALLET')" id="block-device-pallet-link-more" class="link-more text-blue"><s:text name='webportal.device.history.pallet.options.showmore'/></a>
										</div>
									</ul>
								</li>
								<li class="toggleSubMenu" id="block-history-owner">									
									<span class="accordion-title">&#149; <span class="accordion-title-name"><s:text name='webportal.device.history.owner.title'/></span> <span id="block-device-owner-number" class="number"></span> <div class="accordion-arrow close"></div></span>
									<ul class="subMenu">
										<table id="device-owner-table"  class="text-grey history-table">
										<thead>	
											<tr class="table-title">
												<th class="col1"> &nbsp;&nbsp;&nbsp; <s:text name='webportal.device.history.owner.name'/></th>
												<th class="col2"><s:text name='webportal.device.history.owner.start.timestamp'/></th>
												<th class="col3"><s:text name='webportal.device.history.owner.end.timestamp'/></th>
											</tr>
										</thead>
										<tbody>
										</tbody>
										</table>
										<div class="center-wrapper">
											<a href="javascript:showMoreDeviceResults('OWNER')" id="block-device-owner-link-more" class="link-more text-blue"><s:text name='webportal.device.history.owner.options.showmore'/></a>
										</div>
									</ul>
								</li>
							</ul>

						</div>
					</div>
				</div>

			</div>
			
			<!-- Footer -->
			<%@ include file="footerv311.inc"%>

		</div>
	</body>
</html>
