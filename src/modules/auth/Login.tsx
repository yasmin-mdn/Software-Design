import { Formik } from "formik";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { BASE_URL, CookieHandler, Storage } from "../../shared";
import {
  FieldError,
  FieldLabel,
  LoadingButton,
  getValidationMessage,
} from "../../shared";
import { LoginExtraAction } from "./ExtraAction";
import { LoginSchema } from "./schemas/Login.schema";

export default function Login() {
  let pending = false;
  const [erroralert, setErrorAlert] = useState(false);
  const [errormsg, setErrorMsg] = useState("");

  async function Onlogin(values: {
    [x: string]: any;
    emailOrUsername?: string;
    password?: string;
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
          emailOrUsername: values["emailOrUsername"],
          password: values["password"],
        }),
      };
      const response = await window.fetch(
        BASE_URL + "auth/login",
        requestOptions
      );
      const data = await response.json();
      if (response.status === 200) {
        CookieHandler.setToken(data["token"]);
        Storage.setUserData(Storage.decodeToken(data["token"]));
        window.location.reload();
      } else {
        setErrorAlert(true);
        setErrorMsg(data["message"]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-[calc(100%-16px)] sm:m-2 md:w-[400px] m-auto bg-white p-2 py-4 shadow-2xl rounded-xl">
      <h1 className="text-2xl font-bold m-8 my-6 mb-4">Login</h1>
      <Formik
        initialValues={{ emailOrUsername: "", password: "" }}
        validate={(values: any) => getValidationMessage(values, LoginSchema)}
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
            <FieldLabel label="Email/Username " required={true} />
            <input
              type="text"
              name="emailOrUsername"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.emailOrUsername}
              className={"input input-bordered "}
            />

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
            <LoginExtraAction />
            <button
              className="btn btn-primary mt-2 mb-4"
              type="submit"
              disabled={pending || !isValid}
              onClick={() => Onlogin(values)}
            >
              <LoadingButton loading={pending}>Login</LoadingButton>
            </button>
          </form>
        )}
      </Formik>
      {erroralert ? <Alert severity="error">{errormsg}</Alert> : <></>}
    </div>
  );
}
