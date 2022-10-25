import { AppSelection, ExclusiveSelection, NumericSelection } from "./model"

export type SelectionFocusAction = {
  selection: AppSelection,
  type: 'selection-focus',
}

export type SelectionAddChildAction = {
  newChild: AppSelection,
  selection: AppSelection,
  type: 'selection-add-child',
}

export type SelectionChangeExclusiveAction = {
  selection: ExclusiveSelection,
  type: 'selection-change-exclusive',
  selected: string,
}

export type SelectionChangeNumberAction = {
  selection: NumericSelection,
  type: 'selection-change-number',
  value: number,
}

export type SelectionRemoveChildAction = {
  child: AppSelection,
  selection: AppSelection,
  type: 'selection-remove-child',
}

export type AppAction =
  | SelectionAddChildAction
  | SelectionChangeExclusiveAction
  | SelectionChangeNumberAction
  | SelectionFocusAction
  | SelectionRemoveChildAction

/**
 * Add a child to the selection.
 */
export const selectionAddChildrenAction = (
  selection: AppSelection,
  newChild: AppSelection,
): SelectionAddChildAction=> {
  return {
    type: 'selection-add-child',
    selection,
    newChild,
  }
}

export const selectionChangeExclusiveAction = (
  selection: ExclusiveSelection,
  selected: string,
): SelectionChangeExclusiveAction => {
  return {
    selection,
    type: 'selection-change-exclusive',
    selected,
  }
}

/**
 *
 */
export const selectionChangeNumberAction = (
  selection: NumericSelection,
  value: number,
): SelectionChangeNumberAction => {
  return {
    selection,
    type: 'selection-change-number',
    value,
  }
}

export const selectionFocusAction = (s: AppSelection): SelectionFocusAction => {
  return {
    selection: s,
    type: 'selection-focus',
  }
}

export const selectionRemoveChildAction = (
  selection: AppSelection,
  child: AppSelection,
): SelectionRemoveChildAction => {
  return {
    child,
    selection,
    type: 'selection-remove-child',
  }
}
