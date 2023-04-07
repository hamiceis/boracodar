const cardNumber = document.querySelector(".front .middle-card");
const cardHolder = document.querySelector("#ccHolder");

function reset() {
  ccNumber.value = ""
  ccValidity.value = ""
  ccHolder.value = ""
  cvv.value = ""
}

/*função para atualizar imagem do cartão */

function setCardType(type) {
  const ccLogo = document.querySelector(".header-card > img:nth-child(1)")
  ccLogo.src = `./assets/${type}.svg`
}

/* ---------------------------------------------------*/

const ccNumber = document.querySelector("#ccNumber")
const ccNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "elo",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundMask = dynamicMasked.compiledMasks.find((item) => {
      return number.match(item.regex);
    });
    return foundMask;
  },
};

const cvv = document.querySelector("#cc-cvv")
const cvvPattern = {
  mask: "0000"
}

const ccValidity = document.querySelector("#cc-validity")
const validityPattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  }
}

const cardNumberMasked = IMask(ccNumber, ccNumberPattern)
const securityCodeMasked = IMask(cvv, cvvPattern)
const expirationDateMask = IMask(ccValidity, validityPattern)


/*Lógica para alterar o nome do cliente */

cardHolder.addEventListener('input', () => {
  const ccHolder = document.querySelector(".front .bottom .ccName");
  ccHolder.innerText = cardHolder.value.length > 0 ? cardHolder.value : "FULANO DA SILVA"
  console.log(ccHolder.innerText)
})


/* Lógica para alterar o número do cartão */

function updateNumberCard(number) {
  const ccNumber = document.querySelector(".front .middle-card")
  ccNumber.textContent = number.length > 0 ? number : "1234 5678 9101 2345"
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardType;
  setCardType(cardType);
  updateNumberCard(cardNumberMasked.value)
})

/*Atualizando código de segurança */

function updateSecurityCode(cvv) {
  const ccSecurity = document.querySelector(".back .cvv")
  ccSecurity.innerText = cvv.length > 0 ? cvv : "123"
}

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value);
})

/*Atualizando data de validade do cartão */


function expirationDateCard(date) {
  const ccValidaty = document.querySelector(".expirationDate")
  ccValidaty.innerText = date.length === 0 ? "01/23" : date
}

expirationDateMask.on("accept", () => {
  expirationDateCard(expirationDateMask.value)
  
})


/* Quando o input do cvv estiver em Focus, ele rotacionar  */

cvv.addEventListener("focus", () => {
  const front = document.querySelector("#credit-card .front")
  const back = document.querySelector("#credit-card .back")

  front.style.transform = `rotateY(180deg)`
  back.style.transform = `rotateY(0)`
})

/* Quando o input do cvv não estiver mais em Focus, ele rotacionar para o padrão*/

cvv.addEventListener('blur', () => {
  const front = document.querySelector('#credit-card .front');
  const back = document.querySelector('#credit-card .back');

  front.style.transform = 'rotateY(0)';
  back.style.transform = 'rotateY(180deg)';
});


/* criando funcionalidade de button */

const button = document.querySelector("form")

button.addEventListener('submit', (e) => {
  e.preventDefault()
  alert("Cartão adicionado com sucesso!")
  reset()
})






