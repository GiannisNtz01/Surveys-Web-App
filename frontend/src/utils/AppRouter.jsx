import routes from "../configs/routes";
import { useRoutes } from "react-router-dom";

const AppRouter = () => {

  const allPages = useRoutes(routes);
  
  return <>{allPages}</>;
};

export default AppRouter;
