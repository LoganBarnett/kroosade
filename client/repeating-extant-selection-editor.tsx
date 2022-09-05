/**
 */
import React, { type FC, type ReactElement, useState } from 'react'
import {
  type Option,
  type RepeatingExtantSelection,
  isExtantSelection,
  isOption,
} from './model'
import { type Component as ButtonComponent } from './button'
import {
  type Component as ExtantSelectionEditorComponent,
} from './extant-selection-editor'
import { optionForSelection, selectionTitle } from './utils'

export type Props = {
  options: ReadonlyArray<Option>,
  selection: RepeatingExtantSelection,
}

export type Component = FC<Props>

type State = {
  adding: boolean,
  newOptionCandidate: Option | null | undefined,
}

const defaultState = (option: Option | null | undefined): State => {
  return {
    adding: false,
    newOptionCandidate: option?.children.filter(isOption)[0],
  }
}

export default (
  className: string,
  AddButton: ButtonComponent,
  ExtantSelectionEditor: ExtantSelectionEditorComponent,
): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const option = optionForSelection(props.options, props.selection)
    const [state, setState] = useState(Object.assign(
      {},
      defaultState(option),
    ))
    return <fieldset className={className}>
      {props.selection.children
        .filter(isExtantSelection)
        .map(x => <ExtantSelectionEditor options={props.options} selection={x}/>)
      }
      <AddButton onClick={() => {}}>
        add {selectionTitle(props.options, props.selection)}
      </AddButton>
      <select>
      {option?.children
        .filter(isOption)
        .map(o => <option key={o.key} value={o.key}>{o.name}</option>)
      }
      </select>
      {state.newOptionCandidate != null
       ? <AddButton onClick={() => {}}>
        add {state.newOptionCandidate.name}
      </AddButton>
        : ''
      }
    </fieldset>
  }
  component.displayName = 'RepeatingExtantSelectionEditor'
  return component
}
