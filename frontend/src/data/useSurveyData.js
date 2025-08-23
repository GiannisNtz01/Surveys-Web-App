import useSWR from "swr";
import { fetcher } from "api/api";
import endpoints from "api/endpoints";

const useSurveyData = (id) => {
  const { data, error, isLoading,mutate } = useSWR(
    id ? `${endpoints.getSurvey}/${id}` : null,
    fetcher
  );

  const { surveyTitle, surveyContent, timesAnswered, status } = data || {}; 

  return {
    data,
    error,
    isLoading,
    surveyTitle,
    surveyContent,
    timesAnswered,
    status,
    mutate
  };
};

export default useSurveyData;
