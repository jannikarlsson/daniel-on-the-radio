import { IChannelMap } from "../models/interfaces";

// Map of channel IDs to channel names
// Channels added to the array will be used in the aggregated song list
// The channel ID can be found in the docs https://api.sr.se/api/documentation/v2/metoder/kanaler.html
export const channels: IChannelMap = {
    2562: 'P2 Musik',
    207: 'P4 Malmöhus',
    211: 'P4 Kristianstad',
    164: 'P3',
    163: 'P2',
    132: 'P1'
  }

  // Items added to the artist filter are used to filter wanted artists from the aggregated song list
  // The filter checks if the artist or title contains any of the strings in this array
  export const artist = ['Daniel Hansson', 'Daniel (Sv) (1) Hansson', 'Akademiska Kören (Malmö)', 'Malmö Högskola', 'Akademiska Kören & Orkestern (Malmö)', 'Akademiska Orkestern (Malmö)']