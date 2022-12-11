import React, {
  type FC,
  type ReactNode,
  type ReactElement,
  useContext,
} from 'react'
import { selectionChangeNameAction, selectionFocusAction } from './actions'
import buttonFn from './button'
import buttonStyles from './button.module.css'
import {
  type AppOption,
  type AppSelection,
  type FixedSelection,
} from './model'
import { Context } from './reducer-provider'
import { type Component as SelectionCostComponent } from './selection-cost'
import { selectionTitle } from './utils'
import visibilityFn from './visible'

export type Props = {
  options: ReadonlyArray<AppOption>,
  selection: FixedSelection,
}

export type Component = FC<Props>

export default (
  SelectionCost: SelectionCostComponent,
  className: string,
): FC<Props> => {
  const Visibility = visibilityFn('display')
  const FocusButton = buttonFn(buttonStyles.focus)
  const component = (props: Props): ReactElement => {
    const { state, dispatch } = useContext(Context)
    const focusFn = (s: AppSelection) => dispatch(selectionFocusAction(s))
    const changeNameFn = (e: React.ChangeEvent<HTMLInputElement>): void => {
      dispatch(selectionChangeNameAction(props.selection, e.target.value))
    }
    return <fieldset className={className}>
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
    </fieldset>
  }
  component.displayName = 'FixedSelectionEditor'
  return component
}
