import {
  type Option,
  type Selection,
} from './model'
import {
  type Component as BooleanSelectionEditorComponent,
} from './boolean-selection-editor'
import {
  type Component as ExtantSelectionEditorComponent,
} from './extant-selection-editor'
import {
  type Component as NumericSelectionEditorComponent,
} from './numeric-selection-editor'
import {
  type Component as RepeatingExtantSelectionEditorComponent,
} from './repeating-extant-selection-editor'
import React, { type FC, type ReactNode, type ReactElement } from 'react'

export type Props = {
  options: ReadonlyArray<Option>,
  selection: Selection,
}

export type Component = FC<Props>

export default (
  BooleanSelectionEditor: BooleanSelectionEditorComponent,
  ExtantSelectionEditor: ExtantSelectionEditorComponent,
  NumericSelectionEditor: NumericSelectionEditorComponent,
  RepeatingExtantSelectionEditor: RepeatingExtantSelectionEditorComponent,
): FC<Props> => {
  const selectionEditor = (
    options: ReadonlyArray<Option>,
    x: Selection,
  ): ReactElement => {
    // TypeScript derping. Inspired by:
    // https://dev.to/babak/exhaustive-type-checking-with-typescript-4l3f
    const exhaustive = (kind: string, selection: never): ReactElement => {
      return <>Selection '{kind}' in '{selection}' not supported!</>
    }
    // Capture before TypeScript makes the Selection into a `never'.
    const kind = x.kind
    switch (x.kind) {
      case 'boolean-selection':
        return <BooleanSelectionEditor options={options} selection={x} />
      case 'extant-selection':
        return <ExtantSelectionEditor options={options} selection={x} />
      case 'numeric-selection':
        return <NumericSelectionEditor options={options} selection={x} />
      case 'repeating-extant-selection':
        return <RepeatingExtantSelectionEditor options={options} selection={x}/>
    }
    // This ensures all checks are satisfied. If there's a type error on the
    // variable here, it's because we need to add more cases to reach
    // exhaustion.  The "Unreachable code detected" warning can safely be
    // ignored. It might even be an error if the warning is not there. Can we
    // disable it somehow?
    return exhaustive(kind, x)
  }

  const component = (props: Props): ReactElement => {
    return selectionEditor(props.options, props.selection)
  }
  component.displayName = 'SelectionEditor'
  return component
}
