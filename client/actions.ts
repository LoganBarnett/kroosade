import {
  type AppOption,
  type AppSelection,
  type ExclusiveSelection,
  type NumericSelection,
} from "./model"

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
  selected: AppOption,
  type: 'selection-change-exclusive',
}

export type SelectionChangeNumberAction = {
  selection: NumericSelection,
  type: 'selection-change-number',
  value: number,
}

export type SelectionChangeNameAction = {
  name: string,
  selection: AppSelection,
  type: 'selection-change-name',
}

export type SelectionRemoveChildAction = {
  child: AppSelection,
  selection: AppSelection,
  type: 'selection-remove-child',
}

export type SelectionCreateRosterAction  = {
  roster: AppSelection,
  type: 'selection-create-roster',
}

export type AppAction =
  | SelectionAddChildAction
  | SelectionChangeExclusiveAction
  | SelectionChangeNumberAction
  | SelectionChangeNameAction
  | SelectionCreateRosterAction
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
  selected: AppOption,
): SelectionChangeExclusiveAction => {
  return {
    selection,
    type: 'selection-change-exclusive',
    selected,
  }
}

/**
 * Change the name of a selection.
 */
export const selectionChangeNameAction = (
  selection: AppSelection,
  name: string,
): SelectionChangeNameAction => {
  return {
    name,
    selection,
    type: 'selection-change-name',
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

export const selectionCreateRosterAction = (
  roster: AppSelection,
): SelectionCreateRosterAction => {
  return {
    roster,
    type: 'selection-create-roster',
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
