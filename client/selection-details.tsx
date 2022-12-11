import React, { type FC, type ReactElement } from 'react'
import { type AppOption, type AppSelection } from './model'
import { type Component as SelectionEditorComponent } from './selection-editor'
import { type Component as ValidationIssuesComponent } from './validation-issues'

export type Props = {
  options: ReadonlyArray<AppOption>,
  parent: AppSelection | undefined | null,
  selection: AppSelection | undefined | null,
}

export default (
  SelectionEditor: SelectionEditorComponent,
  ValidationIssues: ValidationIssuesComponent,
  className: string,
): FC<Props> => {
  // Use the capital C this time so we can use it as a component recursively.
  const Component = (props: Props): ReactElement => {

    const children = props.selection?.children.filter(c => {
      return c.kind != 'boolean-selection' || c.value
    }) || []
    return props.selection != null
      ? <article className={className}>
        <SelectionEditor
          options={props.options}
          parent={props.parent}
          selection={props.selection}
        />
        <ValidationIssues
          options={props.options}
          root={props.selection}
          selection={props.selection}
        />
          { children.length > 0
            ? <ul className="selection-details-children">
                {children.map(c => {
                  return <li key={c.id}>
                    <Component
                      options={props.options}
                      selection={c}
                      parent={props.selection}
                    />
                  </li>
                })}
              </ul>
            : <></>
            }
        </article
      >
      : <></>
  }
  Component.displayName = 'SelectionDetails'
  return Component
}
