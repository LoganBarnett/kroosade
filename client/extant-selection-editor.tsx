/**
 * Extant selections can only be added or removed. The editor allows for adding
 * or removing.
 */

import React, { type FC, type ReactNode, type ReactElement, useContext } from 'react'
import { selectionFocusAction } from './app-reducer'
import buttonFn from './button'
import buttonStyles from './button.module.css'
import {
  type AppOption,
  type AppSelection,
  type ExtantSelection,
} from './model'
import { Context } from './reducer-provider'
import { selectionTitle } from './utils'
import visibilityFn from './visible'

export type Props = {
  options: ReadonlyArray<AppOption>,
  selection: ExtantSelection,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const FocusButton = buttonFn(buttonStyles.focus)
  const DeleteButton = buttonFn(buttonStyles.remove)
  const Visibility = visibilityFn('display')
  const component = (props: Props): ReactElement => {
    const { dispatch } = useContext(Context)
    const focusFn = (s: AppSelection) => dispatch(selectionFocusAction(s))
    return <fieldset className={className}>
      <Visibility visible={props.selection.selected}>
        <FocusButton onClick={() => focusFn(props.selection)}>
          focus
        </FocusButton>
        <DeleteButton onClick={() => {}}>
          remove {selectionTitle(props.options, props.selection)}
        </DeleteButton>
      </Visibility>
    </fieldset>
  }
  component.displayName = 'ExtantSelectionEditor'
  return component
}
