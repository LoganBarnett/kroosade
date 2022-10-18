// Do not include this file. Webpack will filter it out. This is just a type
// test, so it needn't actually run.

import Result, { type Result as ResultType } from './result'

declare function foobar(): ResultType<number, Error>

class HappinessError extends Error {
  happy() {
    return true
  }
}
  // .map(s => s.toUpperCase())
const r0 = Result.ok('foo')
const r1 = r0
  .map(s => parseInt(s))

const r2 = r1
  .map(i => i * 2)
  .mapErr(e => new HappinessError())

const r3 = foobar()
r3
  .map(i => i.toString())
  .map(s => s.toUpperCase())
  .orElse(e => Result.ok(e.message))
  .andThen(i => Result.err(new HappinessError(i.toString())))
  .andThen(_i => foobar())
  .andThen(_e => Result.ok('happy'))
  .orElse(_e => Result.ok('happy'))
