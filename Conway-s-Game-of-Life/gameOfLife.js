 /* Joseph Krambeer
05-05-14
Cisc 131
Game of Life
*/

window.onload = function()
{
	var gameBoardArray;
	var tempArray;
	
	gameBoardArray = create2dArray(50, 50, 0);
	tempArray = copyTwoDimensionalArray(gameBoardArray);
	
	createGameBoard(document.getElementById("gameBoard"), gameBoardArray);
	
	createFirstGeneration(gameBoardArray);
	setDeadOrAlive(gameBoardArray);

	window.setInterval(function(){applyRules(gameBoardArray, tempArray)}, 333);

};

function applyRules(array2d, tmpArray)
{
	var i;
	var j;
	for(i=0;i<tmpArray.length;i++)
	{
		for(j=0;j<tmpArray.length;j++)
		{
			tmpArray[i][j]=countLivingNeighborsOf(array2d, i, j)
		}
	}
	for(i=0;i<tmpArray.length;i++)
	{
		for(j=0;j<tmpArray.length;j++)
		{
			if(tmpArray[i][j]<2 && array2d[i][j]===1){array2d[i][j] = getDeadValue();}
			else if(tmpArray[i][j]===2){array2d[i][j] = array2d[i][j];}
			else if(tmpArray[i][j]===3){array2d[i][j] = getLiveValue();}
			else{array2d[i][j] = getDeadValue();}
		}
	}
	setDeadOrAlive(array2d);
}

function countLivingNeighborsOf(array2d, row, col)
{
	var i;
	var j;
	var count;
	count = 0;
	//ones above the element being checked
	if(isInArray(array2d, row-1, col-1)===false || array2d[row-1][col-1]===0){count=count;}else{count=count+1;}
	if(isInArray(array2d, row  , col-1)===false || array2d[row  ][col-1]===0){count=count;}else{count=count+1;}
	if(isInArray(array2d, row+1, col-1)===false || array2d[row+1][col-1]===0){count=count;}else{count=count+1;}
	
	//ones to the either side of the element being checked
	if(isInArray(array2d, row+1, col)===false || array2d[row+1][col]===0){count=count;}else{count=count+1;}
	if(isInArray(array2d, row-1, col)===false || array2d[row-1][col]===0){count=count;}else{count=count+1;}
	
	//ones below the element being checked, check null
	if(isInArray(array2d, row-1, col+1)===false || array2d[row-1][col+1]===0){count=count;}else{count=count+1;}
	if(isInArray(array2d, row  , col+1)===false || array2d[row  ][col+1]===0){count=count;}else{count=count+1;}
	if(isInArray(array2d, row+1, col+1)===false || array2d[row+1][col+1]===0){count=count;}else{count=count+1;}
	return count;
}

function setDeadOrAlive(array2d)
{
	var i;
	var j;
	for(i=0;i<array2d.length;i++)
		{
			for(j=0;j<array2d.length;j++)
			{
				if(array2d[i][j]===1){document.getElementById("r"+i+"c"+j).style.backgroundColor="green";}
				else{document.getElementById("r"+i+"c"+j).style.backgroundColor="white";}
			}
		}
}

function createFirstGeneration(array2d)
{
	var i;
	var j;
	var k;
	var row;
	var col;

	for(i=0;i<array2d.length;i++)
	{
		for(j=0;j<array2d.length;j++)
		{
			if(i===j || i==j || (i+j)%2===0){array2d[i][j] = getLiveValue();}
		}
	}
}

function createGameBoard(container, array2d)
{
	var i;
	var j;
	var count;
	var setToThis;
	setToThis = "";
	for(i=0;i<array2d.length;i++)
	{
		for(j=0;j<array2d.length;j++)
		{
			if(j===0)                      {setToThis = setToThis + createHTMLelement("div","r"+i+"c"+j,"cell newRow","");}
			else if(j===(array2d.length-1)){setToThis = setToThis + createHTMLelement("div","r"+i+"c"+j,"cell lastColumn","");}
			else                           {setToThis = setToThis + createHTMLelement("div","r"+i+"c"+j,"cell","");}
		}
	}
	container.innerHTML = setToThis;

	for(j=0;j<array2d.length;j++)
	{
		document.getElementById("r"+0+"c"+j).className=document.getElementById("r"+0+"c"+j).className + " firstRow";
	}
}

function getDeadValue()
{
	return 0;
}

function getDeadColor()
{
	return "white";
}

function getLiveValue()
{
	return 1;
}

function getLiveColor()
{
	return "green";
}

function isAlive(cell)
{
	var result;
	if(cell===getLiveValue()){result=true;}
	else{result=false;}
	return result;
}

function isInArray(array2d, row, col)
{
	if(array2d[row]===undefined || array2d[row][col]===undefined || array2d===undefined){return false;}else{return true;}
}

function copyTwoDimensionalArray(twoDimensionalArray)
{
	var i;
	var j;
	var copy;
	copy= new Array(twoDimensionalArray.length);

	for(i=0;i<twoDimensionalArray.length;i=i+1)
	{
		copy[i]=new Array(twoDimensionalArray[i].length);
	}

	for(i=0;i<twoDimensionalArray.length;i=i+1)
	{
		for(j=0;j<twoDimensionalArray[i].length;j=j+1)
		{
			copy[i][j]=twoDimensionalArray[i][j];
		}
	}
	return copy;
}

function create2dArray(rows, columns, initialValue)
{
	var array;
	var i;
	var j;
	array = new Array(rows);
	for(i=0;i<array.length;i=i+1)
	{
		array[i] = new Array(columns);
	}
	for(i=0;i<array.length;i=i+1)
	{
		for(j=0;j<array[i].length;j=j+1)
		{
			array[i][j] = initialValue;
		}
	}
	return array;
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