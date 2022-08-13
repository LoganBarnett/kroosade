import React, { type ReactElement, type FC } from 'react'
import { type Option, type Selection, } from './model'
import { default as selectionFn } from './selection'
import { default as focusSelectionFn } from './focus-selection'

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
  const FocusSelection = focusSelectionFn('focus-selection')

  const component = ({ focus, options, roster }: Props): ReactElement => {
    return <article>
      <RosterSelection layer={3} options={options} selection={roster}>
        <ul>
        {roster.children.map(d => {
          return <li key={d.id}>
            <Detachment layer={4} options={options} selection={d}>
              <FocusSelection focus={focus} selection={d}>
                focus
              </FocusSelection>
              <ul>
                {d.children.map(b => {
                  return <li key={b.id}>
                    <BattlefieldRole layer={5} options={options} selection={b}>
                      <FocusSelection focus={focus} selection={b}>
                        focus
                      </FocusSelection>
                      <ul>
                        {b.children.map(u => {
                          return <li key={u.id}>
                            <Unit layer={6} options={options} selection={u}>
                              <FocusSelection
                                focus={focus}
                                selection={u}
                              >
                                focus
                              </FocusSelection>
                            </Unit>
                          </li>
                        })}
                      </ul>
                    </BattlefieldRole>
                  </li>
                })}
              </ul>
            </Detachment>
          </li>
        })}
        </ul>
      </RosterSelection>
    </article>
  }
  component.displayName = 'Roster'
  return component
}
