// Lifted directly from https://github.com/downace/ajv-json-loader and provies
// typings for imported JSON schema files.
// This is the generic type and should only be used as an example. To get a real
// type, create a new definition with the file name explicitly stated and the
// guard type (A) concretely defined as the type to be validated.
declare module '*.schema.json' {
  import { ErrorObject } from 'ajv';

  interface ValidateFn {
    <A>(data: unknown): data is A;
    errors: ErrorObject[] | null;
  }
  const validate: ValidateFn;
  export default validate;
}
