/// <reference types="react/experimental" />
/// <reference types="react/next" />
import React, { type FC, type ReactElement, useState } from 'react'
import * as ReactDOM from 'react-dom'
import { options } from './data'
import { type Selection } from './model'
import rosterFn from './roster'
import { roster } from './example-roster'

export type State = {
  focus: Selection | null,
}

const Roster = rosterFn('roster-parent')
// @ts-ignore - I guess createRoot isn't supported yet. I have tried
// react-dom/experimental and react-dom/next as imported types and references,
// but still no joy.
const root = ReactDOM.createRoot(document.querySelector('body'))

// Use semantic HTML to do the layout. Used example taken from
// https://gist.github.com/thomd/9220049
const Page: FC<{}> = (props: {}): ReactElement => {
  const [state, setState] = useState({
    unitSelected: null,
  })
  const focus = (selection: Selection): void => {
    setState({...state, ...{ focus: selection }})
  }
  return <>
    <header>
      <hgroup>
        <h1>Kroosade</h1>
      </hgroup>
    </header>
    <article>
      <h1>Roster</h1>
      <Roster focus={focus} options={options} roster={roster} />
      <section>
        <h2>Selection</h2>
      </section>
      <section>
        <h2>Info</h2>
      </section>
    </article>
  </>
}
root.render(<Page/>)
