import { useState, useEffect, useMemo } from "react";
import style from "./app.module.scss";
import Input from "./components/Input/index";
import MovieCard from "./components/MovieCard/index";
function App() {
  const { API_KEY } = process.env;
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    setSearch(e.currentTarget.value);
  }

  const fetchData = async (searchTerm: string) => {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`;

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

    setResults(newData);
  };

  useEffect(() => {
    if (search) {
      setTimeout(() => {
        fetchData(search);
      }, 2000);

      return () => clearTimeout(fetchData);
    }
  }, [search, API_KEY]);

  return (
    <>
      <h1>Buscador de películas</h1>
      <Input
        onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
        type="text"
        placeholder="Buscá tu película..."
      />
      {!!results.length && <h2>Resultados</h2>}
      <section className={style.section}>
        {results.map((movie: any, key: number) => {
          return (
            <MovieCard
              key={key}
              title={movie.title}
              year={new Date(movie.year).getFullYear().toString()}
              image={movie.image}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
