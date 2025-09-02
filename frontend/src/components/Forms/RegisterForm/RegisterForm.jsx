import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useError from "hooks/useError";
import { PrimaryButtonLoader } from "components/Buttons/Buttons";
import { ErrorBox } from "components/MessageBox/MessageBox";
import { TextInput } from "components/Inputs/TextInput";
import navigationPaths from "configs/navigationPaths";
import { accountRegister } from "api/authApi";
import { ConfirmPasswordInput } from "components/Inputs/ConfirmPasswordInput";
import useSnackBar from "context/useSnackBar";
import { NewPasswordInput } from "components/Inputs/NewPasswordInput";

import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackBar();

  const { error, handleError, clearError } = useError();

  const onSubmit = async ({ username, newPassword: password }) => {
    setRegisterLoading(true);
    try {
      await accountRegister({ username, password });
      clearError();
      showSnackbar({ message: "Account created!" });
      navigate(navigationPaths.login);
    } catch (error) {
      handleError(error, "register");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <ErrorBox
        open={error !== null}
        closeBox={clearError}
        header="Register failed"
        message={error?.errorCode?.message || "Try again."}
      />
      <form
        className={styles.container}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextInput
          register={register}
          errors={errors}
          label={"Username"}
          name="username"
        />
        <NewPasswordInput
          register={register}
          name="newPassword"
          errors={errors}
          label={"Password"}
        />
        <ConfirmPasswordInput
          register={register}
          errors={errors}
          comparedInputName="newPassword"
          label="Confirm password"
          watch={watch}
        />
        <section className={styles.submit}>
          <PrimaryButtonLoader
            loading={registerLoading}
            disabled={registerLoading}
            type="submit"
          >
            Sign up
          </PrimaryButtonLoader>
        </section>
      </form>
    </>
  );
};

export default RegisterForm;
