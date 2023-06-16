import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

// Session storage key
const TOKEN = "token";

/**
 * API endpoints
 */
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query({
      query: () => "auth/me",
      providesTags: ["Me"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Me"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Me"],
    }),
  }),
});

/**
 * Stores the payload's token in both state and session storage.
 */
function storeToken(state, { payload }) {
  state.token = payload.token;
  window.sessionStorage.setItem(TOKEN, payload.token);
}

/**
 * Stores token whenever login or register succeeds
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: {},
    token: window.sessionStorage.getItem(TOKEN),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.me.matchFulfilled,
      (state, { payload }) => {
        state.me = payload;
      }
    );
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  },
});

export default authSlice.reducer;

export const { useMeQuery, useLoginMutation, useRegisterMutation } = authApi;
