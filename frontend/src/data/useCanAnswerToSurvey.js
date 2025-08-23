import useSWR from "swr";
import { fetcher } from "api/api";
import endpoints from "api/endpoints";

const useCanAnswerToSurvey = (id) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? endpoints.userCanAnswerToSurvey(id) : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCanAnswerToSurvey;
