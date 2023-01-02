import {
  type AppOption,
  type AppSelection,
} from './model'
import {
  type Component as BooleanSelectionEditorComponent,
} from './boolean-selection-editor'
import {
  type Component as ExclusiveSelectionEditorComponent,
} from './exclusive-selection-editor'
import {
  type Component as ExtantSelectionEditorComponent,
} from './extant-selection-editor'
import {
  type Component as NumericSelectionEditorComponent,
} from './numeric-selection-editor'
import {
  type Component as PoolSelectionEditorComponent,
} from './pool-selection-editor'
import {
  type Component as PooledRepeatingExtantSelectionEditorComponent,
} from './pooled-repeating-extant-selection-editor'
import {
  type Component as RepeatingExtantSelectionEditorComponent,
} from './repeating-extant-selection-editor'
import React, { type FC, type ReactElement, type ReactNode } from 'react'
import {
  type Component as SelectionDetailsComponent,
} from './selection-details'

export type Props = {
  children: ReactNode,
  options: ReadonlyArray<AppOption>,
  scopedOptions: ReadonlyArray<AppOption>,
  parent: AppSelection | undefined | null,
  roster: AppSelection,
  selection: AppSelection,
  selectionDetailsComponent: SelectionDetailsComponent,
  scopedSelections: ReadonlyArray<AppSelection>,
}

export type Component = FC<Props>

export default (
  BooleanSelectionEditor: BooleanSelectionEditorComponent,
  ExclusiveSelectionEditor: ExclusiveSelectionEditorComponent,
  ExtantSelectionEditor: ExtantSelectionEditorComponent,
  NumericSelectionEditor: NumericSelectionEditorComponent,
  PoolSelectionEditor: PoolSelectionEditorComponent,
  PooledRepeatingExtantSelectionEditor: PooledRepeatingExtantSelectionEditorComponent,
  RepeatingExtantSelectionEditor: RepeatingExtantSelectionEditorComponent,
): FC<Props> => {
  const selectionEditor = (
    children: ReactNode,
    options: ReadonlyArray<AppOption>,
    parent: AppSelection | null | undefined,
    roster: AppSelection,
    scopedSelections: ReadonlyArray<AppSelection>,
    scopedOptions: ReadonlyArray<AppOption>,
    selectionDetailsComponent: SelectionDetailsComponent,
    x: AppSelection,
  ): ReactElement => {
    // TypeScript derping. Inspired by:
    // https://dev.to/babak/exhaustive-type-checking-with-typescript-4l3f
    const exhaustive = (kind: string, selection: never): ReactElement => {
      return <>AppSelection '{kind}' in '{selection}' not supported!</>
    }
    // Capture before TypeScript makes the AppSelection into a `never'.
    const kind = x.kind
    switch (x.kind) {
      case 'boolean-selection':
        return <BooleanSelectionEditor options={options} selection={x}>
          {children}
        </BooleanSelectionEditor>
      case 'exclusive-selection':
        return <ExclusiveSelectionEditor options={options} selection={x}>
          {children}
        </ExclusiveSelectionEditor>
      case 'extant-selection':
        // This is the only one using parent right now. I could refactor the
        // others. I can't return the component itself because the AppSelection
        // is too specific in each sub component. So for now, just defer adding
        // parent to the rest of them, since making them more uniform doesn't
        // really change anything.
        return <ExtantSelectionEditor
          options={options}
          parent={parent}
          selection={x}
        >
          {children}
        </ExtantSelectionEditor>
      case 'numeric-selection':
        return <NumericSelectionEditor options={options} selection={x}>
          {children}
        </NumericSelectionEditor>
      case 'pool-scope-selection':
        return <>{children}</>
      case 'pool-selection':
        return <PoolSelectionEditor options={options} selection={x}>
          {children}
        </PoolSelectionEditor>
      case 'pooled-repeating-extant-selection':
        return <PooledRepeatingExtantSelectionEditor
          options={options}
          roster={roster}
          scopedSelections={scopedSelections}
          scopedOptions={scopedOptions}
          selectionDetailsComponent={selectionDetailsComponent}
          selection={x}
        >
          {children}
        </PooledRepeatingExtantSelectionEditor>
      case 'repeating-extant-selection':
        return <RepeatingExtantSelectionEditor
          options={options}
          parent={parent}
          roster={roster}
          scopedSelections={scopedSelections}
          scopedOptions={scopedOptions}
          selection={x}
          selectionDetailsComponent={selectionDetailsComponent}
        >
          {children}
        </RepeatingExtantSelectionEditor>
    }
    // This ensures all checks are satisfied. If there's a type error on the
    // variable here, it's because we need to add more cases to reach
    // exhaustion.  The "Unreachable code detected" warning can safely be
    // ignored. It might even be an error if the warning is not there. Can we
    // disable it somehow?
    return exhaustive(kind, x)
  }

  const component = (props: Props): ReactElement => {
    return selectionEditor(
      props.children,
      props.options,
      props.parent,
      props.roster,
      props.scopedSelections,
      props.scopedOptions,
      props.selectionDetailsComponent,
      props.selection,
    )
  }
  component.displayName = 'SelectionEditor'
  return component
}
