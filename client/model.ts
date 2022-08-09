// Newer

/**
 * ExtantOptions represent an option whose selection is merely the presence of
 * the selection, or the lack of presence of the selection.
 */
export type ExtantOption = {
  name: string,
  kind: 'extant-option',
  // Validations, costs, and sub-options are all handed here as children.
  // Separating them into separate fields doesn't carry big distinctions, and
  // any additional data types would necessitate adding more fields onto
  // Option types.
  children: Array<Entity>,
}

/**
 * ExclusiveOptions are presented in a grouping, but only one of the grouping
 * may be selected. The immediate children of an ExclusiveOption represent this
 * grouping.
 *
 * For a flat selection, use ExclusiveOption with ExtantOption children.
 */
export type ExclusiveOption = {
  name: string,
  kind: 'exclusive-option',
  // Validations, costs, and sub-options are all handed here as children.
  // Separating them into separate fields doesn't carry big distinctions, and
  // any additional data types would necessitate adding more fields onto
  // Option types.
  children: Array<Entity>,
}

/**
 * NumericOptions reflect a single number. This number can be governed by
 * minimums and maximums.
 */
export type NumericOption = {
  children: Array<Entity>,
  kind: 'numeric-option',
  maximum: number,
  minimum: number,
  name: string,
}

export type Option =
  | ExclusiveOption
  | ExtantOption
  | NumericOption

export type ExtantSelection = {
  name: 'extant-selection',
}

// Old
export type OrderOfBattle = {
  name: string,
  faction: string,
  powerRating: number,
}

// New

export type UnknownEntity = {
  children: Array<Entity>,
  costs: Array<Cost>,
  definition: string,
  name: string,
  tags: Array<string>,
  value: unknown,
}

export type Cost = {
  amount: number,
  // Typically one of 'command-points', 'points', or 'power-level'.
  kind: string,
}

export type CostEntity = {
  children: Array<Entity>,
  definition: 'cost',
  name: string,
  tags: Array<string>,
  value: Cost,
}

export type Validation = {
  code: string,
  name: string,
}

export type ValidationEntity = {
  children: Array<Entity>,
  definition: 'validation',
  name: string,
  tags: Array<string>,
  value: Validation
}

export type AmountEntityDefinition = {
  children: Array<Entity>,
  definition: 'amount',
  name: 'amount',
  tags: Array<string>,
  value: number,
}

export type AmountEntity = {
  children: Array<Entity>,
  definition: 'amount',
  name: 'amount',
  tags: Array<string>,
  value: number,
}

export type ValidationError = {
  kind: string,
  name: string,
  message: string,
  targets: Array<string>,
}

export type FieldEntity = {
  children: Array<Entity>,
  definition: 'field',
  name: string,
  tags: Array<string>,
  value: {
    key: string,
    value: unknown,
  },
}

export type ObjectEntity = {
  children: Array<Entity>,
  definition: 'object',
  name: string,
  tags: Array<string>,
  value: { [key: string]: FieldType },
}

export type FieldType =
  | 'entity'
  | 'string'
  | 'number'

export type Entity =
  | CostEntity
  | Option
  | FieldEntity
  | ObjectEntity
  | UnknownEntity
  | ValidationEntity
