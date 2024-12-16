import { useEffect, useRef, useState } from "react";
import { useSpotifyPlayer } from "./../../hooks/useSpotifyPlayer";
import { SpotifyPlayer } from "../SpotifyPlayer";
const TestUseSpotifyPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [play, setPlay] = useState(false);

  const spotifySongPlayerRef = useRef<HTMLDivElement>(null);

  const spotifyPlayer = useSpotifyPlayer({
    playListId: "5iLgD55NtxGmVFvjy8Fhpl",
    clientId: "912ef809e5244d4394e52b7dfced0c92",
    redirectUrl: "http://localhost:3000",
  });
  const { fetchPlayListTracks, getSongFrame } = spotifyPlayer;

  useEffect(() => {
    fetchPlayListTracks()?.then((fetchedTracks) => {
      console.log(fetchedTracks);
      if (fetchedTracks) setTracks(fetchedTracks.data.items);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setPlay(true);
          getSongFrame({
            ref: spotifySongPlayerRef,
            tracks,
            style: {},
            className: "checking",
          });
        }}
      >
        Play The Song
      </button>
      <div ref={spotifySongPlayerRef}></div>
      {play && <SpotifyPlayer tracks={tracks} />}
    </div>
  );
};
export default TestUseSpotifyPlayer;
