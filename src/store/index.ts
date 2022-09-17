import { configureStore } from '@reduxjs/toolkit'
import FilterConditionPartReducer from './modules/FilterConditionPart'
import pointDataReducer from './modules/PointData'

export const store = configureStore({
  reducer: {
    FilterConditionPartReducer,
    pointData: pointDataReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
