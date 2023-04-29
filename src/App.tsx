import { useState, useEffect, useCallback } from "react";

import style from "./app.module.scss";
import Input from "./components/Input/index";
import MovieCard from "./components/MovieCard/index";
import { MovieCardProps } from "./types";

function App() {
  const { API_KEY } = process.env;
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Array<MovieCardProps>>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>(1);

  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    setSearch(e.currentTarget.value);
  }

  //TODO Move fetch to customHook

  const fetchData = useCallback(async () => {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${activePage}&include_adult=false&query=${search}`;
    const data = await fetch(URL);
    const { results, total_pages } = await data.json();
    const pagesArray = [];

    (() => {
      for (let i = 0; i < total_pages; i++) {
        pagesArray.push(i + 1);
      }
    })();

    setPages(pagesArray);

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
  }, [search, API_KEY, activePage]);

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
      <div>
        <h1>Buscador de películas</h1>
        <Input
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
          type="text"
          placeholder="Buscá tu película..."
        />
        {!!results.length && <h2>Resultados</h2>}
      </div>
      <div>
        {pages.map((page: number, key: number) => {
          return (
            <button key={key} onClick={() => setActivePage(page)}>
              {page}
            </button>
          );
        })}
      </div>
      <section className={style.section}>
        {(results as MovieCardProps[]).map(
          (movie: MovieCardProps, key: number) => {
            return (
              <MovieCard
                key={key}
                title={movie.title}
                year={movie.year}
                image={movie.image}
              />
            );
          }
        )}

        {<MovieCard />}
      </section>
    </>
  );
}

export default App;
