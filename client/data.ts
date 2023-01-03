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
  name: 'Elites',
  key: 'elite-battlefield-role',
  kind: 'pooled-repeating-extant-option',
  children: [],
  queryTags: ['elite'],
  queryVariables: ['faction'],
  tags: [],
}

export const patrolDetachmentOption: ExtantOption = {
  autoAdd: true,
  children: [
    eliteBattlefieldRole,
  ],
  name: 'Patrol Detachment',
  key: 'patrol-detachment',
  kind: 'extant-option',
  removable: false,
  tags: [],
}

export const battalionDetachmentOption: ExtantOption = {
  autoAdd: false,
  children: [
    eliteBattlefieldRole,
  ],
  key: 'battalion-detachment',
  kind: 'extant-option',
  name: 'Battalion Detachment',
  removable: false,
  tags: [],
}

export const detachmentsOption: RepeatingExtantOption = {
  autoAdd: true,
  children: [
    battalionDetachmentOption,
    patrolDetachmentOption,
  ],
  key: 'detachments',
  kind: 'repeating-extant-option',
  name: 'Detatchments',
  tags: [],
}

export const hedonistSpaceElvesFactionOption: ExtantOption = {
  autoAdd: false,
  children: [],
  key: 'hedonist-space-elves-sub-faction',
  kind: 'extant-option',
  name: 'Hedonist Space Elves',
  tags: [],
  removable: false,
}

export const thespianSpaceElvesFactionOption: ExtantOption = {
  autoAdd: false,
  children: [],
  key: 'thespian-space-elves-sub-faction',
  kind: 'extant-option',
  name: 'Uptight Space Elves',
  tags: [],
  removable: false,
}

export const uptightSpaceElvesFactionOption: ExtantOption = {
  autoAdd: false,
  children: [],
  key: 'uptight-space-elves-sub-faction',
  kind: 'extant-option',
  name: 'Uptight Space Elves',
  tags: [],
  removable: false,
}

export const spaceElvesSubFactionOption: ExclusiveOption = {
  autoAdd: false,
  children: [
    hedonistSpaceElvesFactionOption,
    uptightSpaceElvesFactionOption,
    thespianSpaceElvesFactionOption,
  ],
  default: '',
  key: 'space-elves-sub-faction',
  kind: 'exclusive-option',
  name: 'Space Elves',
  tags: [],
}

export const spaceElvesFactionOption: PoolOption = {
  autoAdd: false,
  children: [
    spaceElvesSubFactionOption,
  ],
  infinite: true,
  key: 'space-elves-faction',
  kind: 'pool-option',
  name: 'Space Elves',
  tags: [],
}

export const unboundFactionOption: ExtantOption = {
  autoAdd: false,
  children: [],
  key: 'unbound-faction',
  kind: 'extant-option',
  name: 'Unbound',
  removable: false,
  tags: [],
}

export const smirksFactionOption: ExtantOption = {
  autoAdd: false,
  children: [],
  key: 'smirks-faction',
  kind: 'extant-option',
  name: 'Smirks - they shall know no smear',
  tags: [],
  removable: false,
}

export const factionOption: ExclusiveOption = {
  autoAdd: true,
  children: [
    smirksFactionOption,
    spaceElvesFactionOption,
    unboundFactionOption,
  ],
  default: 'unbound-faction',
  key: 'faction',
  kind: 'exclusive-option',
  name: 'Faction',
  tags: [],
}

export const infinitePoolOption: PoolOption = {
  autoAdd: true,
  children: [
    factionOption,
  ],
  infinite: true,
  key: 'infinite-pool',
  kind: 'pool-option',
  name: 'Infinite Pool',
  tags: [],
}

export const rosterOpenPlayOption: ExtantOption = {
  autoAdd: false,
  children: [
    detachmentsOption,
    factionOption,
  ],
  name: 'Open Play Army Roster',
  key: 'roster-open-play',
  kind: 'extant-option',
  removable: false,
  tags: [],
}

export const rosterMatchedPlayOption: PoolScopeOption = {
  autoAdd: false,
  children: [
    detachmentsOption,
    infinitePoolOption,
  ],
  name: 'Matched Play Army Roster',
  key: 'roster-matched-play',
  kind: 'pool-scope-option',
  poolVariable: 'infinite-pool',
  tags: [],
}

export const rosterNarrativePlayOption: ExtantOption = {
  autoAdd: false,
  children: [
    detachmentsOption,
  ],
  name: 'Narrative Play Army Roster',
  key: 'roster-narrative-play',
  kind: 'extant-option',
  removable: false,
  tags: [],
}

export const multiRosterNarrativeOption: RepeatingExtantOption = {
  autoAdd: true,
  children: [
    rosterNarrativePlayOption,
  ],
  name: 'Crusade Armies',
  key: 'crusade-armies',
  kind: 'repeating-extant-option',
  tags: [],
}

export const orderOfBattleOption: PooledRepeatingExtantOption = {
  autoAdd: true,
  children: [],
  key: 'order-of-battle',
  kind: 'pooled-repeating-extant-option',
  name: 'Order of Battle',
  queryTags: ['unit'],
  queryVariables: ['faction'],
  tags: [],
}

export const orderOfBattlePoolScopeOption: PoolScopeOption = {
  autoAdd: true,
  children: [
    multiRosterNarrativeOption,
  ],
  key: 'order-of-battle-pool-scope-option',
  kind: 'pool-scope-option',
  name: 'Order of Battle Pool Scope',
  tags: [],
  poolVariable: 'faction',
}

export const crusadeForceOption: ExtantOption = {
  autoAdd: false,
  children: [
    orderOfBattleOption,
    orderOfBattlePoolScopeOption,
    factionOption,
  ],
  key: 'crusade-force',
  kind: 'extant-option',
  name: 'Crusade Force',
  removable: false,
  tags: [],
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
