import { type AppSelection } from './model'

export type AppState = {
  roster: AppSelection | null | undefined,
}

export type SelectionAddChildAction = {
  type: 'selection-add-child',
  selection: AppSelection,
  newChild: AppSelection,
}

export type AppAction =
  | SelectionAddChildAction

export const initialState = (): AppState => {
  return { roster: null, }
}

export const reducer = (state: AppState, action: AppAction): AppState => {
  return state
}
