/**
 * This file is about data storage for the client. At this time there is no
 * server. It is using local storage.
 *
 * React's useState is a special JSX transformation that occurs within a React
 * component and is bound to that component. This means we can't create a
 * custom, stateful hook on its own. We need some kind of actual store in which
 * things can be stored, probably using useEffect instead of useState. useState
 * appears to be good for trivial state changes, but not for heavy data often
 * used during data management.
 *
 * For this, we will use the browser's store. This ensures a local database
 * without having to worry about an actual storage service running
 * independently. There may be size limitations we'll bump up against, but we
 * can visit that when we see that happening.
 */

export function store<A>(storeName: string, a: A) {
  window.localStorage.setItem(storeName, JSON.stringify(a))
}

export function retrieve<A>(storeName: string): Array<A> {
  // Doh, TypeScript just allows casting here. Nasty and unsafe.
  // JSON.parse returns any in TypeScript. Perhaps there is an override
  // somewhere so we needn't be so vigilant?
  // TODO: Also getItem is not typesafe either - it returns a hard string rather
  // than a maybe string.
  return JSON.parse(window.localStorage.getItem(storeName) || '[]')
}
