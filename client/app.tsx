/// <reference types="react/experimental" />
/// <reference types="react/next" />
import React, {
  type FC,
  type ReactElement,
} from 'react'
import * as ReactDOM from 'react-dom'
import './base.css'
import './dark-theme.css'
import { Reduced } from './reducer-provider'
import rosterViewFn from './roster-view'

const RosterView = rosterViewFn()

// @ts-ignore - I guess createRoot isn't supported yet. I have tried
// react-dom/experimental and react-dom/next as imported types and references,
// but still no joy.
const root = ReactDOM.createRoot(document.querySelector('body'))

// Use semantic HTML to do the layout. Used example taken from
// https://gist.github.com/thomd/9220049
const Page: FC<{}> = (props: {}): ReactElement => {
  return <Reduced>
    <RosterView />
  </Reduced>
}
root.render(<Page/>)
