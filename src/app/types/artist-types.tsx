export interface Artist {
    id: string;
    name: string;
    images: { url: string }[];
    genres: string[];
    followers: { total: number };
  }
  