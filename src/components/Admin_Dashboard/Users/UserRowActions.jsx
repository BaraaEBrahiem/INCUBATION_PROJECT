import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

const UserRowActions = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // 1. التأكد من أن الأدوار عبارة عن مصفوفة، وإذا كانت نصاً واحداً نحولها لمصفوفة
    const roles = Array.isArray(user.role) ? user.role : [user.role];

    // 2. تحديد التوجيه بناءً على الأولويات (الأعلى فالأقل)
    if (roles.includes("زائر")) {
      navigate(`/admin/users/visitor/${user.id}`);
    } else if (roles.includes("مقيم")) {
      navigate(`/admin/users/evaluator/${user.id}`); // فرضاً أن مقيم تعني evaluator
    } else if (roles.includes("متطوع")) {
      navigate(`/admin/users/volunteer/${user.id}`);
    } else if (roles.includes("محتضن")) {
      navigate(`/admin/users/incubated/${user.id}`);
    } else if (roles.includes("متخرج")) {
      navigate(`/admin/users/graduated/${user.id}`);
    } else if (roles.includes("صاحب فكرة")) {
      navigate(`/admin/users/idea-owner/${user.id}`);
    } else {
      // التوجيه الافتراضي في حال لم يتطابق أي دور
      navigate(`/admin/users/${user.id}`);
    }
  };

  return (
    <button
      onClick={handleNavigate}
      className="p-2 cursor-pointer rounded-full hover:bg-gray-100 transition"
    >
      <HiDotsVertical size={20} className="text-gray-600" />
    </button>
  );
};

export default UserRowActions;