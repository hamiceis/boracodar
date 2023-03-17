const pass = document.getElementById('password')
const img = document.querySelector('.eye-close')

function togglePasswordVisibility(passInput, imgElement) {
  const isPasswordHidden = passInput.type === 'password';
  if (isPasswordHidden) {
    passInput.type = 'text';
    imgElement.src = './assets/eye-on.svg';
    imgElement.alt = 'Hide password';
  } else {
    passInput.type = 'password';
    imgElement.src = './assets/eye-off.svg';
    imgElement.alt = 'Show password';
  }
}


img.addEventListener('click', () => {
  togglePasswordVisibility(pass, img)
})