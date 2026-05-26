// src/api/endpoints/scheduleApi.js
import { apiSlice } from "../apiSlice";

export const scheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // جلب الجدول بالكامل (مواعيد + أجازات)
    // -----------------------------
    getSchedule: builder.query({
      query: () => '/schedule/',
      providesTags: ['Schedule'],
    }),

    // -----------------------------
    // إضافة موعد جديد
    // -----------------------------
    addAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: '/schedule/appointments/',
        method: 'POST',
        body: appointmentData,
      }),
      invalidatesTags: ['Schedule'],
    }),

    // -----------------------------
    // حذف موعد
    // -----------------------------
    deleteAppointment: builder.mutation({
      query: (appointmentId) => ({
        url: `/schedule/appointments/${appointmentId}/`,
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
      invalidatesTags: ['Schedule'],
    }),

    // -----------------------------
    // حذف أجازة
    // -----------------------------
    deleteHoliday: builder.mutation({
      query: (holidayId) => ({
        url: `/volunteers/vacations/${holidayId}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schedule'],
    }),

  }),
});

export const {
  useGetScheduleQuery,
  useAddAppointmentMutation,
  useDeleteAppointmentMutation,
  useAddHolidayMutation,
  useDeleteHolidayMutation,
} = scheduleApi;