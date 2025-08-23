import { Navigate } from "react-router-dom";

import useAuthUser from "context/useAuthUser";
import AppBanner from "../components/AppBanner/AppBanner";
import Unauthorized from "layouts/Unauthorized";
import navigationPaths from "configs/navigationPaths";

const UnauthorizedRoute = ({ component }) => {
  const { isLoggedIn, loading } = useAuthUser();

  if (!loading && isLoggedIn) {
    return <Navigate to={navigationPaths.home} />;
  }

  return (
    <>
      <AppBanner />
      <Unauthorized>{component}</Unauthorized>
    </>
  );
};

export default UnauthorizedRoute;
