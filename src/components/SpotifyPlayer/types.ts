interface ExternalUrls {
  spotify: string;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

interface Image {
  url: string;
  width: number;
  height: number;
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: "album";
  uri: string;
}

interface ExternalIds {
  isrc: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
}

export interface TrackToPlay {
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: any;
  track: Track;
}

export interface SpotifyEmbedController {
  /**
   * Play the current track
   */
  play(): void;

  /**
   * Pause the current track
   */
  pause(): void;

  /**
   * Load and play a new track
   * @param uri - Spotify track URI
   */
  loadUri(uri: string): void;

  /**
   * Get the current track's metadata
   */
  getCurrentTrack(): {
    uri: string;
    name: string;
    artist: string;
    album: string;
  };

  /**
   * Add an event listener for controller events
   * @param event - The event type to listen for
   * @param callback - Function to call when the event occurs
   */
  addListener(
    event: "ready" | "playbackchange" | "error",
    callback: (event: any) => void
  ): void;

  /**
   * Remove an event listener
   * @param event - The event type to remove
   * @param callback - The specific callback to remove
   */
  removeListener(
    event: "ready" | "playbackchange" | "error",
    callback: (event: any) => void
  ): void;

  /**
   * Get the current playback state
   */
  getPlaybackState(): {
    isPaused: boolean;
    position: number;
    duration: number;
  };
}
