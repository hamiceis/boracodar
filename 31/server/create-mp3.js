import ffmpegStatic from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'

export const createMp3 = () => new Promise((resolve, reject) => {
  // Dizer fluent-ffmpeg aonde está FFmpeg
  ffmpeg.setFfmpegPath(ffmpegStatic)

  //  Rodar o FFmpeg
  ffmpeg()

  //arquivo que você deseja importar 
  .input('audio.mp4')

  // Opções de saida Bit rate
  .outputOptions('-ab', '20k')

  //
  .saveToFile('audio.mp3')

  // ("on" obersavndo) e  Callback Quando ffmpeg finalizar o processo 
  .on('end', () => {
    console.log('Audio convertido com sucesso')
    resolve()
  })

  .on('error', (error) => {
    console.log('[FFmpeg_CONVERSION_ERROR]', error)
    reject()
  })
})