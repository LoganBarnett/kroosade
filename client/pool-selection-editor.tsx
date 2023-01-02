/**
 * The Pool Selection editor allows pools of selections (or options) to be
 * visible. Selections here could be copied into a focused selection if that
 * selection allowed the operation. We don't have that yet though.
 *
 * Pools allow every option available to be displayed. Generally, they should
 * not be displayed as part of the selection.
 */
import React, { type FC, type ReactElement, type ReactNode } from 'react'
import {
    optionFromSelection,
  type AppOption,
  type PoolSelection,
} from './model'
import Option from './option'

export type Props = {
  children: ReactNode,
  options: ReadonlyArray<AppOption>,
  selection: PoolSelection,
}

export type Component = FC<Props>

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return optionFromSelection(props.options, props.selection)
      .andThen(o => o.kind == 'pool-option' ? Option.intoOption(o) : Option.none)
      .match({
        some: o => <div>
          Infinite: {String(o.infinite)} {props.children}
        </div>,
        none: () => <div>
          Error finding pool option ${props.selection.optionKey}
          {props.children}
        </div>,
      })
  }
  component.displayName = 'PoolSelectionEditor'
  return component
}
