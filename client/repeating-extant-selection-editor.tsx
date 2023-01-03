/**
 */
import React, {
  type FC,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useContext,
  useState,
  Dispatch,
} from 'react'
import {
  type AppAction,
  selectionAddChildrenAction,
  selectionRemoveChildAction,
  candidateSelectAction,
  candidateSelectModeAction,
} from './actions'
import { type Component as ButtonComponent } from './button'
import {
  type Component as SelectionDetailsComponent,
} from './selection-details'
import {
  type AppOption,
  type AppSelection,
  type Selectable,
  type RepeatingExtantSelection,
  isExtantSelection,
  isOptionFromEntity,
  isOptionFromSelectable,
  optionToSelection,
  optionChildren,
  selectionFromSelectable,
} from './model'
import { Context } from './reducer-provider'
import { optionForSelection, selectionTitle } from './utils'
import { type Component as VisibleComponent } from './visible'
import { RepeatingSelectionState } from './app-reducer'

export type Props = {
  // TODO: Unsure if this needs to be here.
  children: ReactNode,
  options: ReadonlyArray<AppOption>,
  parent: AppSelection | undefined | null,
  roster: AppSelection,
  scopedOptions: ReadonlyArray<AppOption>,
  scopedSelections: ReadonlyArray<AppSelection>,
  selection: RepeatingExtantSelection,
  selectionDetailsComponent: SelectionDetailsComponent,
}

export type Component = FC<Props>

const defaultState = (
  state: RepeatingSelectionState | null | undefined,
  availableOptions: ReadonlyArray<AppOption>,
): RepeatingSelectionState => {
  const defaultCandidate = availableOptions[0]
  if(state != null) {
    if(state.candidate == null) {
      return {
        ...state,
        candidate: defaultCandidate,
      }
    } else {
      return state
    }
  } else {
    return {
      adding: false,
      candidate: defaultCandidate,
    }
  }
}

const setNewOptionCandidate = (
  dispatch: Dispatch<AppAction>,
  options: ReadonlyArray<AppOption>,
  option: AppOption,
  e: React.ChangeEvent<HTMLSelectElement>,
): void => {
  const candidate = options.find(o => o.key == e.target.value)
  if(candidate != null) {
    dispatch(candidateSelectAction(option.key, candidate))
  } else {
    console.error(
      `Error selecting candidate "${e.target.value}": Cannot be found with that key or ID.`,
    )
  }
}

const addSelection = (
  options: ReadonlyArray<AppOption>,
  selection: RepeatingExtantSelection,
  dispatch: React.Dispatch<AppAction>,
  toAdd: Selectable,
  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
): void => {
  e.preventDefault()
  dispatch(selectionAddChildrenAction(
    selection,
    selectionFromSelectable(options, toAdd),
  ))
  // TODO: This needs to be key or ID.
  dispatch(
    candidateSelectModeAction(selection.id, null, false),
  )
}

export default (
  className: string,
  AddButton: ButtonComponent,
  DeleteButton: ButtonComponent,
  Visible: VisibleComponent,
): FC<Props> => {
  const component = (props: Props): ReactElement => {
    const { state, dispatch } = useContext(Context)
    const option = optionForSelection(props.options, props.selection)
    const SelectionDetails = props.selectionDetailsComponent
    if(option != null) {
      const candidateState = defaultState(
        state.repeatingCandidates[props.selection.id],
        props.options,
      )
      const candidateKey = candidateState.candidate != null
        && isOptionFromSelectable(candidateState.candidate)
        ? candidateState.candidate.key
        : undefined
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
                <SelectionDetails
                  options={props.options}
                  scopedOptions={props.scopedOptions}
                  parent={props.selection}
                  scopedSelections={props.scopedSelections}
                  roster={props.roster}
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
                props.selection.id,
                candidateState.candidate,
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
              props.options,
              option,
            )}
            value={candidateKey}
          >
          {optionChildren(props.options, option)
              .filter(isOptionFromEntity)
              .map(o => <option key={o.key} value={o.key}>{o.name}</option>)
            }
          </select>
          {candidateState.candidate != null
            ? <AddButton
                onClick={addSelection.bind(
                  null,
                  props.options,
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
  component.displayName = 'RepeatingExtantSelectionEditor'
  return component
}
