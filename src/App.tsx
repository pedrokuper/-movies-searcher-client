import { useState, useEffect } from "react";
import Input from "./components/Input/index";
function App() {
  const [search, setSearch] = useState("");
  //https://api.themoviedb.org/3/search/movie?api_key=07b5bfd0807671be96d74ea73e7d41b1&language=en-US&page=1&include_adult=false&query=harry%potter
  const { API_KEY } = process.env;
  function handleChange(e: React.FormEvent<HTMLInputElement>): void {
    setSearch(e.currentTarget.value);
  }

  useEffect(() => {
    async function fetchData(searchTerm: string) {
      const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`;

      const data = await fetch(URL);
      const json = await data.json();
      console.log(json);
    }
    if (search) {
      fetchData(search);
    }
  }, [search, API_KEY]);

  return (
    <>
      <h1>Buscador de películas</h1>
      <Input
        onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
        type="text"
      />
    </>
  );
}

export default App;
