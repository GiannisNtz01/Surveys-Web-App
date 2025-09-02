import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";

import useSurveyData from "data/useSurveyData";
import navigationPaths from "configs/navigationPaths";
import Chip from "@mui/material/Chip";
import WidgetSkeleton from "components/WidgetSkeleton/WidgetSkeleton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import { PrimaryButtonLoader } from "components/Buttons/Buttons";
import { adminSetSurveyAsCompleted, adminExportSurveyStats } from "api/surveys";
import useSnackBar from "context/useSnackBar";
import snackbarTypes from "types/snackbarTypes";
import statusTypes from "types/statusTypes";
import useSurveyStats from "data/useSurveyStats";
import IconButton from "@mui/material/IconButton";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Tooltip from "@mui/material/Tooltip";

import styles from "./AdminViewSurvey.module.scss";

const AdminViewSurvey = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  const { showSnackbar } = useSnackBar();

  const {
    data: survey,
    surveyTitle,
    surveyContent,
    timesAnswered,
    status,
    isLoading,
    mutate,
  } = useSurveyData(id);

  const { data: statistics } = useSurveyStats(
    status === statusTypes.COMPLETED && id
  );

  const { totalScore, fieldStatistics } = statistics || {};

  if (!isLoading && !survey) {
    return <Navigate to={navigationPaths.home} />;
  }

  const handleExportStatistics = async () => {
    setIsDownloading(true);
    try {
      const response = await adminExportSurveyStats(id);

      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const filename = `${surveyTitle}.csv`;

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showSnackbar({ message: "Survey exported successfully!" });
    } catch {
      showSnackbar({ type: snackbarTypes.ERROR });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleMarkSurveyAsCompleted = async () => {
    setLoading(true);
    try {
      await adminSetSurveyAsCompleted(id);
      mutate();
      showSnackbar({ message: "Survey marked as completed!" });
    } catch {
      showSnackbar({ type: snackbarTypes.ERROR });
    } finally {
      setLoading(false);
    }
  };

  const getSUSUsability = (score) => {
    if (score < 50) return { label: "Poor usability", color: "error" };
    if (score < 68) return { label: "Marginal usability", color: "warning" };
    if (score < 80) return { label: "Good usability", color: "info" };
    return { label: "Excellent usability", color: "success" };
  };

  const { label, color } = getSUSUsability(totalScore);

  const lastQuestion = surveyContent?.[surveyContent?.length - 1]?.[0];

  return (
    <section className={styles.container}>
      <WidgetSkeleton show={isLoading} heightInPixels={600}>
        {surveyTitle && (
          <div className={styles.header}>
            <h2>{surveyTitle}</h2>
            {status && (
              <Chip
                label={status}
                color={status === statusTypes.NEW ? "success" : "info"}
                size="small"
              />
            )}
          </div>
        )}
        <div className={styles["info-container"]}>
          <Alert severity="info" sx={{ minWidth: "50%", width: "max-content" }}>
            Survey takers: {timesAnswered}
            {!!totalScore && (
              <>
                <br /> Total score: {Number(totalScore).toFixed(2)}
                <br />
                <Chip label={label} color={color} size="small" sx={{ mt: 1 }} />
              </>
            )}
          </Alert>
          {status === statusTypes.COMPLETED && (
            <Tooltip title={"Export survey statistics"} arrow>
              <IconButton
                size="large"
                aria-label="export survey statistics"
                aria-controls="survey-export"
                aria-haspopup="true"
                onClick={handleExportStatistics}
                color="info"
                loading={isDownloading}
              >
                <DownloadForOfflineIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <h3>Questions</h3>
        <List className={styles.list}>
          {surveyContent?.map(([{ fieldId, name: question, sign }]) => {
            const currentFieldStats = fieldStatistics?.find(
              (field) => field?.fieldId === fieldId
            );
            return (
              <div key={fieldId}>
                <ListItem className={styles.question}>
                  <ListItemText primary={question} />
                  <Chip
                    label={sign ? "Positively-oriented" : "Negatively-oriented"}
                    size="small"
                  />
                  {Boolean(currentFieldStats?.average) && (
                    <Chip
                      variant="outlined"
                      color="info"
                      label={`Average: ${currentFieldStats?.average}`}
                      size="small"
                    />
                  )}
                </ListItem>
                {lastQuestion?.name !== question && (
                  <Divider component="li" variant="middle" />
                )}
              </div>
            );
          })}
        </List>
        {status === statusTypes.NEW && (
          <PrimaryButtonLoader
            onClick={handleMarkSurveyAsCompleted}
            loading={loading}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Mark as completed
          </PrimaryButtonLoader>
        )}
      </WidgetSkeleton>
    </section>
  );
};

export default AdminViewSurvey;
