import { Navigate } from "react-router-dom";
import navigationPaths from "./navigationPaths";
import UnauthorizedRoute from "utils/UnauthorizedRoute";
import AuthorizedRoute from "utils/AuthorizedRoute";
import Login from "pages/Onboarding/Login/Login";
import UserSurvey from "pages/UserSurvey/UserSurvey";
import FullWidthLayout from "layouts/FullWidthLayout";
import AppBanner from "components/AppBanner/AppBanner";
import AdminSurveyCreation from "pages/AdminSurveyCreation/AdminSurveyCreation";
import Dashboard from "pages/Dashboard/Dashboard";
import AdminViewSurvey from "pages/AdminViewSurvey/AdminViewSurvey";
import ProtectedRoleRoute from "utils/ProtectedRoleRoute";
import { roleTypes } from "types/roleTypes";

const routes = [
  {
    path: navigationPaths.login,
    element: <UnauthorizedRoute component={<Login />} />,
  },
  {
    path: navigationPaths.home,
    element: (
      <AuthorizedRoute>
        <AppBanner />
        <FullWidthLayout />
      </AuthorizedRoute>
    ),
    children: [
      {
        path: navigationPaths.home,
        element: <Dashboard />,
      },
      {
        element: <ProtectedRoleRoute role={roleTypes.USER} />,
        children: [
          {
            path: navigationPaths.userAnswerSurvey + "/:id",
            element: <UserSurvey />,
          },
        ],
      },
      {
        element: <ProtectedRoleRoute role={roleTypes.ADMIN} />,
        children: [
          {
            path: navigationPaths.adminViewSurvey + "/:id",
            element: <AdminViewSurvey />,
          },

          {
            path: navigationPaths.adminSurveyCreation,
            element: <AdminSurveyCreation />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={navigationPaths.home} />,
  },
];

export default routes;
