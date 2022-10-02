/**
 * Control visibility via the various CSS methods:
 *
 * 1. Hide the component (visibility: hidden;), but keep it in the document flow.
 * 2. Remove the component from the document flow (display: none;).
 * 3. Remove the component from the virtual DOM.
 */
import React, { type FC, type ReactNode, type ReactElement } from 'react'
import visibleCss from './visible.module.css'
// const visibleCss:any = {}

export type VisibilityType =
  | 'display'   // Use for display.
  | 'visible'   // Use for visibility.
  | 'rendering' // Use to remove from the virtual DOM.

export type Props = {
  children: ReactNode,
  visible: boolean,
}

export type Component = FC<Props>

export default (visibilityType: VisibilityType): FC<Props> => {
  const component = (props: Props): ReactElement => {
    if(visibilityType == 'rendering') {
      return <>{props.visible ? props.children : ''}</>
    } else {
      return <div className={
        props.visible
          ? ''
          : visibilityType == 'display'
            ? visibleCss.display
            : visibleCss.hidden
      }>
        {props.children}
      </div>
    }
  }
  component.displayName = 'Visible'
  return component
}
