import { type Option, type AppSelection } from './model'

export const optionForSelection = (
  options: ReadonlyArray<Option>,
  selection: AppSelection,
  // TypeScript's optional (T?) doesn't work here because it's strictly
  // null, yet Array.prototype.find is marked as returning a possible undefined.
  // This matches the spec as reported by MDN:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  // `void' is actually a different type that means "We neglected to return
  // anything", which in JavaScript is always undefined, and so I find this
  // perplexing. However this is the distinction they have wrought, and they
  // didn't see the utility in void null | undefined. And so we put more mileage
  // on our keyboards.
  //
  // I will say though, this makes me really want to get a proper Result an
  // Optional types going.
): Option | null | undefined => {
  return options.find(o => o.key == selection.optionKey)
}

export const selectionTitle = (
  options: ReadonlyArray<Option>,
  selection: AppSelection,
): string => {
  return selection.name != null
    ? selection.name
    : (
      optionForSelection(options, selection)?.name
      || `Option '${selection.optionKey}' not found!`
    )
}

type Traversal<A> = (a: A) => A | null | undefined
/**
 * Finds data in a deeply nested structure.
 *
 * The best way to accomplish a deep find is with a path. Just like how we might
 * traverse a file hierarchy to find a file, in order to do something with that
 * file we will need the file's path. So deep find must return a path-like
 * entity that can be applied to get the desired data.
 *
 * If a traverse function can be used to access any item within a given layer
 * of a tree, then the path-like entity is a series of traversal functions,
 * ready to be applied for actually gathering the data.
 */
export const deepFind = <A,>(
  traversals: ReadonlyArray<Traversal<A>>,
  compare: (x: A, y: A) => boolean,
  traverse: (a: A) => ReadonlyArray<A>,
  current: A,
  desired: A,
): Array<Traversal<A>> => {
  const self = traversals.concat([(parent) => {
    return traverse(parent).find(compare.bind(null, current))
  }])
  if(compare(desired, current)) {
    return self
  } else {
    return traverse(current).reduce((acc, child) => {
      const ts = deepFind(self, compare, traverse, child, desired)
      if(ts != traversals) {
        return ts
      } else {
        return acc
      }
    }, [] as Array<Traversal<A>>)
  }
}

/**
 * Modifies a deeply nested structure in an immutable fashion.
 */
export const deepModify = () => {

}
