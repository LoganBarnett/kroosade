import { always, drop, head, identity, reduce } from 'ramda'
import { type AppOption, type AppSelection } from './model'
import Option, { type Option as OptionType } from './option'

export const optionForSelection = (
  options: ReadonlyArray<AppOption>,
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
): AppOption | null | undefined => {
  return options.find(o => o.key == selection.optionKey)
}

export const selectionTitle = (
  options: ReadonlyArray<AppOption>,
  selection: AppSelection,
): string => {
  return selection.name != null
    ? selection.name
    : (optionForSelection(options, selection)?.name
      || `AppOption '${selection.optionKey}' not found!`
    )
}

type Traversal<A extends {}> = (a: A) => OptionType<A>
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
export const pathTo = <A extends {},>(
  traversals: ReadonlyArray<Traversal<A>>,
  compare: (x: A, y: A) => boolean,
  traverse: (a: A) => ReadonlyArray<A>,
  current: A,
  desired: A,
): OptionType<ReadonlyArray<Traversal<A>>> => {
  if(compare(desired, current)) {
    return Option.some(traversals)
  } else {
    return traverse(current).reduce((acc, child) => {
      if(acc.isSome()) {
        // We already found what we were looking for, short circuit out of the
        // rest of the search.
        return acc
      } else {
        const self = traversals.concat([(parent) => {
          return Option.intoOption(
            traverse(parent).find(compare.bind(null, child)),
          )
        }])
        const path = pathTo(self, compare, traverse, child, desired)
        return path.map(ts => {
          return ts != traversals ? ts : acc
        })
      }
      // console.log('ts', ts)
      // console.log('traversals', traversals)
      // if(ts != traversals) {
      //   return ts
      // } else {
      //   return acc
      // }
    }, Option.none)
  }
}

export const pathDebug = <A extends {},>(
  traversals: ReadonlyArray<Traversal<A>>,
): void => {
  traversals
}
/**
 * Using a series of traversals provided by pathTo, return the value found by
 * the traversals. Since the structure might have altered since we found our
 * traversals, the traversals may fail, in which case it returns null/undefined.
 */
export const findByPath = <A extends {},>(
  root: A,
  traversals: ReadonlyArray<Traversal<A>>,
): OptionType<A> => {
  return reduce(
    (prev, traversal) => {
      return prev
        // .inspect(p => console.log('traversing', p))
        .andThen(p => traversal(p))
    },
    Option.intoOption(root),
    traversals,
  )
}

/**
 * Modifies a deeply nested structure in an immutable fashion.
 */
export const deepModify = <A extends {},>(
  modifyChild: (child: A) => A,
  assignModification: (parent: A, child: A) => A,
  traversals: ReadonlyArray<Traversal<A>>,
  current: A,
): OptionType<A> => {
  const traversal = head(traversals)
  if(traversal == null) {
    // We've reached the bottom of the tree. Time to update.
    return Option.intoOption(modifyChild(current))
  } else {
    return traversal(current)
      .orElse(() => {
        console.error('Traversal failed for', current)
        return Option.some(current)
      })
      .andThen(child => {
        return deepModify(
          modifyChild,
          assignModification,
          drop(1, traversals),
          child,
        ).map(newChild => assignModification(current, newChild))
      })
  }
}
