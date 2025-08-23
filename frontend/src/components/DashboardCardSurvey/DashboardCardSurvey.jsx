import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { SecondaryButton } from "components/Buttons/Buttons";
import Chip from "@mui/material/Chip";

const DashboardCardSurvey = ({
  title,
  body,
  label,
  chipColor = "success",
  onClick,
  buttonText = "View more",
}) => {
  return (
    <Card
      sx={{
        maxWidth: 240,
        width: "100%",
        minHeight: 240,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {label && (
        <Chip
          label={label}
          color={chipColor}
          size="small"
          sx={{ position: "absolute", left: ".5rem", top: ".5rem" }}
        />
      )}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Typography
          fontWeight={700}
          variant="h6"
          textAlign="center"
          sx={{ wordWrap: "break-word" }}
        >
          {title}
        </Typography>
        {body && (
          <Typography sx={{ color: "grayscale.dark" }}>{body}</Typography>
        )}
      </CardContent>
      <CardActions sx={{ mt: "auto" }}>
        <SecondaryButton onClick={onClick}>{buttonText}</SecondaryButton>
      </CardActions>
    </Card>
  );
};

export default DashboardCardSurvey;
