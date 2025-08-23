import { SWRConfig } from "swr";
import { useNavigate } from "react-router-dom";
import navigationPaths from "configs/navigationPaths";
import useAuthUser from "context/useAuthUser";

const SWRConfigCustom = ({ children }) => {
  const navigate = useNavigate();
  const { mutateAccountInfo } = useAuthUser();
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: async (err) => {
          if (err?.status === 401) {
            await mutateAccountInfo();
            navigate(navigationPaths.login, { replace: true });
          }
          return err?.status !== 404 && err?.status !== 401;
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigCustom;
