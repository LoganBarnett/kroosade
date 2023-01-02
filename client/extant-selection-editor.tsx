/**
 * Extant selections can only be added or removed. The editor allows for adding
 * or removing.
 */

import React, {
  type FC,
  type ReactElement,
  type ReactNode,
  useContext,
} from 'react'
import {
  selectionChangeNameAction,
  selectionFocusAction,
  selectionRemoveChildAction,
} from './actions'
import buttonFn from './button'
import buttonStyles from './button.module.css'
import {
  type AppOption,
  type AppSelection,
  type ExtantSelection,
} from './model'
import { Context } from './reducer-provider'
import { type Component as SelectionCostComponent } from './selection-cost'
import { isRemovableSelection, selectionTitle } from './utils'
import visibilityFn from './visible'

export type Props = {
  children: ReactNode,
  options: ReadonlyArray<AppOption>,
  parent: AppSelection | null | undefined,
  selection: ExtantSelection,
}

export type Component = FC<Props>

export default (
  SelectionCost: SelectionCostComponent,
  className: string,
): FC<Props> => {
  const FocusButton = buttonFn(buttonStyles.focus)
  const RemoveButton = buttonFn(buttonStyles.remove)
  const Visibility = visibilityFn('display')
  const component = (props: Props): ReactElement => {
    const { state, dispatch } = useContext(Context)
    const focusFn = (s: AppSelection) => dispatch(selectionFocusAction(s))
    const removeFn = (
      parent: AppSelection,
      s: AppSelection,
    ) => dispatch(selectionRemoveChildAction(parent, s))
    const changeNameFn = (e: React.ChangeEvent<HTMLInputElement>): void => {
      dispatch(selectionChangeNameAction(props.selection, e.target.value))
    }
    return <Visibility visible={true}>
      <fieldset className={className}>
        {selectionTitle(props.options, props.selection)}
        <input
          type="text"
          onChange={changeNameFn}
          value={props.selection.name || ''}
        />
        <SelectionCost
          options={props.options}
          root={props.selection}
          selection={props.selection}
        />
        <Visibility visible={props.selection.id != state.focus?.id}>
          <FocusButton onClick={() => focusFn(props.selection)}>
            focus
          </FocusButton>
        </Visibility>
        <Visibility
          visible={isRemovableSelection(props.options, props.selection)}
        >
        <RemoveButton
          onClick={() => props.parent && removeFn(props.parent, props.selection)}
        >
          remove
        </RemoveButton>
        </Visibility>
        {props.children}
      </fieldset>
    </Visibility>
  }
  component.displayName = 'ExtantSelectionEditor'
  return component
}
