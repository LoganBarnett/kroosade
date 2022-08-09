import { always } from 'ramda'
import { noneOption } from './data-generic'
import {
  type ExclusiveOption,
  type ExtantOption,
  type NumericOption,
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
}

export const stingingElvesLeaderWargearLeafPistolAndStingerChainswordOption: ExtantOption = {
  autoAdd: false,
  children: [],
  key: 'stinging-elves-leader-wargear-leaf-pistol-and-stinger-chainsword',
  kind: 'extant-option',
  name: 'Leaf Pistol and Stinger Chainsword',
  removable: false,
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
}

export const spartanLeafHurlerOption: ExtantOption = {
  autoAdd: false,
  name: 'Spartan Leaf Hurler',
  kind: 'extant-option',
  children: [],
  key: 'spartan-elves-leader-wargear-spartan-leaf-hurler',
  removable: false,
}

export const twoSpartanLeafHurlersOption: ExtantOption = {
  autoAdd: false,
  name: 'Two Spartan Leaf Hurlers',
  kind: 'extant-option',
  children: [],
  key: 'spartan-elves-leader-wargear-two-spartan-leaf-hurlers',
  removable: false,
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
}

export const leafPistolAndSiblingswordOption: ExtantOption = {
  autoAdd: false,
  children: [],
  kind: 'extant-option',
  key: 'spartan-elves-leader-wargear-leaf-pistol-and-siblingsword',
  name: 'Leaf Pistol and Siblingsword',
  removable: false,
}

export const leafPistolAndPowerGlaiveOption: ExtantOption = {
  autoAdd: false,
  children: [],
  kind: 'extant-option',
  key: 'spartan-elves-leader-wargear-leaf-pistol-and-power-glaive',
  name: 'Leaf Pistol and Power Glaive',
  removable: false,
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
}

export const eliteBattlefieldRole: RepeatingExtantOption = {
  autoAdd: true,
  name: 'Elites',
  key: 'space-elves-elite-battlefield-role',
  kind: 'repeating-extant-option',
  children: [
    spartanElvesUnitOption,
    stingingElvesUnitOption,
  ],
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
}

export const options: ReadonlyArray<AppOption> = [
  spartanLeafHurlerOption,
  battalionDetachmentOption,
  patrolDetachmentOption,
  detachmentsOption,
  spartanElvesLeaderOption,
  spartanElvesLeaderPowerBraceForChargeOption,
  spartanElvesLeaderPowerOption,
  spartanElvesLeaderPowerLeafBlowerOption,
  spartanElvesLeaderPowerWalkAndChewBubbleGumOption,
  spartanElvesLeaderWargearOption,
  spartanElvesUnitOption,
  spartanElvesUnitSizeOption,
  eliteBattlefieldRole,
  lightbarrierAndSiblingswordOption,
  lightbarrierAndPowerGlaiveOption,
  leafPistolAndSiblingswordOption,
  leafPistolAndPowerGlaiveOption,
  stingingElvesLeaderOption,
  stingingElvesLeaderPowerClawMasterOption,
  stingingElvesLeaderPowerStrikeFromTheShadowsOption,
  stingingElvesLeaderPowerStingersStingOption,
  stingingElvesLeaderPowersOption,
  stingingElvesLeaderWargearOption,
  stingingElvesUnitOption,
  stingingElvesUnitSizeOption,
  twoSpartanLeafHurlersOption,
]
