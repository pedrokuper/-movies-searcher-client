import { useState, useEffect, useCallback } from "react";

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

  //TODO Move fetch to customHook
  //TODO - Add language selector for search terms

  const fetchData = useCallback(async () => {
    console.log("fetchData called with searchTerm:", search);

    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`;
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
    console.log("fetchData executed");
  }, [search, API_KEY]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [fetchData, search]);

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
