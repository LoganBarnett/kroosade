/**
 */
import React, {
  type FC,
  type MouseEvent,
  type ReactElement,
  useContext,
  useState,
} from 'react'
import { type AppAction, selectionAddChildrenAction } from './actions'
import { type Component as ButtonComponent } from './button'
import {
  type Component as ExtantSelectionEditorComponent,
} from './extant-selection-editor'
import {
  type AppOption,
  type RepeatingExtantSelection,
  isExtantSelection,
  isOption,
  optionToSelection,
} from './model'
import { Context } from './reducer-provider'
import { optionForSelection, selectionTitle } from './utils'
import { type Component as VisibleComponent } from './visible'

export type Props = {
  options: ReadonlyArray<AppOption>,
  selection: RepeatingExtantSelection,
}

export type Component = FC<Props>

type State = {
  adding: boolean,
  newOptionCandidate: AppOption | null | undefined,
}

const defaultState = (option: AppOption): State => {
  return {
    adding: false,
    newOptionCandidate: option.children.filter(isOption)[0],
  }
}

const setNewOptionCandidate = (
  setState: (x: State) => void,
  state: State,
  option: AppOption,
  e: React.ChangeEvent<HTMLSelectElement>,
): void => {
  console.log('setting new option to', e.target.value, option.children
      .filter(isOption)
      .find(o => o.key == e.target.value))
  setState({
    ...state,
    newOptionCandidate: option.children
      .filter(isOption)
      .find(o => o.key == e.target.value),
  })
}

const addSelection = (
  selection: RepeatingExtantSelection,
  setState: (x: State) => void,
  dispatch: React.Dispatch<AppAction>,
  toAdd: AppOption,
  e: MouseEvent<HTMLButtonElement>,
): void => {
  e.preventDefault()
  dispatch(selectionAddChildrenAction(selection, optionToSelection(toAdd)))
  setState({
    adding: false,
    newOptionCandidate: toAdd,
  })
}

export default (
  className: string,
  AddButton: ButtonComponent,
  Visible: VisibleComponent,
  ExtantSelectionEditor: ExtantSelectionEditorComponent,
): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { dispatch } = useContext(Context)
    const option = optionForSelection(props.options, props.selection)
    if(option != null) {
      const [state, setState] = useState(Object.assign(
        {},
        defaultState(option),
      ))
      return <fieldset className={className}>
        {props.selection.children
          .filter(isExtantSelection)
          .map(x => {
            return <ExtantSelectionEditor
              key={x.id}
              options={props.options}
              selection={x}
            />
          })
        }
        <Visible visible={!state.adding}>
          <AddButton onClick={() => setState({...state, adding: true})}>
            add {selectionTitle(props.options, props.selection)}
          </AddButton>
        </Visible>
        <Visible visible={state.adding}>
          <select
            onChange={setNewOptionCandidate.bind(null, setState, state, option)}
            value={state.newOptionCandidate?.key}
          >
            {option.children
              .filter(isOption)
              .map(o => <option key={o.key} value={o.key}>{o.name}</option>)
            }
          </select>
          {state.newOptionCandidate != null
            ? <AddButton
              onClick={addSelection.bind(
                null,
                props.selection,
                setState,
                dispatch,
                state.newOptionCandidate,
              )}
            >
              add {state.newOptionCandidate.name}
            </AddButton>
            : <>Data incomplete. No candidates found in '{option?.name}'</>
          }
        </Visible>
      </fieldset>
    } else {
      return <>
        Option not found for selection ${props.selection.optionKey}
        (${props.selection.id})
      </>
    }
  }
  component.displayName = 'RepeatingExtantSelectionEditor'
  return component
}
