import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import FullScreenLoadingScreen from "components/FullScreenLoadingScreen/FullScreenLoadingScreen";
import useAuthUser from "context/useAuthUser";
import navigationPaths from "configs/navigationPaths";

const AuthorizedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuthUser();

  const [showLoading, setShowLoading] = useState(loading);

  useEffect(() => {
    setShowLoading(loading);
  }, [loading]);

  if (showLoading) return <FullScreenLoadingScreen />;


  if (!isLoggedIn && !showLoading) {

    return <Navigate to={navigationPaths.login} />;
  }

  return <>{children}</>;
};

export default AuthorizedRoute;
