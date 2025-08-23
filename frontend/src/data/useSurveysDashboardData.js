import useSWR from "swr";
import { fetcher } from "api/api";
import endpoints from "api/endpoints";

const useSurveysDashboardData = (isAdmin = true) => {
  const { data, error, isLoading } = useSWR(
    isAdmin ? endpoints.getAdminSurveys : endpoints.getUserSurveys,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useSurveysDashboardData;
