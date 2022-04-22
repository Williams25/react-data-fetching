import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export type Repository = {
  full_name: string;
  description: string;
};

export const Repos = () => {
  const { data, isFetching } = useQuery<Repository[]>(
    "repositories",
    async () => {
      const { data } = await axios.get<Repository[]>(
        "https://api.github.com/users/Williams25/repos"
      );
      return data;
    },
    {
      staleTime: 1000 * 60, // 1min
    }
  );

  return (
    <div className="App">
      {isFetching ? (
        "carregando"
      ) : (
        <ul>
          {data &&
            data.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={`/repos/${item.full_name}`}>{item.full_name}</Link>
                  <p>{item.description}</p>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
