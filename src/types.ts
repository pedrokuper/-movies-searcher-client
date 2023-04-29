export type MovieCardProps = {
  image: string;
  title: string;
  year: string;
};

export type InputProps = {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export interface MovieResult {
  poster_path: string | null;
  original_title: string;
  release_date: string;
}

export interface APIResponse {
  results: MovieResult[];
  total_pages: number;
}
