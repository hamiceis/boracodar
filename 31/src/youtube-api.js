import { loadingMessage } from "./loading";

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0]; //cria um tag no htm <script>
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // inserir no HTML o tag <script>

window.YTPlayer = null;

export function getVideoId(url) {
  const [part1, part2] = url.split('?v=') // transformar uma string em Array com um separador [part1=url, part2=id]
  const [videoId] = part2.split("&") // algumas URL possui no final "&", então garatimos o id
  return videoId;
}

export function loadVideo(url) {
  //Mostrar mensagem quando tiver carregando um video no HTML
  loadingMessage('Carregando video do Youtube')

  return new Promise((resolve, reject) => {
    //YT.Player(TagID, Obj{VideoId })
    window.YTPlayer = new YT.Player('youtubeVideo', {
    videoId: getVideoId(url),
      events: {
        'onReady': () => resolve()
      }
    })
  })
}