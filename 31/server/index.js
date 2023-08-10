import express from "express"
import cors from 'cors'
import { donwloader } from "./download-video.js"
import { createMp3 } from "./create-mp3.js"

const app = express()
app.use(cors())
app.use(express.json())



app.get("/audio", async (req, res) => {
  //pega da URL o query params: http://...:3333/audio?v=id = id
  const videoId = req.query.v
  try {
    //downaload  
    await donwloader(videoId)

    // converte o arquivo de mp4 para mp3
    await createMp3()


    return res.send('OK') // se tudo de certo retorna ums message de 'OK'
  } catch (error) {
    console.log('[ROUTE_GET_ERROR]', error)
    return res.send(error)
  }
})

app.listen(3333, () => console.log('Server is running'))