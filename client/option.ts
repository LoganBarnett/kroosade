
export class UnsafeUnwrapError extends Error {}

export type Option<A extends {}> = {
  andThen: <B extends {}>(f: (a: A) => Option<B>) => Option<B>,
  intoNullable: () => A | null | undefined,
  inspect: (f: (a: A) => undefined | null | void) => Option<A>,
  isSome: () => boolean,
  map: <B extends {}>(f: (a: A) => B) => Option<B>,
  orElse: (f: () => Option<A>) => Option<A>,
  unwrap: () => A,
  unwrapOr: (b: A) => A,
  unwrapOrElse: (f: () => A) => A,
}

// There is only ever one none. No need to recompute it.
export const none: Option<any> = {
  andThen: <B extends {}>(_f: (a: any) => Option<B>): Option<B> => {
    return none
  },
  inspect: (_f) => none,
  intoNullable: () => null,
  isSome: () => false,
  map: <B extends {}>(_f: (a: any) => B): Option<B> => {
    return none
  },
  orElse: <A extends {}>(f: () => Option<A>): Option<A> => {
    return f()
  },
  unwrap: () => {
    throw new UnsafeUnwrapError()
  },
  unwrapOr: <A extends {}>(b: A): A => {
    return b
  },
  unwrapOrElse: <A>(f: () => A): A => {
    return f()
  },
}

export const some = <A extends {}>(data: A): Option<A> => {
  const self: Option<A> = {
    andThen: <B extends {}>(f: (a: A) => Option<B>): Option<B> => {
      return f(data)
    },
    inspect: (f) => {
      f(data)
      return self
    },
    intoNullable: () => data,
    isSome: () => true,
    map: <B extends {}>(f: (a: A) => B): Option<B> => {
      return some(f(data))
    },
    orElse: (_f: () => Option<A>): Option<A> => {
      return self
    },
    unwrap: () => {
      return data
    },
    unwrapOr: (_b: A): A => {
      return data
    },
    unwrapOrElse: (_f: (b: A) => A): A => {
      return data
    },
  }
  return self
}

export const intoOption = <A>(
  data: A | null | undefined,
): Option<NonNullable<A>> => {
  return data == null ? none : some(data)
}

export default {
  intoOption,
  none,
  some,
}
