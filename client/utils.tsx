import { type Option, type Selection } from './model'

export const selectionTitle = (
  options: ReadonlyArray<Option>,
  selection: Selection,
): string => {
  return selection.name != null
    ? selection.name
    : (
      options.find(o => o.key == selection.optionKey)?.name
      || `Option '${selection.optionKey}' not found!`
    )
}
