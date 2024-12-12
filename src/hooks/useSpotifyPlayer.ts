import axios from "axios";
import { TrackToPlay } from "parth_ui/components/SpotifyPlayer/types";
import { useCallback, useEffect, useState } from "react";

interface UseSpotifyPlayerParams {
  playListId?: string;
  clientId: string;
  redirectUrl?: string;
  spotifyAccessToken?: string | null;
  afterLoginRedirectTo?: string;
}

interface SongFrameParams {
  ref: React.RefObject<HTMLElement>;
  tracks?: TrackToPlay[];
  trackId?: string | null;
  append?: boolean;
  className?: string;
  style?: { [key: string]: string };
}

export const useSpotifyPlayer = ({
  clientId,
  playListId,
  redirectUrl,
  afterLoginRedirectTo,
  spotifyAccessToken = null,
}: UseSpotifyPlayerParams) => {
  const spotifyLoginEndPoint = "https://accounts.spotify.com/authorize";
  const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ];

  const [isSpotifyAPIReady, setIsSpotifyAPIReady] = useState<boolean>(false);

  if (spotifyAccessToken)
    localStorage.setItem("accessToken", spotifyAccessToken);

  const loginUrl = `${spotifyLoginEndPoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  const loginTheUser = () => {
    console.log(loginUrl);
    if (!redirectUrl) {
      console.error(
        "Redirect URL is not provided, Hence Redirected to current domain"
      );
      // @ts-ignore
      window.location = `${window.location.hostname}:${window.location.port}`;
    }
    // @ts-ignore
    window.location = loginUrl;
  };

  // @ts-ignore
  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const hashString = hash.toString();
    const paramsUrl = hashString.split("&");
    // @ts-ignore
    const paramsSplitUp = paramsUrl.reduce((accumulator, currentValue) => {
      const [key, value] = currentValue.split("=");
      // @ts-ignore
      accumulator[key.replace("#", "")] = value;
      return accumulator;
    }, {});
    return paramsSplitUp;
  };

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      localStorage.setItem(
        "issuedAt",
        Math.floor(Date.now() / 1000).toString()
      );
      window.location.href = afterLoginRedirectTo || "/";
    }
  }, [window.location]);

  useEffect(() => {
    // @ts-ignore
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      // @ts-ignore
      window.SpotifyIframeAPI = IFrameAPI;
      setIsSpotifyAPIReady(true);
    };

    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    script.onload = () => {
      console.log("Spotify script loaded successfully");
    };
    script.onerror = (error) => {
      console.error("Failed to load Spotify script", error);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      // @ts-ignore
      window.onSpotifyIframeApiReady = null;
      // @ts-ignore
      window.SpotifyIframeAPI = null;
    };
  }, []);

  const fetchPlaylists = () => {
    const accessToken = localStorage.getItem("accessToken");
    return axios.get("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const fetchPlayListTracks = () => {
    console.log(!playListId);
    const accessToken = localStorage.getItem("accessToken");
    if (!playListId) {
      console.error("Please Provide Spotify Playlist ID");
      return;
    }
    if (!accessToken) {
      console.error("Please Provide Spotify AccessToken or Login with Spotify");
      return;
    }
    return axios.get(
      `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  const fetchTrackDetails = (trackId: string) => {
    const accessToken = localStorage.getItem("accessToken");
    return axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken} `,
      },
    });
  };

  const getSongToPlay = (trackId: string | null, tracks: TrackToPlay[]) => {
    console.log(trackId, tracks.length);
    console.log(!trackId && !tracks.length);
    if (!trackId && !tracks.length) {
      throw "Unable to play the song: A valid Track ID is required to play a specific track. Alternatively, provide a list of tracks to play a random selection.";
    }
    if (trackId) return trackId;
    const index = Math.floor(Math.random() * (tracks.length - 0) + 0);
    const song = tracks[index];
    console.log(song);
    return song?.track?.id;
  };

  const getSongFrame = ({
    ref,
    tracks = [],
    trackId = null,
    append = false,
    style = {},
    className = "",
  }: SongFrameParams) => {
    let song = null;
    try {
      song = getSongToPlay(trackId, tracks);
    } catch (error) {
      console.error(error);
    }
    if (!song) {
      return;
    }

    if (ref.current) {
      const element = document.createElement("iframe");
      element.setAttribute(
        "src",
        `https://open.spotify.com/embed/track/${song}?autoPlay=1`
      );
      element.setAttribute("width", "100%");
      element.setAttribute("height", "380px");
      element.setAttribute("frameBorder", "0");
      element.setAttribute("allowFullScreen", "true");
      element.setAttribute(
        "style",
        Object.entries(style)
          .map(([key, value]) => {
            const cssKey = key.replace(
              /[A-Z]/g,
              (match) => `-${match.toLowerCase()}`
            );
            return `${cssKey}: ${value}`;
          })
          .join("; ")
      );
      element.setAttribute(
        "allow",
        "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      );
      element.setAttribute("class", className);
      if (!append) ref.current.innerHTML = "";
      ref.current.appendChild(element);
    }
  };

  return {
    loginTheUser,
    fetchPlayListTracks,
    fetchTrackDetails,
    fetchPlaylists,
    getSongFrame,
  };
};
