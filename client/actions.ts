import {
  type AppOption,
  type AppSelection,
  type ExclusiveSelection,
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
  selected: AppOption,
  selection: ExclusiveSelection,
  type: 'selection-change-exclusive',
}

export type SelectionChangeRepeatingCandidateAction = {
  candidate: Selectable,
  selectionId: string,
  type: 'selection-change-repeating-candidate',
}

export type SelectionChangeRepeatingCandidateAddingModeAction = {
  adding: boolean,
  selectableKey: string,
  type: 'selection-change-repeating-candidate-adding-mode',
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
  | SelectionChangeNumberAction
  | SelectionChangeNameAction
  | SelectionChangeRepeatingCandidateAddingModeAction
  | SelectionChangeRepeatingCandidateAction
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
  selection: ExclusiveSelection,
  selected: AppOption,
): SelectionChangeExclusiveAction => {
  return {
    selected,
    selection,
    type: 'selection-change-exclusive',
  }
}

export const selectionChangeRepeatingCandidateAddingModeAction = (
  selectableKey: string,
  adding: boolean,
): SelectionChangeRepeatingCandidateAddingModeAction => {
  return {
    adding,
    selectableKey,
    type: 'selection-change-repeating-candidate-adding-mode',
  }
}

export const selectionChangeRepeatingCandidateAction = (
  candidate: Selectable,
  selectionId: string,
): SelectionChangeRepeatingCandidateAction => {
  return {
    candidate,
    selectionId,
    type: 'selection-change-repeating-candidate',
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
