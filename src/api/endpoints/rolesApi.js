import { apiSlice } from "../apiSlice";

export const rolesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ---------------------------------------------------
    // 1) Idea Owner Form → يصبح فوراً Idea Owner (بدون موافقة)
    // ---------------------------------------------------
    upgradeToIdeaOwner: builder.mutation({
      query: (data) => ({
        url: "roles/idea-owner/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // ---------------------------------------------------
    // 2) Volunteer Form → يبقى Pending (ينتظر موافقة الإدارة)
    // ---------------------------------------------------

    upgradeToVolunteer: builder.mutation({
      query: (formData) => ({
        url: '/volunteers/apply/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // ---------------------------------------------------
    // 3) Admin Approves Volunteer → يعطي دور volunteer
    // ---------------------------------------------------
    adminApproveVolunteer: builder.mutation({
      query: (userId) => ({
        url: `admin/approve-volunteer/${userId}/`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Roles"],
    }),

    // ---------------------------------------------------
    // 4) Admin Assign Evaluator Role
    // ---------------------------------------------------
    adminAssignEvaluator: builder.mutation({
      query: (userId) => ({
        url: `admin/assign-evaluator/${userId}/`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Roles"],
    }),

    // ---------------------------------------------------
    // 5) Admin Approves Incubation (صاحب فكرة → محتضن)
    // ---------------------------------------------------
    adminApproveIncubation: builder.mutation({
      query: (userId) => ({
        url: `admin/approve-incubation/${userId}/`,
        method: "PATCH",
      }),
      invalidatesTags: ["User", "Roles"],
    }),

  }),
});

export const {
  useUpgradeToIdeaOwnerMutation,
  useUpgradeToVolunteerMutation,
  useAdminApproveVolunteerMutation,
  useAdminAssignEvaluatorMutation,
  useAdminApproveIncubationMutation,
} = rolesApi;