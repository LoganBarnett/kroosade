import { add, always, chain, pipe, tap } from 'ramda'
import { v4 } from 'uuid'
import { findInNumericRange, optionForSelection } from './utils'
import Option, { type Option as OptionType } from './option'

export type BaseOption = {
  autoAdd: boolean,
  childQuery: ReadonlyArray<string>,
  costs: ReadonlyArray<Cost>,
  name: string,
  key: string,
  tags: ReadonlyArray<string>,
}

/**
 * ExtantOptions represent an option whose selection is merely the presence of
 * the selection, or the lack of presence of the selection.
 */
export type ExtantOption = BaseOption & {
  kind: 'extant-option',
  removable: boolean,
}

/**
 * ExclusiveOptions are presented in a grouping, but only one of the grouping
 * may be selected. The immediate children of an ExclusiveOption represent this
 * grouping.
 *
 * For a flat selection, use ExclusiveOption with ExtantOption children.
 */
export type ExclusiveOption = BaseOption & {
  default: string,
  kind: 'exclusive-option',
}

/**
 * NumericOptions reflect a single number. This number can be governed by
 * minimums and maximums.
 */
export type NumericOption = BaseOption & {
  default: number,
  kind: 'numeric-option',
  maximum: number,
  minimum: number,
}

/**
 * BooleanOptions are a single on/off selection. It really can work for any two
 * values. BooleanOptions differ from ExtantSelections in that they are
 * presented regardless of selection state.
 */
export type BooleanOption = BaseOption & {
  default: boolean,
  kind: 'boolean-option',
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
export type RepeatingExtantOption = BaseOption & {
  kind: 'repeating-extant-option',
}

/**
 * Pool Scopes are the parent which all scopes for pools are established. Under
 * a pool scope, all pool sensitive options will use the scope. The pool scope
 * refers to the scope it uses in its selection.
 */
export type PoolScopeOption = BaseOption & {
  kind: 'pool-scope-option',
  poolVariable: string,
}

/**
 * Use this to mark the kind of pool to be used.
 *
 * Pools influence the options under them. Normal rosters will have a pool
 * selection near or at their root, which indicates where their options can come
 * from. Crusade rosters have a special pool.
 *
 * Infinite pools do not prompt exclusion in option selection.
 *
 * PooledRepeatingExtantOptions are sensitive to what options have been selected
 * thus far. Other options are not sensitive and will ignore the pool. This
 * allows us to control when we need to restrict options at a fine grained
 * level.
 */
export type PoolOption = BaseOption & {
  infinite: boolean,
  kind: 'pool-option',
}

/**
 * This represents an option where the selections come from a pool rather than
 * its children. Pool members are copied (and held as independent copies).
 *
 * This allows us to have means of adding options which come from either a
 * crusade pool or an infinite "generic" pool, but the logic is more or less the
 * same.
 *
 * A PooledRepeatingExtantOption doesn't have children which indicate which
 * options are available, so instead it provides a tagged query. All tags
 * provided use AND logic.
 */
export type PooledRepeatingExtantOption = BaseOption & {
  kind: 'pooled-repeating-extant-option',
  queryTags: ReadonlyArray<string>,
  queryVariables: ReadonlyArray<string>,
}

export type AppOption =
  | BooleanOption
  | ExclusiveOption
  | ExtantOption
  | NumericOption
  | PoolScopeOption
  | PoolOption
  | PooledRepeatingExtantOption
  | RepeatingExtantOption

export type BaseSelection = {
  children: ReadonlyArray<AppSelection>,
  id: string,
  name: string | null,
  optionKey: string,
}

export type BooleanSelection = BaseSelection & {
  kind: 'boolean-selection',
  value: boolean,
}

export type ExclusiveSelection = BaseSelection & {
  kind: 'exclusive-selection',
  selected: string,
}

export type ExtantSelection = BaseSelection & {
  kind: 'extant-selection',
}

export type NumericSelection = BaseSelection & {
  kind: 'numeric-selection',
  value: number,
}

export type PoolScopeSelection = BaseSelection & {
  kind: 'pool-scope-selection',
}

export type PoolSelection = BaseSelection & {
  kind: 'pool-selection',
}

export type PooledRepeatingExtantSelection = BaseSelection & {
  kind: 'pooled-repeating-extant-selection',
}

export type RepeatingExtantSelection = BaseSelection & {
  kind: 'repeating-extant-selection',
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
  | PoolScopeSelection
  | PoolSelection
  | PooledRepeatingExtantSelection
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

export type Selectable = AppOption | AppSelection

export const isExtantSelection = (x: AppSelection): x is ExtantSelection => {
  return x.kind == 'extant-selection'
}

export const isOptionFromEntity = (x: Entity): x is AppOption  => {
  switch(x.kind) {
    case 'boolean-option':
    case 'exclusive-option':
    case 'extant-option':
    case 'numeric-option':
    case 'pool-option':
    case 'pool-scope-option':
    case 'pooled-repeating-extant-option':
    case 'repeating-extant-option':
      return true
    case 'cost':
    case 'validation':
      return false
  }
}

export const isOptionFromSelectable = (x: Selectable): x is AppOption => {
  switch(x.kind) {
    case 'boolean-option':
    case 'exclusive-option':
    case 'extant-option':
    case 'numeric-option':
    case 'pool-option':
    case 'pool-scope-option':
    case 'pooled-repeating-extant-option':
    case 'repeating-extant-option':
      return true
    case 'boolean-selection':
    case 'exclusive-selection':
    case 'extant-selection':
    case 'numeric-selection':
    case 'pool-selection':
    case 'pool-scope-selection':
    case 'pooled-repeating-extant-selection':
    case 'repeating-extant-selection':
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
 * Automatically add fixed options and the default selections of exclusive
 * options.
 */
export const isAutomaticallyAdded = (
  option: AppOption,
  child: AppOption,
): boolean => {
  return child.autoAdd
    || option.kind == 'exclusive-option' && option.default == child.key
}

/**
 * Generate AppSelection children from an AppOption.
 */
export const selectionChildren = (
  options: ReadonlyArray<AppOption>,
  x: AppOption,
): ReadonlyArray<AppSelection> => {
  return optionChildren(options, x)
    .filter(isAutomaticallyAdded.bind(null, x))
    .filter((o: AppOption) => {
      return x.childQuery.every(c => o.tags.includes(c))
    })
    .map(optionToSelection.bind(null, options))
}

/**
 * Generate an AppSelection from an AppOption.
 */
export const optionToSelection = (
  options: ReadonlyArray<AppOption>,
  x: AppOption,
): AppSelection => {
  switch (x.kind) {
    case 'boolean-option': {
      const selection: BooleanSelection = {
        children: selectionChildren(options, x),
        id: v4(),
        kind: 'boolean-selection',
        name: x.name,
        optionKey: x.key,
        value: true,
      }
      return selection
    }
    case 'extant-option': {
      const selection: ExtantSelection = {
        children: selectionChildren(options, x),
        id: v4(),
        kind: 'extant-selection',
        name: x.name,
        optionKey: x.key,
      }
      return selection
    }
    case 'exclusive-option': {
      const selection: ExclusiveSelection = {
        children: selectionChildren(options, x),
        id: v4(),
        kind: 'exclusive-selection',
        name: x.name,
        optionKey: x.key,
        selected: x.default,
      }
      return selection
    }
    case 'numeric-option': {
      const selection: NumericSelection = {
        children: selectionChildren(options, x),
        id: v4(),
        kind: 'numeric-selection',
        name: x.name,
        optionKey: x.key,
        value: x.default,
      }
      return selection
    }
    case 'pool-option': {
      const selection: PoolSelection = {
        children: selectionChildren(options, x),
        id: v4(),
        kind: 'pool-selection',
        name: x.name,
        optionKey: x.key,
      }
      return selection
    }
    case 'pool-scope-option': {
      const selection: PoolScopeSelection = {
        children: selectionChildren(options, x),
        id: v4(),
        kind: 'pool-scope-selection',
        name: x.name,
        optionKey: x.key,
      }
      return selection
    }
    case 'pooled-repeating-extant-option': {
      const selection: PooledRepeatingExtantSelection = {
        children: [],
        id: v4(),
        kind: 'pooled-repeating-extant-selection',
        name: x.name,
        optionKey: x.key,
      }
      return selection
    }
    case 'repeating-extant-option': {
      const selection: RepeatingExtantSelection = {
        // TODO: Consider identifying which ones should be automatically
        // added.
        children: [],
        id: v4(),
        kind: 'repeating-extant-selection',
        name: x.name,
        optionKey: x.key,
      }
      return selection
    }
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

export const optionChildren = (
  options: ReadonlyArray<AppOption>,
  option: AppOption,
): ReadonlyArray<AppOption> => {
  return options.filter(o => option.childQuery.every(c => o.tags.includes(c)))
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
    return option.costs
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

export const selectionFromSelectable = (
  options: ReadonlyArray<AppOption>,
  selectable: Selectable,
): AppSelection => {
  return isOptionFromSelectable(selectable)
    ? optionToSelection(options, selectable)
    : cloneSelection(selectable)
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
export const format = (
  options: ReadonlyArray<AppOption>, m: string,
  vars: ReadonlyArray<{}>,
): string => {
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

export const optionFromSelection = (
  options: ReadonlyArray<AppOption>,
  selection: AppSelection,
): OptionType<AppOption> => {
  return Option.intoOption(options.find(o => o.key == selection.optionKey))
}
/**
 * Recurisvely grabs tags from selections that are identified via a "variable"
 * selection. Some selection is indicated via a variable (the variable is the
 * optionKey of the selection). That selection contains tags (dynamically) due
 * to whatever dynamic nature the selection has.
 *
 * For exclusive selections, use the selected property, and recurse into any
 * children that belong to that selected child.
 */
export const tagsFromVariable = (
  options: ReadonlyArray<AppOption>,
  selection: AppSelection,
): ReadonlyArray<string> => {
  switch (selection.kind) {
    case 'exclusive-selection': {
      const child = selection.children.find(c => c.optionKey == selection.selected)
      return [
        selection.selected,
        ...(child == null ? [] : tagsFromVariable(options,child)),
      ]
    }
    default: {
      return optionFromSelection(options, selection)
        .match({
          some: o => o.tags,
          none: () => [],
        })
    }
  }
}

export type PooledOptions = {
  options: ReadonlyArray<AppOption>,
  selections: ReadonlyArray<AppSelection>
}

export const optionsAvailable = (
  options: ReadonlyArray<AppOption>,
  scopedSelections: ReadonlyArray<AppSelection>,
  option: PooledRepeatingExtantOption,
): PooledOptions => {
  console.log('scopedSelections', scopedSelections)
  const variableTags = chain(
    tagsFromVariable.bind(null, options),
    scopedSelections.filter(s => option.queryVariables.includes(s.optionKey)),
  )
  console.log('variableTags', variableTags)
  const searchTags = variableTags.concat(option.queryTags)
  const selections = scopedSelections
    .filter(s => {
      return optionFromSelection(options, s)
        .map(o => {
          return searchTags.every(t => o.tags.includes(t))
        })
        .match({
          some: (bool) => bool,
          none: always(false),
        })
    })
  return {
    options: options.filter(o => {
      return searchTags.every(t => o.tags.includes(t))
    }),
    selections: selections,
  }
}

export const flatSelections = (
  s: AppSelection | null | undefined,
): ReadonlyArray<AppSelection> => {
  return s == null
    ? []
    : [s, ...chain(flatSelections, s.children) ]
}

export const cloneSelection = (
  selection: AppSelection,
): AppSelection => {
  return {
    ...selection,
    children: selection.children.map(cloneSelection),
    id: v4(),
  }
}

export const selectableKey = (x: Selectable): string => {
  return isOptionFromSelectable(x)
    ? x.key
    : x.id
}

export const findSelectionByOptionKey = (
  optionKey: string,
  parent: AppSelection,
): OptionType<AppSelection> => {
  return parent.optionKey == optionKey
    ? Option.intoOption(parent)
    : parent.children.reduce((acc, child) => {
      return acc.orElse(findSelectionByOptionKey.bind(null, optionKey, child))
    }, Option.none)
}

export const scopedOptions = (
  options: ReadonlyArray<AppOption>,
  scoped: ReadonlyArray<AppOption>,
  option: AppOption,
  roster: AppSelection,
  selection: AppSelection,
): ReadonlyArray<AppOption> => {
  if(selection.kind == 'pool-scope-selection'
    && option.kind == 'pool-scope-option') {
    return findSelectionByOptionKey(option.poolVariable, roster)
      .andThen<AppOption>(scope => {
        if(scope.kind == 'pool-selection') {
          return Option.intoOption(optionForSelection(options, scope))
        } else if(scope.kind == 'exclusive-selection') {
          // ExclusiveSelections can be used to select an option (such as a
          // faction) which then selects the pool we want.
          // In the future we might support others - such as a list of options
          // to select from.
          return Option.intoOption(
            scope.children.find(c => c.optionKey == scope.selected),
          ).andThen(pipe(
            optionForSelection.bind(null, options),
            Option.intoOption,
          )).map((o: AppOption) => {
            console.log(`Found ${o.key} for scoped options.`)
            return o
          })
        } else {
          return Option.none
        }
      }).map(pool => {
        if(pool.kind == 'pool-option') {
          if(pool.infinite) {
            console.log(`filtering for ${pool.tags} in ${pool.key}`)
            const filtered = options.filter(o => {
              return o.tags.includes(pool.key)
            })
            console.log('filtered', filtered)
            return filtered
          } else {
            // For non-infinite selections, we need a pool of selections, not
            // options. Since we're handling options here, just return an empty
            // list.
            return []
          }
        } else {
          console.error(`"${pool.key}" is not a pool-option but \
"${selection.optionKey}" refers to it as such.`)
          return []
        }
      })
      .unwrapOrElse(() => {
        console.error(`Could not find pool-option for "${selection.optionKey}".`)
        return []
      })
  } else {
    return scoped
  }
}

export const scopedSelections = (
  selection: AppSelection,
  option: AppOption,
  roster: AppSelection,
  scoped: ReadonlyArray<AppSelection>,
): ReadonlyArray<AppSelection> => {
  if(selection.kind == 'pool-scope-selection'
    && option.kind == 'pool-scope-option') {
      return flatSelections(roster)
        .find(s => s.optionKey == option.poolVariable)?.children || []
  } else {
    // For non-pool entities, just chain along the scoped options.
    return scoped
  }
}
