import { useLocation } from "react-router-dom";
import useAuthUser from "context/useAuthUser";
import LoginForm from "components/Forms/LoginForm/LoginForm";
import Widget from "components/Widget/Widget";

import styles from "./Login.module.scss";

const Login = () => {
  const { login } = useAuthUser();
  const { state } = useLocation();

  return (
    <Widget className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <p className={styles.subTitle}>
        Please enter your username and password to access your account.
      </p>
      <LoginForm onSubmit={login} email={state?.email} />
    </Widget>
  );
};

export default Login;
