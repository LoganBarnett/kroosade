// Newer

/**
 * ExtantOptions represent an option whose selection is merely the presence of
 * the selection, or the lack of presence of the selection.
 */
export type ExtantOption = {
  name: string,
  key: string,
  kind: 'extant-option',
  // Validations, costs, and sub-options are all handed here as children.
  // Separating them into separate fields doesn't carry big distinctions, and
  // any additional data types would necessitate adding more fields onto
  // Option types.
  children: ReadonlyArray<Entity>,
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
  key: string,
  kind: 'exclusive-option',
  // Validations, costs, and sub-options are all handed here as children.
  // Separating them into separate fields doesn't carry big distinctions, and
  // any additional data types would necessitate adding more fields onto
  // Option types.
  children: ReadonlyArray<Entity>,
}

/**
 * NumericOptions reflect a single number. This number can be governed by
 * minimums and maximums.
 */
export type NumericOption = {
  children: ReadonlyArray<Entity>,
  key: string,
  kind: 'numeric-option',
  maximum: number,
  minimum: number,
  name: string,
}

/**
 * RepeatingExtantOptions allow for multiple selections of ExtantOptions.
 * ExtantOptions have two primary states: Present or not present. A
 * RepeatingExtantOption is essentially zero or more ExtantOptions.
 *
 * This is useful when selections can be made more than once, but also when each
 * selection could have its own customizations.
 */
export type RepeatingExtantOption = {
  name: string,
  key: string,
  kind: 'repeating-extant-option',
  children: ReadonlyArray<Entity>,
}

export type Option =
  | ExclusiveOption
  | ExtantOption
  | NumericOption

export type ExtantSelection = {
  children: ReadonlyArray<Selection>,
  id: string,
  kind: 'extant-selection',
  optionKey: string,
  name: string | null,
}

export type NumericSelection = {
  children: ReadonlyArray<Selection>,
  id: string,
  kind: 'numeric-selection',
  optionKey: string,
  name: string | null,
  value: number,
}

export type Selection =
  | ExtantSelection
  | NumericSelection

// Old
export type OrderOfBattle = {
  name: string,
  faction: string,
  powerRating: number,
}

// New

export type UnknownEntity = {
  children: ReadonlyArray<Entity>,
  costs: ReadonlyArray<Cost>,
  definition: string,
  name: string,
  tags: ReadonlyArray<string>,
  value: unknown,
}

export type Cost = {
  amount: number,
  // Typically one of 'command-points', 'points', or 'power-level'.
  kind: string,
}

export type CostEntity = {
  children: ReadonlyArray<Entity>,
  definition: 'cost',
  name: string,
  tags: ReadonlyArray<string>,
  value: Cost,
}

export type Validation = {
  code: string,
  name: string,
}

export type ValidationEntity = {
  children: ReadonlyArray<Entity>,
  definition: 'validation',
  name: string,
  tags: ReadonlyArray<string>,
  value: Validation
}

export type AmountEntityDefinition = {
  children: ReadonlyArray<Entity>,
  definition: 'amount',
  name: 'amount',
  tags: ReadonlyArray<string>,
  value: number,
}

export type AmountEntity = {
  children: ReadonlyArray<Entity>,
  definition: 'amount',
  name: 'amount',
  tags: ReadonlyArray<string>,
  value: number,
}

export type ValidationError = {
  kind: string,
  name: string,
  message: string,
  targets: ReadonlyArray<string>,
}

export type FieldEntity = {
  children: ReadonlyArray<Entity>,
  definition: 'field',
  name: string,
  tags: ReadonlyArray<string>,
  value: {
    key: string,
    value: unknown,
  },
}

export type ObjectEntity = {
  children: ReadonlyArray<Entity>,
  definition: 'object',
  name: string,
  tags: ReadonlyArray<string>,
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
