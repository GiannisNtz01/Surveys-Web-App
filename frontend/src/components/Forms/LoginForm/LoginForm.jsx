import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useError from "hooks/useError";
import useAuthUser from "context/useAuthUser";
import { PrimaryButtonLoader } from "components/Buttons/Buttons";
import { PasswordInput } from "components/Inputs/PasswordInput";
import { ErrorBox } from "components/MessageBox/MessageBox";
import { TextInput } from "components/Inputs/TextInput";
import navigationPaths from "configs/navigationPaths";

import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const { login, mutateAccountInfo } = useAuthUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  const { error, handleError, clearError } = useError();

  const onSubmit = async ({ username, password }) => {
    setLoginLoading(true);
    try {
      await login({ username, password });
      await mutateAccountInfo();
      clearError();
      navigate(navigationPaths.home);
    } catch (error) {
      handleError(error, "login");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <>
      <ErrorBox
        open={error !== null}
        closeBox={clearError}
        header="Login failed"
        message="Make sure the information you entered is valid."
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
        <PasswordInput
          name="password"
          register={register}
          errors={errors}
          label={"Password"}
        />
        <section className={styles.submit}>
          <PrimaryButtonLoader
            loading={loginLoading}
            disabled={loginLoading}
            type="submit"
          >
            Login
          </PrimaryButtonLoader>
        </section>
      </form>
    </>
  );
};

export default LoginForm;
