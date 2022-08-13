// Not standard, and not accepted. Pity. See this really good answer:
// https://stackoverflow.com/a/59200046
// This allows using hasOwnProperty as a type guard to refine the object
// further.  I understand hasOwnProperty to be superior to the "in" syntax, in
// part because it's a function instead of syntax, and therefore is composable.
// In other part because hasOwnProperty works regardless of prototype chains.
interface Object {
  hasOwnProperty<K extends PropertyKey>(key: K): this is Record<K, unknown>;
}
