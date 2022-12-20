/**
 * The Pool Selection editor allows pools of selections (or options) to be
 * visible. Selections here could be copied into a focused selection if that
 * selection allowed the operation. We don't have that yet though.
 *
 * Pools allow every option available to be displayed. Generally, they should
 * not be displayed as part of the selection.
 */
import React, { type FC, type ReactElement } from 'react'
import {
  type AppOption,
  type AppSelection,
  type PoolSelection,
} from './model'

export type Props = {
  options: ReadonlyArray<AppOption>,
  selection: PoolSelection,
}

export type Component = FC<Props>

export default (): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <>
    </>
  }
  component.displayName = 'PoolSelectionEditor'
  return component
}
