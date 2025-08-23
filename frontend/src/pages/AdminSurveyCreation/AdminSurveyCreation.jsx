import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextInput } from "components/Inputs/TextInput";
import Switch from "components/Inputs/Switch";
import { useForm } from "react-hook-form";
import {
  SecondaryButton,
  PrimaryButtonLoader,
} from "components/Buttons/Buttons";

import {
  closestCenter,
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { createSurvey } from "api/surveys";
import useSnackBar from "context/useSnackBar";
import snackbarTypes from "types/snackbarTypes";

import styles from "./AdminSurveyCreation.module.scss";

const INITIAL_QUESTIONS_NUMBER = 4;

const AdminSurveyCreation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { showSnackbar } = useSnackBar();

  const [loading, setLoading] = useState(false);
  const [inputsIds, setInputsIds] = useState(
    Array.from({ length: INITIAL_QUESTIONS_NUMBER }, (_, i) => i + 1)
  );

 const handleOnClick = () => {
   setInputsIds((prevIds) => {
     const newId = prevIds.length + 1;
     return [...prevIds, newId];
   });
 };

  const handleOnDelete = (id) => {
    setInputsIds((prevIds) => prevIds.filter((_id) => _id !== id));
  };

  const onSubmit = async (data) => {
    const orderedQuestions = inputsIds.map((id) => [
      {
        name: data[`question-${id}`],
        sign: !data[`question-${id}-sign`],
      },
    ]);

    const body = {
      surveyTitle: data.surveyTitle,
      surveyContent: orderedQuestions,
    };

    setLoading(true);

    try {
      await createSurvey(body);
      showSnackbar({ message: "Survey created!" });
    } catch (e) {
      console.error(e);
      showSnackbar({ type: snackbarTypes.ERROR });
    } finally {
      setLoading(false);
    }
  };

  const [activeId, setActiveId] = useState(null);
  const activeIndex = activeId !== null ? inputsIds.indexOf(activeId) : -1;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragEnd = ({ over }) => {
    if (over) {
      const overIndex = inputsIds.indexOf(over.id);
      if (activeIndex !== overIndex) {
        setInputsIds((items) => arrayMove(items, activeIndex, overIndex));
      }
    }
    setActiveId(null);
  };

  return (
    <section className={styles.container}>
      <h2>Survey Creation</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextInput
          className={styles["title-input"]}
          register={register}
          errors={errors}
          label="Survey title"
          name="surveyTitle"
        />
        <div className={styles.questions}>
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            sensors={sensors}
            collisionDetection={closestCenter}
            measuring={measuring}
          >
            <SortableContext items={inputsIds}>
              {inputsIds.map((id, index) => (
                <SortableQuestion
                  key={id}
                  id={id}
                  index={index}
                  activeIndex={activeIndex}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  handleOnDelete={handleOnDelete}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <div className={styles["action-buttons"]}>
          <PrimaryButtonLoader
            loading={loading}
            disabled={loading}
            type="submit"
          >
            Submit
          </PrimaryButtonLoader>
          <SecondaryButton className={styles.button} onClick={handleOnClick}>
            Add a question
          </SecondaryButton>
        </div>
      </form>
    </section>
  );
};

const SortableQuestion = ({
  id,
  register,
  setValue,
  handleOnDelete,
  errors,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} className={styles["question-row"]} style={style}>
      <div className={styles["flex-row"]}>
        <div className={styles["drag-handle"]} {...listeners} {...attributes}>
          <DragIndicatorIcon />
        </div>
        <TextInput
          name={`question-${id}`}
          register={register}
          errors={errors}
          className={styles.input}
        />
      </div>
      <Switch
        name={`question-${id}-sign`}
        label="Negatively-oriented"
        size="small"
        onChange={(event) => {
          setValue(`question-${id}-sign`, event);
        }}
      />
      <IconButton
        aria-label="delete"
        size="large"
        onClick={() => handleOnDelete(id)}
      >
        <DeleteIcon color="primary" />
      </IconButton>
    </div>
  );
};

export default AdminSurveyCreation;
