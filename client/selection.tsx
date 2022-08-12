import React, { type ReactElement, type ReactNode, type FC } from 'react'
import { type Option, type Selection } from './model'

export type Props = {
  children?: ReactNode,
  options: ReadonlyArray<Option>,
  selection: Selection,
}

const selectionName = (
  options: ReadonlyArray<Option>,
  selection: Selection,
): string => {
  return selection.name != null
    ? selection.name
    : (
      options.find(o => o.key == selection.optionKey)?.name
      || `Option '${selection.optionKey}' not found!`
    )
}

export default (cssClass: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <article className={cssClass}>
      <h3>{selectionName(props.options, props.selection)}</h3>
        {props.children}
      </article>
  }
  component.displayName = 'Selection'
  return component
}
