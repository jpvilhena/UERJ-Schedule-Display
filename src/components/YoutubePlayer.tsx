import Youtube from 'react-youtube';
import './YouTubePlayer.css'

export function YoutubePlayerComponent({ onVideoEnd }: {onVideoEnd?: () => void}) {

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 1,
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
    },
  };
  
  return(
      <Youtube videoId='RP1RyjVlBek' opts={opts} onEnd={onVideoEnd} />
  );
}
