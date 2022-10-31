import React, { type FC, type ReactElement } from 'react'
import { type AppOption, format, type ValidationIssue } from './model'

export type Props = {
  options: ReadonlyArray<AppOption>,
  validation: ValidationIssue,
}

export type Component = FC<Props>

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <dl>
      <dt>{props.validation.validationType}:&nbsp;
      {props.validation.issueCode}</dt>
      <dd>
        <ul>
          {props.validation.messages.map(m => {
            return <li>{format(props.options, m.message, m.variables)}</li>
          })}
        </ul>
      </dd>
    </dl>
  }
  component.displayName = 'ValidationIssue'
  return component
}
