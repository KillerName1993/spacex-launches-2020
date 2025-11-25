import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Launch } from '../types/launch'

interface LaunchState {
   launches: Launch[]
   selectedLaunch: Launch | null
   isModalOpen: boolean
   loading: boolean
   error: string | null
}

type LaunchAction =
   | { type: 'SET_LOADING'; payload: boolean }
   | { type: 'SET_LAUNCHES'; payload: Launch[] }
   | { type: 'SET_ERROR'; payload: string }
   | { type: 'SELECT_LAUNCH'; payload: Launch }
   | { type: 'OPEN_MODAL' }
   | { type: 'CLOSE_MODAL' }

const initialState: LaunchState = {
   launches: [],
   selectedLaunch: null,
   isModalOpen: false,
   loading: false,
   error: null,
}

const launchReducer = (state: LaunchState, action: LaunchAction): LaunchState => {
   switch (action.type) {
      case 'SET_LOADING':
         return { ...state, loading: action.payload }
      case 'SET_LAUNCHES':
         return { ...state, launches: action.payload, loading: false, error: null }
      case 'SET_ERROR':
         return { ...state, error: action.payload, loading: false }
      case 'SELECT_LAUNCH':
         return { ...state, selectedLaunch: action.payload }
      case 'OPEN_MODAL':
         return { ...state, isModalOpen: true }
      case 'CLOSE_MODAL':
         return { ...state, isModalOpen: false, selectedLaunch: null }
      default:
         return state
   }
}

const LaunchContext = createContext<{
   state: LaunchState
   dispatch: React.Dispatch<LaunchAction>
} | null>(null)

export const LaunchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [state, dispatch] = useReducer(launchReducer, initialState)

   return (
      <LaunchContext.Provider value={{ state, dispatch }}>
         {children}
      </LaunchContext.Provider>
   )
}

export const useLaunch = () => {
   const context = useContext(LaunchContext)
   if (!context) {
      throw new Error('useLaunch must be used within a LaunchProvider')
   }
   return context
}