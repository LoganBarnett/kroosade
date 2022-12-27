import { always } from 'ramda'
import { noneOption } from './data-generic'
import {
  type ExclusiveOption,
  type ExtantOption,
  type NumericOption,
  type PoolOption,
  type PooledRepeatingExtantOption,
  type AppOption,
  type RepeatingExtantOption,
  cost,
  modelCountPowerRating,
  modelCountPoints,
  modelCountValidation,
} from './model'

export const smirkousMaximusOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(150)),
    cost('power-rating', always(10)),
  ],
  name: 'Smirkous Maximus',
  key: 'smirkous-maximus',
  kind: 'extant-option',
  removable: true,
  tags: ['smirks', 'elite', 'unit'],
}

export const options: ReadonlyArray<AppOption> = [
  smirkousMaximusOption,
]
