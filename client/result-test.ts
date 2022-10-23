// Do not include this file. Webpack will filter it out. This is just a type
// test, so it needn't actually run.

import Result, { type Result as ResultType } from './result'

declare function foobar(): ResultType<number, Error>

class HappinessError extends Error {
  happy() {
    return true
  }
}
// ok gives us the type based on the input.
const r0: ResultType<string, Error> = Result.ok('foo')
// map changes the first type parameter (the data type) of result type.
const r1: ResultType<number, Error> = r0
  .map(s => parseInt(s))

// mapErr changes the type of the error type.
const r2: ResultType<number, HappinessError> = r1
  .map(i => i * 2)
  .mapErr(e => new HappinessError())

const r3: ResultType<number, Error> = foobar()
const r4: ResultType<string, HappinessError> = r3
  .map(i => i.toString())
  .map(s => s.toUpperCase())
  .orElse(e => Result.ok(e.message))
  .andThen(i => Result.err(new HappinessError(i.toString())))
  .andThen(_i => foobar())
  .andThen(_e => Result.ok('happy'))
  // This should probably reset our error type, but I don't observe that here.
  // That's because of the any typing on the error. So it gets lost.
  .orElse(_e => Result.ok('happy'))

foobar()
  // This might seem a little weird but we can't change the type here. This is
  // how Rust's Result works too, so we're not out of line. This is for the
  // simple reason that the type would be A | B because we don't know if the
  // Result is ok or err.
  // @ts-expect-error
  .orElse(_e => Result.ok('happy'))
