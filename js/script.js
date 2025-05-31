console.log("hello world");

//i have to declare it here globally to recognize the button
let resetButton;
//add the scoring
const humanScoreText = document.querySelector("#human-score");
const computerScoreText = document.querySelector("#computer-score");

//get computer choice to randomly return rock, paper, scissors
function getComputerChoice(){
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    let choice = "";
    
    switch(randomNumber){
        case 1:
            choice = "rock";
            break;
        case 2:
            choice = "paper";
            break;
        default:
            choice = "scissor";
            break;
    }
    console.log(`computer: ${choice}`);
    return choice;
}
const compChoice = document.querySelector("#comp-choice");
const compSubmit = document.querySelector("#comp-submit");
compSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    let choice = getComputerChoice();
    compChoice.value = choice;
});

//test the getComputerChoice function
/*
console.log(getComputerChoice());
for(let i=0; i<30; i++){
    console.log(getComputerChoice());
}
console.clear();
*/
// it was confirmed that the value of the function is from 1 to 3


const humanSelect = document.querySelector("#human-choice");
//get human choice and returns it
function getHumanChoice(){
    return humanSelect.value;
}
 humanSelect.addEventListener("change", (event) => {
    let choice = getHumanChoice();
    //test the getHumanChoice function
    /*
    console.log(choice);
    console.clear();
    */ 
    // it was confirmed that it was working
    console.log(`human: ${choice}`);
    return choice;
});


//this function will help for comparing rock, paper, and scissors
function compareChoice(choice){
    if(choice === "rock"){
        return 1;
    }else if(choice === "paper"){
        return 2;
    }else if(choice === "scissor"){
        return 3;
    }else{
        console.log("choose only rock, paper or scissor.");
        return 0;
    }
}

//create two variables two keep track of the computer and human
let humanScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

//logic problem for rock and scissor
//write a logic to play a single round
function playRound(humanChoice, computerChoice){
    let x = 0, y= 0;

    x = compareChoice(humanChoice);
    y = compareChoice(computerChoice);
    let roundResultText = "";

    // this was later added to correct the logic behind it.
    if(humanChoice === "scissor" && computerChoice === "rock"){
        y = 4;
    }else if(humanChoice === "rock" && computerChoice === "scissor"){
        x = 4;
    }
   
    if(x > y){
        humanScore++;
        roundResultText = "You win this round!";
    }else if(x === y){
        roundResultText = "It is a tie!";
    }else {
        computerScore++;
        roundResultText = "Computer wins this round.";
    }

    roundsPlayed++;
    console.log(`counter: ${roundsPlayed}`);
    humanScoreText.textContent = humanScore;
    computerScoreText.textContent = computerScore;
    output.textContent = roundResultText;
}
//playRound("scissor", "paper");
//console.log(`human score: ${humanScore}`);
//console.log(`computer score: ${computerScore}`);

const output = document.querySelector(".output");
const goButton = document.querySelector("#go");
//write the logic to play the entire game
function playGame(){  
    console.log(`playGame run ${roundsPlayed}!!!`);   
    goButton.addEventListener("click", goButtonClick);
}

//function for goButton event listener
function goButtonClick(event){
    if(roundsPlayed < 5){
        event.preventDefault();
        playRound(humanSelect.value, compChoice.value);
        console.log(`human score: ${humanScore}`);
        console.log(`computer score: ${computerScore}`);
    }else {
        endGame();
    }
}

//ending the game
function endGame(){
        if(humanScore > computerScore){
            output.textContent = `Human Wins! ${humanScore} vs ${computerScore}`;
        }else if(humanScore === computerScore){
            output.textContent = `It is a tie!!! ${humanScore} vs ${computerScore}`;
        }else {
            output.textContent = "Computer Wins!";
        }
        console.log("!!!GAME OVER!!!");
        goButton.disabled = true;

        //this is for the reset button to appear when the game ends
        if(resetButton){
            resetButton.style.display = "block";
        }
}
// the problem endGame runs only once.
playGame();


const reserveForReset = document.querySelector("#reserve-for-reset");
//add a reset button here

function createResetButton(){
    resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game";
    resetButton.id = "reset-button";
    resetButton.style.display = "none"; // this is to make sure it won't display first
    reserveForReset.appendChild(resetButton);
    resetButton.addEventListener("click", resetGame);
}

//to reset the game function
function resetGame(){
    humanScore = 0;
    computerScore = 0;
    roundsPlayed =0;

    output.textContent = "";
    compChoice.value = "";
    humanSelect.value = "";

    goButton.disabled = false;

    //you need this so that after the game ends, after you press this reset, it will be gone on display again.
    if(resetButton){
        resetButton.style.display = "none";
    }
    //reset the scoring display below
    humanScoreText.textContent = "";
    computerScoreText.textContent = "";
}

createResetButton();