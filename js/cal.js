// /*
 // Adapted from Any-Month calendar script- Rob Patrick (rpatrick@mit.edu)
 // Script featured on and available at:
 // http://www.javascriptkit.com/
 // */
// 
// function setToday() {
	// var now = new Date();
	// var day = now.getDate();
	// var month = now.getMonth();
	// var year = now.getYear();
	// if (year < 2000)// Y2K Fix, Isaac Powell
		// year = year + 1900;
	// // http://onyx.idbsu.edu/~ipowell
	// this.focusDay = day;
// }
// 
// function isFourDigitYear(year) {
	// if (year.length != 4) {
		// alert("Sorry, the year must be four-digits in length.");
		// document.getElementsByName("calControl")[0].year.select();
		// document.getElementsByName("calControl")[0].year.focus();
	// } else {
		// return true;
	// }
// }
// 
// function selectDate() {
	// var year = document.getElementsByName("calControl")[0].year.value;
	// if (isFourDigitYear(year)) {
		// var day = 0;
		// var month = document.getElementsByName("calControl")[0].month.selectedIndex;
	// }
// }
// 
// function setPreviousYear() {
	// var year = document.getElementsByName("calControl")[0].year.value;
	// if (isFourDigitYear(year)) {
		// var day = 0;
		// var month = document.getElementsByName("calControl")[0].month.selectedIndex;
		// year--;
		// document.getElementsByName("calControl")[0].year.value = year;
	// }
// }
// 
// function setPreviousMonth() {
	// var year = document.getElementsByName("calControl")[0].year.value;
	// if (isFourDigitYear(year)) {
		// var day = 0;
		// var month = document.getElementsByName("calControl")[0].month.selectedIndex;
		// if (month == 0) {
			// month = 11;
			// if (year > 1000) {
				// year--;
				// document.getElementsByName("calControl")[0].year.value = year;
			// }
		// } else {
			// month--;
		// }
		// document.getElementsByName("calControl")[0].month.selectedIndex = month;
	// }
// }
// 
// function setNextMonth() {
	// var year = document.getElementsByName("year")[0].value;
	// if (isFourDigitYear(year)) {
		// var day = 0;
		// var month = document.getElementsByName("month")[0].selectedIndex;
		// if (month == 11) {
			// month = 0;
			// year++;
			// document.getElementsByName("year")[0].value = year;
		// } else {
			// month++;
		// }
		// document.getElementsByName("month")[0].selectedIndex = month;
	// }
// }
// 
// function setNextYear() {
	// var year = document.getElementsByName("year")[0].value;
	// if (isFourDigitYear(year)) {
		// var day = 0;
		// var month = document.getElementsByName("month")[0].selectedIndex;
		// year++;
		// document.getElementsByName("year")[0].value = year;
	// }
// }
// 
// function displayCalendar(month, year, element) {
	// month = parseInt(month);
	// year = parseInt(year);
	// var i = 0;
	// var days = getDaysInMonth(month + 1, year);
	// var firstOfMonth = new Date(year, month, 1);
	// var startingPos = firstOfMonth.getDay();
	// days += startingPos;
	// element.value = " Su Mo Tu We Th Fr Sa";
	// element.value += "\n --------------------";
	// for ( i = 0; i < startingPos; i++) {
		// if (i % 7 == 0)
			// element.value += "\n ";
		// element.value += "   ";
	// }
	// for ( i = startingPos; i < days; i++) {
		// if (i % 7 == 0)
			// element.value += "\n ";
		// if (i - startingPos + 1 < 10)
			// element.value += "0";
		// element.value += i - startingPos + 1;
		// element.value += " ";
	// }
	// for ( i = days; i < 42; i++) {
		// if (i % 7 == 0)
			// element.value += "\n ";
		// element.value += "   ";
	// }
	// document.getElementsByName("Go")[0].focus();
// }
// 
// function getDaysInMonth(month, year) {
	// var days;
	// if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
		// days = 31;
	// else if (month == 4 || month == 6 || month == 9 || month == 11)
		// days = 30;
	// else if (month == 2) {
		// if (isLeapYear(year)) {
			// days = 29;
		// } else {
			// days = 28;
		// }
	// }
	// return (days);
// }
// 
// function isLeapYear(Year) {
	// if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
		// return (true);
	// } else {
		// return (false);
	// }
// }