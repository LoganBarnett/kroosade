import {
  type AppSelection,
  type ExclusiveSelection,
  type NumericSelection,
} from './model'
import { append, equals, find, prop, remove, update } from 'ramda'
import { deepModify, findByPath, pathTo } from './utils'
import Result from './result'
import Option, { type Option as OptionType } from './option'
import { type AppAction } from './actions'

export type AppState = {
  roster: AppSelection | null | undefined,
  focus: AppSelection | null | undefined,
}

export const initialState = (): AppState => {
  return { roster: null, focus: null }
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
      children: selection.children.map(c => {
        if(c.kind == 'extant-selection') {
          return {
            ...c,
            // TODO: Selected should really be the ID, but is optionKey. This
            // creates its own complications. Recursive edits would need to
            // adjust to the new ID like Focus does.
            selected: action.selected == c.optionKey,
          }
        } else {
          return c
        }
      }),
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

export const selectionRemoveChildReducer = (
  action: AppAction,
  selection: AppSelection,
): AppSelection => {
  if(action.type == 'selection-remove-child') {
    const i = selection.children.findIndex(c => c.id == action.child.id)
    if(i > -1) {
      return {
        ...action.selection,
        children: remove(i, 1, selection.children),
      }
    } else {
      console.error(`Could not find child ${action.child.id} \
(${action.child.name}) to remove for parent ${action.selection.name} \
(${action.selection.id}) in action ${action.type}.`)
      return selection
    }
  } else {
    return selection
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
    case 'selection-remove-child':
      return selectionRemoveChildReducer
    default:
      return (_: AppAction, selection: AppSelection): AppSelection => selection
  }
}

const adjustFocus = (
  root: AppSelection,
  originalFocus: AppSelection | null | undefined,
  modified: AppSelection | null | undefined,
): OptionType<AppSelection> => {
  if(originalFocus?.id == modified?.id) {
    return Option.intoOption(modified)
  } else if (originalFocus != null ){
    const path = pathTo(
        [],
        (s1: AppSelection, s2: AppSelection): boolean => s1.id == s2.id,
        prop('children'),
        root,
        originalFocus,
      )
    return findByPath(
      root,
      path.unwrapOr([]),
    ) // .inspect(focus => console.log('Found focus', focus))
  } else {
    return Option.none
  }
}

/**
 * Logs reducer activity. Wrap this around the main reducer to achieve logging.
 */
export const logReducer = (
  reducer: (state: AppState, action: AppAction) => AppState,
  state: AppState,
  action: AppAction
): AppState => {
  console.log('Before State', state)
  const newState = reducer(state, action)
  console.log('After State', newState)
  return newState
}

const appReducer = (state: AppState, action: AppAction): AppState => {
  console.log('action', action)
  switch(action.type) {
    case 'selection-add-child':
    case 'selection-change-exclusive':
    case 'selection-change-number':
    case 'selection-remove-child':
      if(state.roster != null) {
        // Capture so TypeScript doesn't lose the refinement.
        const roster = state.roster
        const path = pathTo(
          [],
          (s1: AppSelection, s2: AppSelection): boolean => s1.id == s2.id,
          prop('children'),
          roster,
          action.selection,
        ).unwrapOr([])
        return findByPath(state.roster, path).andThen(original => {
          return deepModify(
            selectionReducerFromAction(action).bind(null, action),
            (parent, child) => {
              const i = parent.children.findIndex(x => x.id == child.id)
              // This really shouldn't be possible.
              if(i < 0) {
                console.error(
                  'Error: found original',
                  original,
                  'at',
                  i,
                  parent.children[i]
                )
                return parent
              } else {
                return {
                  ...parent,
                  children: update(i, child, parent.children),
                }
              }
            },
            path,
            roster,
          ).andThen((newRoot): OptionType<AppState> => {
            return findByPath(newRoot, path).map((modified): AppState => {
              return {
                ...state,
                focus: adjustFocus(
                  newRoot,
                  state.focus,
                  modified,
                ).intoNullable(),
                roster: newRoot,
              }
            })
          })
        }).unwrapOrElse(() => {
          // Error!
          console.error('Got roster update when roster was null', action)
          return state
        })
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

export const reducer = (state: AppState, action: AppAction): AppState => {
  return logReducer(appReducer, state, action)
}
