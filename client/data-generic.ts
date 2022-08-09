import { type ExtantOption } from './model'

/**
 * If we need this for more than just exclusive options, we might want to make
 * this.
 */
export const noneOption: ExtantOption = {
  autoAdd: false,
  children: [],
  name: 'None',
  kind: 'extant-option',
  key: 'none',
  removable: false,
}
