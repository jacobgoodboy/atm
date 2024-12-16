// Initialize balances, card status, and PIN
let checkingBalance = 1000;
let cardInserted = false;
let inputBuffer = "";
const correctPin = "1234";
let pinVerified = false;

// DOM Elements
const display = document.getElementById("display");
const insertCardButton = document.getElementById("insertcard");
const depositButton = document.getElementById("deposit");
const checkBalButton = document.getElementById("checkbal");
const withdrawButton = document.getElementById("withdraw");
const numberKeys = document.querySelectorAll("#numberkeys button");

// Update display message
function updateDisplay(message) {
  display.value = message;
}

// Handle card insertion
insertCardButton.addEventListener("click", () => {
  if (!cardInserted) {
    cardInserted = true;
    pinVerified = false;
    inputBuffer = "";
    updateDisplay("Card inserted! Enter your PIN.");
  } else {
    updateDisplay("Card is already inserted!");
  }
});

// Handle PIN entry and verification
function handlePinEntry() {
  if (inputBuffer === correctPin) {
    pinVerified = true;
    updateDisplay("PIN verified! Choose an option.");
    inputBuffer = "";
  } else {
    updateDisplay("Incorrect PIN. Try again.");
    inputBuffer = "";
  }
}

// Handle deposit
depositButton.addEventListener("click", () => {
  if (!cardInserted) {
    updateDisplay("Please insert your card first!");
    return;
  }
  if (!pinVerified) {
    updateDisplay("Please enter your PIN first!");
    return;
  }
  inputBuffer = "";
  updateDisplay("Enter deposit amount, then press ENTER.");
});

// Handle withdrawal
withdrawButton.addEventListener("click", () => {
  if (!cardInserted) {
    updateDisplay("Please insert your card first!");
    return;
  }
  if (!pinVerified) {
    updateDisplay("Please enter your PIN first!");
    return;
  }
  inputBuffer = "";
  updateDisplay("Enter withdrawal amount, then press ENTER.");
});

// Handle balance check
checkBalButton.addEventListener("click", () => {
  if (!cardInserted) {
    updateDisplay("Please insert your card first!");
    return;
  }
  if (!pinVerified) {
    updateDisplay("Please enter your PIN first!");
    return;
  }
  updateDisplay(`Your balance is $${checkingBalance}.`);
});

// Handle numeric key input
numberKeys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.innerText;

    if (value === "enter") {
      if (!pinVerified) {
        handlePinEntry();
      } else if (display.value.includes("deposit")) {
        const depositAmount = parseFloat(inputBuffer);
        if (!isNaN(depositAmount) && depositAmount > 0) {
          checkingBalance += depositAmount;
          updateDisplay(`Deposited $${depositAmount}. New balance: $${checkingBalance}.`);
        } else {
          updateDisplay("Invalid deposit amount.");
        }
      } else if (display.value.includes("withdrawal")) {
        const withdrawAmount = parseFloat(inputBuffer);
        if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
          if (withdrawAmount <= checkingBalance) {
            checkingBalance -= withdrawAmount;
            updateDisplay(`Withdrew $${withdrawAmount}. New balance: $${checkingBalance}.`);
          } else {
            updateDisplay("Insufficient funds.");
          }
        } else {
          updateDisplay("Invalid withdrawal amount.");
        }
      }
      inputBuffer = "";
    } else {
      inputBuffer += value;
      updateDisplay(display.value + value);
    }
  });
});