import { BsPersonFillGear, BsPersonCircle, BsPersonWorkspace } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { ImStatsDots } from "react-icons/im";
import { FaHandHoldingHeart } from "react-icons/fa";
import {
  MdDashboard,
  MdBarChart,
  MdPeople,
  MdAssignment,
  MdWork,
  MdChecklist,
  MdPhotoLibrary,
  MdOutlineHomeWork
} from "react-icons/md";

const baseRoles = {
  visitor: [
    { label: "تعديل الملف الشخصي", link: "/profile", icon: <BsPersonCircle /> },
    { label: "تواصل معنا", link: "/contact", icon: <IoCall /> },
    { label: "إعدادات الحساب", link: "/settings", icon: <BsPersonFillGear /> },
  ],

  idea_owner: [
    { label: "تعديل الملف الشخصي", link: "/profile", icon: <BsPersonCircle /> },
    { label: "تواصل معنا", link: "/contact", icon: <IoCall /> },
    { label: "المستشارين", link: "/consultants", icon: <BsPersonWorkspace /> },
    { label: "الفريق", link: "/team", icon: <GrGroup /> },
    { label: "إعدادات الحساب", link: "/settings", icon: <BsPersonFillGear /> },
    
  ],

  volunteer: [
    { label: "تعديل الملف الشخصي", link: "/volunteer-profile", icon: <BsPersonCircle /> },
    { label: "تواصل معنا", link: "/contact", icon: <IoCall /> },
    { label: "مركز التطوع", link: "/volunteer-center", icon: <MdOutlineHomeWork /> },
    { label: "إعدادات الحساب", link: "/settings", icon: <BsPersonFillGear /> },
  ], 
};

export const RoleOptions = {
  ...baseRoles,

  incubator: [
    ...baseRoles.idea_owner,
  ],

  evaluator: [
    ...baseRoles.volunteer,
    { label: "مركز التقييم", link: "/evaluation-center", icon: <ImStatsDots /> },
  ],
};
 export const admin = [
  { label: "الرئيسية", link: "/admin-mainpage", icon: <MdDashboard/> },
  { label: "الإحصائيات", link: "/admin/statistics", icon: <MdBarChart/> },
  { label: "إدارة المستخدمين", link: "/admin/users", icon: <MdPeople/> },
  { label: "إدارة المتطوعين", link: "/admin/volunteers", icon: <FaHandHoldingHeart/> },
  { label: "مواسم الاحتضان", link: "/admin/seasons", icon: <MdAssignment /> },
  { label: "الورشات التدريبية", link: "/admin/workshops", icon: <BsPersonWorkspace /> },
  { label: "التقييم", link: "/admin/evaluation", icon: <MdChecklist /> },
  { label: "المشاريع المحتضنة", link: "/admin/assigned-projects", icon: <MdWork /> },
  { label: "المعرض", link: "/admin/exhibition", icon: <MdPhotoLibrary /> },
]

export const secretary = [
  { label: "الرئيسية", link: "/admin-mainpage", icon: <MdDashboard/> },
  { label: "إدارة المتطوعين", link: "/admin/volunteers", icon: <FaHandHoldingHeart/> },
  { label: "مواسم الاحتضان", link: "/admin/seasons", icon: <MdAssignment /> },
   { label: "التقييم", link: "/admin/evaluation", icon: <MdChecklist /> },
  { label: "المشاريع المحتضنة", link: "/admin/assigned-projects", icon: <MdWork /> },
  { label: "المعرض", link: "/admin/exhibition", icon: <MdPhotoLibrary /> },
]


