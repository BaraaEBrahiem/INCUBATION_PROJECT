// الحالة الابتدائية
export const initialVolunteerForm = {
  years_of_experience: "",
  current_company:"",
  primary_skills: "",
  profileLink: "",
  specialization: "",
  residence: "",
  volunteer_type: "",
  motivation: "",
  availability: Object.fromEntries(
    ["الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"]
      .map(d => [d, { from: "", to: "", active: false }])
  )
}

export function volunteerReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value }

    case "UPDATE_AVAILABILITY":
      return { ...state, availability: action.value }

    case "RESET":
      return initialVolunteerForm

    default:
      return state
  }
}
