import LoginForm from "components/Forms/LoginForm/LoginForm";
import Widget from "components/Widget/Widget";

import styles from "./Login.module.scss";
import { LinkButton } from "components/Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import navigationPaths from "configs/navigationPaths";

const Login = () => {
  const navigate = useNavigate();

  return (
    <Widget className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <p className={styles.subTitle}>
        Please enter your username and password to access your account.
        <br />
        <br />
        Don’t have an account?{" "}
        <LinkButton
          onClick={() => {
            navigate(navigationPaths.register);
          }}
        >
          Create one
        </LinkButton>
      </p>
      <LoginForm />
    </Widget>
  );
};

export default Login;
