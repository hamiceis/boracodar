const buttonDetails = document.getElementById("btn-details")
const menuDetails = document.querySelector(".details-menu")
const retangleDetails = document.querySelector(".rantangle")
const iconHeart = document.querySelector(".heart")

buttonDetails.addEventListener('click', () => {
  menuDetails.style.transform = "translateY(0%)"
  menuDetails.style.visibility = "visible"
})

retangleDetails.addEventListener('click', () => {
  menuDetails.style.transform = "translateY(100%)"
})

iconHeart.addEventListener('click', () => {
  iconHeart.classList.toggle('checked')
})