// Selecionar elementos do DOM
const input = document.querySelector('input');
const button = document.querySelector('button');
const nameElement = document.querySelector("#name");
const photoElement = document.querySelector('#photo');
const iconeSucess = document.querySelector(".details > img");
const labelElement = document.querySelector("label");
const errorElement = document.querySelector('#error');


// Função para construir a URL da API do GitHub
const getGitHubAPIUrl = (username) => `https://api.github.com/users/${username}`;

// Função para exibir os dados do usuário no DOM
const displayUserData = ({ name, avatar_url }) => {
  nameElement.innerText = name;
  photoElement.src = avatar_url;
  iconeSucess.style.display = 'block'
  labelElement.innerText = "Ticket gerado com sucesso"
};

// Adicionar um ouvinte de eventos para o botão
button.addEventListener('click', async () => {
  const username = input.value;
  
  if (username === '') {
    errorElement.style.display = 'block';
    return;
  }

  try {
    const response = await fetch(getGitHubAPIUrl(username));

    if (!response.ok) {
      throw new Error('Usuário não encontrado');
    }

    const data = await response.json();
    errorElement.style.display = 'none';
    displayUserData(data);

    button.outerHTML = `<a id="downloadTicket">Fazer Download</a>`

    const downloadButton = document.querySelector('#downloadTicket');
    downloadButton.addEventListener('click', downloadTicketImage);
    input.value = '';

  } catch (error) {
    errorElement.style.display = 'block';
    console.error(error.message);
  }
});


const downloadTicketImage = async () => {
  const ticketElement = document.querySelector('.ticket');
  
  try {
    const canvas = await html2canvas(ticketElement);
    
    // Converta o canvas em uma imagem
    const ticketImage = canvas.toDataURL('image/jpg');
    
    // Crie um link para fazer o download da imagem
    const downloadLink = document.createElement('a');
    downloadLink.href = ticketImage;
    downloadLink.download = 'ticket.jpg';
    
    // Clique automaticamente no link para iniciar o download
    downloadLink.click();
  } catch (error) {
    console.error(error.message);
  }
};

// Adicione um ouvinte de eventos para o botão de download



