import React from 'react'
import { type OrderOfBattle } from './model'

export type Props = {
  order: OrderOfBattle,
}

export type Component = React.FC<Props>

export const componentFn = (cssClass: string) => {
  const component = (props: Props) => {
    return <tr className={cssClass}>
      <td>
        {props.order.name}
      </td>
      <td>
        {props.order.faction}
      </td>
      <td>
        {props.order.powerRating}
      </td>
    </tr>
  }
  component.displayName = 'OrderOfBattleRow'
  return component
}
