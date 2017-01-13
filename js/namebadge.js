function namebadgeOps($rootScope, $scope, $http, $localStorage) {

	var ss = $scope.$storage;

	ss.options = ss.options ? ss.options : {};
	ss.options.badge = ss.options.badge ? ss.options.badge : {};

	ss.options.badge.fNameCol = 1;
	ss.options.badge.lNameCol = 2;
	ss.options.badge.emailCol = 3; 
	ss.options.badge.titleCol = 4;
	ss.options.badge.companyCol = 5;
	ss.options.badge.firstTxt = "Follow us on Twitter"; 
	ss.options.badge.secondTxt = "Learn how to make yours at eventstone.io"; 
	
	$scope.printBadges = function() {
		var printContents = document.getElementById("printableBadge").innerHTML;
		var popupWin = window.open('', '_blank', 'width=1700,height=2200');
		popupWin.document.open();
		var top = `
		<html>
			<head>
				<link rel="stylesheet" media="all"  href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed">
				<link rel="stylesheet" media="all" href="css/style.css">
				<link rel="stylesheet" media="all" href="css/bStyles.css">
				<link rel="stylesheet" media="all" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" >
			</head>
			<body onload="window.print()" 
			style="print-color-adjust: exact !important;
			-moz-print-color-adjust: exact !important;
			-webkit-print-color-adjust: exact !important;
			font-family: "Roboto Condensed",  monospace, sans-serif !important;">`;
		
		var bottom = `
			</body>
		</html>`
		
		popupWin.document.write(top + printContents + bottom);
		popupWin.document.close();
	};
	
	
	
	if (ss.user.styles.selectedBFormat == undefined && ss.user.styles.selectedBFormatPre == undefined) {
		ss.user.styles.selectedBFormat = 'partials/badges/b1.html';
		ss.user.styles.selectedBFormatPre = 'partials/badges/b1Preview.html';
	}
	
	ss.user.styles.badgeFormats = {
		'formats' : ['partials/badges/b1.html', 'partials/badges/b2.html', 'partials/badges/b3.html', 'partials/badges/b4.html']
	};
	
	
	$scope.arrOfFile = function (num) {
		var arr = [];
		for (var i = 0; i < num; i++) {
			arr.push(i);
		}
		return arr;
	}
	
	ss.UpldImgs = ss.UpldImgs ? ss.UpldImgs : [];
	
	
	$scope.dispCal = function (month, year) {
		var toOutPut = "";
		month = parseInt(month);
		year = parseInt(year);
		var i = 0;
		var space = "<span class='tab-1'></span>";
		var days = getDaysInMonth(month + 1, year);
		var firstOfMonth = new Date(year, month, 1);
		var startingPos = firstOfMonth.getDay();
		days += startingPos;
		// var toOutPut =  "<span class='calHeader'>" + "<span class='dItem'>" + "Su" +  "</span>" + 
		// "<span class='dItem'>" + "Mo" +  "</span>" + 
		// "<span class='dItem'>" + "Tu" +  "</span>" + 
		// "<span class='dItem'>" + "We" +  "</span>" + 
		// "<span class='dItem'>" + "Th" +  "</span>" + 
		// "<span class='dItem'>" + "Fr" +  "</span>" +
		// "<span class='dItem'>" + "Sa" +  "</span>"  +  "</span>" ;
		var toOutPut =  "<span class='calHeader'>" + "<span class='dItem'>" + "日" +  "</span>" + 
		"<span class='dItem'>" + "一" +  "</span>" + 
		"<span class='dItem'>" + "二" +  "</span>" + 
		"<span class='dItem'>" + "三" +  "</span>" + 
		"<span class='dItem'>" + "四" +  "</span>" + 
		"<span class='dItem'>" + "五" +  "</span>" +
		"<span class='dItem'>" + "六" +  "</span>"  +  "</span>" ;
		// toOutPut +=  "</br>" ;
		for ( i = 0; i < startingPos; i++) {
			if (i % 7 == 0)
				toOutPut += "</br>";
			toOutPut += "<span class='dItem'>" + "||||" +  "</span>";
		}
		for ( i = startingPos; i < days; i++) {
			if (i % 7 == 0)
				toOutPut +=  "</br>";
			var item = i - startingPos + 1;
			item = ("0" + item).slice(-2);
			toOutPut += "<span class='dItem'>" + item +  "</span>";
			// toOutPut += space;
		}
		for ( i = days; i < 42; i++) {
			if (i % 7 == 0)
				toOutPut +=  "</br>";
			toOutPut += space + space ;
		}
		return toOutPut;
	}
	
	$scope.getNextMntAndYr = function (month, year) {
		var day = 0;
		if (month == 11) {
			month = 0;
			year++;
		} else {
			month++;
		}
		return {
			"month" : month,
			"year" : year
		}
	}
	function getThisMonthYr() {
		var now = new Date();
		var month = now.getMonth();
		var year = now.getYear();
		if (year < 2000)// Y2K Fix, Isaac Powell
			year = year + 1900;
		return {
			"month" : month,
			"year" : year
		}
	}
	
	// init
	ss.options.cals = [];
	ss.options.setMonths  = function (numOfMonthsToGen) {
		var current = getThisMonthYr();
		for (var i = 0; i < numOfMonthsToGen; i++) {
			ss.options.cals.push(current);
			current = $scope.getNextMntAndYr(current.month, current.year);
		}
	}
	ss.options.setMonths (14);
		
	$scope.showCals = function () {
		for (var i = 0; i < ss.options.cals(16).length; i++) {
			// console.log(ss.options.cals(16)[i]);
			$scope.dispCal (1, 2017, ss.options.cals(16)[i]);
		}
	}
	
	$scope.getOnePerline = function  (str) {
		var toRet = [];
		if (str) {
			var bigarray = str.split("");
			var size = 16;
			for (var i=0; i<bigarray.length && toRet.length < 3; i+=size) {
				var item = bigarray.slice(i,i+size);
				var myString = "";
				for (var j = 0; j < item.length; j++) {
					myString += item[j] + "</br>";
				}
				toRet.push(myString);
			}
		}
		ss.userMsg = toRet;
	}
	
	$scope.make2Dig = function (num) {
		return ("0" + (num+1)).slice(-2);
	}
	$scope.getOnePerline  (ss.options.personalizedMsg);
	
	$scope.$storage.defaultColors = [{
			"bg" : "#F50632",
			"txt" : "#F6BC5F"
		},{
			"bg" : "#F6BC5F",
			"txt" : "#F50632"
		},{
			"bg" : "#FFFFFF",
			"txt" : "#191970"
		},{
			"bg" : "#FFFFFF",
			"txt" : "#000000"
		},{
			"bg" : "#cc9d7a",
			"txt" : "#000000"
		},{
			"bg" : "#0f124a",
			"txt" : "#ffa642"
		},{
			"bg" : "#fdf998",
			"txt" : "#17806D"
		},{
			"bg" : "#F6F792",
			"txt" : "#8A0917"
		},{
			"bg" : "#ffffff",
			"txt" : "#FF7F49"
		},{
			"bg" : "#FDD9B5",
			"txt" : "#1164B4"
		},{
			"bg" : "#A48A55",
			"txt" : "#393224"
		},{
			"bg" : "#fffffE",
			"txt" : "#F664AF"
		},{
			"bg" : "#FF2B2B",
			"txt" : "#fbdf73"
		},{
			"bg" : "#dce8f7",
			"txt" : "#375CD4"
		},{
			"bg" : "#fefcd3",
			"txt" : "#800000"
		},{
			"bg" : "#d6f6e1",
			"txt" : "OrangeRed"
		},{
			"bg" : "#ffa642",
			"txt" : "#414A4C"
		},{
			"bg" : "#ffffff",
			"txt" : "#F50632"
		}
	]
	
	
	$scope.selectDefaultCol = function(bg, txt) {
		ss.ticketBgColor = bg;
		ss.ticketText = txt;
		// $scope.userFillColor = ss.ticketBgColor;
	};
	ss.ticketBgColor = ss.ticketBgColor ? ss.ticketBgColor : "#F50632" ;
	ss.ticketText = ss.ticketText ? ss.ticketText : "#F6BC5F";
	
}
