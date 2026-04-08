import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modalOpen:    false,
    selectedSlot: null,   // tee time string e.g. '07:00'
    toast: { visible: false, message: '', type: 'success' },
  },
  reducers: {
    openModal:  (state, a) => {
      state.modalOpen    = true;
      state.selectedSlot = a.payload;  // ✅ capital S — was selectedlot before
    },
    closeModal: state => {
      state.modalOpen    = false;
      state.selectedSlot = null;
    },
    showToast:  (state, a) => {
      state.toast = { visible: true, ...a.payload };
    },
    hideToast:  state => {
      state.toast.visible = false;
    },
  },
});

export const { openModal, closeModal, showToast, hideToast } = uiSlice.actions;

export const selectModal = s => s.ui.modalOpen;
export const selectSlot  = s => s.ui.selectedSlot;
export const selectToast = s => s.ui.toast;

export default uiSlice.reducer;