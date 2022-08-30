import { useState } from "react";
import { Formik } from "formik";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import {
  BASE_URL,
  FieldError,
  FieldLabel,
  getValidationMessage,
  LoadingButton,
} from "../../shared";
import { RegisterExtraAction } from "./ExtraAction";
import { RegisterSchema } from "./schemas/Register.schema";
import { useHistory } from "react-router-dom";

export default function Register() {
  let pending = false;
  const history = useHistory();
  const [alert, setAlert] = useState(false);
  const [erroralert, setErrorAlert] = useState(false);
  const [errormsg, setErrorMsg] = useState("");
  const onOkclicked = () => {
    history.push("/login");
  };
  async function Onsubmit(values: {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
  }) {
    try {
      setErrorAlert(false);
      setErrorMsg("");
      const requestOptions = {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          username: values["username"],
          email: values["email"],
          password: values["password"],
        }),
      };
      const response = await window.fetch(
        BASE_URL + "auth/register",
        requestOptions
      );
      const data = await response.json();
      if (response.status === 200) {
        setAlert(true);
        setErrorAlert(false);
      } else {
        setAlert(false);
        setErrorAlert(true);
        setErrorMsg(data["message"]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-[calc(100%-16px)] sm:m-2 md:w-[400px] m-auto bg-white p-2 py-4 shadow-2xl rounded-xl">
      <h1 className="text-2xl font-bold m-8 my-6 mb-4">Sign Up</h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmpassword: "",
        }}
        validate={(values: any) => getValidationMessage(values, RegisterSchema)}
        onSubmit={async (values) => {}}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col px-6">
            <FieldLabel label="Email" required={true} />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={
                "input input-bordered " +
                (errors.email && touched.email && errors.email
                  ? "input-error"
                  : "")
              }
            />
            <FieldError>
              {errors.email && touched.email && errors.email}
            </FieldError>
            <FieldLabel label="Username" required={true} />
            <input
              type="username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className={
                "input input-bordered " +
                (errors.username && touched.username && errors.username
                  ? "input-error"
                  : "")
              }
            />
            <FieldError>
              {errors.username && touched.username && errors.username}
            </FieldError>

            <FieldLabel label="Password" required={true} />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={
                "input input-bordered " +
                (errors.password && touched.password && errors.password
                  ? "input-error"
                  : "")
              }
            />
            <FieldError>
              {errors.password && touched.password && errors.password}
            </FieldError>

            <FieldLabel label="Confirm Password" required={true} />
            <input
              type="password"
              name="confirmpassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmpassword}
              className={
                "input input-bordered " +
                (errors.confirmpassword &&
                touched.confirmpassword &&
                errors.confirmpassword
                  ? "input-error"
                  : "")
              }
            />
            <FieldError>
              {errors.confirmpassword &&
                touched.confirmpassword &&
                errors.confirmpassword}
            </FieldError>
            <RegisterExtraAction />
            <button
              className="btn btn-primary mt-2 mb-4"
              type="submit"
              disabled={pending || !isValid}
              onClick={() => Onsubmit(values)}
            >
              <LoadingButton loading={pending}>Sign up</LoadingButton>
            </button>
          </form>
        )}
      </Formik>
      {alert ? (
        <Alert
          action={
            <Button onClick={onOkclicked} color="inherit" size="small">
              OK
            </Button>
          }
        >
          Your account was created successfully! To complete registration check
          your email and verify it.
        </Alert>
      ) : (
        <></>
      )}

      {erroralert ? <Alert severity="error">{errormsg}</Alert> : <></>}
    </div>
  );
}
