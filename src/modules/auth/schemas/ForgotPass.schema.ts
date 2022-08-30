import { object, string } from "yup";

export const ForgotPassSchema = object({
  email: string().required().email(),
});
