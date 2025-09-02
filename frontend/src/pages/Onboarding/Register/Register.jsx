import Widget from "components/Widget/Widget";
import RegisterForm from "components/Forms/RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "components/Buttons/Buttons";
import navigationPaths from "configs/navigationPaths";

import styles from "./Register.module.scss";

const Register = () => {
  const navigate = useNavigate();
  return (
    <Widget className={styles.container}>
      <h2 className={styles.title}>Set up your account</h2>
      <p className={styles.subTitle}>
        Already have an account?{" "}
        <LinkButton
          onClick={() => {
            navigate(navigationPaths.login);
          }}
        >
          Log in
        </LinkButton>
      </p>
      <RegisterForm />
    </Widget>
  );
};

export default Register;
