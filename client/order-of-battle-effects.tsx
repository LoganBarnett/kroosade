import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import {
  store,
  retrieve,
} from './store'
import { type OrderOfBattle } from './model'

export function create(o: OrderOfBattle) {
  store('ordersOfBattle', list().concat([o]))
}

export function list(): Array<OrderOfBattle> {
  return retrieve('ordersOfBattle')
}

export function useOrdersOfBattle(
): [ Array<OrderOfBattle>, (o: OrderOfBattle) => void] {
  const [ ordersOfBattle, setOrdersOfBattle ] = useState(list() || [])
  const createOrderOfBattle = (o: OrderOfBattle) => {
    create(o)
    setOrdersOfBattle(list())
  }
  return [ ordersOfBattle, createOrderOfBattle ]
}
