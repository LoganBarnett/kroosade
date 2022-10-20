import { type AppSelection } from './model'

export const roster: AppSelection = {
  children: [
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  children: [],
                  id: '5',
                  kind: 'numeric-selection',
                  name: null,
                  optionKey: 'dire-avengers-unit-size',
                  value: 4,
                },
                {
                  children: [],
                  id: '6',
                  kind: 'exclusive-selection',
                  name: null,
                  optionKey: 'dire-avengers-exarch-power',
                  selected: 'dire-avengers-exarch-power-stand-firm',
                },
                {
                  children: [],
                  id: '7',
                  kind: 'exclusive-selection',
                  name: null,
                  optionKey: 'dire-avengers-exarch-wargear',
                  selected: 'dire-avengers-exarch-wargear-two-avenger-shuriken-catapults',
                },
              ],
              id: '4',
              kind: 'extant-selection',
              name: null,
              optionKey: 'dire-avengers-unit',
              selected: true,
            },
          ],
          id: '3',
          kind: 'repeating-extant-selection',
          name: null,
          optionKey: 'elite-battlefield-role',
        },
      ],
      id: '2',
      kind: 'extant-selection',
      name: null,
      optionKey: 'patrol-detachment',
      selected: true,
    },
  ],
  id: '1',
  kind: 'extant-selection',
  name: 'Amazing Army',
  optionKey: 'roster',
  selected: true,
}
