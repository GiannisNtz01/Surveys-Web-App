import { useParams, Navigate } from "react-router-dom";

import SurveyForm from "components/Forms/SurveyForm/SurveyForm";
import useSurveyData from "data/useSurveyData";
import navigationPaths from "configs/navigationPaths";
import Chip from "@mui/material/Chip";
import WidgetSkeleton from "components/WidgetSkeleton/WidgetSkeleton";
import { userAnswerToSurvey } from "api/surveys";
import useCanAnswerToSurvey from "data/useCanAnswerToSurvey";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import styles from "./UserSurvey.module.scss";

const UserSurvey = () => {
  const { id } = useParams();

  const {
    data: survey,
    surveyTitle,
    surveyContent,
    status,
    isLoading,
  } = useSurveyData(id);

  const {
    data: canAnswer,
    isLoading: isLoadingCanAnswer,
    mutate,
  } = useCanAnswerToSurvey(id);

  if (!isLoading && !survey) {
    return <Navigate to={navigationPaths.home} />;
  }

  const handleSubmission = async (data) => {
    const body = {
      userAnswers: surveyContent?.map(([{ fieldId,name }]) => [
        {
          fieldId,
          name,
          value: data?.[fieldId],
        },
      ]),
    };

    return userAnswerToSurvey(id, body);
  };

  return (
    <section className={styles.container}>
      <WidgetSkeleton
        show={isLoading || isLoadingCanAnswer}
        heightInPixels={600}
      >
        {surveyTitle && (
          <div className={styles.header}>
            <h2>{surveyTitle}</h2>
            {status && <Chip label={status} color="success" size="small" />}
          </div>
        )}
        {!canAnswer && (
          <Alert severity="success" sx={{ width: "max-content" }}>
            <AlertTitle>You have already answered</AlertTitle>
            Check the questions below.
          </Alert>
        )}
        <h3>Questions</h3>
        <SurveyForm
          questions={surveyContent}
          handleSubmission={handleSubmission}
          lastQuestion={surveyContent?.[surveyContent?.length - 1]?.[0]}
          userCanAnswer={canAnswer}
          mutate={mutate}
        />
      </WidgetSkeleton>
    </section>
  );
};

export default UserSurvey;
