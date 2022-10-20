/**
 */

import React, { type FC, type ReactElement } from 'react'
import { type BooleanSelection, type AppOption } from './model'

export type Props = {
  options: ReadonlyArray<AppOption>,
  selection: BooleanSelection,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <fieldset className={className}>
      <input type="check" checked={props.selection.value} />
    </fieldset>
  }
  component.displayName = 'BooleanSelectionEditor'
  return component
}
