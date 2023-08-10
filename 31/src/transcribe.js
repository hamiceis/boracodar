import { pipeline } from '@xenova/transformers';
import { loadingMessage } from "./loading";


let data = null

export async function transcribeAudio() {
  const options = {
    chunk_length_s: 30, // a cada 30 segundos vai fazer uma quebra de texto
    stride_length_s: 5, // 
    language: 'portuguese', // idioma de transcrição
    task: 'transcribe',     // tarefa que ele vai realizar é "transcrição", poderia colocar de translate de tradução;
    return_timestamps: true  // timestamp é tempo de cada texto do audio
  }

  try {
    console.time();
    loadingMessage('Iniciando a transcrição de áudio, pode demorar bastante.... aguarde')
    console.log('[START_TRANSCRIBE]')

    // pipeline é uma função assicrone que recebe como argumentos (ferramenta, motor da ferramenta)
    const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small')
    
    // transcriber deve receber o local do arquivo e as opções de transcrição de texto
    data = await transcriber('../audio.mp3', options)

  } catch(error) {
    console.log('[TRANSCRIBE_ERROR]', error)
    throw new Error(error)

  } finally {
    console.timeEnd()

    loadingMessage('Transcrição finalizada')
    console.log('[STOP_TRANSCRIBE]')

    return data
  }

}