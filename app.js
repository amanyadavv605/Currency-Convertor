const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

dropdowns.forEach((select) => {
  for (CurrCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = CurrCode;
    newOption.innerText = CurrCode;
    if (select.name === "from" && CurrCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && CurrCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
});

addEventListener("change", (evt) => {
  updateFlag(evt.target);
});

const updateFlag = (element) => {
  let CurrCode = element.value;
  let countryCode = countryList[CurrCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmt = (amtVal * rate).toFixed(2);

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};

window.addEventListener("load", () => {
  updateExchangeRate();
});
