const endpoints = {
  login: "/login",
  register: "/register",
  logout: "/logout",
  createSurvey: "/admin/surveys",
  getAdminSurveys: "/admin/surveys",
  getUserSurveys: "/user/surveys",
  getSurvey: "/surveys",
  getRole: "/role",
  adminSurveyExportStats: (survey_id) => `/admin/surveys/${survey_id}/export`,
  userAnswerToSurvey: (survey_id) => `user/surveys/${survey_id}/answer`,
  userCanAnswerToSurvey: (survey_id) => `user/surveys/${survey_id}/can-answer`,
  adminSurveyStats: (survey_id) => `admin/surveys/${survey_id}/stats`,
  adminSetSurveyAsCompleted: (survey_id) =>
    `admin/surveys/${survey_id}/complete`,
};

export default endpoints;
