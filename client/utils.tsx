import { type Option, type Selection } from './model'

export const optionForSelection = (
  options: ReadonlyArray<Option>,
  selection: Selection,
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
  selection: Selection,
): string => {
  return selection.name != null
    ? selection.name
    : (
      optionForSelection(options, selection)?.name
      || `Option '${selection.optionKey}' not found!`
    )
}
