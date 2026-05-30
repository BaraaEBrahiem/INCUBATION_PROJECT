// src/api/endpoints/scheduleApi.js
import { apiSlice } from "../apiSlice";

export const scheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // -----------------------------
    // جلب الجدول بالكامل (مواعيد + أجازات)
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
      invalidatesTags: ['Schedule'],
    }),

    // -----------------------------
    // حذف أجازة
    // -----------------------------
    deleteHoliday: builder.mutation({
      query: (id) => ({
        url: `/volunteers/vacations/${id}/delete/`,
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