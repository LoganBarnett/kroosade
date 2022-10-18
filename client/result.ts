// See also https://github.com/rametta/pratica
type MapArg<A, B> = (a: A) => B

export type Result<A, Ea> = {
  andThen: <B>(f: (a: A) => Result<B, Ea>) => Result<B, Ea>,
  isOk: () => boolean,
  isErr: () => boolean,
  map: <B>(f: MapArg<A, B>) => Result<B, Ea>,
  mapErr: <Eb>(f: MapArg<Ea, Eb>) => Result<A, Eb>,
  orElse: <Eb>(f: (e: Ea) => Result<A, Eb>) => Result<A, Eb>,
}

export const err = <Ea>(error: Ea): Result<any, Ea> => {
  const self: Result<any, Ea> = {
    andThen: (_f): Result<any, Ea> => {
      return self
    },
    isOk: () => false,
    isErr: () => true,
    map: <A, B>(_f: MapArg<A, B>): Result<B, Ea> => {
      return self
    },
    mapErr: <Eb>(f: MapArg<Ea, Eb>): Result<any, Eb> => {
      return err(f(error))
    },
    orElse: <A, Eb>(f: (e: Ea) => Result<A, Eb>): Result<A, Eb> => {
      return f(error)
    },
  }
  return self
}


export const ok = <A>(data: A): Result<A, any> => {
  const self: Result<A, any> = {
    andThen: <B, E>(f: (a: A) => Result<B, E>): Result<B, E> => {
      return f(data)
    },
    isOk: () => true,
    isErr: () => false,
    map: <B>(f: MapArg<A, B>): Result<B, any> => {
      return ok(f(data))
    },
    mapErr: <Eb>(_f: MapArg<any, Eb>): Result<A, Eb> => {
      return self
    },
    orElse: (): Result<A, any> => {
      return ok(data)
    },
  }
  return self
}

export default {
  err,
  ok,
}
