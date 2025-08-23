import { Navigate } from "react-router-dom";
import useAuthUser from "context/useAuthUser";
import navigationPaths from "configs/navigationPaths";
import { Outlet } from "react-router-dom";
import { roleTypes } from "types/roleTypes";

const ProtectedRoleRoute = ({ role = roleTypes.ADMIN, children }) => {
  const { isUser, isAdmin } = useAuthUser();

  const hasValidRole = role === roleTypes.ADMIN ? isAdmin : isUser;

  if (!hasValidRole) {
    return <Navigate to={navigationPaths.home} />;
  }

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoleRoute;
