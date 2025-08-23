import useSWR from "swr";
import { fetcher } from "api/api";
import endpoints from "api/endpoints";

const useAccountInfo = () => {
  const { data, error, mutate } = useSWR(endpoints.getRole, fetcher);

  const loading = !data && !error;

  return {
    loading,
    error,
    data,
    mutate,
  };
};

export default useAccountInfo;
