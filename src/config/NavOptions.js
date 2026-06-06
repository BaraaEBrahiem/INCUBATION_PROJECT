
const baseNav = {
  visitor: [
    { label: "الرئيسية", to: "/visitor-mainpage", scrollId: "" },
    { label: "المشاريع", to: "/projectspage", scrollId: "" },
    { label: "النشاطات", to: "/activitiespage", scrollId: "" },
    { label: "المفضلة", to: "/favoritespage", scrollId: "" },
  ],

  idea_owner: [
    { label: "الرئيسية", to: "/ideaowner-mainpage", scrollId: "" },
    { label: "المشاريع", to: "/projectspage", scrollId: "" },
    { label: "النشاطات", to: "/activitiespage", scrollId: "" },
    { label: "مراحل الاحتضان", to: "/incubation-stages", scrollId: "" },
  ],

  volunteer: [
    { label: "الرئيسية", to: "/volunteer-mainpage", scrollId: "" },
    { label: "المشاريع", to: "/projectspage", scrollId: "" },
    { label: "النشاطات", to: "/activitiespage", scrollId: "" },
  ],
};

export const navOptions = {
  ...baseNav,

  evaluator: [
     { label: "الرئيسية", to: "/evaluator-mainpage", scrollId: "" },
    { label: "المشاريع", to: "/projectspage", scrollId: "" },
    { label: "النشاطات", to: "/activitiespage", scrollId: "" },
  ],

  incubator: [
     { label: "الرئيسية", to: "/incubator-mainpage", scrollId: "" },
    { label: "المشاريع", to: "/projectspage", scrollId: "" },
    { label: "النشاطات", to: "/activitiespage", scrollId: "" },
     { label: "مراحل الاحتضان", to: "/incubation-stages", scrollId: "" },

  ],
};
// أضيفي هذه الدالة في أسفل الملف لديكِ لتبسيط الجلب:
export const getNavOptionsByRole = (roles) => {
  // إذا لم تتوفر الأدوار بعد (حالة التحميل)، نعيد روابط الزائر كأمان مؤقت
  if (!roles) {
    return navOptions.visitor;
  }

  // تحويل القيمة إلى مصفوفة دائماً لضمان عدم حدوث كراش (سواء كانت قادمة String أو Array)
  const rolesArray = Array.isArray(roles) ? roles : [roles];

  // إرجاع القائمة المناسبة حسب الأولوية الأعلى للصلاحيات
  if (rolesArray.includes("admin")) return navOptions.admin || navOptions.visitor; // أضيفي روابط الأدمن هنا إن وجدت
  if (rolesArray.includes("idea_owner")) return navOptions.idea_owner;
  if (rolesArray.includes("incubator")) return navOptions.incubator;
  if (rolesArray.includes("evaluator")) return navOptions.evaluator;
  if (rolesArray.includes("volunteer")) return navOptions.volunteer;

  return navOptions.visitor;
};
