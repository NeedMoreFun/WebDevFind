import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState ={
    applys:[], 
    loading: false
}

// Асинхронное действие для отклика на вакансию
export const applyToJob = createAsyncThunk('apply/applyToJob', async (payload) => {
  const { id, message } = payload;
  try {
    const response = await axios.post(`/apply/${id}/add`, { message, id });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const applySlice = createSlice({
    name:'apply',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание отклика
        [applyToJob.pending]: (state) => {
            state.loading = true
        },
        [applyToJob.fulfilled]: (state, action) => {
            state.loading = false
            state.applys.push(action.payload)
        },
        [applyToJob.rejected]: (state) => {
            state.loading = false
        },
    }
})
export default applySlice.reducer
