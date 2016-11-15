/* Joseph Krambeer
4-27-14
Cisc 131
Magic Square Assignment
*/



window.onload = function()
{
	//alert(createHTMLelement("div", "box", "box clear", ""));
	var userInput;
	userInput = 0;
	while(userInput<=2 || (userInput%2)!==1)
		{
		userInput = window.prompt("Enter an odd integer greater than two.");
		if(userInput<=2 || (userInput%2)!==1){window.alert("Error in input value.");}
		else{createMagicSquare(document.getElementById("container"), userInput);}
		}
	//alert(userInput);
}

function createMagicSquare(containerElement, order)
{
	var array;
	var horizontal;
	var verticle;
	var count;
	var i;
	var j;
	var k;

	//creating array
	order= Number(order);
	array = new Array(order);
	for(i=0;i<array.length;i=i+1)
	{array[i]= new Array(order);}
	for(i=0;i<array.length;i=i+1)
	{ for(j=0;j<array[i].length;j=j+1){array[i][j] = 0;} }

	//creating the number combinations for the magic box
	horizontal=Math.floor(order/2);
	verticle =(order*order);
	count=1;
	array[verticle%order][horizontal%order]=count;
	for(i=0;i<((order*order)-1);i=i+1)
		{
		count=count+1;
		if(array[(verticle-1)%order][(horizontal+1)%order]>0 )
		{verticle=verticle+1; horizontal=horizontal;}
		else{verticle=verticle-1;horizontal=horizontal+1;}
		array[verticle%order][horizontal%order]=count;
		}

	//making the boxes to display
	for(i=0; i<(order * order) ; i++)
		{
		if(i%order===0){containerElement.innerHTML = containerElement.innerHTML + createHTMLelement("div", "box" + i, "box clear", "");}
		if(i%order>0){containerElement.innerHTML = containerElement.innerHTML + createHTMLelement("div", "box" + i, "box", "");}
		if(i> ((order * order) - order - 1) )
		{document.getElementById("box" + i).className = document.getElementById("box" + i).className + " bottom";}
		}

	//giving the boxes their numeric values
	k=0;
	for(i=0;i<order;i++)
		{
			for(j=0;j<order;j++)
			{
			document.getElementById("box" + k).innerHTML = array[i][j];
			k=k+1;
			}
		}
	}


//old functions
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

function getArrayInfo(array)
{
	var result;
	var length;
	var i;
	result="Array contains " + (array.length) + " elements.";
	length=array.length
	for(i=0;i<length;i=i+1)
	{result= result + "\n" + "[" + (i) + "]" + " : " + array[i];}
	return result;
}