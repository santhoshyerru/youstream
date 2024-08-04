// export const YOUTUBE_API_KEY = "AIzaSyCcoFmkyqPRn6U7fKoHSgnsnhXTdxFps1U";
export const YOUTUBE_API_KEY = "AIzaSyB0oaBrLPQ9Pl3UKb4VBCmDamPOra-n6dk";
export const YOUTUBE_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" +
  YOUTUBE_API_KEY;
export const YOUTUBE_SEARCH_SUGGESTIONS_API =
  "https://corsproxy.io/?http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
export const YOUTUBE_CHANNEL_API = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&key=${YOUTUBE_API_KEY}&id=`;
export const YOUTUBE_BUTTON_API = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=${YOUTUBE_API_KEY}&q=`;
export const YOUTUBE_VIDEO_STATS = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&key=${YOUTUBE_API_KEY}&id=`;
export const OFFSET_LIVE_CHAT = 25;
export const YOUTUBE_SEARCH_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=AIzaSyB0oaBrLPQ9Pl3UKb4VBCmDamPOra-n6dk&q=";
// //
// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json
