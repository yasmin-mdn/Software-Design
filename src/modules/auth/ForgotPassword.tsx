import { Formik } from "formik";
import {
  FieldError,
  FieldLabel,
  getValidationMessage,
  LoadingButton,
} from "../../shared";
import { ForgotPassExtraAction } from "./ExtraAction";
import { ForgotPassSchema } from "./schemas/ForgotPass.schema";

export default function ForgotPassword() {
  // const { pending, request } = useForgotPass();
  let pending = false;
  return (
    <div className="w-[calc(100%-16px)] sm:m-2 md:w-[400px] m-auto bg-white p-2 py-4 shadow-2xl rounded-xl">
      <h1 className="text-2xl font-bold m-8 my-6 mb-4">Forgot Password</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values: any) =>
          getValidationMessage(values, ForgotPassSchema)
        }
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
            <FieldLabel label="email" required={true} />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="enter you email here"
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
            <ForgotPassExtraAction />
            <button
              className="btn btn-primary mt-2 mb-4"
              type="submit"
              disabled={pending || !isValid}
            >
              <LoadingButton loading={pending}>Reset password</LoadingButton>
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
