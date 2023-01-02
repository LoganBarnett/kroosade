/**
 */

import React, { type FC, type ReactElement, type ReactNode } from 'react'
import { type BooleanSelection, type AppOption } from './model'

export type Props = {
  children: ReactNode,
  options: ReadonlyArray<AppOption>,
  selection: BooleanSelection,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <fieldset className={className}>
      <input type="check" checked={props.selection.value} />
      {props.children}
    </fieldset>
  }
  component.displayName = 'BooleanSelectionEditor'
  return component
}
