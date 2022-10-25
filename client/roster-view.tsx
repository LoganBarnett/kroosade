import React, {
  type FC,
  type ReactElement,
  useContext,
} from 'react'
import { Context } from './reducer-provider'
import rosterFn from './roster'
import { options } from './data'
import { type AppSelection } from './model'
import { default as buttonFn } from './button'
import buttonStyles from './button.module.css'
import { default as booleanSelectionEditorFn } from './boolean-selection-editor'
import { default as exclusiveSelectionEditorFn } from './exclusive-selection-editor'
import { default as extantSelectionEditorFn } from './extant-selection-editor'
import { default as numericSelectionEditorFn } from './numeric-selection-editor'
import { default as repeatingExtantSelectionEditorFn } from './repeating-extant-selection-editor'
import { default as selectionDetailsFn } from './selection-details'
import { default as selectionEditorFn } from './selection-editor'
import { default as visibleRenderFn } from './visible'
import { selectionFocusAction } from './actions'

export type ComponentState = {
  focus: AppSelection | null,
}

export type Props = {
}

const Roster = rosterFn('roster-parent')
const VisibleRender = visibleRenderFn('rendering')
const AddButton = buttonFn(buttonStyles.add)
const DeleteButton = buttonFn(buttonStyles.remove)
const BooleanSelectionEditor = booleanSelectionEditorFn('boolean-selection')
const ExtantSelectionEditor = extantSelectionEditorFn('extant-selection')
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
  NumericSelectionEditor,
  RepeatingExtantSelectionEditor,
)
const SelectionDetails = selectionDetailsFn(
  SelectionEditor,
  'selection-details',
)

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { state, dispatch } = useContext(Context)
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
