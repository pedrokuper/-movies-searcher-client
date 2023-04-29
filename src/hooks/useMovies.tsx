import { useEffect, useState } from "react";

type Movie = {
  title: string;
  year: string;
  image: string;
};

const useMovies = (searchTerm: string, apiKey: string): Movie[] => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${searchTerm}`;

      const data = await fetch(URL);
      const { results } = await data.json();

      const newData = results
        .filter((res: any) => res.poster_path != null)
        .map((res: any) => {
          return {
            title: res.original_title,
            year: res.release_date,
            image: `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${res.poster_path}`
          };
        });

      setMovies(newData);
    };

    if (searchTerm) {
      setTimeout(() => {
        fetchMovies();
      }, 2000);

      return () => clearTimeout(fetchMovies);
    }
  }, [searchTerm, apiKey]);

  return movies;
};

export default useMovies;
