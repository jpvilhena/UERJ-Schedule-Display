export function MP4Player({ onVideoEnd }: { onVideoEnd?: () => void }) {
  return (
    <video
      src="/video/Televisão_IFCH.mp4"
      autoPlay
      muted
      playsInline
      onEnded={onVideoEnd}
      style={{ width: "100%", maxHeight: "100%", justifyContent:"center"}}
    />
  );
}