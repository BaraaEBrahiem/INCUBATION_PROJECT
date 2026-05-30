<<<<<<< HEAD
import { apiSlice } from "../../apiSlice"; 

export const usersOptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1 عرض جميع المستخدمين مع أدوارهم (GET)
    getAdminUsers: builder.query({
      query: () => "admin/users/",
      providesTags: ["AdminUser"],
    }),

    // 2 تفاصيل مستخدم معين بناءً على الـ ID (GET)
    getAdminUserById: builder.query({
      query: (user_id) => `admin/users/${user_id}/profile/`,
      providesTags: (result, error, user_id) => [{ type: "AdminUser", id: user_id }],
    }),

    // 3 إضافة مستخدم جديد وتحديد دوره الأساسي (POST)
    createAdminUser: builder.mutation({
      query: (userData) => ({
        url: "admin/users/create/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["AdminUser"],
    }),

    // 4 جلب قائمة جميع الأدوار المتاحة في النظام (GET)
    getAvailableRoles: builder.query({
      query: () => "admin/users/roles/",
      providesTags: ["Roles"],
    }),

    // 5 تحديث أدوار مستخدم معين (PUT)
    updateUserRoles: builder.mutation({
      query: ({ user_id, roles }) => ({
        url: `admin/users/${user_id}/roles/`,
        method: "PUT",
        body: { roles },
      }),
      invalidatesTags: (result, error, { user_id }) => ["AdminUser", { type: "AdminUser", id: user_id }],
    }),

    // 6 تجميد حساب مستخدم (POST)
    freezeUser: builder.mutation({
      query: (user_id) => ({
        url: `admin/users/${user_id}/freeze/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, user_id) => ["AdminUser", { type: "AdminUser", id: user_id }],
    }),

    // 7تفعيل حساب مستخدم مجمد (POST)
    activateUser: builder.mutation({
      query: (user_id) => ({
        url: `admin/users/${user_id}/activate/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, user_id) => ["AdminUser", { type: "AdminUser", id: user_id }],
    }),

    // 8 إرسال إشعار مخصص للمستخدم من الأدمن (POST)
    sendNotificationToUser: builder.mutation({
      query: ({ user_id, message }) => ({
        url: `admin/users/${user_id}/send-notification/`,
        method: "POST",
        body: { message },
      }),
    }),

    // 9إضافة عضو إلى فريق فكرة/مشروع محدد (POST)
    addUserToTeam: builder.mutation({
      query: ({ user_id, ideaId }) => ({
        url: `admin/users/${user_id}/add-to-team/`,
        method: "POST",
        body: { idea_id: ideaId },
      }),
      invalidatesTags: (result, error, { user_id }) => [{ type: "AdminUser", id: user_id }],
    }),
    
    //عرض المشاريع المحتضنة لاضافة عضو للفريق لها
      getIdeasForAddingUserToTeam: builder.query({
        query: () => "admin/users/current-season-ideas/",
        providesTags: ["Ideas"],
      }),

    //  عرض المشاريع/الأفكار للموسم الحالي (GET)
    getCurrentSeasonIdeas: builder.query({
      query: () => "admin/users/current-season-ideas/",
      providesTags: ["Ideas"],
    }),

  }),
  overrideExisting: false,
});
 

=======
import { apiSlice } from "../../apiSlice";

export const usersOptionsApi =
  apiSlice.injectEndpoints({
    endpoints: (builder) => ({

      // 1 عرض جميع المستخدمين
      getAdminUsers:
        builder.query({
          query: () =>
            "admin/users/",
          providesTags: [
            "AdminUser",
          ],
        }),

      // 2 تفاصيل مستخدم
      getAdminUserById:
        builder.query({
          query: (
            user_id
          ) =>
            `admin/users/${user_id}/profile/`,
          providesTags: (
            result,
            error,
            user_id
          ) => [
            {
              type:
                "AdminUser",
              id: user_id,
            },
          ],
        }),

      // 3 إضافة مستخدم
      createAdminUser:
        builder.mutation({
          query: (
            userData
          ) => ({
            url:
              "admin/users/create/",
            method:
              "POST",
            body:
              userData,
          }),
          invalidatesTags:
            [
              "AdminUser",
            ],
        }),

      // 4 جلب الأدوار
      getAvailableRoles:
        builder.query({
          query: () =>
            "admin/users/roles/",
          providesTags:
            ["Roles"],
        }),

      // 5 تحديث أدوار
      updateUserRoles:
        builder.mutation({
          query: ({
            user_id,
            roles,
          }) => ({
            url:
              `admin/users/${user_id}/roles/`,
            method:
              "PUT",
            body: {
              roles,
            },
          }),
          invalidatesTags:
            (
              result,
              error,
              {
                user_id,
              }
            ) => [
              "AdminUser",
              {
                type:
                  "AdminUser",
                id: user_id,
              },
            ],
        }),

      // 6 تجميد حساب
      freezeUser:
        builder.mutation({
          query: (
            user_id
          ) => ({
            url:
              `admin/users/${user_id}/freeze/`,
            method:
              "POST",
          }),
          invalidatesTags:
            (
              result,
              error,
              user_id
            ) => [
              "AdminUser",
              {
                type:
                  "AdminUser",
                id: user_id,
              },
            ],
        }),

      // 7 تفعيل حساب
      activateUser:
        builder.mutation({
          query: (
            user_id
          ) => ({
            url:
              `admin/users/${user_id}/activate/`,
            method:
              "POST",
          }),
          invalidatesTags:
            (
              result,
              error,
              user_id
            ) => [
              "AdminUser",
              {
                type:
                  "AdminUser",
                id: user_id,
              },
            ],
        }),

      // 8 إرسال إشعار
      sendNotificationToUser:
        builder.mutation({
          query: ({
            user_id,
            message,
          }) => ({
            url:
              `admin/users/${user_id}/send-notification/`,
            method:
              "POST",
            body: {
              message,
            },
          }),
        }),

      // 9 إضافة عضو للفريق
      addUserToTeam:
        builder.mutation({
          query: ({
            user_id,
            ideaId,
          }) => ({
            url:
              `admin/users/${user_id}/add-to-team/`,
            method:
              "POST",
            body: {
              idea_id:
                ideaId,
            },
          }),
          invalidatesTags:
            (
              result,
              error,
              {
                user_id,
              }
            ) => [
              {
                type:
                  "AdminUser",
                id: user_id,
              },
            ],
        }),

      // عرض مشاريع الموسم الحالي
      getCurrentSeasonIdeas:
        builder.query({
          query: () =>
            "admin/users/current-season-ideas/",
          providesTags:
            ["Ideas"],
        }),

      // المشاريع المحتضنة لإضافة عضو
      getIdeasForAddingUserToTeam:
        builder.query({
          query: () =>
            "admin/users/current-season-incubation-ideas/",
          providesTags:
            ["Ideas"],
        }),
    }),

    overrideExisting:
      false,
  });
>>>>>>> adminFeature

export const {
  useGetAdminUsersQuery,
  useGetAdminUserByIdQuery,
  useCreateAdminUserMutation,
  useGetAvailableRolesQuery,
  useUpdateUserRolesMutation,
  useFreezeUserMutation,
  useActivateUserMutation,
  useSendNotificationToUserMutation,
  useAddUserToTeamMutation,
  useGetCurrentSeasonIdeasQuery,
  useGetIdeasForAddingUserToTeamQuery,
} = usersOptionsApi;