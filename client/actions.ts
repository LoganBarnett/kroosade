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

export type CandidateSelectModeAction = {
  adding: boolean,
  // We need the candidate here, or the defaulting logic gets messed up during
  // mode change, and we lose our default candidate.
  candidate: Selectable | null | undefined,
  key: string,
  type: 'candidate-select-mode',
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
  | CandidateSelectModeAction
  | SelectionAddChildAction
  | SelectionChangeExclusiveAction
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
 * Switch the candidate selection on or off in the UI.
 */
export const candidateSelectModeAction = (
  key: string,
  candidate: Selectable | null | undefined,
  adding: boolean,
): CandidateSelectModeAction => {
  return {
    adding,
    candidate,
    key,
    type: 'candidate-select-mode',
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
