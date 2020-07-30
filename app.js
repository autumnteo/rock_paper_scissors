/* use 'let' or 'var' instead of 'const' so that we can change the number later */
let userScore = 0;
let computerScore = 0;

/* store of all the elements from html into a variable so dont have to keep getting the element */
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");

function getComputerChoice(){
    const choices = ['rock', 'paper', 'scissors'];
    /* math.random gives a random number from 0 to 1 (exlusive) eg. 0.1231141949 or 0.989848
       so to get a random number from 0 to 3 (exclusive), times it by 3
       use math.floor is to round it down */
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(word){
    if (word === 'rock') return "Rock";
    if (word === 'paper') return "Paper";
    if (word === 'scissors') return "Scissors";
}

function win(userChoice, computerChoice){
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    /* below is equivalent to this result_p.innerHTML = convertToWord(userChoice) + " beats " + convertToWord(computerChoice) + ". You Win :)"; */
    result_p.innerHTML = `<font size = 6>You have chosen:</font> <font color = darkgrey> ${convertToWord(userChoice)}. </font> <br>
                          <font size = 6>CPU has chosen: </font> <font color = darkgrey> ${convertToWord(computerChoice)}. </font> <br>
                          You Win :)`;
    /* dont use 'rock' as argv because the green glow will only appear if the user win with rock */
    /* .classList returns an array of all the classes on that specific element. .add to add the class on the array */
    userChoice_div.classList.add('green-glow');
    /* if dont use set timeout, the glow will always remain on the choices */
    setTimeout(function() { userChoice_div.classList.remove('green-glow') }, 500);

}

function lose(userChoice, computerChoice){
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `<font size = 6>You have chosen:</font> <font color = darkgrey> ${convertToWord(userChoice)}. </font> <br>
                          <font size = 6>CPU has chosen: </font> <font color = darkgrey> ${convertToWord(computerChoice)}. </font> <br>
                          You Lost :(`;
    userChoice_div.classList.add('red-glow');
    setTimeout(function() { userChoice_div.classList.remove('red-glow') }, 500);
}

function draw(userChoice, computerChoice){
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = `<font size = 6>You have chosen:</font> <font color = darkgrey> ${convertToWord(userChoice)}. </font> <br>
                          <font size = 6>CPU has chosen: </font> <font color = darkgrey> ${convertToWord(computerChoice)}. </font> <br>
                          It's a Draw!`;
    userChoice_div.classList.add('grey-glow');
    setTimeout(function() { userChoice_div.classList.remove('grey-glow') }, 500);
}

function game(userChoice){
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice){
        /* cases where the user win */
        case "rockscissors":
        case "paperrock":
        case "scissorspaper":
            win(userChoice, computerChoice);
            break;
        case "scissorsrock":
        case "rockpaper":
        case "paperscissors":
            lose(userChoice, computerChoice);
            break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
            draw(userChoice, computerChoice);
            break;
    }
}

function reset(){
    if (userScore == 10){
        result_p.innerHTML = `<font size = 6>You are the first to reach 10 points</font> <br>
                                You Win :)`;
        userScore = 0;
        userScore_span.innerHTML = userScore;
        computerScore = 0;
        computerScore_span.innerHTML = computerScore;
    }else if (computerScore == 10){
        result_p.innerHTML = `<font size = 6>CPU was the first to reach 10 points</font> <br>
                                You Lose :(`;
        userScore = 0;
        userScore_span.innerHTML = userScore;
        computerScore = 0;
        computerScore_span.innerHTML = computerScore;
    }
}

function main(){
    rock_div.addEventListener("click", function(){
        /* console.log("clicked on rock");
        right-click > inspect > console. click on the rock icon to see what it does 
        useful for debugging */
        game("rock");
        reset();
    })
    
    paper_div.addEventListener("click", function(){
        game("paper");
        reset();
    })
    
    scissors_div.addEventListener("click", function(){
        game("scissors");
        reset();
    })
}


main();
