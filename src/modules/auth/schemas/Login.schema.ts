import { object, string } from "yup";

export const LoginSchema = object({
  emailOrUsername: string().required(),
  password: string().required().min(6).max(10),
});
