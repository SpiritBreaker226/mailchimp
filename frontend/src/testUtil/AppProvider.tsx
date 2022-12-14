import { FC, ReactNode } from 'react'
import { AppContext } from '../context'

import { Action, InitialState } from '../types'

export const initialState: InitialState = {
  comments: [],
}

export interface AppProviderProps {
  state: InitialState
  children: ReactNode
  dispatch?: (action: Action) => void
}

export const AppProvider: FC<AppProviderProps> = ({
  state,
  dispatch,
  children,
}) => (
  <AppContext.Provider
    value={{
      state: {
        ...initialState,
        ...state,
      },
      dispatch: dispatch || (() => null),
    }}
  >
    {children}
  </AppContext.Provider>
)
