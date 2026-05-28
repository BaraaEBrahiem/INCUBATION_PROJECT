// src/api/endpoints/scheduleApi.js
import { apiSlice } from "../apiSlice";

export const scheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // جلب المواعيد 
    // -----------------------------
    getSchedule: builder.query({
      query: () => '/volunteers/my-availability/',
      providesTags: ['Schedule'],
    }),

    // -----------------------------
    // إضافة موعد جديد
    // -----------------------------
    addAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: '/volunteers/availability/add/',
        method: 'POST',
        body: appointmentData,
      }),
      invalidatesTags: ['Schedule'],
    }),

    // -----------------------------
    // حذف موعد
    // -----------------------------
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/volunteers/availability/${id}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schedule'],
    }),

    // -----------------------------
    // إضافة أجازة
    // -----------------------------
    addHoliday: builder.mutation({
      query: (holidayData) => ({
        url: '/volunteers/vacations/',
        method: 'POST',
        body: holidayData,
      }),
      invalidatesTags: ['Vacations'],
    }),

    // -----------------------------
    // جلب الأجازات
    //-----------------------------
    getVacations: builder.query({
      query: () => '/volunteers/vacations/',
      providesTags: ['Vacations'],
    }),

    // -----------------------------
    // حذف أجازة
    // -----------------------------
    deleteHoliday: builder.mutation({
      query: (holidayId) => ({
        url: `/volunteers/vacations/${holidayId}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vacations'],
    }),

  }),
});

export const {
  useGetScheduleQuery,
  useAddAppointmentMutation,
  useDeleteAppointmentMutation,
  useAddHolidayMutation,
  useDeleteHolidayMutation,
  useGetVacationsQuery,
} = scheduleApi;