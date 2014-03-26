<header id="header">
	<div class="row">
		<div class="column">
			<ul class="ulnav-list">
				<li class="ulnav-list-left">
					<div id="menu-button">
						<span class="menu-button-text">MENU</span>
						<span class="menu-button-arrow close"></span>
						<a href="<%=request.getContextPath()%>/std/Index">
							<span class="menu-button-text text-grey" style="margin-left:20px;">HOME</span>
						</a>
					</div>
				</li>
			</ul>
		</div>
		<div class="column">
			<input type="text" class="search-input" id="search-input" placeholder="SEARCH" onKeyPress="return submitOnEnter(this,event)"/>
		</div>
		<div class="column">
			<ul class="ulnav-list">
				<li  class="ulnav-list-center">	
					<div class="search-box">
						<input type="text" class="search-input" id="search-input" placeholder="SEARCH" onKeyPress="return submitOnEnter(this,event)"/>
						<a href="javascript:searchentities()"  id="search-button"></a>								
					</div>
				</li>
				<li  class="ulnav-list-right">
					<ul>
						<li>
							<a href="<%=request.getContextPath()%>/std/Logout" class="logout-button" id="logout-button">
								<img src="<%=request.getContextPath()%>/images/sign-out-icon.png" />
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<div id="second-header" class="background-grey">
		<div id="menu">
			<ul id="menu-inner" class="background-light-grey">							
				<li class="menu-element">
					<a href="<%=request.getContextPath()%>/std/TimeReservationCallList" id="menu-button-delivery-performance">
						<span class="menu-element-picto"></span>
						<span class="menu-element-name text-grey">Time Reservation Call List</span>
					</a>
				</li >
				<li  class="menu-element">
					<a href="<%=request.getContextPath()%>/std/StockManagement1" id="menu-button-logistics">
						<span class="menu-element-picto"></span>
						<span class="menu-element-name text-grey">LOGISTICS</span>
					</a>
				</li >  
				<li  class="menu-element">
					<a href="javascript: openDashboard();" id="menu-button-system-utilization">
						<span class="menu-element-picto"></span>
						<span class="menu-element-name text-grey">SYSTEM UTILIZATION</span>
					</a>
				</li >

				<li  class="menu-element">
					<a href="<%=request.getContextPath()%>/std/AlarmManagementReports" id="menu-button-alarm-management">
						<span class="menu-element-picto"></span>
						<span class="menu-element-name text-grey">ALARM MANAGEMENT</span>
					</a>
				</li > 
				<li  class="menu-element">
					<a href="<%=request.getContextPath()%>/std/WorkOrderProgress" id="menu-button-work-order-progress">
						<span class="menu-element-picto"></span>
						<span class="menu-element-name text-grey">WORK ORDER PROGRESS</span>
					</a>
				</li >							
				<li  class="menu-element">
					<a href="<%=request.getContextPath()%>/std/AreaProgress" id="menu-button-technician-positioning">
						<span class="menu-element-picto"></span>
						<span class="menu-element-name text-grey">AREA PROGRESS</span>
					</a>
				</li >
				<li  class="menu-element">
					<a href="<%=request.getContextPath()%>/std/AnalyzeFieldWorkEfficiency" id="menu-button-technician-work-load">
						<span class="menu-element-picto"></span>
						<span class="menu-element-name text-grey">Field Work Efficiency</span>
					</a>
				</li >
				<li  class="menu-element">
					<a href="<%=request.getContextPath()%>/std/ViewResourceProjectionAction" id="menu-button-resource-projections">
						<span class="menu-element-picto"></span>
						<span class="menu-element-name text-grey">RESOURCE PROJECTIONS</span>
					</a>
				</li >
			</div>
		</div>
	</header>

	<script>
		function openDashboard() {
			window.open('<%=request.getContextPath()%>/std/SysDashboard?refreshInterval=5', '', '');
		}  	
	</script>