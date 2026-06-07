import React, { useReducer, useEffect } from "react"
import { profileReducer, initialProfileState } from "../../hooks/ProfileReducer"
import Input from "../../components/Input"
import Textarea from "../../components/Textarea"
import Button from "../../components/Button"
import girl from "../../assets/images/girl.jpg"
import { useSelector } from "react-redux"
import NavLinkUniversal from "../../components/NavLinkUniversal"
import {
  useUpdateVolunteerProfileMutation,
  useGetVolunteerProfileQuery
} from "../../api/endpoints/volunteerprofileApi"
import Select from "../../components/Select"
import {showSuccess, showError} from "../../Utils/toast"
import { useNavigate } from "react-router-dom"

const EditVolunteerProfilePage = () => {
  const EXPERTISE_OPTIONS = [
    { value: "UI/UX", label: "UI/UX" },
    { value: "Frontend", label: "Frontend" },
    { value: "Marketing", label: "Marketing" },
    { value: "Legal", label: "Legal" },
    { value: "Backend", label: "Backend" }
  ];

  const [state, dispatch] = useReducer(
  profileReducer,
  {
    ...initialProfileState,
    avatar: null,
  }
)
  const navigate = useNavigate()
  const userId = useSelector((state) => state.auth.userId)
  
  const { data: profileData, isLoading } = useGetVolunteerProfileQuery(userId, { skip: !userId })
  const [updateProfile, { isLoading: isUpdating }] = useUpdateVolunteerProfileMutation()
  
  useEffect(() => {
    if (profileData) {
      console.log("البيانات القادمة من السيرفر كاملة:", profileData);

      const serverName = profileData.full_name?.trim() || 
                         profileData.name?.trim() || 
                         profileData.basic_info?.name?.trim() || 
                         profileData.user?.name?.trim() || 
                         "";
      

      const formattedPayload = {
        ...profileData,
        name: serverName,
        full_name: serverName,
        email: profileData.email || "",
        phone: profileData.basic_info?.phone || profileData.user?.phone || profileData.phone || "",
        primary_Skills: profileData.primary_skills || profileData.primary_Skills || "",
        additional_Skills: Array.isArray(profileData.additional_skills) 
          ? profileData.additional_skills.join(", ") 
          : (profileData.additional_Skills || "")
      };

      dispatch({ type: "SET_ALL", payload: formattedPayload });
    }
  }, [profileData]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    dispatch({ type: "SET_FIELD", field, value });
    
    if (field === "name") {
      dispatch({ type: "SET_FIELD", field: "full_name", value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData =
      new FormData();

    formData.append(
      "full_name",
      state.name
    );

    formData.append(
      "email",
      state.email
    );

    formData.append(
      "phone",
      state.phone
    );

    formData.append(
      "residence",
      state.residence
    );

    formData.append(
      "years_of_experience",
      state.years_of_experience
    );

    formData.append(
      "primary_skills",
      state.primary_Skills
    );

    formData.append(
      "volunteer_type",
      state.volunteer_type
    );

    formData.append(
      "availability_type",
      state.availability_type
    );

    formData.append(
      "projects_count",
      state.projects_count
    );

    formData.append(
      "bio",
      state.bio
    );

    formData.append(
      "additional_skills",
      JSON.stringify(
        state.additional_Skills
          ?.split(",")
          .map((s) => s.trim())
      )
    );

    if (state.avatar) {
      formData.append(
        "avatar",
        state.avatar
      );
    }

    await updateProfile(
      formData
    ).unwrap();

    showSuccess(
      "تم حفظ التعديلات بنجاح"
    );
  } catch (error) {
    console.error(error);

    showError(
      error?.data?.detail ||
        "حدث خطأ أثناء الحفظ"
    );
  }
};

  if (isLoading) {
    return (
      <div className="text-center mt-20 font-bold">
        جاري تحميل بيانات الملف الشخصي...
      </div>
    )
  }

  return (
    <div className="container mx-auto bg-gray-100" dir="rtl">
      <div className="bg-white w-full md:w-1/2 flex items-center gap-4 mt-4 mb-2 p-4 rounded-lg">
        <div className="relative">
  <img
    src={
      state.avatar instanceof File
        ? URL.createObjectURL(
            state.avatar
          )
        : profileData?.avatar
        ? `http://127.0.0.1:8000${profileData.avatar}`
        : girl
    }
    alt="avatar"
    className="w-20 h-20 rounded-full object-cover border"
  />

  <label className="absolute bottom-0 left-0 bg-main-color text-white text-xs px-2 py-1 rounded cursor-pointer">
    تعديل

    <input
      type="file"
      hidden
      accept="image/*"
      onChange={(e) => {
        const file =
          e.target.files?.[0];

        if (!file) return;

        dispatch({
          type: "SET_FIELD",
          field: "avatar",
          value: file,
        });
      }}
    />
  </label>
</div>
        <div>
          <p className="font-semibold">{state.name || state.full_name}</p>
          <p className="text-gray-500 text-sm">{state.email}</p>
        </div>
      </div>

      <div className="bg-white border border-second-color rounded-xl px-8 py-4 shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <Input label="الاسم" value={state.name || state.full_name || ""} onChange={handleChange("name")} />
          <Input
  label="البريد الإلكتروني"
  type="email"
  name="email"
  value={state.email || ""}
  onChange={handleChange("email")}
/>
          <Input label="الرقم" value={state.phone || ""} onChange={handleChange("phone")} />
          <Input label="تقيم في" value={state.residence || ""} onChange={handleChange("residence")} />

          <Input label="عدد المشاريع" type="number" value={state.projects_count || ""} onChange={handleChange("projects_count")} />
          <Input label="الخبرة (سنوات)" type="number" value={state.years_of_experience || ""} onChange={handleChange("years_of_experience")} />

          <Input label="نوع التطوع" value={state.volunteer_type || ""} onChange={handleChange("volunteer_type")} />
          <Input label="متاح لتعاون" value={state.availability_type || ""} onChange={handleChange("availability_type")} />

          <Select
            label="المهارات الأساسية"
            value={state.primary_Skills || ""}
            options={EXPERTISE_OPTIONS}
            onChange={handleChange("primary_Skills")}
          />

          <Input
            label="المهارات الإضافية"
            value={state.additional_Skills || ""}
            onChange={handleChange("additional_Skills")}
            placeholder="React, UI/UX, Figma"
          />

          <div className="col-span-2">
            <Textarea
              label="السيرة الذاتية"
              value={state.bio || ""}
              onChange={handleChange("bio")}
            />
          </div>

          <div className="col-span-2 flex justify-center gap-6 mt-4">
            <Button 
            label="عرض كما يظهر للآخرين" 
            className="bg-main-color" 
            onClick={() => navigate(`/profileinfo/${userId}`)} 
            />
            
            <Button
              type="submit"
              label={isUpdating ? "جاري الحفظ..." : "حفظ التعديلات"}
              className="bg-main-color"
              disabled={isUpdating}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditVolunteerProfilePage;