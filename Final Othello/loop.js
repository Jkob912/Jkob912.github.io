var baseBG;
var canMoveLayer;
var space = 3;
var boxsize = 70;
var pieceSize = 64;
var turn = 1;
var scoreLable;
var gameOver = false;


var circle = 
[
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
] 
window.onload=function()
{
    scoreLable = document.getElementById("score");
    canMoveLayer = document.getElementById("canMoveLayer");
    baseBG = document.getElementById("baseBG");//base of the board
    circleBoard = document.getElementById("circleBoard");
    baseBG.style.width = boxsize*8 + (space*9);//thickness of the black square
    baseBG.style.height = boxsize*8 + (space*9);//height of the black square
    board();//green squares
    onBoard();//pieces
    drawcanMoveLayer();
}

function board()//main board
{
    for (var y = 0; y < 8 ; y++)//row |
    {
        for (var x = 0; x < 8 ; x++)//column -
        {
            var green = document.createElement("div");
            green.style.position = "absolute";
            green.style.width = boxsize;
            green.style.height = boxsize;
            green.style.backgroundColor = "green";
            //spaces from each other
            green.style.left = (boxsize+space)*x + space;// - axis
            green.style.top = (boxsize+space)*y + space;// | axis
            green.setAttribute("onclick", "placePiece("+y+", "+x+" )");

            baseBG.appendChild(green);//append to add
        }
    }
}
 
function placePiece(y,x)//clicked square
{
    if (gameOver)
    {
        return;
    }
    if(circle[y][x] != 0)
    {
        return 0;
    }

    if(AvailableSpot(turn,y,x) == true)
    {
        var AffectedPiece = getAffectedPiece(turn,y,x);
        DiscFlip(AffectedPiece);//to cchange the piece color
        circle[y][x] = turn;
        if(turn == 1 && canMove(2)) 
        {
            turn = 2;
        }
        else if (turn == 2 && canMove(1))
        {
            turn = 1;
        }
        if (canMove(1) == false && canMove(2) == false)
        {
            alert("Game Over");
            gameOver = true;
        }
        onBoard();//drawdiscs
        drawcanMoveLayer();
        scoring();
    }
    
}

function canMove(id)
{
    for (var y = 0; y < 8 ; y++)//row
    {
        for (var x = 0; x < 8 ; x++)//column
        {
            if (AvailableSpot(id,y,x))
            {
                return true;
            }
        }
    }
    return false;
}

function scoring()
{
    var ones = 0;
    var twos = 0;
    for (var y = 0; y < 8 ; y++)//row
    {
        for (var x = 0; x < 8 ; x++)//column
        {
            var piece = circle [y] [x];
            if (piece == 1)
            {
                ones += 1;
            }
            else if(value == 2)
            {
                twos += 1;
            }
        }
    }
    scoreLable.innerHTML = "Black: " + ones + "Whites: " + twos;
}

function AvailableSpot(id,y,x)//canClickSpot
{
    var AffectedPiece = getAffectedPiece(id,y,x);
    if(AffectedPiece.length == 0)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function getAffectedPiece(id,y,x)//getAffectedDisc
{
    var AffectedPiece = [];
    //Affect to Right
    var possAffected = [];
    var xIterator = x;//Row
    while (xIterator < 7)
    {
        xIterator += 1;
        var ValueonSpot = circle[y][xIterator];
        if(ValueonSpot == 0 || ValueonSpot == id)
        {
            if(ValueonSpot == id)
            {
                AffectedPiece = AffectedPiece.concat(possAffected);
            }
            break;
        }
        else
        {
            var pieceLocation = {y:y, x:xIterator};
            possAffected.push(pieceLocation);
        }

    }

    //Affect Left
    var possAffected = [];
    var xIterator = x;//Row
    while (xIterator > 0)
    {
        xIterator -= 1;
        var ValueonSpot = circle[y][xIterator];
        if(ValueonSpot == 0 || ValueonSpot == id)
        {
            if(ValueonSpot == id)
            {
                AffectedPiece = AffectedPiece.concat(possAffected);
            }
            break;
        }
        else
        {
            var pieceLocation = {y:y, x:xIterator};
            possAffected.push(pieceLocation);
        }

    }

    //Affect Above
    var possAffected = [];
    var yIterator = y;//Column
    while (yIterator > 0)
    {
        yIterator -= 1;
        var ValueonSpot = circle[yIterator][x];
        if(ValueonSpot == 0 || ValueonSpot == id)
        {
            if(ValueonSpot == id)
            {
                AffectedPiece = AffectedPiece.concat(possAffected);
            }
            break;
        }
        else
        {
            var pieceLocation = {y:yIterator, x:x};
            possAffected.push(pieceLocation);
        }

    }

    //Affect Below
    var possAffected = [];
    var yIterator = y;//Column
    while (yIterator < 7)
    {
        yIterator += 1;
        var ValueonSpot = circle[x][yIterator];
        if(ValueonSpot == 0 || ValueonSpot == id)
        {
            if(ValueonSpot == id)
            {
                AffectedPiece = AffectedPiece.concat(possAffected);
            }
            break;
        }
        else
        {
            var pieceLocation = {x:x, y:yIterator};
            possAffected.push(pieceLocation);
        }

    }

// D I A G O N A L S

    //Affect Diagonally  down right
    var possAffected = [];
    var yIterator = y;//Column
    var xIterator = x;//Row
    while (xIterator < 7 && yIterator < 7)
    {
        xIterator += 1;
        yIterator += 1;
        var ValueonSpot = circle[xIterator][yIterator];
        if(ValueonSpot == 0 || ValueonSpot == id)
        {
            if(ValueonSpot == id)
            {
                AffectedPiece = AffectedPiece.concat(possAffected);
            }
            break;
        }
        else
        {
            var pieceLocation = {x:xIterator, y:yIterator};
            possAffected.push(pieceLocation);
        }

    }

    //Affect diagonally down left   
    var possAffected = [];
    var yIterator = y;//Column
    var xIterator = x;//Row
    while (xIterator < 7 && yIterator > 0)
    {
        xIterator += 1;
        yIterator -= 1;
        var ValueonSpot = circle[xIterator][yIterator];
        if (ValueonSpot == 0 || ValueonSpot == id)
        {
            if(ValueonSpot == id)
            {
                AffectedPiece = AffectedPiece.concat(possAffected);
            }
            break;
        }
        else
        {
            var pieceLocation = {x:xIterator, y:yIterator};
            possAffected.push(pieceLocation);
        }
    }

    //Affect diagonally up left 
    var possAffected = [];
    var yIterator = y;//Column
    var xIterator = x;//Row
    while (xIterator > 0 && yIterator > 0)
    {
        xIterator -= 1;
        yIterator -= 1;
        var ValueonSpot = circle[xIterator][yIterator];
        if (ValueonSpot == 0 || ValueonSpot == id)
        {
            if(ValueonSpot == id)
            {
                AffectedPiece = AffectedPiece.concat(possAffected);
            }
            break;
        }
        else
        {
            var pieceLocation = {x:xIterator, y:yIterator};
            possAffected.push(pieceLocation);
        }

    }

    //Affect diagonally up right
    var possAffected = [];
    var yIterator = y;//Column
    var xIterator = x;//Row
    while (xIterator > 0 && yIterator < 7   )
    {
        xIterator -= 1;
        yIterator += 1;
        var ValueonSpot = circle[xIterator][yIterator];
        if (ValueonSpot == 0 || ValueonSpot == id)
        {
            if(ValueonSpot == id)
            {
                AffectedPiece = AffectedPiece.concat(possAffected);
            }
            break;
        }
        else
        {
            var pieceLocation = {x:xIterator, y:yIterator};
            possAffected.push(pieceLocation);
        }

    }

    return AffectedPiece;
}
function DiscFlip(AffectedPiece)
{
    for(var i = 0; i < AffectedPiece.length; i++)
    {
        var spot = AffectedPiece[i];
        if(circle[spot.y][spot.x] == 1)
        {
            circle[spot.y][spot.x] = 2;
        }
        else 
        {
        circle[spot.y][spot.x] = 1;
        } 
    }
}

function drawcanMoveLayer()
{
    canMoveLayer.innerHTML = " ";//cancle out duplication for some reason
    for (var y = 0; y < 8 ; y++)//row
    {
        for (var x = 0; x < 8 ; x++)//column
        {
            var piece = circle [y] [x];
            if (piece == 0 && AvailableSpot(turn,y,x))
            {
                var piecesOutline = document.createElement("div");
                piecesOutline.style.position = "absolute";
                piecesOutline.style.width = pieceSize-4;
                piecesOutline.style.height = pieceSize-4;
                piecesOutline .style.borderRadius = "50%" ;
                //spaces from each other
                piecesOutline.style.left = (boxsize+space)*x + space + 3;// - axis
                piecesOutline.style.top = (boxsize+space)*y + space + 3;// | axis
                piecesOutline.style.zIndex = 2;
                piecesOutline.setAttribute("onclick", "placePiece("+y+", "+x+" )");
                
                if (turn == 1)
                {
                    piecesOutline.style.border = "2px solid black";
        
                }
                if (turn == 2)
                {
                    piecesOutline.style.border = "2px solid white";
                }
                canMoveLayer.appendChild(piecesOutline);
            }
        }
    }
}

function onBoard()  
{
    circleBoard.innerHTML = " ";//cancle out duplication for some reason
    for (var y = 0; y < 8 ; y++)//row
    {
        for (var x = 0; x < 8 ; x++)//column
        {
            var piece = circle [y] [x];
            if (piece == 0)
            {

            }
            else
            {
                var pieces = document.createElement("div");
                pieces.style.position = "absolute";
                pieces.style.width = pieceSize;
                pieces.style.height = pieceSize;
                pieces.style.borderRadius = "50%" ;
                //spaces from each other
                pieces.style.left = (boxsize+space)*x + space + 3;// - axis
                pieces.style.top = (boxsize+space)*y + space + 3;// | axis
                
                if (piece == 1)
                {
                    pieces.style.backgroundColor = "black";
                }
                if (piece == 2)
                {
                    pieces.style.backgroundColor = "white";
                }
                circleBoard.appendChild(pieces);
            }
        }
    }
}
