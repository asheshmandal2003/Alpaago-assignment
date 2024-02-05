import { FlexCenter } from "../components/FlexCenter";
import AuthForm from "../layouts/AuthForm";
import { app } from "../../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ErrorAlert, SuccessAlert } from "../components/Alert";
import { Dispatch, SetStateAction } from "react";

type Values = {
  email: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();

  async function signup(
    values: Values,
    setDisabled: Dispatch<SetStateAction<boolean>>
  ) {
    setDisabled(true);
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        SuccessAlert("You're successfully registered!");
        navigate("/");
      })
      .catch(() => {
        ErrorAlert("Something went wrong!");
        setDisabled(false);
      });
  }

  async function signInWithGoogle() {
    signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        SuccessAlert("You're successfully registered!");
        navigate("/");
      })
      .catch((): void => {
        ErrorAlert("Something went wrong!");
      });
  }

  async function signInWithGithub() {
    signInWithPopup(auth, githubAuthProvider)
      .then(() => {
        SuccessAlert("You're successfully registered!");
        navigate("/");
      })
      .catch((): void => {
        ErrorAlert("Something went wrong!");
      });
  }

  return (
    <FlexCenter>
      <AuthForm
        onSubmit={(
          values: Values,
          setDisabled: Dispatch<SetStateAction<boolean>>
        ) => signup(values, setDisabled)}
        signinWithGoogle={signInWithGoogle}
        signinWithGitHub={signInWithGithub}
        pageType="signup"
      />
    </FlexCenter>
  );
};

export default Signup;
