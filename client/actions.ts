import {
  type AppOption,
  type AppSelection,
  type NumericSelection,
  type Selectable,
} from "./model"

export type CandidateSelectAction = {
  key: string,
  selectable: Selectable,
  type: 'candidate-select',
}

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
  option: AppOption,
  selectable: Selectable,
  type: 'selection-change-exclusive',
}

export type SelectionChangeExclusiveAddingModeAction = {
  adding: boolean,
  selectableKey: string,
  type: 'selection-change-exclusive-adding-mode',
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
  | CandidateSelectAction
  | SelectionAddChildAction
  | SelectionChangeExclusiveAction
  | SelectionChangeExclusiveAddingModeAction
  | SelectionChangeNumberAction
  | SelectionChangeNameAction
  | SelectionCreateRosterAction
  | SelectionFocusAction
  | SelectionRemoveChildAction

/**
 * Select a candidate to perform an action upon.
 */
export const candidateSelectAction = (
  key: string,
  selectable: Selectable,
): CandidateSelectAction => {
  return {
    key,
    selectable,
    type: 'candidate-select',
  }
}
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
  selectable: Selectable,
  option: AppOption,
): SelectionChangeExclusiveAction => {
  return {
    option,
    selectable,
    type: 'selection-change-exclusive',
  }
}

export const selectionChangeExclusiveAddingModeAction = (
  selectableKey: string,
  adding: boolean,
): SelectionChangeExclusiveAddingModeAction => {
  return {
    adding,
    selectableKey,
    type: 'selection-change-exclusive-adding-mode',
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
