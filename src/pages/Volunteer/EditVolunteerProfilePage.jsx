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

const EditVolunteerProfilePage = () => {

  const [state, dispatch] = useReducer(profileReducer, initialProfileState)

  const userId = useSelector((state) => state.auth.userId)

  const { data: profileData, isLoading } =
    useGetVolunteerProfileQuery(userId, { skip: !userId })

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateVolunteerProfileMutation()

  // -----------------------------
  // Load profile
  // -----------------------------
  useEffect(() => {
    if (profileData) {
      dispatch({ type: "SET_ALL", payload: profileData })
    }
  }, [profileData])

  // -----------------------------
  // handle change
  // -----------------------------
  const handleChange = (field) => (e) => {
    dispatch({ type: "SET_FIELD", field, value: e.target.value })
  }

  // -----------------------------
  // submit (FIXED VERSION)
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const payload = {
        ...state,

        // backend naming fix
        primary_skills: state.primary_Skills,

        additional_skills: state.additional_Skills
          ? state.additional_Skills
              .split(",")
              .map(s => s.trim())
              .filter(Boolean)
          : [],
      }

      // remove frontend-only fields
      delete payload.primary_Skills
      delete payload.additional_Skills
      delete payload.cv

      console.log("FINAL PAYLOAD:", payload)

      await updateProfile(payload).unwrap()

      alert("تم حفظ التعديلات بنجاح")

    } catch (error) {
      console.error("خطأ في حفظ التعديلات:", error)
      alert(error?.data?.detail || "حدث خطأ أثناء الحفظ")
    }
  }

  // -----------------------------
  // loading
  // -----------------------------
  if (isLoading) {
    return (
      <div className="text-center mt-20 font-bold">
        جاري تحميل بيانات الملف الشخصي...
      </div>
    )
  }

  return (
    <div className="container mx-auto bg-gray-100" dir="rtl">

      {/* top card */}
      <div className="bg-white w-full md:w-1/2 flex items-center gap-4 mt-4 mb-2 p-4 rounded-lg">
        <img src={girl} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <p className="font-semibold">{state.full_name}</p>
          <p className="text-gray-500 text-sm">{state.email}</p>
        </div>
      </div>

      {/* form */}
      <div className="bg-white border border-second-color rounded-xl px-8 py-6 shadow-lg">

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">

          <Input label="الاسم" value={state.full_name || ""} onChange={handleChange("full_name")} />
          <Input label="البريد الإلكتروني" type="email" value={state.email || ""} onChange={handleChange("email")} />

          <Input label="الرقم" value={state.phone || ""} onChange={handleChange("phone")} />
          <Input label="تقيم في" value={state.residence || ""} onChange={handleChange("residence")} />

          <Input label="عدد المشاريع" type="number" value={state.projects_count || ""} onChange={handleChange("projects_count")} />
          <Input label="الخبرة (سنوات)" type="number" value={state.years_of_experience || ""} onChange={handleChange("years_of_experience")} />

          <Input label="نوع التطوع" value={state.volunteer_type || ""} onChange={handleChange("volunteer_type")} />
          <Input label="متاح لتعاون" value={state.availability_type || ""} onChange={handleChange("availability_type")} />

          <Input
            label="المهارات الأساسية"
            value={state.primary_Skills || ""}
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

          {/* buttons */}
          <div className="col-span-2 flex justify-center gap-6 mt-4">

            <NavLinkUniversal
              label={
                <Button
                  label="عرض كما يظهر للآخرين"
                  className="bg-main-color"
                />
              }
              to={`/profileinfo/${userId}`}
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

export default EditVolunteerProfilePage