const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg1 = document.querySelector(".msg1");
const msg2 = document.querySelector(".msg2");
const fromMsg = document.querySelector(".from-curr");
const toMsg = document.querySelector(".to-curr");

document.addEventListener("load", () => {
  exchangeFunc();
});

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
      fromMsg.innerText = currCode;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
      toMsg.innerText = currCode;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateImg(evt.target);
    exchangeFunc();
  });
}

const updateImg = (element) => {
  let currCode = element.value;
  let counCode = countryList[currCode];
  let newImgSrc = `https://flagsapi.com/${counCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newImgSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchangeFunc();
});

const exchangeFunc = async () => {
  let amount = document.querySelector(".amount input");
  let exchange = document.querySelector(".exchange-amount input");
  let amountVal = amount.value;
  let exchangeVal = exchange.value;
  if (amountVal == "" || amountVal < 1) {
    amountVal = 1;
    amount.value = 1;
  }
  if (exchangeVal == "" || exchangeVal < 1) {
    exchangeVal = 1;
    exchange.value = 1;
  }

  fromMsg.innerText = fromCurr.value;
  toMsg.innerText = toCurr.value;

  const URL = `${BASE_URL}${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amountVal * rate;
  exchange.value = finalAmount;
  exchangeVal = finalAmount;
  exchange.disabled = true;
  msg1.innerText = `1${fromCurr.value} equals`;
  msg2.innerText = `${rate}${toCurr.value}`;
};
