import { type Selection } from './model'

export const roster: Selection = {
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
              ],
              id: '4',
              kind: 'extant-selection',
              name: null,
              optionKey: 'dire-avengers-unit',
              selected: true,
            },
          ],
          id: '3',
          kind: 'extant-selection',
          name: null,
          optionKey: 'elite-battlefield-role',
          selected: true,
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
