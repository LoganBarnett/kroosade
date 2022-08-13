declare module 'validation-error-array.schema.json' {
  import { ErrorObject } from 'ajv';

  export type ValidationError = {
    kind: string,
    name: string,
    message: string,
    targets: Array<string>,
  }

  export interface ValidateFn {
    (data: unknown): data is Array<ValidationError>;
    errors: ErrorObject[] | null;
  }
  const validate: ValidateFn;
  export default validate;
}
