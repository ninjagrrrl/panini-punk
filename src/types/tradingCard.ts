export type Song = {
  title: string;
  artist: string;
  spotifyEmbedUrl: string;
};

export type TradingCard = {
  id: string;
  bandName: string;
  style: string;
  influentialAlbum: string;
  countryOfOrigin: string;
  yearsActive: string;
  imageUrl: string;
  song?: Song;
};
