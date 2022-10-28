import { type AppSelection } from './model'

export const roster: AppSelection = {
  children: [
    {
      children: [
        {
          children: [
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
