import React, {
  useContext,
  type FC,
  type ReactElement,
  type ReactNode,
} from 'react'
import {
  type AppOption,
  type ExclusiveSelection,
  isOptionFromEntity,
} from './model'
import { optionForSelection } from './utils'
import { Context } from './reducer-provider'
import { selectionChangeExclusiveAction } from './actions'

export type Props = {
  children: ReactNode,
  options: ReadonlyArray<AppOption>,
  selection: ExclusiveSelection,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { dispatch } = useContext(Context)
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
      const selected = props.options.find(o => o.key == e.currentTarget.value)
      if(selected != null) {
        dispatch(selectionChangeExclusiveAction(
          props.selection,
          selected,
        ))
      } else {
        e.preventDefault()
        console.error(`Error: Could not find selected option \
"${e.currentTarget.value}" as a child of "${props.selection.optionKey}". \
Aborting selection. Review data for inconsistent  key names for \
"${props.selection.optionKey}".`)
      }
    }
    const option = optionForSelection(props.options, props.selection)
    if(option != null) {
      return <fieldset className={className}>
        {option.children.filter(isOptionFromEntity).map(child => {
          return <div key={child.key} data-id={child.key}>
            <input
              checked={props.selection.selected == child.key}
              name={props.selection.id}
              onChange={onChange}
              type="radio"
              value={child.key}
            />
            <label htmlFor={child.key}>{child.name}</label>
          </div>
        })}
        {props.children}
      </fieldset>
    } else {
      return <>Error finding option "${props.selection.optionKey}" from
      selection "${props.selection.id}".
        </>
    }
  }
  component.displayName = 'ExclusiveSelectionEditor'
  return component
}
