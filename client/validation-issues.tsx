import React, { type FC, type ReactNode, type ReactElement } from 'react'
import {
  type AppOption,
  type AppSelection,
  type ValidationIssue,
  type Validation,
  isValidation,
  selectionToOption,
} from './model'
import { type Component as ValidationIssueComponent } from './validation-issue'

export type Props = {
  options: ReadonlyArray<AppOption>,
  root: AppSelection,
  selection: AppSelection,
}

export type Component = FC<Props>

export default (ValidationIssueC: ValidationIssueComponent): FC<Props> => {
  const component = (props: Props): ReactElement => {
    // TODO: Error handling.
    const issues = (selectionToOption(
      props.options,
      props.selection,
    )?.children || [])
      .filter(isValidation)
      .map((v: Validation): [string, ReadonlyArray<ValidationIssue>] => {
        return [
          v.name,
          v.function(props.options, props.root, props.selection),
        ]
      })
      .map(([name, vs]: [string, ReadonlyArray<ValidationIssue>]) => {
        return <li key={name}>
          <ul>
            {vs.map(v => {
              return <li key={v.issueCode}>
                <ValidationIssueC options={props.options} validation={v} />
              </li>
            })}
          </ul>
        </li>
      })
    return <ul>
      {issues}
    </ul>
  }
  component.displayName = 'ValidationIssues'
  return component
}
