import { useSpotifyPlayer } from "parth_ui/hooks/useSpotifyPlayer";
import React, { Children, createContext, useContext } from "react";
import { redirect } from "react-router-dom";

const spotifyPlayerContext = createContext<any>(null);

interface SpotifyPlayerProviderType {
  children: React.ReactNode;
  playListId: string;
  clientId: string;
  redirectUrl: string;
}

export const SpotifyPlayerProvider = ({
  children,
  playListId,
  clientId,
  redirectUrl,
}: SpotifyPlayerProviderType) => {
  const spotifyPlayer = useSpotifyPlayer({
    clientId,
    playListId,
    redirectUrl,
  });
  return (
    <spotifyPlayerContext.Provider value={spotifyPlayer}>
      {children}
    </spotifyPlayerContext.Provider>
  );
};

export const useSpotifyPlayerContext = () => {
  const context = useContext(spotifyPlayerContext);
  if (!context) {
    throw new Error(
      "useSpotifyPlayerContext must be used within a SpotifyPlayerProvider"
    );
  }
  return context;
};
