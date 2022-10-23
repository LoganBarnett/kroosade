import { v4 } from 'uuid'

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
  // AppOption types.
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
  // AppOption types.
  children: ReadonlyArray<Entity>,
}

/**
 * NumericOptions reflect a single number. This number can be governed by
 * minimums and maximums.
 */
export type NumericOption = {
  children: ReadonlyArray<Entity>,
  default: number,
  key: string,
  kind: 'numeric-option',
  maximum: number,
  minimum: number,
  name: string,
}

/**
 * BooleanOptions are a single on/off selection. It really can work for any two
 * values. BooleanOptions differ from ExtantSelections in that they are
 * presented regardless of selection state.
 */
export type BooleanOption = {
  children: ReadonlyArray<Entity>,
  default: boolean,
  key: string,
  kind: 'boolean-option',
  name: string,
  value: boolean,
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
  children: ReadonlyArray<AppOption>,
}

export type AppOption =
  | BooleanOption
  | ExclusiveOption
  | ExtantOption
  | NumericOption
  | RepeatingExtantOption

export type BooleanSelection = {
  children: ReadonlyArray<AppSelection>,
  id: string,
  kind: 'boolean-selection',
  name: string | null,
  optionKey: string,
  value: boolean,
}

export type ExclusiveSelection = {
  children: ReadonlyArray<AppSelection>,
  id: string,
  kind: 'exclusive-selection',
  name: string | null,
  optionKey: string,
  selected: string,
}

export type ExtantSelection = {
  children: ReadonlyArray<AppSelection>,
  id: string,
  kind: 'extant-selection',
  name: string | null,
  optionKey: string,
  selected: boolean,
}

export type NumericSelection = {
  children: ReadonlyArray<AppSelection>,
  id: string,
  kind: 'numeric-selection',
  name: string | null,
  optionKey: string,
  value: number,
}

export type RepeatingExtantSelection = {
  children: ReadonlyArray<AppSelection>,
  id: string,
  kind: 'repeating-extant-selection',
  name: string | null,
  optionKey: string,
}

/**
 * Initially this was named "Selection", but that's a built-in type
 * https://github.com/microsoft/TypeScript/blob/d90795e799ca8e41aabd6d0852abb585138200ef/lib/lib.dom.d.ts#L13366
 * and TypeScript will not let us know that we're shadowing this type. If I
 * forget to import Selection as a type (for whatever reason), I get a crytpic
 * error: TS2345: Argument of type 'Selection' is not assignable to parameter of
 * type 'import("/Users/logan/dev/kroosade/client/model").Selection'.
 * This is big sad.
 *
 * We can work around this by simply naming it "AppSelection", but let's not
 * name it back and cause a whole lot of issues again.
 */
export type AppSelection =
  | BooleanSelection
  | ExclusiveSelection
  | ExtantSelection
  | NumericSelection
  | RepeatingExtantSelection

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
  // | CostEntity
  | AppOption
  // | FieldEntity
  // | ObjectEntity
  // | UnknownEntity
  // | ValidationEntity

export const isExtantSelection = (x: AppSelection): x is ExtantSelection => {
  return x.kind == 'extant-selection'
}

export const isOption = (x: Entity): x is AppOption  => {
  switch(x.kind) {
      case 'extant-option':
      case 'repeating-extant-option':
      case 'boolean-option':
      case 'numeric-option':
      return true
      default:
      return false
  }
}

export const optionToSelection = (x: AppOption): AppSelection => {
  switch(x.kind) {
    case 'boolean-option':
      const bs: BooleanSelection = {
        children: [],
        id: v4(),
        kind: 'boolean-selection',
        name: x.name,
        optionKey: x.key,
        value: true,
      }
      return bs
    case 'extant-option':
      const exts: ExtantSelection = {
        children: [],
        id: v4(),
        kind: 'extant-selection',
        name: x.name,
        optionKey: x.key,
        selected: true,
      }
      return exts
    case 'exclusive-option':
      const exco: ExclusiveSelection = {
        children: [],
        id: v4(),
        kind: 'exclusive-selection',
        name: x.name,
        optionKey: x.key,
        // TODO: Fix this. We need an actual selection here. Perhaps the option
        // can provide a default value.
        selected: '',
      }
      return exco
    case 'numeric-option':
      const ns: NumericSelection = {
        children: [],
        id: v4(),
        kind: 'numeric-selection',
        name: x.name,
        optionKey: x.key,
        value: 0,
      }
      return ns
    case 'repeating-extant-option':
      const reo: RepeatingExtantSelection = {
        children: [],
        id: v4(),
        kind: 'repeating-extant-selection',
        name: x.name,
        optionKey: x.key,
      }
      return reo
  }
}
