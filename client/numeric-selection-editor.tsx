/**
 */

import React, {
  useContext,
  type FC,
  type ReactElement,
  type ReactNode,
} from 'react'
import { selectionChangeNumberAction } from './actions'
import { type NumericSelection, type AppOption } from './model'
import { Context } from './reducer-provider'

export type Props = {
  children: ReactNode,
  options: ReadonlyArray<AppOption>,
  selection: NumericSelection,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { dispatch } = useContext(Context)
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
      dispatch(selectionChangeNumberAction(
        props.selection,
        parseInt(e.currentTarget.value),
      ))
    }
    return <fieldset className={className}>
      <input type="number" value={props.selection.value} onChange={onChange}/>
    </fieldset>
  }
  component.displayName = 'NumericSelectionEditor'
  return component
}
