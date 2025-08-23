import useSWR from "swr";
import { fetcher } from "api/api";
import endpoints from "api/endpoints";

const useSurveyStats = (id) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? endpoints.adminSurveyStats(id) : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSurveyStats;
