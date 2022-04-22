import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "./Repos";

export const Repo = () => {
  const params = useParams();
  const currentParams = params["*"] as string;

  const queryClient = useQueryClient();

  const handleUpdateDescription = async () => {
    // await queryClient.invalidateQueries(["repositories"]);
    // pega a lista de repositorios
    const previousRepo = queryClient.getQueryData<Repository[]>("repositories");

    // atualiza a lista de repositorios sem precisar realizar uma chamada http
    if (previousRepo) {
      const nextRepos = previousRepo?.map((repo) => {
        if (repo.full_name === currentParams) {
          return {
            ...repo,
            description: "Testando",
          };
        } else {
          return repo;
        }
      });

      queryClient.setQueryData("repositories", nextRepos);
    }
  };

  return (
    <div>
      <h1>{currentParams}</h1>;
      <button onClick={handleUpdateDescription}>Alterar descrição</button>
    </div>
  );
};
