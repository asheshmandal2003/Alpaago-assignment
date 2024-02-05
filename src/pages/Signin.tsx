import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/firebaseConfig";
import { ErrorAlert, SuccessAlert } from "../components/Alert";
import { FlexCenter } from "../components/FlexCenter";
import AuthForm from "../layouts/AuthForm";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

type Values = {
  email: string;
  password: string;
};

const Signin = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();

  async function signin(
    values: Values,
    setDisable: Dispatch<SetStateAction<boolean>>
  ) {
    setDisable(true);
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        navigate("/");
        SuccessAlert("You're successfully logged in!");
      })
      .catch(() => {
        ErrorAlert("Invalid credentials!");
        setDisable(false);
      });
  }

  async function signInWithGoogle() {
    signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        SuccessAlert("You're successfully logged in!");
        navigate("/");
      })
      .catch((err): void => {
        console.log(err.message);
        ErrorAlert("Invalid credentials!");
      });
  }

  async function signInWithGithub() {
    signInWithPopup(auth, githubAuthProvider)
      .then(() => {
        SuccessAlert("You're successfully logged in!");
        navigate("/");
      })
      .catch((): void => {
        ErrorAlert("Invalid credentials!");
      });
  }

  return (
    <FlexCenter>
      <AuthForm
        onSubmit={(
          values: Values,
          setDisable: Dispatch<SetStateAction<boolean>>
        ) => signin(values, setDisable)}
        signinWithGoogle={signInWithGoogle}
        signinWithGitHub={signInWithGithub}
        pageType="signin"
      />
    </FlexCenter>
  );
};

export default Signin;
