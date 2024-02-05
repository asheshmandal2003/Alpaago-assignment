import { GitHub, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

type Values = {
  email: string;
  password: string;
};

interface AuthFormProps {
  onSubmit(values: Values): void;
  pageType: string;
}

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password must contain minimum 8 characters!")
    .max(50, "Password cannot contain more than 50 characters!")
    .required("Password is required!"),
});

const AuthForm = ({ onSubmit, pageType }: AuthFormProps) => {
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:600px)");

  const [visibility, setVisibility] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => onSubmit(values),
    validationSchema,
  });
  return (
    <Card
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ width: phone ? "80%" : 450, p: phone ? 2 : 4, mt: phone ? 3 : 5 }}
    >
      <Stack spacing={4}>
        <Typography variant="h6" alignSelf="center">
          {pageType === "signup" ? "Sign Up" : "Sign In"}
        </Typography>
        <TextField
          fullWidth
          name="email"
          type="email"
          label="Email"
          size={phone ? "small" : "medium"}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
          helperText={Boolean(formik.touched.email) && formik.errors.email}
        />
        <TextField
          fullWidth
          name="password"
          type={visibility ? "text" : "password"}
          label="password"
          size={phone ? "small" : "medium"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            Boolean(formik.touched.password) && Boolean(formik.errors.password)
          }
          helperText={
            Boolean(formik.touched.password) && formik.errors.password
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setVisibility(!visibility)}>
                  {visibility ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {pageType === "signup" ? (
          <Button
            fullWidth
            variant="contained"
            type="submit"
            size={phone ? "small" : "medium"}
          >
            Sign Up
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            type="submit"
            size={phone ? "small" : "medium"}
          >
            Sign In
          </Button>
        )}
        <Divider>
          <Typography variant="body1" color="text.secondary" alignSelf="center">
            or
          </Typography>
        </Divider>
        <Box alignSelf="center" display="flex" flexShrink={0} gap={2}>
          <IconButton size="large">
            <img
              src="/images/google.png"
              alt="Googel"
              style={{ height: 30, width: 30 }}
            />
          </IconButton>
          <IconButton size="large">
            <GitHub sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
        {pageType === "signup" ? (
          <Typography alignSelf="center">
            Already have an account?{" "}
            <Typography
              component="span"
              color="primary"
              onClick={() => navigate("/auth/signin")}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Sign in
            </Typography>
          </Typography>
        ) : (
          <Typography alignSelf="center">
            Don't have an account?{" "}
            <Typography
              component="span"
              color="primary"
              onClick={() => navigate("/auth/signup")}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Sign up
            </Typography>
          </Typography>
        )}
      </Stack>
    </Card>
  );
};

export default AuthForm;
