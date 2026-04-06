import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/client';

// Fetch all 4 golf courses for the course selector
export const fetchCourses = createAsyncThunk('booking/fetchCourses', async (_, { rejectWithValue }) => {
  try { return (await api.get('/slots/courses')).data; }
  catch (e) { return rejectWithValue(e.response?.data?.error || e.message); }
});

// Fetch available tee times for a course + date
export const fetchSlots = createAsyncThunk('booking/fetchSlots',
  async ({ course, date }, { rejectWithValue }) => {
    try { return (await api.get(`/slots?course=${course}&date=${date}`)).data; }
    catch (e) { return rejectWithValue(e.response?.data?.error || e.message); }
  }
);

// Create a new booking
export const createBooking = createAsyncThunk('booking/create',
  async (bookingData, { rejectWithValue }) => {
    try { return (await api.post('/bookings', bookingData)).data; }
    catch (e) { return rejectWithValue(e.response?.data?.error || e.message); }
  }
);

// Fetch all bookings for a date + course
export const fetchReservations = createAsyncThunk('booking/fetchReservations',
  async ({ date, course }, { rejectWithValue }) => {
    try { return (await api.get(`/bookings/${date}/${course}`)).data; }
    catch (e) { return rejectWithValue(e.response?.data?.error || e.message); }
  }
);

// Cancel a booking by ID
export const cancelBooking = createAsyncThunk('booking/cancel',
  async (id, { rejectWithValue }) => {
    try { return (await api.delete(`/bookings/${id}`)).data; }
    catch (e) { return rejectWithValue(e.response?.data?.error || e.message); }
  }
);

// Slice
const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    courses: [],
    slots: [],
    reservations: [],
    selectedCourse: null,
    selectedDate: '',
    lastBooking: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCourse: (state, action) => { state.selectedCourse = action.payload; state.slots = []; },
    setDate: (state, action) => { state.selectedDate = action.payload; state.slots = []; },
    clearError: state => { state.error = null; },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCourses.fulfilled, (state, a) => { state.courses = a.payload; })
      .addCase(fetchSlots.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchSlots.fulfilled, (state, a) => { state.loading = false; state.slots = a.payload.available; })
      .addCase(fetchSlots.rejected, (state, a) => { state.loading = false; state.error = a.payload; })
      .addCase(createBooking.pending, state => { state.loading = true; })
      .addCase(createBooking.fulfilled, (state, a) => { state.loading = false; state.lastBooking = a.payload.booking; })
      .addCase(createBooking.rejected, (state, a) => { state.loading = false; state.error = a.payload; })
      .addCase(fetchReservations.fulfilled, (state, a) => { state.reservations = a.payload.bookings; })
      .addCase(cancelBooking.fulfilled, (state, a) => {
        state.reservations = state.reservations.filter(r => r.id !== a.payload.id);
      });
  }
});

export const { setCourse, setDate, clearError } = bookingSlice.actions;

export const selectCourses = s => s.booking.courses;
export const selectSlots = s => s.booking.slots;
export const selectReservations = s => s.booking.reservations;
export const selectCourse = s => s.booking.selectedCourse;
export const selectDate = s => s.booking.selectedDate;
export const selectLoading = s => s.booking.loading;
export const selectError = s => s.booking.error;
export const selectLastBooking = s => s.booking.lastBooking;

export default bookingSlice.reducer;
