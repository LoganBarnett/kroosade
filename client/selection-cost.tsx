import React, { type FC, type ReactNode, type ReactElement } from 'react'
import {
  type Component as SelectionCostTypeComponent,
} from './selection-cost-type'
import { type AppOption, selectionCost, type AppSelection } from './model'

export type Props = {
  options: ReadonlyArray<AppOption>,
  root: AppSelection,
  selection: AppSelection,
}

export type Component = FC<Props>

export default (SelectionCostType: SelectionCostTypeComponent): FC<Props> => {
  const component = (props: Props): ReactElement => {
    // Probably more optimal ways to do this, but perfect need not be the enemy
    // of good.
    return <dl>
      <SelectionCostType
        cost={selectionCost(
          'points',
          props.options,
          props.root,
          props.selection,
        )}
      >
        Points
      </SelectionCostType>
      <SelectionCostType
        cost={selectionCost(
          'power-rating',
          props.options,
          props.root,
          props.selection,
        )}
      >
        Power Rating
      </SelectionCostType>
      <SelectionCostType
        cost={selectionCost(
          'command-points',
          props.options,
          props.root,
          props.selection,
        )}
      >
        Command Points
      </SelectionCostType>
    </dl>
  }
  component.displayName = 'SelectionCost'
  return component
}
