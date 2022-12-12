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

export const stingingElvesLeaderPowerClawMasterOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(15)),
    cost('power-rating', always(1)),
  ],
  key: 'stinging-elves-leader-power-crushing-blows',
  kind: 'extant-option',
  name: 'Claw Master',
  removable: false,
  tags: [],
}

export const stingingElvesLeaderPowerStrikeFromTheShadowsOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(20)),
    cost('power-rating', always(1)),
  ],
  key: 'stinging-elves-leader-power-deadly-ambush',
  kind: 'extant-option',
  name: 'Strike From Shadows',
  removable: false,
  tags: [],
}

export const stingingElvesLeaderPowerStingersStingOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(30)),
    cost('power-rating', always(1)),
  ],
  key: 'stinging-elves-leader-power-stingers-sting',
  kind: 'extant-option',
  name: 'Stinger\'s Sting',
  removable: false,
  tags: [],
}

export const stingingElvesLeaderPowersOption: ExclusiveOption = {
  autoAdd: true,
  children: [
    noneOption,
    stingingElvesLeaderPowerClawMasterOption,
    stingingElvesLeaderPowerStrikeFromTheShadowsOption,
    stingingElvesLeaderPowerStingersStingOption,
  ],
  default: 'none',
  key: 'stinging-elves-leader-power',
  kind: 'exclusive-option',
  name: 'Stinging Elves Leader Power',
  tags: [],
}

export const stingingElvesLeaderWargearLeafPistolAndStingerChainswordOption: ExtantOption = {
  autoAdd: false,
  children: [],
  key: 'stinging-elves-leader-wargear-leaf-pistol-and-stinger-chainsword',
  kind: 'extant-option',
  name: 'Leaf Pistol and Stinger Chainsword',
  removable: false,
  tags: [],
}

export const stingingElvesLeaderWargearStingersClawAndStingerChainswordOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(10)),
  ],
  key: 'stinging-elves-leader-wargear-stingers-claw-and-stinger-chainsword',
  kind: 'extant-option',
  name: 'Stinger\'s Claw and Stinger Chainsword',
  removable: false,
  tags: [],
}

export const stingingElvesLeaderWargearMandibleBladeOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(5)),
  ],
  key: 'stinging-elves-leader-wargear-mandible-blade',
  kind: 'extant-option',
  name: 'Mandible Blade',
  removable: false,
  tags: [],
}

export const stingingElvesLeaderWargearOption: ExclusiveOption = {
  autoAdd: true,
  children: [
    stingingElvesLeaderWargearLeafPistolAndStingerChainswordOption,
    stingingElvesLeaderWargearStingersClawAndStingerChainswordOption,
    stingingElvesLeaderWargearMandibleBladeOption,
  ],
  default: 'stinging-elves-leader-wargear-leaf-pistol-and-stinger-chainsword',
  key: 'stinging-elves-leader-wargear',
  kind: 'exclusive-option',
  name: 'Stinging Elves Leader Wargear',
  tags: [],
}

export const stingingElvesUnitSizeOption: NumericOption = {
  autoAdd: true,
  children: [
    cost('points', modelCountPoints.bind(null, 18)),
    cost(
      'power-rating',
      modelCountPowerRating.bind(
        null,
        [{amount: 4, max: 4}, {amount: 8, min: 5}],
      ),
    ),
    {
      function: modelCountValidation.bind(null, 4, 9),
      kind: 'validation',
      name: 'stinging-elves-unit-size-validation',
    },
  ],
  default: 4,
  key: 'stinging-elves-unit-size',
  kind: 'numeric-option',
  maximum: 9,
  minimum: 4,
  name: 'Stinging Elves models',
  tags: [],
}

export const stingingElvesLeaderOption: ExtantOption = {
  autoAdd: true,
  name: 'Stinging Elves Leader',
  kind: 'extant-option',
  children: [
    stingingElvesLeaderPowersOption,
    stingingElvesLeaderWargearOption,
    cost('points', always(18)),
  ],
  key: 'stinging-elves-leader',
  removable: false,
  tags: [],
}


export const stingingElvesUnitOption: ExtantOption = {
  autoAdd: false,
  name: 'Stinging Elves',
  kind: 'extant-option',
  children: [
    stingingElvesUnitSizeOption,
    stingingElvesLeaderOption,
  ],
  key: 'stinging-elves-unit',
  removable: false,
  tags: ['space-elves', 'elite'],
}

export const spartanLeafHurlerOption: ExtantOption = {
  autoAdd: false,
  name: 'Spartan Leaf Hurler',
  kind: 'extant-option',
  children: [],
  key: 'spartan-elves-leader-wargear-spartan-leaf-hurler',
  removable: false,
  tags: [],
}

export const twoSpartanLeafHurlersOption: ExtantOption = {
  autoAdd: false,
  name: 'Two Spartan Leaf Hurlers',
  kind: 'extant-option',
  children: [],
  key: 'spartan-elves-leader-wargear-two-spartan-leaf-hurlers',
  removable: false,
  tags: [],
}

export const lightbarrierAndSiblingswordOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(5)),
  ],
  key: 'spartan-elves-leader-wargear-lightbarrier-and-siblingsword',
  kind: 'extant-option',
  name: 'Lightbarrier and Siblingsword',
  removable: false,
  tags: [],
}

export const lightbarrierAndPowerGlaiveOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(5)),
  ],
  key: 'spartan-elves-leader-wargear-lightbarrier-and-power-glaive',
  kind: 'extant-option',
  name: 'Lightbarrier and Power Glaive',
  removable: false,
  tags: [],
}

export const leafPistolAndSiblingswordOption: ExtantOption = {
  autoAdd: false,
  children: [],
  kind: 'extant-option',
  key: 'spartan-elves-leader-wargear-leaf-pistol-and-siblingsword',
  name: 'Leaf Pistol and Siblingsword',
  removable: false,
  tags: [],
}

export const leafPistolAndPowerGlaiveOption: ExtantOption = {
  autoAdd: false,
  children: [],
  kind: 'extant-option',
  key: 'spartan-elves-leader-wargear-leaf-pistol-and-power-glaive',
  name: 'Leaf Pistol and Power Glaive',
  removable: false,
  tags: [],
}

export const spartanElvesLeaderWargearOption: ExclusiveOption = {
  autoAdd: true,
  children: [
    spartanLeafHurlerOption,
    lightbarrierAndSiblingswordOption,
    lightbarrierAndPowerGlaiveOption,
    leafPistolAndSiblingswordOption,
    leafPistolAndPowerGlaiveOption,
    twoSpartanLeafHurlersOption,
  ],
  default: 'spartan-elves-leader-wargear-spartan-leaf-hurler',
  name: 'Leader Wargear',
  kind: 'exclusive-option',
  key: 'spartan-elves-leader-wargear',
  tags: [],
}

export const spartanElvesLeaderPowerBraceForChargeOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(20)),
    cost('power-rating', always(1)),
  ],
  key: 'spartan-elves-leader-power-defensive-stance',
  kind: 'extant-option',
  name: 'Brace For Charge',
  removable: false,
  tags: [],
}

export const spartanElvesLeaderPowerLeafBlowerOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(25)),
    cost('power-rating', always(1)),
  ],
  key: 'spartan-elves-leader-power-shredding-fire',
  kind: 'extant-option',
  name: 'Leaf Blower',
  removable: false,
  tags: [],
}

export const spartanElvesLeaderPowerWalkAndChewBubbleGumOption: ExtantOption = {
  autoAdd: false,
  children: [
    cost('points', always(15)),
    cost('power-rating', always(1)),
  ],
  key: 'spartan-elves-leader-power-stand-firm',
  kind: 'extant-option',
  name: 'Walk and Chew Bubblegum',
  removable: false,
  tags: [],
}

export const spartanElvesLeaderPowerOption: ExclusiveOption = {
  autoAdd: true,
  children: [
    noneOption,
    spartanElvesLeaderPowerBraceForChargeOption,
    spartanElvesLeaderPowerLeafBlowerOption,
    spartanElvesLeaderPowerWalkAndChewBubbleGumOption,
  ],
  default: 'none',
  key: 'spartan-elves-leader-power',
  kind: 'exclusive-option',
  name: 'Spartan Elves Leader Power',
  tags: [],
}

export const spartanElvesUnitSizeOption: NumericOption = {
  autoAdd: true,
  children: [
    cost('points', modelCountPoints.bind(null, 13)),
    cost(
      'power-rating',
      modelCountPowerRating.bind(
        null,
        [{amount: 3, max: 4}, {amount: 6, min: 5}],
      ),
    ),
    {
      function: modelCountValidation.bind(null, 4, 9),
      kind: 'validation',
      name: 'sibling-spartan-unit-size-validation',
    },
  ],
  default: 4,
  key: 'spartan-elves-unit-size',
  kind: 'numeric-option',
  maximum: 9,
  minimum: 4,
  name: 'Spartan Elves models',
  tags: [],
}

export const spartanElvesLeaderOption: ExtantOption = {
  autoAdd: true,
  children: [
    spartanElvesLeaderWargearOption,
    spartanElvesLeaderPowerOption,
    cost('points', always(13)),
  ],
  key: 'spartan-elves-leader',
  kind: 'extant-option',
  name: 'Spartan Elves Leader',
  removable: false,
  tags: [],
}


export const spartanElvesUnitOption: ExtantOption = {
  autoAdd: false,
  children: [
    spartanElvesUnitSizeOption,
    spartanElvesLeaderOption,
  ],
  key: 'spartan-elves-unit',
  kind: 'extant-option',
  name: 'Spartan Elves',
  removable: true,
  tags: ['space-elves', 'elite'],
}

export const eliteBattlefieldRole: PooledRepeatingExtantOption = {
  autoAdd: true,
  name: 'Elites',
  key: 'space-elves-elite-battlefield-role',
  kind: 'pooled-repeating-extant-option',
  children: [
    spartanElvesUnitOption,
    stingingElvesUnitOption,
  ],
  query: ['elite', 'space-elves'],
  tags: [],
}

export const patrolDetachmentOption: ExtantOption = {
  autoAdd: true,
  children: [
    eliteBattlefieldRole,
  ],
  name: 'Patrol Detachment',
  key: 'space-elves-patrol-detachment',
  kind: 'extant-option',
  removable: false,
  tags: [],
}

export const battalionDetachmentOption: ExtantOption = {
  autoAdd: false,
  children: [
    eliteBattlefieldRole,
  ],
  key: 'space-elves-battalion-detachment',
  kind: 'extant-option',
  name: 'Battalion Detachment',
  removable: false,
  tags: [],
}

export const detachmentsOption: RepeatingExtantOption = {
  autoAdd: false,
  children: [
    battalionDetachmentOption,
    patrolDetachmentOption,
  ],
  key: 'space-elves-detachments',
  kind: 'repeating-extant-option',
  name: 'Space Elf Detatchments',
  tags: [],
}

export const factionPoolOption: PoolOption = {
  autoAdd: true,
  // All units should be listed here.
  children: [
    spartanElvesUnitOption,
    stingingElvesUnitOption,
  ],
  key: 'space-elves-faction-pool',
  kind: 'pool-option',
  name: 'Space Elves Faction Pool',
  tags: ['space-elves'],
}

export const options: ReadonlyArray<AppOption> = [
  battalionDetachmentOption,
  detachmentsOption,
  eliteBattlefieldRole,
  factionPoolOption,
  leafPistolAndPowerGlaiveOption,
  leafPistolAndSiblingswordOption,
  lightbarrierAndPowerGlaiveOption,
  lightbarrierAndSiblingswordOption,
  patrolDetachmentOption,
  spartanElvesLeaderOption,
  spartanElvesLeaderPowerBraceForChargeOption,
  spartanElvesLeaderPowerLeafBlowerOption,
  spartanElvesLeaderPowerOption,
  spartanElvesLeaderPowerWalkAndChewBubbleGumOption,
  spartanElvesLeaderWargearOption,
  spartanElvesUnitOption,
  spartanElvesUnitSizeOption,
  spartanLeafHurlerOption,
  stingingElvesLeaderOption,
  stingingElvesLeaderPowerClawMasterOption,
  stingingElvesLeaderPowerStingersStingOption,
  stingingElvesLeaderPowerStrikeFromTheShadowsOption,
  stingingElvesLeaderPowersOption,
  stingingElvesLeaderWargearOption,
  stingingElvesUnitOption,
  stingingElvesUnitSizeOption,
  twoSpartanLeafHurlersOption,
]
