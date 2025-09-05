let cachedVideoId: string | null = null;

export async function getLatestVideoId(API_KEY: string, CHANNEL_ID: string) {
  if (cachedVideoId) return cachedVideoId;
  console.log("Didn't have a cached videoID, fetching!");
  try{
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
    );
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      cachedVideoId = data.items[0].id.videoId;
    } 
  } catch (error) {
    console.error("Error fetching latest youtube video:", error)
  }

  return cachedVideoId;
}