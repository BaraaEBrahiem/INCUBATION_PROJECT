import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DataTable from "../DataTable";
import Button from "../../Button";
import Modal from "../../Modal";
import {
  showError,
  showSuccess,
  showInfo,
} from "../../../Utils/toast";

import {
  useAddUserToTeamMutation,
  useGetIdeasForAddingUserToTeamQuery,
} from "../../../api/endpoints/admin/usersOptionsApi";

import Select from "../../Select";

const ROLE_TRANSLATIONS = {
  VISITOR: "مستخدم",
  VOLUNTEER: "متطوع",
  IDEA_OWNER: "صاحب فكرة",
  INCUBATOR: "محتضن",
  EVALUATOR: "مقيم",
};

const UsersTable = ({
  users = [],
  roleFilter,
}) => {
  const navigate = useNavigate();

  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(null);

  const [ideaId, setIdeaId] =
    useState("");

  const {
    data: serverIdeas = [],
    isLoading:
      isLoadingIdeas,
  } =
    useGetIdeasForAddingUserToTeamQuery();
    console.log(serverIdeas);

  const [
    addUserToTeam,
    { isLoading: isAdding },
  ] =
    useAddUserToTeamMutation();

  const filteredUsers =
    users.filter((user) => {
      if (
        roleFilter === "all"
      )
        return true;

      return (
        user.roles &&
        user.roles.includes(
          roleFilter
        )
      );
    });

  const handleOpenModal = (
    userId
  ) => {
    setSelectedUserId(
      userId
    );
    setIdeaId("");
    setShowModal(true);
  };

  const handleAddToTeam =
    async (e) => {
      e.preventDefault();

      if (!ideaId) {
        showInfo(
          "يرجى اختيار فكرة/مشروع أولاً من القائمة"
        );
        return;
      }

      try {
        await addUserToTeam({
          user_id:
            selectedUserId,
          ideaId:
            ideaId,
        }).unwrap();

        showSuccess(
          "تم إضافة العضو إلى الفريق بنجاح"
        );

        setShowModal(
          false
        );
        setSelectedUserId(
          null
        );
        setIdeaId("");
      } catch (err) {
        showError(
          err?.data
            ?.detail ||
            "حدث خطأ أثناء إضافة العضو للفريق"
        );
      }
    };

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",

      render: (row) => (
        <div className="flex flex-col gap-2">
          <Button
            label="عرض التفاصيل"
            className="bg-main-color"
            onClick={() =>
              navigate(
                `/admin/users/${row.id}`
              )
            }
          />

          <Button
            label="إضافة لفريق"
            className="bg-main-color"
            onClick={() =>
              handleOpenModal(
                row.id
              )
            }
          />
        </div>
      ),
    },

    {
      key: "status",
      label:
        "حالة الحساب",

      render: (row) => (
        <span
          className={`px-3 py-1 rounded-md text-white text-xs font-semibold
            ${
              row.status ===
              "ACTIVE"
                ? "bg-green-600"
                : "bg-red-600"
            }
          `}
        >
          {row.status ===
          "ACTIVE"
            ? "نشط"
            : "مجمد"}
        </span>
      ),
    },

    {
      key: "roles",
      label:
        "الأدوار المشغولة",

      render: (row) => {
        if (
          !row.roles ||
          row.roles.length ===
            0
        ) {
          return (
            <span className="text-gray-400">
              زائر
            </span>
          );
        }

        const arabicRoles =
          row.roles.map(
            (code) =>
              ROLE_TRANSLATIONS[
                code
              ] || code
          );

        return (
          <span className="font-medium text-gray-800">
            {arabicRoles.join(
              " ، "
            )}
          </span>
        );
      },
    },

    {
      key: "email",
      label:
        "البريد الإلكتروني",
    },

    {
      key: "full_name",
      label:
        "اسم المستخدم الكامل",
    },
  ];

  const ideas =
  serverIdeas?.results ||
  serverIdeas ||
  [];

  const ideaOptions =
  ideas.map((idea) => ({
    value: idea.id,
    label:
      idea.title ||
      idea.name ||
      `مشروع رقم ${idea.id}`,
  }));
 return (
    <div
      className="bg-white shadow-md rounded-lg p-4 mt-6 w-full overflow-hidden" // 🎯 قمنا بتغييرها لـ overflow-hidden لتمنع الكارد الأبيض نفسه من الخروج عن الشاشة
      dir="rtl"
    >
      {filteredUsers.length >
      0 ? (
        // 🎯 الـ div السحري المحيط بالجدول: يعطيه سكرول داخلي ناعم (overflow-x-auto) على الموبايل فقط دون التأثير على اللابتوب
        <div className="w-full overflow-x-auto block whitespace-nowrap">
          <DataTable
            columns={
              columns
            }
            data={
              filteredUsers
            }
          />
        </div>
      ) : (
        <p className="text-center text-gray-500 py-6">
          لا يوجد مستخدمين
          يطابقون الدور
          المحدد حالياً.
        </p>
      )}

      <Modal
        isOpen={
          showModal
        }
        onClose={() =>
          setShowModal(
            false
          )
        }
      >
        <div className="w-full max-w-sm sm:max-w-md mx-auto p-1">
          <h2 className="text-lg font-bold mb-4 text-center">
            اضافة لفريق
          </h2>

          <form
            onSubmit={
              handleAddToTeam
            }
            className="flex flex-col gap-4"
          >
            <Select
              label="اختر فكرة/مشروع:"
              value={ideaId}
              onChange={(
                e
              ) =>
                setIdeaId(
                  e.target.value
                )
              }
              placeholder={
                isLoadingIdeas
                  ? "جاري تحميل المشاريع..."
                  : "المشاريع المحتضنة"
              }
              options={
                ideaOptions
              }
              disabled={
                isLoadingIdeas
              }
            />

            <Button
              type="submit"
              label={
                isAdding
                  ? "جاري الإضافة..."
                  : "اضافة"
              }
              className="bg-main-color"
              disabled={
                isAdding ||
                isLoadingIdeas
              }
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default UsersTable;