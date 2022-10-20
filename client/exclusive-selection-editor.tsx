import React, { useContext, type FC, type ReactElement } from 'react'
import { isOption, type ExclusiveSelection, type AppOption } from './model'
import { optionForSelection } from './utils'
import { Context } from './reducer-provider'
import { selectionChangeExclusiveAction } from './app-reducer'

export type Props = {
  options: ReadonlyArray<AppOption>,
  selection: ExclusiveSelection,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { dispatch } = useContext(Context)
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
      dispatch(selectionChangeExclusiveAction(
        props.selection,
        e.currentTarget.value,
      ))
    }
    const option = optionForSelection(props.options, props.selection)
    if(option != null) {
      return <fieldset className={className}>
        {option.children.filter(isOption).map(child => {
          return <div key={child.key}>
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
      </fieldset>
    } else {
      return <>Error</>
    }
  }
  component.displayName = 'ExclusiveSelectionEditor'
  return component
}
