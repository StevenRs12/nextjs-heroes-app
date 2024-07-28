export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface HomeProps {
  characters: Character[];
  totalResults: number;
}

export interface Hero {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface Comic {
  id: number;
  title: string;
  description: string;
  dates: any[];
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface FilterProps {
  totalResults: number;
  onHandleFilter: (wordFilter: string) => void;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface CardCharacterProps {
  id: number;
  name: string;
  thumbnail: Thumbnail;
}
export interface HomeLayoutProps {
  characters: Character[];
  error: string | null;
  loading: boolean;
}