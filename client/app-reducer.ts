import {
  type AppSelection,
  type ExclusiveSelection,
  type NumericSelection,
} from './model'
import { append, equals, find, prop, update } from 'ramda'
import { deepModify, findByPath, pathTo } from './utils'

export type AppState = {
  roster: AppSelection | null | undefined,
  focus: AppSelection | null | undefined,
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
  selection: ExclusiveSelection,
  type: 'selection-change-exclusive',
  selected: string,
}

export type SelectionChangeNumberAction = {
  selection: NumericSelection,
  type: 'selection-change-number',
  value: number,
}

export type AppAction =
  | SelectionAddChildAction
  | SelectionChangeExclusiveAction
  | SelectionChangeNumberAction
  | SelectionFocusAction

export const initialState = (): AppState => {
  return { roster: null, focus: null }
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

export const selectionAddChildReducer = (
  action: AppAction,
  selection: AppSelection,
): AppSelection => {
  if(action.type == 'selection-add-child') {
    return Object.assign(
      {},
      selection,
      { children: append(action.newChild, selection.children) },
    )
  } else {
    return selection
  }
}

export const selectionChangeExclusiveReducer = (
  action: AppAction,
  selection: AppSelection,
): AppSelection => {
  if(action.type == 'selection-change-exclusive') {
    return {
      ...action.selection,
      selected: action.selected,
    }
  } else {
    return selection
  }
}


export const selectionChangeNumberReducer = (
  action: AppAction,
  selection: AppSelection,
): AppSelection => {
  if(action.type == 'selection-change-number') {
    return {
      ...action.selection,
      value: action.value,
    }
  } else {
    return selection
  }
}

export const selectionFocusAction = (s: AppSelection): SelectionFocusAction => {
  return {
    selection: s,
    type: 'selection-focus',
  }
}

type SelectionReducer = (action: AppAction, selection: AppSelection) => AppSelection

const selectionReducerFromAction = (action: AppAction): SelectionReducer => {
  switch(action.type) {
    case 'selection-add-child':
      return selectionAddChildReducer
    case 'selection-change-exclusive':
      return selectionChangeExclusiveReducer
    case 'selection-change-number':
      return selectionChangeNumberReducer
    default:
      return (_: AppAction, selection: AppSelection): AppSelection => selection
  }
}

const adjustFocus = (
  root: AppSelection,
  originalFocus: AppSelection | null | undefined,
  modified: AppSelection | null | undefined,
): AppSelection | null | undefined => {
  if(originalFocus?.id == modified?.id) {
    return modified
  } else if (originalFocus != null ){
    return findByPath(
      root,
      pathTo(
        [],
        (s1: AppSelection, s2: AppSelection): boolean => s1.id == s2.id,
        prop('children'),
        root,
        originalFocus,
      ),
    )
  } else {
    return null
  }
}

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch(action.type) {
    case 'selection-add-child':
    case 'selection-change-exclusive':
    case 'selection-change-number':
      console.log('action', action)
      if(state.roster != null) {
        const path = pathTo(
          [],
          equals,
          prop('children'),
          state.roster,
          action.selection,
        )
        const original = findByPath(state.roster, path)
        if(original != null) {
          const newRoot = deepModify(
            selectionReducerFromAction(action).bind(null, action),
            (parent, child) => {
              const i = parent.children.indexOf(original)
              return {
                ...parent,
                children: update(i, child, parent.children),
              }
            },
            path,
            state.roster,
          )
          return {
            ...state,
            focus: adjustFocus(newRoot, state.focus, findByPath(newRoot, path)),
            roster: newRoot,
          }
        } else {
          console.error('Got roster update when roster was null', action)
          // Error!
          return state
        }
      } else {
        console.error('Unhandled action type', action)
        // Error!
        return state
      }
    case 'selection-focus':
      return {
        ...state,
        focus: action.selection,
      }
  }
  console.error('Not sure what this is', action)
  return state
}
