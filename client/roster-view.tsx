import React, {
  type FC,
  type ReactElement,
  useContext,
} from 'react'
import { v4 as uuid } from 'uuid'
import { Context } from './reducer-provider'
import rosterFn from './roster'
import { options } from './data'
import { optionToSelection, type AppSelection } from './model'
import { default as buttonFn } from './button'
import buttonStyles from './button.module.css'
import { default as booleanSelectionEditorFn } from './boolean-selection-editor'
import { default as exclusiveSelectionEditorFn } from './exclusive-selection-editor'
import { default as extantSelectionEditorFn } from './extant-selection-editor'
import { default as fixedSelectionEditorFn } from './fixed-selection-editor'
import { default as numericSelectionEditorFn } from './numeric-selection-editor'
import { default as repeatingExtantSelectionEditorFn } from './repeating-extant-selection-editor'
import { default as selectionDetailsFn } from './selection-details'
import { default as selectionEditorFn } from './selection-editor'
import { default as visibleRenderFn } from './visible'
import { selectionCreateRosterAction, selectionFocusAction } from './actions'
import { default as selectionCostFn } from './selection-cost'
import { default as selectionCostTypeFn } from './selection-cost-type'
import { default as validationIssueFn } from './validation-issue'
import { default as validationIssuesFn } from './validation-issues'

export type ComponentState = {
  focus: AppSelection | null,
}

export type Props = {
}

const Roster = rosterFn('roster-parent')
const VisibleRender = visibleRenderFn('rendering')
const AddButton = buttonFn(buttonStyles.add)
const DeleteButton = buttonFn(buttonStyles.remove)
const ValidationIssue = validationIssueFn()
const ValidationIssues = validationIssuesFn(ValidationIssue)
const SelectionCostType = selectionCostTypeFn()
const SelectionCost = selectionCostFn(SelectionCostType)
const BooleanSelectionEditor = booleanSelectionEditorFn('boolean-selection')
const ExtantSelectionEditor = extantSelectionEditorFn(
  SelectionCost,
  'extant-selection',
)
const FixedSelectionEditor = fixedSelectionEditorFn(
  SelectionCost,
  'fixed-selection',
)
const NumericSelectionEditor = numericSelectionEditorFn('numeric-selection')
const ExclusiveSelectionEditor = exclusiveSelectionEditorFn('exclusive-selection')
const RepeatingExtantSelectionEditor = repeatingExtantSelectionEditorFn(
  'repeating-extant-selection',
  AddButton,
  DeleteButton,
  VisibleRender,
  ExtantSelectionEditor,
)
const SelectionEditor = selectionEditorFn(
  BooleanSelectionEditor,
  ExclusiveSelectionEditor,
  ExtantSelectionEditor,
  FixedSelectionEditor,
  NumericSelectionEditor,
  RepeatingExtantSelectionEditor,
)
const SelectionDetails = selectionDetailsFn(
  SelectionEditor,
  ValidationIssues,
  'selection-details',
)

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { state, dispatch } = useContext(Context)
    const createRoster = () => {
      const key = 'force'
      const option = options.find(o => o.key == key)
      if(option == null) {
        console.error('Option missing: ' + key)
      } else {
        // TODO: Create the selection from the option. Otherwise we aren't
        // creating the correct selection type that follows the option.
        dispatch(selectionCreateRosterAction(optionToSelection(option)))
      }
    }
    // Use focusFn instead of focus, because focus is global.
    const focusFn = (s: AppSelection) => dispatch(selectionFocusAction(s))
    return <>
      <header>
        <hgroup>
          <h1>Kroosade</h1>
        </hgroup>
      </header>
      <article>
        <h1>Roster</h1>
        <section>
          {state.roster != null
            ? <Roster
              focus={focusFn}
              options={options}
              roster={state.roster}
            />
            : <>No roster loaded.</>
          }
        <AddButton onClick={createRoster}> create roster </AddButton>
        </section>
        <section>
          <h2>Selection</h2>
          <SelectionDetails options={options} selection={state.focus} />
        </section>
        <section>
          <h2>Info</h2>
        </section>
      </article>
    </>
  }
  component.displayName = 'RosterView'
  return component
}
