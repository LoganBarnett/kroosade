import React, { type FC, type ReactNode, type ReactElement } from 'react'
import {
  selectionCost,
  type AppOption,
  type AppSelection,
  type Cost,
} from './model'

export type Props = {
  children: ReactNode,
  cost: number,
}

export type Component = FC<Props>

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <>
      <dt>{props.children}</dt>
      <dd>{props.cost}</dd>
    </>
  }
  component.displayName = 'SelectionCostType'
  return component
}
