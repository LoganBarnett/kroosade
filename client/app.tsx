/// <reference types="react/experimental" />
/// <reference types="react/next" />
import React, { type FC, type ReactElement, useState } from 'react'
import * as ReactDOM from 'react-dom'
import { options } from './data'
import { type Selection } from './model'
import rosterFn from './roster'
import { roster } from './example-roster'
import { default as buttonFn } from './button'
import buttonStyles from './button.module.css'
import { default as booleanSelectionEditorFn } from './boolean-selection-editor'
import { default as extantSelectionEditorFn } from './extant-selection-editor'
import { default as numericSelectionEditorFn } from './numeric-selection-editor'
import { default as repeatingExtantSelectionEditorFn } from './repeating-extant-selection-editor'
import { default as selectionDetailsFn } from './selection-details'
import { default as selectionEditorFn } from './selection-editor'
import './base.css'
import './dark-theme.css'

export type State = {
  focus: Selection | null,
}

const AddButton = buttonFn(buttonStyles.add)
const Roster = rosterFn('roster-parent')
const BooleanSelectionEditor = booleanSelectionEditorFn('boolean-selection')
const ExtantSelectionEditor = extantSelectionEditorFn('extant-selection')
const NumericSelectionEditor = numericSelectionEditorFn('numeric-selection')
const RepeatingExtantSelectionEditor = repeatingExtantSelectionEditorFn(
  'repeating-extant-selection',
  AddButton,
  ExtantSelectionEditor,
)
const SelectionEditor = selectionEditorFn(
  BooleanSelectionEditor,
  ExtantSelectionEditor,
  NumericSelectionEditor,
  RepeatingExtantSelectionEditor,
)
const SelectionDetails = selectionDetailsFn(
  SelectionEditor,
  'selection-details',
)
// @ts-ignore - I guess createRoot isn't supported yet. I have tried
// react-dom/experimental and react-dom/next as imported types and references,
// but still no joy.
const root = ReactDOM.createRoot(document.querySelector('body'))

// Use semantic HTML to do the layout. Used example taken from
// https://gist.github.com/thomd/9220049
const Page: FC<{}> = (props: {}): ReactElement => {
  const [state, setState] = useState({
    focus: null,
  })
  const focus = (selection: Selection): void => {
    setState(Object.assign({}, state, { focus: selection }))
  }
  return <>
    <header>
      <hgroup>
        <h1>Kroosade</h1>
      </hgroup>
    </header>
    <article>
      <h1>Roster</h1>
      <section>
        <Roster focus={focus} options={options} roster={roster} />
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
root.render(<Page/>)
