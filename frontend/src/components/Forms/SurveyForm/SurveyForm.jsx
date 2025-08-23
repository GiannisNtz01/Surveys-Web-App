import { useState } from "react";

import RadioGroup from "components/RadioButtonsGroup/RadioGroup";
import RadioButton from "components/RadioButtonsGroup/RadioButton";
import { useForm } from "react-hook-form";
import { PrimaryButtonLoader } from "components/Buttons/Buttons";
import useSnackBar from "context/useSnackBar";
import snackbarTypes from "types/snackbarTypes";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import styles from "./SurveyForm.module.scss";

const POINTS_SCALE = 5;

const SurveyForm = ({
  questions,
  handleSubmission,
  lastQuestion,
  userCanAnswer,
  mutate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const { showSnackbar } = useSnackBar();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await handleSubmission?.(data);

      mutate?.();

      showSnackbar({ message: "Answered!" });
      reset();
    } catch {
      showSnackbar({ type: snackbarTypes.ERROR });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <List className={styles.list}>
        {questions?.map(([{ fieldId, name: question, sign }]) => (
          <div key={fieldId}>
            <ListItem className={styles.question}>
              <div className={styles.box}>
                <ListItemText primary={question} />
                <Chip
                  label={sign ? "Positively-oriented" : "Negatively-oriented"}
                  size="small"
                />
              </div>
              {userCanAnswer && (
                <RadioGroup
                  name={fieldId}
                  containerClass={styles["radio-group"]}
                  error={errors?.[fieldId]}
                  value={watch(fieldId) || ""}
                >
                  {Array.from({ length: POINTS_SCALE }, (_, i) => i + 1).map(
                    (number) => (
                      <RadioButton
                        key={number}
                        value={number}
                        label={number}
                        name={fieldId}
                        register={register}
                        error={errors?.[fieldId]}
                      />
                    )
                  )}
                </RadioGroup>
              )}
            </ListItem>
            {lastQuestion.fieldId !== fieldId && (
              <Divider component="li" variant="middle" />
            )}
          </div>
        ))}
      </List>
      {userCanAnswer && (
        <PrimaryButtonLoader loading={loading} disabled={loading} type="submit">
          Submit
        </PrimaryButtonLoader>
      )}
    </form>
  );
};

export default SurveyForm;
