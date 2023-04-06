const ccNumber = document.querySelector("#ccNumber")
const ccNumberPattern = {
  mask: "0000 0000 0000 0000"
}

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

IMask(ccNumber, ccNumberPattern)
IMask(cvv, cvvPattern)
IMask(ccValidity, validityPattern)