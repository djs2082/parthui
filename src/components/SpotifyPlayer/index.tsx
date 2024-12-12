import React, { useState, useEffect } from "react";
import { SpotifyEmbedController, Track, TrackToPlay } from "./types";

interface SpotifyPlayerProps {
  styles?: { [key: string]: string };
  className?: string;
  randomPlay: boolean;
  tracks: TrackToPlay[];
  trackToPlay: TrackToPlay;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  styles,
  className,
  randomPlay = false,
  tracks = [],
  trackToPlay,
}) => {
  /* eslint-disable no-unused-vars */
  const [song, setSong] = useState<Track | null>(null);
  const [isSpotifyAPIReady, setIsSpotifyAPIReady] = useState<boolean>(false);

  useEffect(() => {
    // @ts-ignore
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      // @ts-ignore
      window.SpotifyIframeAPI = IFrameAPI;
      setIsSpotifyAPIReady(true);
    };
    let script = null;
    if (!(typeof window.SpotifyIframeApi === "undefined")) {
      script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.onload = () => {
        console.log("Spotify script loaded successfully");
      };
      script.onerror = (error) => {
        console.error("Failed to load Spotify script", error);
      };
      document.head.appendChild(script);
    } else {
      setIsSpotifyAPIReady(true);
    }
    return () => {
      if (script) document.head.removeChild(script);
      // @ts-ignore
      window.onSpotifyIframeApiReady = null;
      // @ts-ignore
      window.SpotifyIframeAPI = null;
    };
  }, []);

  useEffect(() => {
    let trackId = null;
    if (isSpotifyAPIReady) {
      if (trackToPlay) {
        trackId = trackToPlay.track.id;
      } else {
        // const songs = localStorage.getItem('tracks')
        // const parsed = JSON.parse(songs);
        const index = Math.floor(Math.random() * (tracks.length - 0) + 0);
        console.log(index, tracks.length);
        console.log(tracks[index]);
        // console.log(JSON.parse(JSON.stringify(tracks)));
        const song = tracks[index];
        trackId = song?.track?.id;
        console.log(song, trackId);
      }
    }

    console.log(trackId, tracks, isSpotifyAPIReady);

    if (isSpotifyAPIReady && trackId) {
      const embedIframeId = "embed-iframe";
      let embedElement = document.getElementById(embedIframeId);
      // @ts-ignore
      if (embedElement && window.SpotifyIframeAPI) {
        console.log(trackId);

        const options = {
          uri: `spotify:track:${trackId}`,
          height: "100%",
          autoPlay: "true",
          allow: ["encrypted-media"],
        };
        // @ts-ignore
        // if (trackId) {
        console.log(options);
        window.SpotifyIframeAPI.createController(
          embedElement,
          options,
          (EmbedController) => {
            console.log("LKJL");
            EmbedController.addListener("ready", () => {
              EmbedController.play();
              const clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
              });
              document.body.dispatchEvent(clickEvent);
            });
          }
        );
        // }
      }
    }
  }, [isSpotifyAPIReady, trackToPlay, tracks]);

  return (
    <div id="embed-wrapper" className={className} style={{ ...styles }}>
      <div id="embed-iframe"></div>
    </div>
  );
};
export default SpotifyPlayer;
