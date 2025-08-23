import { useNavigate } from "react-router-dom";

import useSurveysDashboardData from "data/useSurveysDashboardData";
import WidgetSkeleton from "components/WidgetSkeleton/WidgetSkeleton";
import DashboardCardSurvey from "components/DashboardCardSurvey/DashboardCardSurvey";
import navigationPaths from "configs/navigationPaths";
import useAuthUser from "context/useAuthUser";
import statusTypes from "types/statusTypes";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthUser();
  const { data: surveys, isLoading } = useSurveysDashboardData(isAdmin);

  const handleOnClick = (surveyId) => {
    const path = isAdmin
      ? navigationPaths.adminViewSurvey
      : navigationPaths.userAnswerSurvey;

    navigate(`${path}/${surveyId}`);
  };

  const ctaText = isAdmin ? "View more" : "Review now";

  return (
    <section>
      <WidgetSkeleton show={isLoading} heightInPixels={600}>
        <div className={styles["cards-container"]}>
          {surveys?.map(({ surveyId, surveyTitle, timesAnswered, status }) => (
            <DashboardCardSurvey
              key={surveyId}
              title={surveyTitle}
              body={`Entries: ${timesAnswered}`}
              label={status}
              onClick={() => handleOnClick(surveyId)}
              buttonText={ctaText}
              chipColor={status === statusTypes.NEW ? "success" : "info"}
            />
          ))}
        </div>
      </WidgetSkeleton>
    </section>
  );
};

export default Dashboard;
