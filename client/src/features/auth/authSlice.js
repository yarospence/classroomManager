import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

/**
 * API endpoints
 */
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

/**
 * Stores token whenever login or register succeeds
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
      }
    );
    builder.addMatcher(
      api.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
      }
    );
  },
});

export default authSlice.reducer;

export const { useLoginMutation, useRegisterMutation } = authApi;
export const selectToken = (state) => state.auth.token;
