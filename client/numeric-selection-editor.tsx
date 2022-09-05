/**
 */

import React, { type FC, type ReactElement } from 'react'
import { type NumericSelection, type Option } from './model'

export type Props = {
  options: ReadonlyArray<Option>,
  selection: NumericSelection,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <fieldset className={className}>
      <input type="number" value={props.selection.value} />
    </fieldset>
  }
  component.displayName = 'NumericSelectionEditor'
  return component
}
