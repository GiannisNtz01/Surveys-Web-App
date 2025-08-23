export const SWRconfig = {
  onErrorRetry: (error, key, config, mutate, { retryCount }) => {
    if (error?.status === 404) return;
    if (retryCount >= 2) return;
    setTimeout(() => mutate({ retryCount: retryCount + 1 }), 5000);
  },
};
