import React, { useState } from 'react'
import { useOrdersOfBattle } from './order-of-battle-effects'
import {
  type Component as OrderOfBattleRowComponent,
} from './order-of-battle-row'

type OrderOfBattleTableProps = {}

export const componentFn = (
  OrderOfBattleRow: OrderOfBattleRowComponent,
  cssClass: string,
) => {
  const component = (props: OrderOfBattleTableProps) => {
    const [ newOrderName, setNewOrderName ] = useState('')
    const [ ordersOfBattle, createOrderOfBattle ] = useOrdersOfBattle()
    return <table className={cssClass}>
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Faction
          </th>
          <th>
            Power Rating
          </th>
        </tr>
      </thead>
      <tbody>
        {ordersOfBattle.map(o => <OrderOfBattleRow order={o} />)}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <label>
              New Name
              <input
                type="text"
                value={newOrderName}
                onChange={n => setNewOrderName(n.target.value)}
              />
            </label>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => createOrderOfBattle({
              name: newOrderName,
              faction: 'guys',
              powerRating: 0,
            })}>
              add
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  }
  // The way components are constructed with a cssClass prevents JSX from
  // detecting the display name and subsequently setting it, so we do it
  // manually.
  component.displayName = 'OrderOfBattleTable'
  return component
}
