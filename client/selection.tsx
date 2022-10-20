import React, { type ReactElement, type ReactNode, type FC } from 'react'
import { type AppOption, type AppSelection } from './model'
import { selectionTitle } from './utils'

export type Props = {
  children?: ReactNode,
  layer: number,
  options: ReadonlyArray<AppOption>,
  selection: AppSelection,
}

export default (cssClass: string): FC<Props> => {
  const component = (props: Props): ReactElement => {
    // See https://stackoverflow.com/a/59685929 for coaxing TypeScript to accept
    // this string as a "tag" in JSX.
    // This could be made more strict by assigning the type to Heading directly
    // and then if `layer' were a literal string, TypeScript could ensure it was
    // always a valid element. But we have a number and an "h". This is pretty
    // simple, and h + some number is fairly valid.
    const Heading = `h${props.layer.toString()}` as keyof JSX.IntrinsicElements
    return <article className={cssClass}>
        <Heading>{selectionTitle(props.options, props.selection)}</Heading>
        {props.children}
      </article>
  }
  component.displayName = 'Selection'
  return component
}
