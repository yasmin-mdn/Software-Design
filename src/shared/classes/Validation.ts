import { OptionalObjectSchema, TypeOfShape } from "yup/lib/object";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";

export function getValidationMessage(
  values: any,
  schema: OptionalObjectSchema<
    { [key: string]: RequiredStringSchema<string | undefined, AnyObject> },
    AnyObject,
    TypeOfShape<any>
  >
) {
  const errors: any = {};
  Object.keys(values).forEach((key) => {
    try {
      schema.validateSyncAt(key, values);
    } catch (e: any) {
      errors[key] = e.message;
    }
  });
  return errors;
}
