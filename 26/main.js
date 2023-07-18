const btnLess = document.getElementById("less");
const btnPlus = document.getElementById("plus");
const counter = document.querySelector("#counter");

let num = Number(counter.textContent);

const formatNum = (num) => num < 10 ? `0${num}` : num;

btnLess.addEventListener("click", () => {
  if (num <= 1) {
    return;
  }
  num--;
  counter.innerText = formatNum(num);
});

btnPlus.addEventListener("click", () => {
  if (num > 99) {
    return;
  }
  num++;
  counter.innerText = formatNum(num);
});
