import { useState, useEffect, useCallback } from "react";

type UseFetchResponse<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

export default function useFetch<T>(
  url: string,
  search: string
): UseFetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const json = await response.json();

      setData(json);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }, [url]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (url && search) {
        fetchData();
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [fetchData, url, search]);

  return {
    data,
    error,
    isLoading
  };
}
