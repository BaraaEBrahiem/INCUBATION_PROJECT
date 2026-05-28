import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

const UserRowActions = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/admin/users/${user.id}`);
  };

  return (
    <button
      onClick={handleNavigate}
      className="p-2 cursor-pointer rounded-full hover:bg-gray-100 transition focus:outline-none"
    >
      <HiDotsVertical size={20} className="text-gray-600" />
    </button>
  );
};

export default UserRowActions;