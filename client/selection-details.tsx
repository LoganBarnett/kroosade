import React, { type FC, type ReactNode, type ReactElement } from 'react'
import { type AppOption, type AppSelection } from './model'
import { selectionTitle } from './utils'
import { type Component as SelectionEditorComponent } from './selection-editor'

export type Props = {
  options: ReadonlyArray<AppOption>,
  selection: AppSelection | undefined | null,
}

export default (
  SelectionEditor: SelectionEditorComponent,
  className: string,
): FC<Props> => {
  // Use the capital C this time so we can use it as a component recursively.
  const Component = (props: Props): ReactElement => {
    return <article className={className}>
      {props.selection != null ?
        <>
          { /* selectionTitle(props.options, props.selection) */}
          <SelectionEditor options={props.options} selection={props.selection} />
          { props.selection.children.filter(c => {
            return c.kind != 'extant-selection' || c.selected
          }).length > 0
            ? <ul>
                {props.selection.children.map(c => {
                  return <li key={c.id}>
                    <Component options={props.options} selection={c} />
                  </li>
                })}
              </ul>
            : <></>
            }
        </>
      : ''
      }
    </article>
  }
  Component.displayName = 'SelectionDetails'
  return Component
}
