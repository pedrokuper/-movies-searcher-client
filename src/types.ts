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
