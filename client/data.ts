// Store data here for now.
import { noneOption } from './data-generic'
import {
  type ExclusiveOption,
  type ExtantOption,
  type AppOption,
  type RepeatingExtantOption,
} from './model'

import {
  detachmentsOption as spaceElfDetachmentsOption,
  options as spaceElfOptions,
} from './data-space-elves'

export const factionDetachmentsOption: RepeatingExtantOption = {
  autoAdd: true,
  children: [
    spaceElfDetachmentsOption,
  ],
  name: 'Faction Detatchments',
  key: 'faction-detachments',
  kind: 'repeating-extant-option',
}

export const rosterOpenPlayOption: ExtantOption = {
  autoAdd: false,
  children: [
    factionDetachmentsOption,
  ],
  name: 'Open Play Army Roster',
  key: 'roster-open-play',
  kind: 'extant-option',
  removable: false,
}

export const rosterMatchedPlayOption: ExtantOption = {
  autoAdd: false,
  children: [
    factionDetachmentsOption,
  ],
  name: 'Matched Play Army Roster',
  key: 'roster-matched-play',
  kind: 'extant-option',
  removable: false,
}

export const rosterNarrativePlayOption: ExtantOption = {
  autoAdd: false,
  children: [
    factionDetachmentsOption,
  ],
  name: 'Narrative Play Army Roster',
  key: 'roster-narrative-play',
  kind: 'extant-option',
  removable: false,
}

export const orderOfBattleOption: ExtantOption = {
  autoAdd: true,
  children: [
    factionDetachmentsOption,
  ],
  key: 'order-of-battle',
  kind: 'extant-option',
  name: 'Order of Battle',
  removable: false,
}

export const multiRosterNarrativeOption: RepeatingExtantOption = {
  autoAdd: true,
  children: [
    rosterNarrativePlayOption,
  ],
  name: 'Crusade Armies',
  key: 'crusade-armies',
  kind: 'repeating-extant-option',
}

export const crusadeForceOption: ExtantOption = {
  autoAdd: false,
  children: [
    orderOfBattleOption,
    multiRosterNarrativeOption,
  ],
  key: 'crusade-force',
  kind: 'extant-option',
  name: 'Crusade Force',
  removable: false,
}

export const forceOption: ExclusiveOption = {
  autoAdd: false,
  children: [
    crusadeForceOption,
    rosterMatchedPlayOption,
    rosterNarrativePlayOption,
    rosterOpenPlayOption,
  ],
  default: 'roster-matched-play',
  key: 'force',
  kind: 'exclusive-option',
  name: 'Force',
}

// TypeScript isn't smart enough to realize that the variable is supposed to be
// ReadonlyArray<AppOption> for the literal as well as the final value. So we
// just break it into an assignment and concat it later.
const localOptions: ReadonlyArray<AppOption> = [
  crusadeForceOption,
  factionDetachmentsOption,
  forceOption,
  multiRosterNarrativeOption,
  noneOption,
  orderOfBattleOption,
  rosterMatchedPlayOption,
  rosterNarrativePlayOption,
  rosterOpenPlayOption,
]
export const options = localOptions.concat(spaceElfOptions)
