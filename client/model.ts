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

/**
 * A cost in a particular kind of units.
 */
export type Cost = {
  amount: CalculatedValue<number>,
  kind: 'cost',
  // Typically one of 'command-points', 'points', 'power-rating' or 'requisition
  // points'. This is not typed with discriminated union so we can support any
  // kind of cost, which really just needs to be treated the same.
  costKind: string,
}

export type ValidationMessage = {
  message: string,
  variables: ReadonlyArray<{}>
}

/**
 * ValidationResults are calculated from a Validation.
 */
export type ValidationIssue = {
  /**
   * A unique code that identifies this issue.
   */
  issueCode: string,
  /**
   * Messages are just strings, but they will be formatted to show the targets
   * dynamically. Documentation to come on what that looks like.
   *
   * I haven't really thought about i18n here just yet. We could make these
   * keys which in turn refer to translations. For now, let's just have them be
   * English messages.
   *
   * Messages should observe proper punctuation and capitalization.
   */
  messages: ReadonlyArray<ValidationMessage>,
  /**
   * This result has targets, which represent zero or more selections involved
   * in the validation issue.  Typically all validations will at least have one
   * target: The AppSelection from which the validation issue originated. This
   * allows aggregate UI for validations to display the validation issue
   * anywhere, yet still be able to point back to the source of the validation
   * issue.
   */
  targets: ReadonlyArray<AppSelection>,
  /**
   * The validation type allows for indicating a level of severity for the
   * validation issue. These can be virtually anything, but expected common
   * example will be validation issues that indicate legality at tournaments.
   * Another example is a deprecation, or a warning that a particular
   * configuration tends to be ruled upon in varied ways - buyer beware.
   *
   * A validation issue type should refrain from verbiage like "error" or
   * "illegal" unless there is a software error of some kind, or legality is
   * actually involved. For issues that are not allowed by a game system, use
   * "violation".
   */
  validationType: string,
}

export type Validation = {
  /**
   * Generate ValidationIssues from the corresponding selection. An empty list
   * of ValidationIssues indicates that there are no validation issues with this
   * validation - we're operating within the bounds of the validation.
   */
  function: (
    options: ReadonlyArray<AppOption>, root: AppSelection,
    current: AppSelection
  ) => ReadonlyArray<ValidationIssue>,
  kind: 'validation',
  name: string,
}

// TODO: Consider renaming this to Definition, which confers a more accurate
// name of what this represents.
export type Entity =
  | AppOption
  | Cost
  | Validation

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

export const isValidation = (x: Entity): x is Validation  => {
  return x.kind == 'validation'
}


export const isCost = (x: Entity): x is Cost => {
  return x.kind == 'cost'
}

/**
 * Generate AppSelection children from an AppOption.
 */
export const selectionChildren = (x: AppOption): ReadonlyArray<AppSelection> => {
  return x.children
    .filter(isOption)
    .map(optionToSelection)
}

/**
 * Generate an AppSelection from an AppOption.
 */
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
        selected: x.autoAdd,
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
        // TODO: Consider identifying which ones should be automatically added.
        children: [],
        id: v4(),
        kind: 'repeating-extant-selection',
        name: x.name,
        optionKey: x.key,
      }
      return reo
  }
}

/**
 * Find the AppOption from this AppSelection.
 */
export const selectionToOption = (
  options: ReadonlyArray<AppOption>,
  x: AppSelection,
): AppOption | null | undefined => {
  return options.find(o => o.key == x.optionKey)
}

/**
 * Virtually any calculatable value should be calculated from such a function.
 */
type CalculatedValue<A> = (
  options: ReadonlyArray<AppOption>,
  rootSelection: AppSelection,
  selection: AppSelection
) => A

/**
 * Helper for creating a Cost Definition.
 */
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

/**
 * Compute cost by multiplying model count by cost per model.
 */
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

/**
 * Compute the power rating of a given unit.
 *
 * 40k-specific. Power Rating happens in groupings, and isn't always linear.
 * Most units have only two sizes, but some have 3 or 4 sizes, as well as
 * non-linear progression of power rating (3 and then 7 instead of 3 and then
 * 6).
 */
export const modelCountPowerRating = (
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
      (x: number, c: ModelCountCost) => c.min == null || c.min <= x,
      (x: number, c: ModelCountCost) => c.max == null || c.max >= x,
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

/**
 * Compute the cost of a particular kind of selection fo a given AppSelection.
 */
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
    if(selection.kind == 'extant-selection' && !selection.selected) {
      return 0
    } else {
      return option.children
        .filter(isCost)
        .filter(c => c.costKind == costKind)
        .map(c => c.amount(options, root, selection))
        .reduce(add, 0)
        +
        selection.children.map(
          selectionCost.bind(null, costKind, options, root),
        )
          .reduce(add, 0)
    }
  }
}

/**
 * Validate model count.
 *
 * This works with a minimum and maximum.
 *
 * This could be refactored a bit to have a simple min/max validation, and this
 * one just specializes that function.
 */
export const modelCountValidation = (
  minSize: number,
  maxSize: number,
  options: ReadonlyArray<AppOption>,
  _root: AppSelection,
  current: AppSelection,
): ReadonlyArray<ValidationIssue> => {
  const option = selectionToOption(options, current)
  if(option == null) {
    // TODO: This should be an application error.
      return []
  } else {
    if(current.kind == 'numeric-selection') {
      return (current.value < minSize
        ? [{
          issueCode: 'min-model-size',
          targets: [current],
          messages: [
            {
              message: 'The model count %n of %x is lower than the required of \
%n.',
              variables: [current.value, current, minSize],
            },
          ],
          validationType: 'violation',
        }]
        : []
        ).concat(
          current.value > maxSize
          ? [{
          issueCode: 'max-model-size',
          targets: [current],
          messages: [
            {
              message: 'The model count %n of %x is higher than the required \
of %n.',
              variables: [current.value, current, minSize],
            },
          ],
          validationType: 'violation',
          }]
          : []
        )
    } else {
      return []
    }
  }
}

/**
 * Format a string, printf style. Very limited syntax support is implemented.
 *
 * JavaScript doesn't have a printf or equivalent, even though console.log
 * supports the syntax.
 */
export const format = (options: ReadonlyArray<AppOption>, m: string, vars: ReadonlyArray<{}>): string => {
  return vars.reduce<string>((acc: string, v: {}) => {
    return acc.replace(/([^%])%([snx])/, (_m: string, pre: string, type: string) => {
      // Add back in the first match. The not-match for % (to rule out %%)
      // gobbles up that character as part of the overall match. So we assigned
      // it to a capture group, and have to add it back in here.
      return pre + (type == 'x'
        // TODO: Stop as-casting.
        ? selectionToOption(options, v as AppSelection)?.name
          || `option not found for ${JSON.stringify(v)}`
        : v.toString()
      )
    })
  }, m)
}
