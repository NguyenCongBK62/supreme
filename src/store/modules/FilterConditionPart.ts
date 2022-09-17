import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FilterConditionPartState = {
  filterArr: any[]
  sortArr: any[]
  isclearAll: boolean
}

const initialState: FilterConditionPartState = {
  filterArr: [],
  sortArr: [],
  isclearAll: false,
}

const FilterConditionPartSlice = createSlice({
  name: 'FilterConditionPart',
  initialState,
  reducers: {
    ClearFilterConditionParts: (state, action: PayloadAction<boolean>) => {
      const data = action?.payload
      state.isclearAll = data
    },
    SetFilter: (state, action: PayloadAction<any[]>) => {
      const data = action?.payload
      state.filterArr = data
    },
    SetSort: (state, action: PayloadAction<any[]>) => {
      const data = action?.payload
      state.sortArr = data
    },
  },
})

export const { ClearFilterConditionParts, SetFilter, SetSort } = FilterConditionPartSlice.actions

export default FilterConditionPartSlice.reducer
