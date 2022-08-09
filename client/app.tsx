/// <reference types="react/experimental" />
/// <reference types="react/next" />
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { componentFn as orderOfBattleTableFn } from './order-of-battle'
import { componentFn as orderOfBattleRowFn } from './order-of-battle-row'
console.log('hi')
// @ts-ignore - I guess createRoot isn't supported yet. I have tried
// react-dom/experimental and react-dom/next as imported types and references,
// but still no joy.
const root = ReactDOM.createRoot(document.querySelector('body'))
const OrderOfBattleRow = orderOfBattleRowFn('rowClass')
const OrderOfBattleTable = orderOfBattleTableFn(OrderOfBattleRow, 'fooClass')
const h1 = <h1>header 1</h1>
root.render(<OrderOfBattleTable />)

console.log('bye')
