import jailed from 'jailed'
import {
  type Cost,
  type CostEntity,
  type Entity,
  type ValidationEntity,
  type ValidationError,
} from './model'
import {
  concat,
  partial,
} from 'ramda'
// import { type TSConfigJSON } from 'types-tsconfig'
import typeScriptConfig from '../tsconfig.json'
// This is the official CompilerOptions type, I think. But also maybe not. It's
// declared in a lot of places, and following the code structure is less than
// obvious in TypeScript's repository that would give me a certainty about it.
// There appear to possibly be multiple declarations.
// import { type CompilerOptions } from 'typescript/lib/protocol'
// const typeScriptConfig = compilerOptionsJson as TSConfigJSON
// import {
//   type ValidationError,
// } from '../types/validation-error-array-schema'
import ts from 'typescript'
// import {
//   // type ValidationError,
//   default as validationErrorArraySchema,
// } from './validation-error-array.schema.json'
// import { type ValidateFn } from '../types/validation-error-array.schema.json'
import validationErrorArraySchemaTypeScriptHatesMe from './validation-error-array.schema.json'
// Look what they made me do.
import { type ErrorObject } from 'ajv';
export interface ValidateFn {
  (data: unknown): data is Array<ValidationError>;
  errors: ErrorObject[] | null;
}
const validationErrorArraySchema =
  validationErrorArraySchemaTypeScriptHatesMe as unknown as ValidateFn

type EntityGuardFunction<A extends Entity> = (e: Entity) => e is A

export function deepAccum<A extends Entity, B>(
  guard: EntityGuardFunction<A>,
  f: (a: A) => B,
  e: Entity,
): Array<B> {
  if(guard(e)) {
    return [f(e)]
  } else {
    return e
      .children
    // TypeScript fights too much on composition here, bleh.
    //
    // Things I have tried:
    // 1. Creating a childAccum variable that is statically typed and created
    // using bind from deepAccum.
    // 2. Filling out type parameters directly as the function is passed. I'm
    // not certain this can even be done under normal circumstances.
    // 3. In all cases, strictBindCallApply is true in the TypeScript config.
      .map(c => deepAccum(guard, f, c))
      .reduce(concat, [])
  }
}

export function isCost(e: Entity): e is CostEntity {
  //return e.definition == 'cost'
  return true
}

export function cost(e: Entity): Array<Cost> {
  return deepAccum(isCost, e => e.value, e)
}

export function isValidation(e: Entity): e is ValidationEntity {
  //return e.definition == 'validation'
  return true
}

export function valid(e: Entity): Promise<Array<ValidationError>> {
  return Promise.all(deepAccum(isValidation, validate, e)).then((xs) => {
    return xs.reduce(concat, [])
  })
}

export function validate(e: ValidationEntity): Promise<Array<ValidationError>> {
  // See below for implementing vm2 with TypeScript.
  // https://github.com/patriksimek/vm2/issues/323
  // ts.transpile(e.value.code)
  return codeEval(e, e.value.code).then((result: unknown) => {
    // Subject results to scrutiny.
    // This doesn't feel the most type-safe, because the types provided here are
    // believed (this could just be an "as" usage.
    if(validationErrorArraySchema(result)) {
      return result
    } else {
      throw new Error(
        "Error deserializing validation errors: \n"
          + (validationErrorArraySchema?.errors || []).join("\n"),
      )
    }
  })
}

export function codeEval(e: Entity, typeScript: string): Promise<unknown> {
  // TODO: Add ajv to this.
  // TypeScript has a type which transpile accepts that is both very difficult
  // to get to (and not documented as a type) and that type is incompatible with
  // whatever gets deserialized from JSON because there's enums or something in
  // there. So whatever - just disable TypeScript here since it's putting up a
  // fight. 182974 Internet points to the one who can figure out how to make
  // this properly typesafe.
  const code = ts.transpile(typeScript, typeScriptConfig.compilerOptions as any)
  const api = {
    entity: e,
  }
  const plugin = new jailed.DynamicPlugin(code, api)
  return new Promise((resolve, reject) => {
    plugin.whenConnected(() => {
      if(plugin.remote instanceof Object) {
        if(plugin.remote.hasOwnProperty('operate')) {
          if(typeof plugin.remote.operate == 'function') {
            plugin.remote.operate(e, resolve)
          }
        }
      }
    })
    // plugin.whenDisconnected(resolve)
    plugin.whenFailed(reject)
  })
}
