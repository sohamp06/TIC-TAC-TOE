// Select all the box elements and assign them to the variable 'boxes'
let boxes = document.querySelectorAll(".box");

// Select the reset button and assign it to the variable 'resetbtn'
let resetbtn = document.querySelector("#reset-btn");

// Select the new game button and assign it to the variable 'newGameBtn'
let newGameBtn = document.querySelector("#new-btn");

// Select the message container and assign it to the variable 'msgContainer'
let msgContainer = document.querySelector(".msg-container");

// Select the message element and assign it to the variable 'msg'
let msg = document.querySelector("#msg");

// Boolean to track the turn (true for O, false for X)
let turnO = true; // player O, player X

// Array of arrays representing the winning patterns
const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to reset the game
const resetGame = () => {
    turnO = true; // Reset turn to O
    enableAllBoxes(); // Enable all boxes for clicking
    msgContainer.classList.add("hide"); // Hide the message container
    boxes.forEach((box) => {
        box.innerText = ""; // Clear the text of all boxes
    });
};

// Add event listeners to each box for the click event
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Set the text of the box based on the turn and disable it
        if (turnO) { // O
            box.innerText = "O";
            turnO = false;
        } else { // X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // Disable the box after it's clicked
        checkWinner(); // Check for a winner after each move
    });
});

// Function to display the winner
const showWinner = (winner) => {
    msg.innerText = `${winner} won the round.`; // Set the winner message
    msgContainer.classList.remove("hide"); // Show the message container
};

// Function to display a tie message
const showTie = () => {
    msg.innerText = "Game is tie!"; // Set the tie message
    msgContainer.classList.remove("hide"); // Show the message container
};

// Function to check for a winner or tie
const checkWinner = () => {
    let allBoxesFilled = true; // Assume all boxes are filled

    // Iterate over the winning patterns
    for (let pattern of winningPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        // Check if all three positions are filled and match
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val); // Display the winner
                disableAllBoxes(); // Disable all boxes once a winner is found
                return;
            }
        }
    }

    // Check if all boxes are filled
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allBoxesFilled = false; // Found an empty box, so not all are filled
        }
    });

    if (allBoxesFilled) {
        showTie(); // If all boxes are filled and no winner, show tie message
    }
};

// Function to disable all boxes
const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true; // Disable each box
    });
};

// Function to enable all boxes
const enableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false; // Enable each box
    });
};

// Add event listeners to reset and new game buttons to reset the game
resetbtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
