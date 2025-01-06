export interface Artist {
    name: string;
    images: { url: string }[];
    genres: string[];
    followers: { total: number };
  }
  