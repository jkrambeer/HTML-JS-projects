/* Joseph Krambeer
3-17-14 Cisc 131
TicTacToe Assignment #3
Creating a fully functional
TicTacToe Board
*/

var markCount;
var winComb;
var boardState;

window.onload = function()
{

    var boxCount;
    var i;
    var element;
    boxCount = countElementsWithPrefix("TicTacToeBoard");
	//used to assign the changeToBlack function to the boxes in the html
	i = 0;
	while(i<boxCount)
	{
		document.getElementById("TicTacToeBoard" + i).onclick = markTheSquare;
		i = i + 1;
	}
	setMarkCount(0);
	setWinningCombinations("012,345,678,036,147,258,246,048");
	setBoardState(getWinningCombinations());
	//window.alert(markTheSquare());
	//window.alert(getWinningCombinations());

}

function markTheSquare()
{
	//sets square's inner html to either an x or an o
	this.onclick = null;
	this.innerHTML= getXorO();

	var playerMark;
	playerMark = getXorO() + getXorO() + getXorO();
	//14 for charAt because the numerical values are at the
	//14th spot of the string
	updateBoardState(getXorO(), this.id.charAt(14) );
	var boardState;
	var winningCombinations;
	var foundAt;
	var i;
	var elementId;
	elementId = "";
	boardState = getBoardState();
	winningCombinations = getWinningCombinations();
	foundAt = boardState.indexOf(playerMark);
	//used to set i=9 if the game isnt won yet.
	i = Math.abs(Math.min(foundAt, 0)) * 9;
	//alert(i);
	while(i < 9)
	{
		document.getElementById("TicTacToeBoard" + i).onclick= null;
		i = i + 1;
	}

	while(foundAt >= 0)
	{
		i = 0;
		while(i < 3)
		{
			elementId = "TicTacToeBoard" + winningCombinations.charAt(foundAt + i) ;
			document.getElementById(elementId).style.color="red";
			i = i + 1;
		}
		foundAt = boardState.indexOf(playerMark, (foundAt + 4) );
	}

	setMarkCount((getMarkCount() + 1));
}

function getBoardState()
{
	//used to reference global variables value
	return boardState;
}

function setBoardState(value)
{
	//used to reference global variables value
	boardState = value;
}

function getWinningCombinations()
{
	//used to reference global variables value
	return winComb;
}

function setWinningCombinations(value)
{
	//changes global variable's value
	winComb = value;
}

function getXorO()
{
	//gets an x on even numbers as it returns 0 for charAt
	//and a y for odd numbers as it returns 1
	//Also adds one to global variable
	var i;
	var stringCharacter;
	var sting;
	string = "XO";
	i = ((getMarkCount())%2);
	stringCharacter = string.charAt(i);
	return stringCharacter;

}

function getMarkCount()
{
	//used to reference global variables value
	return markCount;
}

function setMarkCount(value)
{
	//changes global variable's value
	markCount = value;
}


function countElementsWithPrefix(prefix)
{
	var count;
	var Id;

	count=0;
	Id= document.getElementById(prefix + count);
	while(Id !=null)
	{
		count= count + 1;
		Id= document.getElementById(prefix + count);
	}
return count;
}

function updateBoardState(mark, squareNum)
{
	var winners;
	var boardState;
	var location;
	var number
	number = squareNum;
	winners = getWinningCombinations();
	boardState = getBoardState();
	location = winners.indexOf(number);

	while(location >= 0)
	{
		boardState = replaceCharacterInString(boardState, location, mark);
		//boardState right now is winners with character changed to be mark
		//so the search is now done in the new string to get the next char
		location = boardState.indexOf(number);
	}
	setBoardState(boardState);
	return getBoardState();
}

function replaceCharacterInString(source, where, what)
{
	var string;
	var result;
	var x;
	var y;
	result="";
	string = source;
	x = string.substring(0 , where);
	y = string.substring(where + 1, string.length);
	result = x + what + y + result;
	return result;
}
