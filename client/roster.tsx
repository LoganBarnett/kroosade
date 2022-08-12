import React, { type ReactElement, type FC } from 'react'
import { type State } from './app'
import { type Option, type Selection, } from './model'
import { default as selectionFn } from './selection'

export type Props = {
  focus: (x: Selection) => void,
  options: ReadonlyArray<Option>,
  roster: Selection,
}

export default (className: string): FC<Props> => {
  const RosterSelection = selectionFn('roster')
  const Detachment = selectionFn('detachment')
  const BattlefieldRole = selectionFn('battlefield-role')
  const Unit = selectionFn('unit')

  const component = ({ focus, options, roster }: Props): ReactElement => {
    return <article>
      <h2>{roster.name}</h2>
      <RosterSelection options={options} selection={roster}>
        <ul>
        {roster.children.map(d => {
          return <li key={d.id}><Detachment options={options} selection={d}>
            <ul>
              {d.children.map(b => {
                return <li key={b.id}>
                  <BattlefieldRole options={options} selection={b}>
                    <ul>
                      {b.children.map(u => {
                        return <li key={u.id}>
                          <Unit options={options} selection={u}>
                            <button
                              name="focus-unit"
                              onClick={() => focus(u)}
                            >
                              focus
                            </button>
                          </Unit>
                        </li>
                      })}
                    </ul>
                  </BattlefieldRole>
                </li>
              })}
            </ul>
          </Detachment></li>
        })}
        </ul>
      </RosterSelection>
    </article>
  }
  component.displayName = 'Roster'
  return component
}
