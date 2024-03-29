//generate a random number from 1 to 9
// Player 1 choose X 
// Player 2 is a computer O
//Generate a winning combination of number
// variable: 
//player1Move
//computerMove
//combineMove
//winningMove
//randomNumber

// 1- 1: Player 1 moves first : 
// store a moved into player1Move = [5]
// 2 -1 : Player 2 moves next: random number generated, any but the one that is already occupied
// store a moved into computerMove = [4]
// 1 -2 : Player 2 moves second: random number generated expcet 5 and 4 
// store a moved into player1MOve = [5,2]
// 2 - 2: Player 2 moves next: need to check if player 1 has the two number combines 
//that exist in the winning combiniation [5,2] , then it will fill in the next number which is 8
//computerMove = [4,8]
// 1 - 3: Player 1 moves next, check the winning combination for the competititor, not exist, 
// check the combination for winning from its own, not exist ( priority)
//generate random, except all the position occuipied 1
// [5,2,1]
// 2 -3 : Player 2 moves next, check the winning combination for the competititor 
//=> exist 1,2 so it fill in 3
// [4,8,3]
// 1-4: Player 1 moves next, check the combination for itself first, 
//find [5,2] => so fill in 8 (not possible)
//find [1,2] => so fill in 3 (not possible)
//find [1,5] => so fill in 9 (possible)
//=>winning the game

//rule1 : when the move combination has from two numbers above, then check !
//rule2 : when the players move, check the combination from itself first !
//rule3: even find the winning combination, need to check if the position is available

//CODE SECTION 


let player1 = [];
let computer = [];
let players = [];
let winningCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

let game_end = 0;
let turn = 0;
let result;
let move = 10; // store result

let body = document.querySelector('body');
let position = ''; // use to get the position of each box

//markers
let player1Sign = 'X';
let computerSign = 'O'

body.addEventListener('click', play_with_computer)

function play_with_computer(e) {
    position = e.target.id; // use this to trigger the following events when the mouse click on anything under body

    let index = Number(position[position.length - 1]) // get last digit of an ID, string => number

    if (game_end == 0) {
        if (turn % 2 == 0) {  // both player 1 and computer in one move
            if (!players.includes(index)) {

                let sign = document.getElementById(`id${index}`);
                sign.innerHTML = player1Sign;
                player1.push(index);
                players.push(index);
                turn = turn + 2;


                if (players.length < 9) {
                    computerMove();

                }

                checkWinning(); // if game end = 1; stop the game

                // check for winning
            } else {
                alert('Choose some place else');
            }
        }

    } else {
        body.removeEventListener('click', play)
    }
}

//check for winning both

function checkWinning() {
    if (winning_play_with_computer(player1)) {
        alert('You win')
    }

    if (winning_play_with_computer(computer)) {
        alert('You lose')
    }

    if (tie_play_with_computer(player1, computer)) {
        alert('You tie')
    }

    if (winning_play_with_computer(player1) == true || winning_play_with_computer(computer) == true || players.length == 9) {
        return game_end = 1;
    } else {
        return game_end = 0;
    }
}

function winning_play_with_computer(array) {
    for (let i = 0; i < winningCombination.length; i++) { // to get the element in winning array
        let check = array.filter(item => winningCombination[i].includes(item))

        if (check.length == 3) {
            for (i = 0; i <= 2; i++) {
                document.getElementById(`id${check[i]}`).style.backgroundColor = 'green';
            };
            return result = true;
        } else {
            result = false;
        }
    }
    return result
}

//check for tie
function tie_play_with_computer(array1, array2) {

    let tie;
    if (players.length == 9) { // all moves done
        if (winning_play_with_computer(array1) == false) {
            if (winning_play_with_computer(array2) == false) {
                tie = true;
            }
        }
    }
    return tie
}


function random() {
    return Math.ceil(Math.random() * 9);
}

//fill in function
function fillIn(x) {
    document.getElementById(`id${x}`).innerHTML = computerSign;
    computer.push(x);
    players.push(x);
}


function computerMove() {
    //check winning combination for the computer
    let winningMoveComputer = nextMove(computer) //=> should return the position to fill in block
    let winningMoveCompetitor = nextMove(player1)

    if (winningMoveComputer < 10 && !computer.includes(winningMoveComputer)) {
        fillIn(winningMoveComputer)

    } else if (winningMoveCompetitor < 10 && !computer.includes(winningMoveCompetitor)) {
        fillIn(winningMoveCompetitor)

    } else {
        //if no winning combination found, do the move based on random
        let randomNumber = random();

        while (players.includes(randomNumber)) {
            randomNumber = random();
        }
        fillIn(randomNumber);
    }
}

//check for next move of computer 
//check next move based on winning combination
function nextMove(array) {
    for (let i = 0; i < winningCombination.length; i++) { // to get the element in winning array

        let thirdWinningPosition = winningCombination[i].filter(item => !array.includes(item));

        if (thirdWinningPosition.length == 1) {
            if (!players.includes(thirdWinningPosition[0])) {
                move = thirdWinningPosition[0];
                break
            }
        }
    }
    return move;
}

