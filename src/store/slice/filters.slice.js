import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
import { act } from 'react';

const initialState = {
    type: '',
    periodEnd: moment().format('YYYY-MM-DD'),
    periodStart:  moment().subtract(3, 'day').format('YYYY-MM-DD'),
    sort: '',
    order: ''
};

const counterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    resetPeriod(state) {
        state.periodEnd = null
        state.periodStart = null
    },
    resetType(state) {
      state.type = null
    },
    setPeriodStart(state, action) {
      state.periodStart = action.payload
    },
    setPeriodEnd(state, action) {
      state.periodEnd = action.payload
    },
    setType(state, action) {
      state.type = action.payload
    },
    setSort(state, action) {
      console.log('a', action)
      state.sort = action.payload
    },
    setOrder(state, action) {
      state.order = action.payload
    },
  },
})

export const {
    resetPeriod,
    resetType,
    setPeriodStart,
    setPeriodEnd,
    setSort,
    setOrder,
    setType
} = counterSlice.actions
export default counterSlice.reducer