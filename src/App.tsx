import { useState, useEffect, useCallback } from "react";

import style from "./app.module.scss";
import Input from "./components/Input/index";
import MovieCard from "./components/MovieCard/index";
import { MovieCardProps, APIResponse } from "./types";
import useFetch from "./hooks/useFetch";
import Spinner from "./components/Spinner";

function App() {
  const { API_KEY } = process.env;
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Array<MovieCardProps>>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const { data, error, isLoading } = useFetch<APIResponse>(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${activePage}&include_adult=false&query=${search}`,
    search
  );
  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    setSearch(e.currentTarget.value);
  }

  const handleResults = useCallback(() => {
    const pagesArray = [];
    if (data != null) {
      const newData = data.results
        .filter((res: any) => res.poster_path != null)
        .map((res: any) => {
          return {
            title: res.original_title,
            year: res.release_date,
            image: `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${res.poster_path}`
          };
        });

      (() => {
        for (let i = 0; i < data.total_pages; i++) {
          pagesArray.push(i + 1);
        }
      })();
      setPages(pagesArray);
      setResults(newData);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      handleResults();
    }
  }, [data, handleResults]);

  return (
    <>
      <div className={style.header}>
        <h1 className={style.title}>Buscador de películas</h1>

        <Input
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
          type="text"
          placeholder="Buscá tu película..."
        />
        {!!results.length && <h2>Resultados</h2>}
      </div>
      <div className={style.btnContainer}>
        {!!results.length &&
          pages.map((page: number, key: number) => {
            return (
              <button
                className={`${style.btn}  ${
                  page === activePage && style.activePage
                }`}
                key={key}
                onClick={() => setActivePage(page)}
              >
                {page}
              </button>
            );
          })}
      </div>
      <div>
        {!results.length && search && !isLoading && (
          <p style={{ textAlign: "center" }}>
            No hay resultados para el término <strong>{search}</strong>
          </p>
        )}
      </div>
      {isLoading && search && (
        <div style={{ textAlign: "center" }}>
          <Spinner />
        </div>
      )}
      {
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
        </section>
      }
    </>
  );
}

export default App;
