import React, {
  type ReactElement,
  type ReactNode,
  createContext,
  useMemo,
  useReducer,
} from 'react'
import {
  type AppAction,
  type AppState,
  reducer as appReducer,
} from './app-reducer'
import { roster } from './example-roster'

export const Context = createContext({
  state: { roster: null, focus: null } as AppState,
  dispatch: ((_: AppAction) => void undefined) as React.Dispatch<AppAction>,
})

type Props = {
  children: ReactNode,
}

export const Reduced = (props: Props): ReactElement => {
  const [state, dispatch] = useReducer(appReducer, { roster, focus: null })
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return <Context.Provider value={contextValue}>
    {props.children}
  </Context.Provider>
}