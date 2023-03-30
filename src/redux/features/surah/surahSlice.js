import { createSlice } from "@reduxjs/toolkit";

const surahSlice = createSlice({
    name: 'surah',
    initialState: {},
    reducers: {
        getSurah: (state, action) => {
            state.surah = action.payload;
        }
    }

})

export const { getSurah } = surahSlice.actions;
export default surahSlice.reducer