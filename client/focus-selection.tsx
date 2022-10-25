import React, {
  type FC,
  type ReactElement,
  type ReactNode,
  useContext,
} from 'react'
import { selectionFocusAction } from './app-reducer'
import buttonFn from './button'
import buttonStyles from './button.module.css'
import { type AppSelection } from './model'
import { Context } from './reducer-provider'

export type Props = {
  children: ReactNode,
  focus: (s: AppSelection) => void,
  selection: AppSelection,
}

export default (className: String): FC<Props> => {
  const FocusButton = buttonFn(buttonStyles.focus)
  const component = (props: Props): ReactElement => {
    const { state, dispatch } = useContext(Context)
    const focusFn = (s: AppSelection) => dispatch(selectionFocusAction(s))
    return <>
      { state.focus?.id != props.selection.id
        ? <FocusButton onClick={() => focusFn(props.selection)}>
            {props.children}
          </FocusButton>
        : <></>
        }
    </>
  }
  component.displayName = 'FocusSeleciton'
  return component
}
