import { useEffect, useState } from "react";
import Youtube from 'react-youtube';
import './YouTubePlayer.css'
import { getLatestVideoId } from "./YoutubePlayerCache";


export function YoutubePlayerComponent({ onVideoEnd }: {onVideoEnd?: () => void}) {
  const [videoId, setVideoID] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID as string;

  useEffect(() => {
    getLatestVideoId(API_KEY, CHANNEL_ID).then(setVideoID);
  }, [API_KEY, CHANNEL_ID]);

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

  if (!videoId) {
    return <div>Loading latest video...</div>;
  }

  return <Youtube videoId={videoId} opts={opts} onEnd={onVideoEnd} />;
}