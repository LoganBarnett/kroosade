import React, {
  type FC,
  type ReactElement,
  type MouseEvent,
  type ReactNode,
} from 'react'

export type Props = {
  children: ReactNode,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void,
}

export type Component = FC<Props>

export default (className: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    return <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  }
  component.displayName = 'Button'
  return component
}
