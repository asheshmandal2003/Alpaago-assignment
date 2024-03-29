import { useNavigate } from "react-router-dom";
import { ErrorAlert, SuccessAlert } from "../components/Alert";
import { FlexCenter } from "../components/FlexCenter";
import AuthForm from "../layouts/AuthForm";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../../container/auth";

type Values = {
  email: string;
  password: string;
};

const Signin = () => {
  const navigate = useNavigate();
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();
  const dispatch = useDispatch();

  async function signin(
    values: Values,
    setDisable: Dispatch<SetStateAction<boolean>>
  ) {
    setDisable(true);
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        dispatch(
          login({
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
            photoURL: res.user.photoURL,
          })
        );
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
      .then((res) => {
        dispatch(
          login({
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
            photoURL: res.user.photoURL,
          })
        );
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
      .then((res) => {
        dispatch(
          login({
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.displayName,
            photoURL: res.user.photoURL,
          })
        );
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
