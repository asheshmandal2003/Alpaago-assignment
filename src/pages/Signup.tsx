import { FlexCenter } from "../components/FlexCenter";
import AuthForm from "../layouts/AuthForm";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ErrorAlert, SuccessAlert } from "../components/Alert";
import { Dispatch, SetStateAction } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

type Values = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();

  async function signup(
    values: Values,
    setDisabled: Dispatch<SetStateAction<boolean>>
  ) {
    setDisabled(true);
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        await addDoc(collection(db, "users"), {
          email: values.email,
          name: values.name,
          status: true,
          createdAt: res.user.metadata.creationTime,
        }).then(() => {
          SuccessAlert("You're successfully registered!");
          navigate("/");
        });
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("Something went wrong!");
        setDisabled(false);
      });
  }

  async function signInWithGoogle() {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (res) => {
        await addDoc(collection(db, "users"), {
          email: res.user.email,
          name: res.user.displayName,
          status: true,
          createdAt: res.user.metadata.creationTime,
        }).then(() => {
          SuccessAlert("You're successfully registered!");
          navigate("/");
        });
      })
      .catch((): void => {
        ErrorAlert("Something went wrong!");
      });
  }

  async function signInWithGithub() {
    signInWithPopup(auth, githubAuthProvider)
      .then(async (res) => {
        await addDoc(collection(db, "users"), {
          email: res.user.email,
          name: res.user.displayName,
          status: true,
          createdAt: res.user.metadata.creationTime,
        }).then(() => {
          SuccessAlert("You're successfully registered!");
          navigate("/");
        });
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
