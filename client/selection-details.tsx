import React, { type FC, type ReactNode, type ReactElement } from 'react'
import {
  type ExtantSelection,
  type NumericSelection,
  type Option,
  type Selection
} from './model'
import { selectionTitle } from './utils'
import extantSelectionEditorFn from './extant-selection-editor'

export type Props = {
  selection: Selection | null,
  options: ReadonlyArray<Option>,
}

const extantSelectionEditor = (x: ExtantSelection): ReactNode => {
  return <div>delete button for {x.id}</div>
}

const numericSelectionEditor = (x: NumericSelection): ReactNode => {
  return <input type="number" value={x.value} />
}

const selectionEditor = (x: Selection): ReactNode => {
  // TypeScript derping. Inspired by:
  // https://dev.to/babak/exhaustive-type-checking-with-typescript-4l3f
  const exhaustive = (kind: string, selection: never): ReactNode => {
    return `Selection '${x.kind}' not supported!`
  }
  // Capture before TypeScript makes the Selection into a `never'.
  const kind = x.kind
  switch(x.kind) {
    case 'extant-selection':
      return extantSelectionEditor(x)
    case 'numeric-selection':
      return numericSelectionEditor(x)
  }
  // This ensures all checks are satisfied. If there's a type error on the
  // variable here, it's because we need to add more cases to reach exhaustion.
  // The "Unreachable code detected" warning can safely be ignored. It might
  // even be an error if the warning is not there. Can we disable it somehow?
  return exhaustive(kind, x)
}

export default (className: String): FC<Props> => {
  const ExtantSelectionEditor = extantSelectionEditorFn('')
  // Use the capital C this time so we can use it as a component recursively.
  const Component = (props: Props): ReactElement => {
    return <article>
      {props.selection != null ?
        <>
          {selectionTitle(props.options, props.selection)}
          {selectionEditor(props.selection)}
          <ul>
            {props.selection.children.map(c => {
              return <li key={c.id}>
                <Component options={props.options} selection={c} />
              </li>
            })}
          </ul>
        </>
      : ''
      }
    </article>
  }
  Component.displayName = 'SelectionDetails'
  return Component
}
