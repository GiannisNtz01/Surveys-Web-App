import api from "./api";
import endpoints from "./endpoints";

export const createSurvey = (data) => {
  return api.post(endpoints.createSurvey, data);
};

export const userAnswerToSurvey = (id, data) => {
  return api.post(endpoints.userAnswerToSurvey(id), data);
};

export const adminSetSurveyAsCompleted = (id) => {
  return api.put(endpoints.adminSetSurveyAsCompleted(id));
};

export const adminExportSurveyStats = (id) => {
  return api.get(endpoints.adminSurveyExportStats(id), {
    responseType: "blob",
  });
};
