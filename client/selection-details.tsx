import React, { type FC, type ReactElement } from 'react'
import { type AppOption, type AppSelection } from './model'
import { type Component as SelectionEditorComponent } from './selection-editor'
import { optionForSelection } from './utils'
import { type Component as ValidationIssuesComponent } from './validation-issues'

export type Props = {
  options: ReadonlyArray<AppOption>,
  parent: AppSelection | undefined | null,
  scopedOptions: ReadonlyArray<AppSelection>,
  selection: AppSelection,
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
    const option = optionForSelection(props.options, props.selection)
    if(option == null || props.selection == null) {
      return <>
        Option missing from selection {
          props.selection?.id || 'missing selection too'
        }
      </>
    } else {
      const scopedOptions = props.selection.kind == 'pool-selection'
        && option.kind == 'pool-option'
        && option.from != null
        ? props.selection.children
          .find(s => s.optionKey == option.from)?.children || []
        : props.scopedOptions
      return props.selection != null
        ? <article className={className}>
          <SelectionEditor
            options={props.options}
            parent={props.parent}
            scopedOptions={scopedOptions}
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
                        scopedOptions={scopedOptions}
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
  }
  Component.displayName = 'SelectionDetails'
  return Component
}
