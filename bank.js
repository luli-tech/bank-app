"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
let insideTransaction = document.querySelector(".transaction-container");
let body = document.querySelector(".main-account");
let balanceContainer = document.querySelector(".bal");
let moneyIn = document.querySelector(".in-sum");
let moneyOut = document.querySelector(".out-sum");
let moneyInterest = document.querySelector(".interest-sum");
let user = document.querySelector(".user");
let password = document.querySelector(".password");
let enter = document.querySelector(".enter");
let welcomeMessage = document.querySelector(".welcome-message");
let currentAccount;

const displayMovement = (movement) => {
  insideTransaction.innerHTML = "";
  movement.forEach((mov, i) => {
    let transaction = `
                <div class="inside-transaction-container">
                  <p class="status-of-transaction ${
                    mov > 0 ? "green" : "red"
                  }">${i + 1} ${mov > 0 ? "deposit" : "withdraw"}</p>
                  <p  class="date-of-transction">12/03/2020</p>
                  <p class="transaction-amount">${Math.abs(mov)} €</p>
                  </div>`;
    insideTransaction.insertAdjacentHTML("afterbegin", transaction);
  });
};

let totalBalance = (balance) => {
  let bal = balance.reduce((m, i) => m + i, 0);
  balanceContainer.textContent = `${bal} €`;
};
totalBalance(movements);

let computedUsername = (name) => {
  name.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((accs) => accs[0])
      .join("");
  });
};
computedUsername(accounts);

let amountRecieved = (amount) => {
  let amountIn = amount
    .filter((mov) => mov > 0)
    .reduce((mov, acc) => mov + acc, 0);
  moneyIn.textContent = `${amountIn} €`;

  let amountOut = amount
    .filter((mov) => mov < 0)
    .reduce((mov, acc) => mov + acc, 0);
  moneyOut.textContent = `${Math.abs(amountOut)} €`;

  let interestAmount = amount
    .filter((amount) => amount > 0)
    .map((amount) => (amount * 1.2) / 100)
    .filter((amount) => amount >= 1)
    .reduce((amount, mov) => amount + mov, 0);
  moneyInterest.textContent = `${interestAmount} €`;
};

let implimentLogin = (real) => {
  currentAccount = real.find((acc) => user.value === acc?.username);
  if (Number(password.value) === currentAccount?.pin) {
    amountRecieved(currentAccount.movements);
    displayMovement(currentAccount.movements);
    welcomeMessage.textContent = `Welcome Onboard, ${
      currentAccount.owner.split(" ")[0]
    }`;
    body.classList.add("dis");
  }
};

enter.addEventListener("click", (e) => {
  implimentLogin(accounts);
  password.value = user.value = "";
});
