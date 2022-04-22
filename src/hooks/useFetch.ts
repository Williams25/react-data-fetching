import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

export function useFetch<T = unknown>(
  url: string,
  options?: AxiosRequestConfig
) {
  const [response, setResponse] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const handleFetch = async () => {
    // fetch("https://api.github.com/users/Williams25/repos")
    //   .then((response) => response.json())
    //   .then((data) => setRepositories(data));
    setIsFetching(false);
    const { data } = await axios.get<T>(url, options);
    setResponse(data);
    setIsFetching(true);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return { response, isFetching };
}
