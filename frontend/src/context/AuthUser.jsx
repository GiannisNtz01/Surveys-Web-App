import { useMemo, useCallback, createContext } from "react";
import { login as loginService } from "api/authApi";
import useAccountInfo from "data/useAccountInfo";
import { roleTypes } from "types/roleTypes";

export const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const { data: accountInfoData, loading, error, mutate } = useAccountInfo();

  const login = useCallback(async ({ username, password }) => {
    const response = await loginService({ username, password });
    return response;
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoggedIn: !error && Boolean(accountInfoData),
      isAdmin: accountInfoData?.role === roleTypes.ADMIN,
      isUser: accountInfoData?.role === roleTypes.USER,
      username: accountInfoData?.username,
      loading,
      mutateAccountInfo: mutate,
      login,
    }),
    [error, accountInfoData, loading, mutate, login]
  );

  return (
    <AuthUserContext.Provider value={contextValue}>
      {children}
    </AuthUserContext.Provider>
  );
};
