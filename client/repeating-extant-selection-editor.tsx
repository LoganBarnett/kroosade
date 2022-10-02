/**
 */
import React, {
  type FC,
  type MouseEvent,
  type ReactElement,
  useState
} from 'react'
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
import { type Component as VisibleComponent } from './visible'

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

const setNewOptionCandidate = (
  setState: (x: State) => void,
  state: State,
  option: Option | null | undefined,
  e: React.ChangeEvent<HTMLSelectElement>,
): void => {
  setState({
    ...state,
    newOptionCandidate: option?.children
      .filter(isOption)
      .find(o => o.key == e.target.value),
  })
}

const addSelection = (
  selection: RepeatingExtantSelection,
  setState: (x: State) => void,
  state: State,
  e: MouseEvent<HTMLButtonElement>,
): void => {
  e.preventDefault()
  setState({...state, adding: false})
}

export default (
  className: string,
  AddButton: ButtonComponent,
  Visible: VisibleComponent,
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
      <Visible visible={!state.adding}>
        <AddButton onClick={() => setState({...state, adding: true})}>
          add {selectionTitle(props.options, props.selection)}
        </AddButton>
      </Visible>
      <Visible visible={state.adding}>
        <select
          onChange={setNewOptionCandidate.bind(null, setState, state, option)}
          value={option?.key}
        >
          {option?.children
            .filter(isOption)
            .map(o => <option key={o.key} value={o.key}>{o.name}</option>)
          }
        </select>
        {state.newOptionCandidate != null
          ? <AddButton
            onClick={addSelection.bind(null, props.selection, setState, state)}
          >
            add {state.newOptionCandidate.name}
          </AddButton>
          : <>Data incomplete. No candidates found in '{option?.name}'</>
        }
      </Visible>
    </fieldset>
  }
  component.displayName = 'RepeatingExtantSelectionEditor'
  return component
}
