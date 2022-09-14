import { createSlice } from '@reduxjs/toolkit/';

export const contactIdSlice = createSlice({
  name: 'contactId',
  initialState: {
    value: '',
  },
  reducers: {
    setContactId: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const contactIdReducer = contactIdSlice.reducer;
export const { setContactId } = contactIdSlice.actions;
