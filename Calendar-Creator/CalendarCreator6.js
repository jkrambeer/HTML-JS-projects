/* Joseph Krambeer
5-15-2014
Cisc 131
Calendar Last Part
*/

var firstDayOfWeek;

window.onload = function()
{
	var i;
	var today;

	document.onselectstart = function() {return false;}
	document.onmousedown   = function() {return false;}

	if( typeof getJSONArray() === "undefined")
	{
		window.alert("Oops. The JSON array is undefined.");
	}
	else
	{
		addYYYYMMDDToAnnualEvent(getJSONArray());
	}

	setFirstDayOfWeekTo("Sunday");
	setDaysOfWeekNames();
	today= getTodayAsArray();

	document.getElementById("year").innerHTML = today[0];
	document.getElementById("month").innerHTML = getMonthNameFor(today[1]);
	createCalendarGrid('day', 'dayNumber', getArrayOfDays(2014, 5), getDayOfWeekOnWhichMonthStarts(2014, 5))
	//the stuff for adding the json events in is in createCalendarGrid function
	document.getElementById("month").onclick = changeMonthOnClick;
	document.getElementById("year").onclick = changeYearOnClick;
	document.getElementById("arrowLeft").onclick = arrowLeft;
	document.getElementById("arrowDown").onclick = arrowDown;
	document.getElementById("arrowRight").onclick = arrowRight;
	document.getElementById("arrowUp").onclick = arrowUp;

};

function createCalendarGrid(cellIdPrefix, dayNumberIdPrefix, daysInMonth, startingDayInWeek)
{
	var i;
	var calendarStart;
	var calendarEnd;
	var dayNumber;
	var firstCellInLastRow;
	var element;
	var element2;
	var lastRowDays;
	var year;
	var month;
	var yyyymmdd;
	var event;
	var dayOffset;
	calendarStart = startingDayInWeek;
	calendarEnd = startingDayInWeek + ((daysInMonth[daysInMonth.length-1]) -1);
	firstCellInLastRow = 7 * Math.floor(calendarEnd/7);
	lastRowDays = calendarEnd - firstCellInLastRow;
	dayNumber = 1;
	i=0;
	element=document.getElementById(cellIdPrefix+i);
	while(element!==null)
	{
		element.className = "day";
		element.style.visibility = "visible";
		element.style.display = "block";
		if(i < calendarStart){element.style.visibility = "hidden";}
		if(i > calendarEnd){element.style.display = "none";}
		if(i===calendarEnd){element.className = element.className + " borderRight";}
		if( (i >= firstCellInLastRow - 7 ) && (i <= calendarEnd) ){element.className = element.className + " borderBottom";}
		if(i>=calendarStart && i<=calendarEnd)
		{
			element2 = document.getElementById(dayNumberIdPrefix + i);
			element2.innerHTML = dayNumber;
			dayNumber = dayNumber + 1;
		}
		if(i>=firstCellInLastRow) {element.className = element.className + " borderNotTop";}
		i = i + 1;
		element=document.getElementById(cellIdPrefix+i);
	}

	//adding the fun json stuffs
	year=document.getElementById("year").innerHTML; //alert(year);
	month=getMonthNumberFor(document.getElementById("month").innerHTML) +""; //alert(month.length);
	if(month.length===1){month="0" + month;}
	yyyymmdd="";
	//routine to search all days in specific year+month combination for events
	for(i=startingDayInWeek;i<41;i++)
	{
		if(i===0){dayOffset=i+7-1;}
		else{dayOffset=i+startingDayInWeek-1;}
		if(i<10){yyyymmdd=""+year+month+"0"+i;}
		else{yyyymmdd=""+year+month+i;}
		yyyymmdd=Number(yyyymmdd);
		event = getEventFor(yyyymmdd);
		if(document.getElementById("dayInfo"+dayOffset)!==null){document.getElementById("dayInfo"+dayOffset).innerHTML=event;}
	}
}

function getEventFor(yyyymmdd)
{
	var loc;
	var result;
	loc = searchJSONArrayFor(yyyymmdd);
	if(loc>-1){result = getJSONArray()[loc].event;}
	else{result = "";}
	return(result);
}

function searchJSONArrayFor(yyyymmdd)
{
	var jsonArray;
	var mmdd;
	var loc;
	var i;
	var isDefined;
	loc = -1;
	mmdd= yyyymmdd%10000;
	jsonArray=getJSONArray();
	isDefined=false;
	for(i=0;i<jsonArray.length;i++)
	{
		isDefined=isDefinedProperty(jsonArray[i].year);
		if(jsonArray[i].yyyymmdd===yyyymmdd){loc = i;}
		if( ((jsonArray[i].yyyymmdd)%10000)===mmdd && isDefined!==true ){loc = i;}

	}
	return loc;
}

function getJSONArray() { return annualEvent; }

function isDefinedProperty(reference)
{
	return typeof reference !== "undefined";
}

function addYYYYMMDDToAnnualEvent(jsonElement)
{
	var i;
	var yyyymmdd;
	var yyyy;
	var mm;
	var dd;
	yyyy=0;
	mm=0;
	dd=0;
	yyyymmdd = 0;
	for(i=0;i<jsonElement.length;i++)
	{
		yyyy=0;
		mm=0;
		dd=0;
		if(isDefinedProperty(jsonElement[i].year)){yyyy=jsonElement[i].year;}else{yyyy=0;}
		if(isDefinedProperty(jsonElement[i].month)){mm=jsonElement[i].month;}else{mm="00";}
		if(isDefinedProperty(jsonElement[i].day)){dd=jsonElement[i].day;}else{dd="00";}
		yyyymmdd=Number(""+yyyy+mm+dd);
		jsonElement[i].yyyymmdd = yyyymmdd;
	}
}

function getDaysDifference(yyyynnnStart, yyyynnnEnd)
{
	var result;
	var i;
	var yearsInBetween;
	var year;
	var startYear;
	var endYear;
	var negative;
	var daysInStartYear;

	result = 0;
	negative = false;
	//flipping years if needed, and setting the result negative if flipped
	if(yyyynnnStart>yyyynnnEnd)
	{hold = yyyynnnStart; yyyynnnStart = yyyynnnEnd;
	yyyynnnEnd = hold; negative = true;}
	//setting the end year and the start year
	endYear=Math.floor(yyyynnnEnd/1000);
	startYear=Math.floor(yyyynnnStart/1000);
	//seeing if the years are the same
	if(startYear!==endYear)
	{
		//seeing how long the start year is in days
		if(isLeapYear(startYear)===true){daysInStartYear=366;}else{daysInStartYear=365;}
		//finding the full years between the start/end year
		yearsInBetween = endYear - startYear - 1;
		//counting how many days these years in between have all together
		for(i=0;i<yearsInBetween;i++)
		{
			year = getYearFrom(startYear) + i + 1;
			if(isLeapYear(year)===true){result=result+366;}
			else{result=result+365;}
		}
		//adding up all the days
		result = result + (daysInStartYear - yyyynnnStart%1000) + yyyynnnEnd%1000;
	}
	//if years are the same it finds the difference between end and start
	else{result = yyyynnnEnd%1000 - yyyynnnStart%1000;}
	if(negative===true){result=0-result;}
	return result;
}

function arrowUp()
{
	var year;
	var month;
	year = Number(document.getElementById("year").innerHTML) + 1;
	month = getMonthNumberFor(document.getElementById("month").innerHTML);
	document.getElementById("year").innerHTML = year;
	createCalendarGrid('day', 'dayNumber', getArrayOfDays(year, month), getDayOfWeekOnWhichMonthStarts(year, month));
}

function arrowDown()
{
	var year;
	var month;
	year = Number(document.getElementById("year").innerHTML) - 1;
	month = getMonthNumberFor(document.getElementById("month").innerHTML);
	document.getElementById("year").innerHTML = year;
	createCalendarGrid('day', 'dayNumber', getArrayOfDays(year, month), getDayOfWeekOnWhichMonthStarts(year, month));
}

function arrowLeft()
{
	var year;
	var month;
	year = Number(document.getElementById("year").innerHTML);
	month = getMonthNumberFor(document.getElementById("month").innerHTML);
	if(month===1){year = year - 1; document.getElementById("year").innerHTML = year;
	month = (getMonthNumberFor(document.getElementById("month").innerHTML) + 11 )%13;}
	else{month = (getMonthNumberFor(document.getElementById("month").innerHTML) - 1)%13;}
	document.getElementById("month").innerHTML = getMonthNameFor(month);
	createCalendarGrid('day', 'dayNumber', getArrayOfDays(year, month), getDayOfWeekOnWhichMonthStarts(year, month));
}


function arrowRight()
{
	var year;
	var month;
	year = Number(document.getElementById("year").innerHTML);
	month = getMonthNumberFor(document.getElementById("month").innerHTML);
	if(month===12){year = year + 1; document.getElementById("year").innerHTML = year;
	month = (getMonthNumberFor(document.getElementById("month").innerHTML) + 2)%13;}
	else{month = (getMonthNumberFor(document.getElementById("month").innerHTML) + 1)%13;}
	document.getElementById("month").innerHTML = getMonthNameFor(month);
	createCalendarGrid('day', 'dayNumber', getArrayOfDays(year, month), getDayOfWeekOnWhichMonthStarts(year, month));
}


function changeYearOnClick()
{
	var month;
	var prompt;
	month = getMonthNumberFor(document.getElementById("month").innerHTML);
	//alert(month);
	prompt = window.prompt("Year : ");
	if(isValidYear(prompt)===true)
	{
		document.getElementById("year").innerHTML = prompt;
		createCalendarGrid('day', 'dayNumber', getArrayOfDays(prompt, month), getDayOfWeekOnWhichMonthStarts(prompt, month));
	}
	else{window.alert("Not Valid Year.");}
}

function changeMonthOnClick()
{
	var year;
	var prompt;
	year = Number(document.getElementById("year").innerHTML);
	prompt = window.prompt("Month : ");
	prompt = getMonthNumberFor(prompt);
	if(isValidMonth(prompt)===true)
	{
		document.getElementById("month").innerHTML = getMonthNameFor(prompt);
		createCalendarGrid('day', 'dayNumber', getArrayOfDays(year, prompt), getDayOfWeekOnWhichMonthStarts(year, prompt));
	}
	else{window.alert("Not Valid Month.");}
}

function getDayOfWeekOnWhichMonthStarts(year, month)
{
	var daysDifference;
	var dayNumber; //0-6 representing the day the month begins on
	var referenceDate;
	var referenceDayOfTheWeek;
	var inputInyyyymmdd;
	var inputInyyyynnn;
	if(month<10){month= "0" + month;}
	inputInyyyymmdd = Number(""+year+month+"01");
	inputInyyyynnn = yyyymmddToyyyynnn(inputInyyyymmdd);
	//alert(inputInyyyynnn);
	referenceDate = 20140510;
	referenceDayOfTheWeek = 6; //Saturday
	daysDifference= getDaysDifference(yyyymmddToyyyynnn(referenceDate), inputInyyyynnn);
	//alert(daysDifference);
	dayNumber = daysDifference%7; //excess days
	dayNumber = (7+dayNumber)%7;
	dayNumber = (dayNumber + referenceDayOfTheWeek)%7;
	dayNumber = (dayNumber - getFirstDayOfWeek())%7;
	//alert(dayNumber);
	return dayNumber;
}

function yyyymmddToyyyynnn(yyyymmdd)
{
	var i;
	var monthDays;
	var month;
	var days;
	days = 0;
	month=getMonthFrom(yyyymmdd);
	if(isLeapYear(getYearFrom(yyyymmdd))===true)
	{monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];}else
	{monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];}
	for(i=0;i<month-1;i++)
	{
		days = days + monthDays[i];
	}
	days = days + getDayFrom(yyyymmdd);
	if(days<10){days="0"+days;}
	if(days<100){days="0"+days;}
	days = days + "";
	return Number(getYearFrom(yyyymmdd) + days);
}

function getMonthFrom(yyyymmdd)
{
	yyyymmdd = Math.floor(yyyymmdd/100);
	return yyyymmdd % 100;
}

function getDayFrom(yyyymmdd)
{
	return yyyymmdd % 100;
}

function getYearFrom(yyyymmdd)
{
	yyyymmdd = Math.floor(yyyymmdd/10000);
	return yyyymmdd;
}

function getMonthNumberFor(monthName)
{
	var result;
	var months;
	var i;
	result = 0;
	month = getMonthNames();
	for(i=1;i<13;i++)
	{
		if(month[i]===monthName){result = i;}
	}
	return result;
}

function getMonthNameFor(monthNumber)
{
	var result;
	var monthNames;
	monthNames = getMonthNames();
	if(isValidMonth(monthNumber)===false){result="Invalid Month Number";}
	else{result= monthNames[monthNumber];}
	return result;
}

function getMonthNames()
{
	return ["","January","February","March","April","May","June","July",
	"August","September","October","November","December"];
}

function getTodayAsArray()
{
	var result;
	var today;
	result = new Array(3);
	today = new Date();
	result[0]= today.getFullYear();
	result[1]= today.getMonth() + 1;
	result[2]= today.getDate();
	return result;

}

function setDaysOfWeekNames()
{
	var z;
	z = getDayNames();
	for(i=0;i<z.length;i++)
		{
		document.getElementById("dayName" + i).innerHTML = getDayName( i + getFirstDayOfWeek() );
		}

}

function getDayNames()
{
	return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
}

function getDayName(integer)
{
	var day;
	var dayNames;
	dayNames = getDayNames();
	if(integer < 0 ) {day = "Sunday";}
	else{day = dayNames[integer%7];}
	return day;

}

function getFirstDayOfWeek()
{
	return firstDayOfWeek;
}

function setFirstDayOfWeekTo(string)
{
	var i;
	var dayNames;
	var found;
	dayNames = getDayNames();
	found = false;
	for(i=0;i<7;i=i+1)
	{
	dayNames[i] = dayNames[i].toLowerCase();
	}
	string = string.toLowerCase();
	for(i=0;i<7;i=i+1)
	{
		if(string===dayNames[i]){firstDayOfWeek = i; found = true;}
		if(found===false){firstDayOfWeek = 0;}
	}
}

function getArrayOfDays(year, month)
{
	var result;
	var monthDays;
	var numOfDays;
	var i;
	if(isLeapYear(year)===true)
	{monthDays = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];}else
	{monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];}
	numOfDays = monthDays[month];
	result=new Array(numOfDays);
	for(i=0;i<=numOfDays;i=i+1)
	{
		result[i] = i;
	}
	if(isValidYear(year)===false){result=new Array(0);}
	if(isValidMonth(month)===false){result=new Array(0);}
	return result;
}

function isLeapYear(year)
{
 return (year % 4 === 0) && ( year % 100 !== 0 || year % 400 === 0 );
}

function isValidYear(year)
{
	var result;
	if((year)>=1735){result=true;}else{result=false;}
	if(isInteger(year)===false) {result=false;}
	return result;
}

function isValidMonth(month)
{
	var result;
	if((month)>=1 && month<=12){result=true;}else{result=false;}
	if((isInteger(month))===false) {result=false;}
	return result;
}

function isInteger(data)
{
	return ( (isNumeric(data) === true) && ((Math.ceil(data) - Math.floor(data)) === 0) );
}

function isNumeric(data)
{
	var result;
	var input;
	var trimmedData;
	var value;
	input = data;
	trimmedData = trim(input);
	value = isNaN(trimmedData);
	if((value !== true) && (trimmedData.length>0))
	{
		result = true;
	}
	else
	{
		result = false;
	}
	return result;
}

function trim(data)
{
	var result;
	var start;
	var end;
	var whitespace;
	data= data + "";
	start= 0;
	whitespace = " \t\n\r\f";
	while ( start < data.length && whitespace.indexOf(data.charAt(start)) >= 0)
	{
		start = start + 1;
	}
	end = data.length - 1;
	while ( end > start && whitespace.indexOf(data.charAt(end)) >= 0)
	{
		end = end - 1;
	}
	if (end < start)
	{
		result = "";
	}
	else
	{
		result = data.substring(start, end + 1);
	}
	return result;
}


