/**
 * Extant selections can only be added or removed. The editor allows for adding
 * or removing.
 */

import React, { type FC, type ReactNode, type ReactElement } from 'react'
import { type ExtantSelection, type AppOption, } from './model'
import buttonFn from './button'
import buttonStyles from './button.module.css'
import visibilityFn from './visible'

export type Props = {
  options: ReadonlyArray<AppOption>,
  selection: ExtantSelection,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const AddButton = buttonFn(buttonStyles.add)
  const DeleteButton = buttonFn(buttonStyles.remove)
  const Visibility = visibilityFn('display')
  const component = (props: Props): ReactElement => {
    return <fieldset className={className}>
      <Visibility visible={!props.selection.selected}>
        <AddButton onClick={() => {}}>add</AddButton>
      </Visibility>
      <Visibility visible={props.selection.selected}>
        <DeleteButton onClick={() => {}}>remove</DeleteButton>
      </Visibility>
    </fieldset>
  }
  component.displayName = 'ExtantSelectionEditor'
  return component
}
