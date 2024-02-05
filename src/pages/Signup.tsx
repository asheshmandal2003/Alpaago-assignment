import { FlexCenter } from "../components/FlexCenter";
import AuthForm from "../layouts/AuthForm";
import { app } from "../../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

type Values = {
  email: string;
  password: string;
};

const Signup = () => {
  const auth = getAuth(app);

  async function signup(values: Values) {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => console.log(res.user))
      .catch((err) => console.log(err));
  }
  return (
    <FlexCenter>
      <AuthForm
        onSubmit={(values: Values) => signup(values)}
        pageType="signup"
      />
    </FlexCenter>
  );
};

export default Signup;
