// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export interface Event {
//   _id: string;
//   name: string;
//   description: string;
//   eventType: "Awareness Campaign" | "Clean-up Drive" | "Webinar";
//   date: string;
//   location: string;
//   maxVolunteer: number;
//   deadline: string;
//   bannerImage: string;
// }

// interface EventState {
//   events: Event[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: EventState = {
//   events: [],
//   isLoading: false,
//   error: null,
// };

// export const fetchEvents = createAsyncThunk(
//   "events/fetchAll",
//   async (sortOrder: number) => {
//     return await getAllEvents(sortOrder);
//   }
// );

// const eventSlice = createSlice({
//   name: "evens",
//   initialState,
//   reducers: {
//     addToEventState: (state, action) => {
//       state.events.push(action.payload);
//     },
//     updateEventState: (state, action) => {
//       const updatedEvent = action.payload;

//       const eventIndex = state.events.findIndex(
//         (event) => event._id === updatedEvent._id
//       );

//       state.events[eventIndex] = updatedEvent;
//     },
//     removeFromEventState: (state, action) => {
//       state.events = state.events.filter(
//         (event) => event._id !== action.payload
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEvents.pending, (state) => {
//         (state.isLoading = true), (state.error = null);
//       })
//       .addCase(fetchEvents.fulfilled, (state, action) => {
//         (state.isLoading = false), (state.events = action.payload.events);
//       })
//       .addCase(fetchEvents.rejected, (state) => {
//         (state.isLoading = false), (state.error = "Faild To Fetch Events");
//       });
//   },
// });

// export const { addToEventState, removeFromEventState, updateEventState } =
//   eventSlice.actions;

// export default eventSlice.reducer;
