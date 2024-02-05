import { app } from "../../firebase/firebaseConfig";
import { FlexCenter } from "../components/FlexCenter";
import AuthForm from "../layouts/AuthForm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

type Values = {
  email: string;
  password: string;
};

const Signin = () => {
  const auth = getAuth(app);

  async function signin(values: Values) {
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => console.log(res.user))
      .catch((err) => console.log(err));
  }

  return (
    <FlexCenter>
      <AuthForm
        onSubmit={(values: Values) => signin(values)}
        pageType="signin"
      />
    </FlexCenter>
  );
};

export default Signin;
