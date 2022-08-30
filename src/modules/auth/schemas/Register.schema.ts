import { object, ref,string } from "yup";

export const RegisterSchema = object({
  username:string().required() ,
  email: string().required().email(),
  password: string().required().min(6).max(10),
  confirmpassword:string().required().min(6).max(10)
  .oneOf([ref('password'),null],'Field does not match password')
});
