import React, { type FC, type ReactElement, type ReactNode } from 'react'
import buttonFn from './button'
import buttonStyles from './button.module.css'
import { type Selection } from './model'

export type Props = {
  children: ReactNode,
  focus: (s: Selection) => void,
  selection: Selection,
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
