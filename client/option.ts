
export type Option<A> = {
  map: <B>(f: (a: A) => B) => Option<B>,
  andThen: <B>(f: (a: A) => Option<B>) => Option<B>,
  orElse: (f: () => Option<A>) => Option<A>,
}

export const none = (): Option<any> => {
  const self: Option<any> = {
    andThen: <B>(_f: (a: any) => Option<B>): Option<B> => {
      return self
    },
    map: <B>(_f: (a: any) => B): Option<B> => {
      return self
    },
    orElse: <A>(f: () => Option<A>): Option<A> => {
      return f()
    },
  }
  return self
}

export const some = <A>(data: A): Option<A> => {
  const self: Option<A> = {
    andThen: <B>(f: (a: A) => Option<B>): Option<B> => {
      return f(data)
    },
    map: <B>(f: (a: A) => B): Option<B> => {
      return some(f(data))
    },
    orElse: (_f: () => Option<A>): Option<A> => {
      return self
    },
  }
  return self
}

export default {
  none,
  some,
}
