// Store data here for now.
import { noneOption } from './data-generic'
import {
  type AppOption,
  type ExclusiveOption,
  type ExtantOption,
  type PooledRepeatingExtantOption,
  type PoolOption,
  type PoolScopeOption,
  type RepeatingExtantOption,
} from './model'

import {
  factionPoolOption as spaceElfFactionPoolOption,
  options as spaceElfOptions,
} from './data-space-elves'
import {
  options as smirkOptions,
} from './data-smirks'

export const eliteBattlefieldRole: PooledRepeatingExtantOption = {
  autoAdd: true,
  childQuery: [],
  costs: [],
  name: 'Elites',
  key: 'elite-battlefield-role',
  kind: 'pooled-repeating-extant-option',
  queryTags: ['elite'],
  queryVariables: ['faction'],
  tags: ['battlefield-role'],
}

export const patrolDetachmentOption: ExtantOption = {
  autoAdd: true,
  childQuery: ['battlefield-role'],
  // TODO: The CP cost would go here (only use in copyrighted material though).
  costs: [],
  name: 'Patrol Detachment',
  key: 'patrol-detachment',
  kind: 'extant-option',
  removable: false,
  tags: ['detachment'],
}

export const battalionDetachmentOption: ExtantOption = {
  autoAdd: false,
  childQuery: ['battlefield-role'],
  // TODO: The CP cost would go here (only use in copyrighted material though).
  costs: [],
  key: 'battalion-detachment',
  kind: 'extant-option',
  name: 'Battalion Detachment',
  removable: false,
  tags: ['detachment'],
}

export const detachmentsOption: RepeatingExtantOption = {
  autoAdd: true,
  childQuery: ['detachment'],
  costs: [],
  key: 'detachments',
  kind: 'repeating-extant-option',
  name: 'Detatchments',
  tags: ['detatchment-repeater'],
}

export const hedonistSpaceElvesFactionOption: ExtantOption = {
  autoAdd: false,
  childQuery: ['hedonist-space-elves-sub-faction'],
  costs: [],
  key: 'hedonist-space-elves-sub-faction',
  kind: 'extant-option',
  name: 'Hedonist Space Elves',
  tags: ['subfaction', 'space-elves-faction'],
  removable: false,
}

export const thespianSpaceElvesFactionOption: ExtantOption = {
  autoAdd: false,
  childQuery: ['thespian-space-elves-sub-faction'],
  costs: [],
  key: 'thespian-space-elves-sub-faction',
  kind: 'extant-option',
  name: 'Uptight Space Elves',
  tags: ['subfaction', 'space-elves-faction'],
  removable: false,
}

export const uptightSpaceElvesFactionOption: ExtantOption = {
  autoAdd: false,
  childQuery: ['uptight-space-elves-sub-faction'],
  costs: [],
  key: 'uptight-space-elves-sub-faction',
  kind: 'extant-option',
  name: 'Uptight Space Elves',
  tags: ['subfaction', 'space-elves-faction'],
  removable: false,
}

export const spaceElvesSubFactionOption: ExclusiveOption = {
  autoAdd: false,
  childQuery: ['subfaction', 'space-elves-faction'],
  costs: [],
  default: '',
  key: 'space-elves-sub-faction',
  kind: 'exclusive-option',
  name: 'Space Elves',
  tags: ['faction', 'space-elves'],
}

export const spaceElvesFactionOption: PoolOption = {
  autoAdd: false,
  childQuery: ['faction', 'space-elves-faction'],
  costs: [],
  infinite: true,
  key: 'space-elves-faction',
  kind: 'pool-option',
  name: 'Space Elves',
  tags: ['faction'],
}

export const unboundFactionOption: ExtantOption = {
  autoAdd: false,
  childQuery: [],
  costs: [],
  key: 'unbound-faction',
  kind: 'extant-option',
  name: 'Unbound',
  removable: false,
  tags: ['faction'],
}

export const smirksFactionOption: ExtantOption = {
  autoAdd: false,
  childQuery: ['smirks-faction'],
  costs: [],
  key: 'smirks-faction',
  kind: 'extant-option',
  name: 'Smirks - they shall know no smear',
  removable: false,
  tags: ['faction'],
}

export const factionOption: ExclusiveOption = {
  autoAdd: true,
  childQuery: ['faction'],
  costs: [],
  default: 'unbound-faction',
  key: 'faction',
  kind: 'exclusive-option',
  name: 'Faction',
  tags: ['faction-selector', 'crusade-play', 'roster'],
}

export const infinitePoolOption: PoolOption = {
  autoAdd: true,
  childQuery: [
    'faction-selector',
  ],
  costs: [],
  infinite: true,
  key: 'infinite-pool',
  kind: 'pool-option',
  name: 'Infinite Pool',
  tags: ['infinite-pool', 'roster'],
}

export const rosterOpenPlayOption: ExtantOption = {
  autoAdd: false,
  childQuery: ['open-play', 'roster'],
  costs: [],
  name: 'Open Play Army Roster',
  key: 'roster-open-play',
  kind: 'extant-option',
  removable: false,
  tags: ['root'],
}

export const rosterMatchedPlayOption: PoolScopeOption = {
  autoAdd: false,
  childQuery: ['matched-play', 'roster'],
  costs: [],
  name: 'Matched Play Army Roster',
  key: 'roster-matched-play',
  kind: 'pool-scope-option',
  poolVariable: 'infinite-pool',
  tags: ['root'],
}

export const rosterNarrativePlayOption: ExtantOption = {
  autoAdd: false,
  childQuery: ['narrative-play', 'roster'],
  costs: [],
  name: 'Narrative Play Army Roster',
  key: 'roster-narrative-play',
  kind: 'extant-option',
  removable: false,
  tags: ['root'],
}

export const multiRosterNarrativeOption: RepeatingExtantOption = {
  autoAdd: true,
  childQuery: ['narrative-play', 'roster'],
  costs: [],
  name: 'Crusade Armies',
  key: 'crusade-armies',
  kind: 'repeating-extant-option',
  tags: ['multi-roster', 'crusade-play'],
}

export const orderOfBattleOption: PooledRepeatingExtantOption = {
  autoAdd: true,
  childQuery: [],
  costs: [],
  key: 'order-of-battle',
  kind: 'pooled-repeating-extant-option',
  name: 'Order of Battle',
  queryTags: ['unit'],
  queryVariables: ['faction'],
  tags: ['crusade-play', 'roster'],
}

export const orderOfBattlePoolScopeOption: PoolScopeOption = {
  autoAdd: true,
  childQuery: ['multi-roster', 'crusade-play'],
  costs: [],
  key: 'order-of-battle-pool-scope-option',
  kind: 'pool-scope-option',
  name: 'Order of Battle Pool Scope',
  tags: ['multi-roster-pool-scope', 'crusade-play', 'roster'],
  poolVariable: 'faction',
}

export const crusadeForceOption: ExtantOption = {
  autoAdd: false,
  childQuery: ['crusade-play', 'roster'],
  costs: [],
  key: 'crusade-force',
  kind: 'extant-option',
  name: 'Crusade Force',
  removable: false,
  tags: ['root'],
}

export const forceOption: ExclusiveOption = {
  autoAdd: false,
  childQuery: ['root'],
  costs: [],
  default: 'roster-matched-play',
  key: 'force',
  kind: 'exclusive-option',
  name: 'Force',
  tags: [],
}

// TypeScript isn't smart enough to realize that the variable is supposed to be
// ReadonlyArray<AppOption> for the literal as well as the final value. So we
// just break it into an assignment and concat it later.
const localOptions: ReadonlyArray<AppOption> = [
  crusadeForceOption,
  detachmentsOption,
  uptightSpaceElvesFactionOption,
  hedonistSpaceElvesFactionOption,
  thespianSpaceElvesFactionOption,
  smirksFactionOption,
  spaceElvesSubFactionOption,
  spaceElvesFactionOption,
  factionOption,
  forceOption,
  multiRosterNarrativeOption,
  noneOption,
  orderOfBattleOption,
  rosterMatchedPlayOption,
  rosterNarrativePlayOption,
  rosterOpenPlayOption,
  unboundFactionOption,
  battalionDetachmentOption,
  patrolDetachmentOption,
  detachmentsOption,
  eliteBattlefieldRole,
  orderOfBattlePoolScopeOption,
  infinitePoolOption,
]
export const options = localOptions
  .concat(smirkOptions)
  .concat(spaceElfOptions)
