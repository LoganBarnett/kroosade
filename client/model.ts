import { add } from 'ramda'
import { v4 } from 'uuid'
import { findInNumericRange } from './utils'

/**
 * ExtantOptions represent an option whose selection is merely the presence of
 * the selection, or the lack of presence of the selection.
 */
export type ExtantOption = {
  autoAdd: boolean,
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
  autoAdd: boolean,
  default: string,
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
  autoAdd: boolean,
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
  autoAdd: boolean,
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
  autoAdd: boolean,
  name: string,
  key: string,
  kind: 'repeating-extant-option',
  children: ReadonlyArray<Entity>,
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

export type Cost = {
  amount: CalculatedValue<number>,
  kind: 'cost',
  // Typically one of 'command-points', 'points', 'power-level' or 'requisition
  // points'. This is not typed with discriminated union so we can support any
  // kind of cost, which really just needs to be treated the same.
  costKind: string,
}


export type Entity =
  | AppOption
  | Cost

export const isExtantSelection = (x: AppSelection): x is ExtantSelection => {
  return x.kind == 'extant-selection'
}

export const isOption = (x: Entity): x is AppOption  => {
  switch(x.kind) {
    case 'extant-option':
    case 'exclusive-option':
    case 'repeating-extant-option':
    case 'boolean-option':
    case 'numeric-option':
      return true
    default:
      return false
  }
}

export const isCost = (x: Entity): x is Cost => {
  return x.kind == 'cost'
}

export const selectionChildren = (x: AppOption): ReadonlyArray<AppSelection> => {
  return x.children
    .filter(isOption)
    .filter(y => y.autoAdd)
    .map(optionToSelection)
}

// TODO: These need to recursively add children, but conditionally.
export const optionToSelection = (x: AppOption): AppSelection => {
  switch(x.kind) {
    case 'boolean-option':
      const bs: BooleanSelection = {
        children: selectionChildren(x),
        id: v4(),
        kind: 'boolean-selection',
        name: x.name,
        optionKey: x.key,
        value: true,
      }
      return bs
    case 'extant-option':
      const exts: ExtantSelection = {
        children: selectionChildren(x),
        id: v4(),
        kind: 'extant-selection',
        name: x.name,
        optionKey: x.key,
        selected: true,
      }
      return exts
    case 'exclusive-option':
      const exco: ExclusiveSelection = {
        children: selectionChildren(x),
        id: v4(),
        kind: 'exclusive-selection',
        name: x.name,
        optionKey: x.key,
        selected: x.default,
      }
      return exco
    case 'numeric-option':
      const ns: NumericSelection = {
        children: selectionChildren(x),
        id: v4(),
        kind: 'numeric-selection',
        name: x.name,
        optionKey: x.key,
        value: x.default,
      }
      return ns
    case 'repeating-extant-option':
      const reo: RepeatingExtantSelection = {
        children: selectionChildren(x),
        id: v4(),
        kind: 'repeating-extant-selection',
        name: x.name,
        optionKey: x.key,
      }
      return reo
  }
}

export const selectionToOption = (
  options: ReadonlyArray<AppOption>,
  x: AppSelection,
): AppOption | null | undefined => {
  return options.find(o => o.key == x.optionKey)
}

type CalculatedValue<A> = (
  options: ReadonlyArray<AppOption>,
  rootSelection: AppSelection,
  selection: AppSelection
) => A

export const cost = (costKind: string, amount: CalculatedValue<number>): Cost => {
  return {
    amount,
    costKind,
    kind: 'cost',
  }
}

// 40k specific.

type ModelCountCost = {
  amount: number,
  min?: number,
  max?: number,
}

export const modelCountPoints = (
  costPerModel: number,
  options: ReadonlyArray<AppOption>,
  _rootSelection: AppSelection,
  selection: AppSelection,
): number => {
  const option = selectionToOption(options, selection)
  if(option == null) {
    // We should never get here.
    // TODO: Handle error.
    return 0
  } else if(selection.kind == 'numeric-selection') {
    return selection.value * costPerModel
  } else {
    // We should also never get here.
    // TODO: Handle error.
    return 0
  }
}

export const modelCountPowerLevel = (
  costs: ReadonlyArray<ModelCountCost>,
  options: ReadonlyArray<AppOption>,
  _rootSelection: AppSelection,
  selection: AppSelection,
): number => {
  const option = selectionToOption(options, selection)
  if(option == null) {
    // We should never get here.
    // TODO: Handle error.
    return 0
  } else if(selection.kind == 'numeric-selection') {
    const cost = findInNumericRange(
      (x: number, c: ModelCountCost) => c.min == null || c.min > x,
      (x: number, c: ModelCountCost) => c.max == null || c.max < x,
      costs,
      selection.value,
    )[0]
    if(cost == null) {
      // We should never get here.
      // TODO: Handle error.
      return 0
    } else {
      return cost.amount
    }
  } else {
    // We should also never get here.
    // TODO: Handle error.
    return 0
  }
}

export const selectionCost = (
  costKind: string,
  options: ReadonlyArray<AppOption>,
  root: AppSelection,
  selection: AppSelection,
): number => {
  const option = selectionToOption(options, selection)
  if(option == null) {
    // TODO handle this error, but we should never get here.
    return 0
  } else {
    return option.children
      .filter(isCost)
      .filter(c => c.costKind == costKind)
      .map(c => c.amount(options, root, selection))
      .reduce(add, 0)
      +
      selection.children.map(selectionCost.bind(null, costKind, options, root))
        .reduce(add, 0)
  }
}
