import React, { type FC, type ReactElement, type ReactNode } from 'react'
import buttonFn from './button'
import buttonStyles from './button.module.css'
import { type AppSelection } from './model'

export type Props = {
  children: ReactNode,
  focus: (s: AppSelection) => void,
  selection: AppSelection,
}

export default (className: String): FC<Props> => {
  const FocusButton = buttonFn(buttonStyles.focus)
  const component = (props: Props): ReactElement => {
    return <>
      <FocusButton onClick={() => props.focus(props.selection)}>
        {props.children}
      </FocusButton>
    </>
  }
  component.displayName = 'FocusSeleciton'
  return component
}
