/**
 */
import React, {
  type FC,
  type MouseEvent,
  type ReactElement,
  useContext,
  useState,
} from 'react'
import {
  type AppAction,
  selectionAddChildrenAction,
  selectionRemoveChildAction,
} from './actions'
import { type Component as ButtonComponent } from './button'
import {
  type Component as ExtantSelectionEditorComponent,
} from './extant-selection-editor'
import {
  type AppOption,
  type AppSelection,
  type PooledRepeatingExtantSelection,
  type PooledRepeatingExtantOption,
  type Selectable,
  flatSelections,
  isExtantSelection,
  isOptionFromSelectable,
  optionsAvailable,
  optionToSelection,
  optionFromSelection,
  cloneSelection,
  selectableKey,
} from './model'
import { Context } from './reducer-provider'
import { optionForSelection, selectionTitle } from './utils'
import { type Component as VisibleComponent } from './visible'

export type Props = {
  options: ReadonlyArray<AppOption>,
  scopedOptions: ReadonlyArray<AppSelection>,
  selection: PooledRepeatingExtantSelection,
}

export type Component = FC<Props>

type State = {
  adding: boolean,
  newCandidate: Selectable | null | undefined,
}

const defaultState = (
  options: ReadonlyArray<AppOption>,
  scopedOptions: ReadonlyArray<AppSelection>,
  option: PooledRepeatingExtantOption,
): State => {
  const available = optionsAvailable(options, scopedOptions, option)
  return {
    adding: false,
    newCandidate: available.selections[0] || available.options[0],
  }
}

const setNewOptionCandidate = (
  setSelectState: (x: State) => void,
  selectState: State,
  options: ReadonlyArray<AppOption>,
  selections: ReadonlyArray<AppSelection>,
  e: React.ChangeEvent<HTMLSelectElement>,
): void => {
  const newCandidate = e.target.value.startsWith('option-')
    ? options.find(o => o.key == e.target.value.replace('option-', ''))
    : selections.find(s => s.id == e.target.value.replace('selection-', ''))
  setSelectState({
    ...selectState,
    newCandidate: newCandidate,
  })
}

const selectionFromSelectable = (
  selectable: Selectable,
): AppSelection => {
  return isOptionFromSelectable(selectable)
    ? optionToSelection(selectable)
    : cloneSelection(selectable)
}

const addSelection = (
  selection: PooledRepeatingExtantSelection,
  setSelectState: (x: State) => void,
  dispatch: React.Dispatch<AppAction>,
  toAdd: Selectable,
  e: MouseEvent<HTMLButtonElement>,
): void => {
  e.preventDefault()
  dispatch(selectionAddChildrenAction(selection, selectionFromSelectable(toAdd)))
  setSelectState({
    adding: false,
    newCandidate: toAdd,
  })
}

export default (
  className: string,
  AddButton: ButtonComponent,
  DeleteButton: ButtonComponent,
  Visible: VisibleComponent,
  ExtantSelectionEditor: ExtantSelectionEditorComponent,
): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { state, dispatch } = useContext(Context)
    const option = optionForSelection(props.options, props.selection)
    if(option != null && option.kind == 'pooled-repeating-extant-option') {
      const [selectState, setSelectState] = useState(Object.assign(
        {},
        defaultState(props.options, props.scopedOptions, option),
      ))
      const availableOptions = optionsAvailable(
        props.options,
        flatSelections(state.roster),
        option,
      )
      console.log('available options', availableOptions)
      return <fieldset className={className}>
        <ol>
          {props.selection.children
            .filter(isExtantSelection)
            .map(x => {
              return <li key={x.id}>
                <DeleteButton onClick={() => {
                  dispatch(selectionRemoveChildAction(props.selection, x))
                }}>
                  remove {selectionTitle(props.options, x)}
                </DeleteButton>
                <ExtantSelectionEditor
                  options={props.options}
                  parent={props.selection}
                  selection={x}
                />
              </li>
            })
          }
        </ol>
        <Visible visible={!selectState.adding}>
          <AddButton
            onClick={() => setSelectState({...selectState, adding: true})}
          >
            add {selectionTitle(props.options, props.selection)}
          </AddButton>
        </Visible>
        <Visible visible={selectState.adding}>
          <select
            onChange={setNewOptionCandidate.bind(
              null,
              setSelectState,
              selectState,
              props.options,
              props.scopedOptions,
            )}
            value={
              selectState.newCandidate != null
                ? selectableKey(selectState.newCandidate)
                : undefined
            }
          >
        {/*
          * We can't actually search through all options, but this helps us
          * prove some of the functionality.
          *
          * To call this complete, it needs to search through a particular pool.
          * Which pool? We need some means of indication.
          */}
            {availableOptions
              .options
              .map(o => {
                return <option key={'option-' + o.key} value={'option-' + o.key}>
                  {o.name}
                </option>
              })
            }
            {availableOptions
              .selections
              .map(s => {
                return <option
                  key={'selection-' + s.id}
                  value={'selection-' + s.id}
                >
                  {s.name}
                </option>
              })
            }
          </select>
          {selectState.newCandidate != null
            ? <AddButton
              onClick={addSelection.bind(
                null,
                props.selection,
                setSelectState,
                dispatch,
                selectState.newCandidate,
              )}
            >
              add {selectState.newCandidate.name}
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
