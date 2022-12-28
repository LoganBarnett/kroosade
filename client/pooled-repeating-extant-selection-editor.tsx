/**
 */
import React, {
  type FC,
  type MouseEvent,
  type ReactElement,
  useContext,
  Dispatch,
} from 'react'
import {
  type AppAction,
  candidateSelectAction,
  candidateSelectModeAction,
  selectionAddChildrenAction,
  selectionRemoveChildAction,
} from './actions'
import { RepeatingSelectionState } from './app-reducer'
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

const defaultState = (
  options: ReadonlyArray<AppOption>,
  scopedOptions: ReadonlyArray<AppSelection>,
  option: PooledRepeatingExtantOption,
): RepeatingSelectionState => {
  const available = optionsAvailable(options, scopedOptions, option)
  console.log('available (defaultState)', available)
  return {
    adding: false,
    candidate: available.selections[0] || available.options[0],
  }
}

const setNewOptionCandidate = (
  dispatch: Dispatch<AppAction>,
  selection: AppSelection,
  options: ReadonlyArray<AppOption>,
  selections: ReadonlyArray<AppSelection>,
  e: React.ChangeEvent<HTMLSelectElement>,
): void => {
  console.log('new candidate selections', selections)
  const candidate = e.target.value.startsWith('option-')
    ? options.find(o => o.key == e.target.value.replace('option-', ''))
    : selections.find(s => s.id == e.target.value.replace('selection-', ''))
  console.log('candidate', candidate)
  if(candidate != null) {
    dispatch(candidateSelectAction(selection.id, candidate))
  } else {
    console.error(
      `Error selecting candidate "${e.target.value}": Cannot be found with that key or ID.`,
    )
  }
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
  dispatch: React.Dispatch<AppAction>,
  toAdd: Selectable,
  e: MouseEvent<HTMLButtonElement>,
): void => {
  e.preventDefault()
  dispatch(selectionAddChildrenAction(selection, selectionFromSelectable(toAdd)))
  // TODO: This needs to be key or ID.
  dispatch(
    candidateSelectModeAction(selection.id, false),
  )
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
      const availableOptions = optionsAvailable(
        props.options,
        flatSelections(state.roster),
        option,
      )
      const candidateState = state.repeatingCandidates[option.key]
        || defaultState(props.options, props.scopedOptions, option)
      console.log('available options', availableOptions)
      console.log('candidate', candidateState)
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
        <Visible visible={!candidateState.adding}>
          <AddButton
            onClick={() => {
              dispatch(candidateSelectModeAction(
                option.key, // TODO: Could be selectable ID too.
                true,
              ))
            }}
          >
            add {selectionTitle(props.options, props.selection)}
          </AddButton>
        </Visible>
        <Visible visible={candidateState.adding}>
          <select
            onChange={setNewOptionCandidate.bind(
              null,
              dispatch,
              props.selection,
              props.options,
              props.scopedOptions,
            )}
            value={
              candidateState.candidate != null
                ? selectableKey(candidateState.candidate)
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
                return <option
                  key={'option-' + o.key}
                  value={'option-' + o.key}
                >
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
          {candidateState.candidate != null
            ? <AddButton
              onClick={addSelection.bind(
                null,
                props.selection,
                dispatch,
                candidateState.candidate,
              )}
            >
              add {candidateState.candidate.name}
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
  component.displayName = 'PooledRepeatingExtantSelectionEditor'
  return component
}
