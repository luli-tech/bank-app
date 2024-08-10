const account1 = {
  owner: "olabode micheal",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  tdates: [],
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
let receiver = document.querySelector(".receiver");
let transAmount = document.querySelector(".transferAmount");
let transfer = document.querySelector(".transfer");
let tf = document.querySelectorAll(".tf");
let confirmUser = document.querySelector(".confirm-user");
let confirmPin = document.querySelector(".confirm-pin");
let closeAcc = document.querySelectorAll(".close-acc");
let closeBtn = document.querySelector(".close-btn");
let loanAmount = document.querySelector(".loan-amount");
let loanBtn = document.querySelector(".loan-btn");
let timeout = document.querySelector(".timeout");
let sort = document.querySelector(".sort");
let clearClose = document.querySelectorAll(".clear-close");
let clearLoan = document.querySelector(".clear-loan");
let dates = document.querySelector(".balance-date");
let dateoftransaction = document.querySelector(".date-of-transction");

let currentAccount;
let clearInput = (clea) => {
  clea.forEach((m) => (m.value = ""));
  console.log(clea);
};

const displayMovement = (movement, sorted = false) => {
  insideTransaction.innerHTML = "";
  movs = sorted ? movement.slice().sort((a, b) => a - b) : movement;
  movs.forEach((mov, i) => {
    let transaction = `
                <div class="inside-transaction-container">
                  <p class="status-of-transaction ${
                    mov > 0 ? "green" : "red"
                  }">${i + 1} ${mov > 0 ? "deposit" : "withdraw"}</p>
                  <p  class="date-of-transction">${computeDates()}</p>
                  <p class="transaction-amount">${Math.abs(mov)} €</p>
                  </div>`;
    insideTransaction.insertAdjacentHTML("afterbegin", transaction);
  });
};

let totalBalance = (balance) => {
  balance.totalAmount = balance.movements.reduce((m, i) => m + i, 0);
  balanceContainer.textContent = `${balance.totalAmount} €`;
  return balance;
};

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
  moneyInterest.textContent = `${Math.round(interestAmount)} €`;
};
let content;
let computeDates = () => {
  let transactionDates = new Date();
  let day = `${transactionDates.getDate()}`.padStart(2, 0);
  let month = `${transactionDates.getMonth()}`.padStart(2, 0);
  let year = transactionDates.getFullYear();
  content = `${day}/${month}/${year}`;
  return content;
};

let implimentLogin = (real) => {
  currentAccount = real.find((acc) => user.value === acc?.username);
  if (+password.value === currentAccount?.pin) {
    amountRecieved(currentAccount.movements);
    displayMovement(currentAccount.movements);
    totalBalance(currentAccount);
    let ola = currentAccount.owner
      .split(" ")
      .splice(0, 1)
      .map((a) => a.toUpperCase()[0][0]);
    let second = currentAccount.owner.split(" ")[0].slice(1);
    let all = ola.concat(second).join("");
    welcomeMessage.textContent = `Welcome Onboard, ${all}`;
    body.style.display = "block";
    dates.textContent = `As at ${computeDates()}`;
    interval();
  }
};

enter.addEventListener("click", (e) => {
  implimentLogin(accounts);
  password.value = user.value = "";
});

transfer.addEventListener("click", () => {
  let transferAmountto = +transAmount.value;
  let cur = accounts.find((acc) => acc.username === receiver.value);
  if (
    cur?.username &&
    currentAccount.username !== cur.username &&
    transferAmountto <= currentAccount.totalAmount
  ) {
    currentAccount.movements.push(-transferAmountto);
    cur.movements.push(transferAmountto);
    updateUi(currentAccount);
  } else {
    alert("error");
  }
  clearInput(tf);
  console.log(transferAmountto);
});

let updateUi = (acc) => {
  amountRecieved(acc.movements);
  displayMovement(acc.movements);
  totalBalance(acc);
};

closeBtn.addEventListener("click", () => {
  if (
    confirmUser.value === currentAccount.username &&
    +confirmPin.value === currentAccount.pin
  ) {
    let index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    body.style.display = "none";
    clearInput(clearClose);
  }
});
loanBtn.addEventListener("click", () => {
  let lAmount = +loanAmount.value;
  setTimeout(() => {
    currentAccount.movements.push(lAmount);
    updateUi(currentAccount);
  }, 2000);

  clearLoan.value = "";
  console.log(lAmount);
});
let sorted = false;
sort.addEventListener("click", () => {
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

let time = 10;

let interval = setInterval(() => {
  let min = String(Math.trunc(time / 60)).padStart(2, 0);
  let sec = String(time % 60).padStart(2, 0);
  timeout.textContent = `${min}:${sec}`;
  if (time < 1) {
    body.style.display = "none";
    clearInterval(interval);
  }
  time--;
}, 1000);
