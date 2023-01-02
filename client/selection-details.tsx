import React, { type FC, type ReactElement } from 'react'
import {
  scopedOptions,
  scopedSelections,
  type AppOption,
  type AppSelection,
} from './model'
import { type Component as SelectionEditorComponent } from './selection-editor'
import { optionForSelection } from './utils'
import { type Component as ValidationIssuesComponent } from './validation-issues'

export type Props = {
  options: ReadonlyArray<AppOption>,
  scopedOptions: ReadonlyArray<AppOption>,
  parent: AppSelection | undefined | null,
  scopedSelections: ReadonlyArray<AppSelection>,
  selection: AppSelection,
  roster: AppSelection,
}

export type Component = FC<Props>

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
    const option = optionForSelection(props.options, props.selection)
    if(option == null || props.selection == null) {
      return <>
        Option missing from selection {
          props.selection?.id || 'missing selection too'
        }
      </>
    } else {
      const newScopedSelections = scopedSelections(
        props.selection,
        option,
        props.roster,
        props.scopedSelections,
      )
      const newScopedOptions = scopedOptions(
        props.options,
        props.scopedOptions,
        option,
        props.roster,
        props.selection,
      )
      return props.selection != null
        ? <article className={className}>
          <SelectionEditor
            options={props.options}
            parent={props.parent}
            roster={props.roster}
            scopedSelections={newScopedSelections}
            scopedOptions={newScopedOptions}
            selection={props.selection}
            selectionDetailsComponent={Component}
          >
            { children.length > 0
              ? <ul className="selection-details-children">
                  {children.map(c => {
                    return <li key={c.id}>
                      <Component
                        options={props.options}
                        scopedSelections={newScopedSelections}
                        scopedOptions={newScopedOptions}
                        selection={c}
                        roster={props.roster}
                        parent={props.selection}
                      />
                    </li>
                  })}
                </ul>
              : <span data-children="none"></span>
              }
          </SelectionEditor>
          <ValidationIssues
            options={props.options}
            root={props.selection}
            selection={props.selection}
          />
          </article
        >
        : <></>
    }
  }
  Component.displayName = 'SelectionDetails'
  return Component
}
