/* Joseph Krambeer
4-9-14
Cisc 131
Confetti Assignment Part 2
*/

window.onload = function()
{
	//alert(getNumericPrefix("+1111.55.555.moo"));
	document.getElementById("container").onclick = create;
}

function create()
{
	var container;
	var i;
	i = 0;
	container = document.getElementById("container");
	createConfetti("container", 100);
	//move('confetti', 1, 1, 1, 1)
	container.style.borderBottomColor= "white";
	while(i<250)
	{
	window.setTimeout(function() {makeConfettiFall()}, (i * 10));
	i = i + 1;
	}
}


function createConfetti(containerId, howMany)
{
	var i;
	var string;
	var element;
	element= "";
	string = "";
	i = 0;
	while(i<howMany)
	{
		document.getElementById(containerId).innerHTML = string + createHTMLelement('span', ('confetti' + i), 'confetti', '&bull;');
		string = document.getElementById(containerId).innerHTML;
		i = i + 1;
	}
	i = 0;
	while(i<howMany)
	{
		element= document.getElementById('confetti' + i);
		//alert(element);
		element.style.color = getRandomColor();
		element.style.left  = randomInteger(container.offsetWidth - element.offsetWidth -4) + 'px';
		element.style.top   =  randomInteger(container.offsetHeight - element.offsetHeight -4) + 'px';
		i= i + 1;
	}
	return string;
}

function makeConfettiFall()
{
	move('confetti', 0, container.offsetWidth, 5, 5);
}


function move(prefix, leftBoundary, rightBoundary, maxSideMovement, maxDownMovement)
{
var result;
var element;
var i;
var oddEven;
var leftMovement;
oddEven = 0;
leftMovement = 0;
oddEven = randomInteger(100);
result = "";
i=0;
element = document.getElementById(prefix + i);

while(element!==null)
	{
	oddEven = randomInteger(2);
	element.style.top = getNumericPrefix(element.style.top) + (randomInteger(maxDownMovement)) + 'px';
	//alert(getNumericPrefix(element.style.left));
	leftMovement = (((((oddEven%2)*-1)+(((oddEven+1)%2)*1)) * (randomInteger(maxSideMovement))) + getNumericPrefix(element.style.left) );
	//alert(leftMovement);
	leftMovement = Math.max(leftMovement, leftBoundary);
	leftMovement = Math.min(leftMovement, rightBoundary-element.offsetWidth-4);
	element.style.left = leftMovement + 'px';
	i = i + 1;
	element = document.getElementById(prefix + i);
	}
}


function getNumericPrefix(data)
{
	var result;
	var i;
	var count;
	var digits;
	var alphabet;
	var data2;
	var isNeg;
	var plusSign;
	isNeg=false;
	count = 0;
	digits = "1234567890.";
	alphabet= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTUVWXYZ";
	result = ""
	data2 = data;
	if(data.charAt(0)==="+"){data2 = data.substring(1,data.length); }
	if(data.charAt(0)==="-"){data2 = data.substring(1,data.length); isNeg=true;}
	for(i=0;i<data2.length;i=i+1)
	{
		if(alphabet.indexOf(data2.charAt(i))>=0) {i=data2.length}
		else { count = count + 1;}
	}
	//alert(count);
	for(i=0;i<count;i=i+1)
	{
		if(digits.indexOf(data2.charAt(i))>=0) {result = result + data2.charAt(i);}
		else {i=data2.length;}
		if(data2.charAt(i)===".") {digits="1234567890";}
	}
	if(isNeg===true){result= "-" + result;} else{result= result;}
	if(result.length===0) {result = 0;}
	result = Number(result);
	return result;
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


function createHTMLelement(elementType, id, classInfo, content)
{
	var type;
	var identity;
	var classInformation;
	var contents;
	var string;
	type = trim(elementType) + "";

	if(id===null)
	{identity = "";}
	else
	{identity = trim(id) + "";}

	if(classInfo===null)
	{classInformation = "";}
	else
	{classInformation = trim(classInfo) + ""};

	contents = content + "";
	string = '<' + type ;
	if ( identity.length > 0 )
	{
		string = string + " id=" + '"' + identity + '"';
	}
	if ( classInformation.length > 0)
	{
		string = string + " class=" + '"' + classInformation + '"';
	}
	string = string + '> ' + content + ' </' + type + '>';
	return string;
			// <elementType id="identity" class="classInfo"> Content </elementType>
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

function getRandomColor()
{
	var red;
	var green;
	var blue;
	red=randomInteger(255);
	blue=randomInteger(255);
	green=randomInteger(255);
	return "rgb(" + red + ", " + green + ", " + blue + ") ";
}

function randomInteger(upperlimit)
{
	var rNumber;
	var output;

	rNumber = Math.random();
	output  = Math.floor(rNumber * (upperlimit));
	return output;
}
