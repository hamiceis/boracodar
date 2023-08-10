import ytdl from "ytdl-core"; //Biblioteca para baixar videos do yt
import fs from 'fs'

export const donwloader = (videoId) => new Promise((resolve, reject) => {
  const videoURL = 'https://youtube.com/watch?v=' + videoId;
  console.log('[START_DOWNLOAD]', videoURL)

  // (URL DO VIDEO DO YT, OBJ com as configs)
  ytdl(videoURL, {
    quality: 'lowestaudio', //qualidade
    filter: 'audioonly'     //filtragem 
  }).on('end', () => {       //Quando terminar execute uma função
    console.log('[FINISHED_DOWNLOAD')
    resolve()
  }).on('error', () => {    // Se ocorrer um error execute essa função
    console.log('[ERROR_DOWNLOAD]')
    reject('[ERROR_DOWNLOAD_VIDEO]');
  }).pipe(fs.createWriteStream('audio.mp4'))   
  //Pipe é onde vamos salvar o arquivo, coloquei para escrever um arquivo no formato mp4
})




// outra maneira de fazer a mesma coisa a cima

// function donwloader(videoId) {
//   return new Promise((resolve, reject) => {
//     const videoURL = `https://youtube.com/watch?v=${videoId}`
//     console.log('[START_DOWNLOAD]', videoId)

//     ytdl(videoURL, {
//       quality: 'lowestaudio',
//       filter: 'audioonly'
//     }).on('end', () => {
//       console.log('[FINISHED_DOWNLOAD]')
//       resolve();
//     })
//   })
// }