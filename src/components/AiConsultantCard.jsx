import { useNavigate } from "react-router-dom";

const TITLES = {
  backend: "المستشار الذكي Backend",
  frontend: "المستشار الذكي Frontend",
  uiux: "المستشار الذكي UI/UX",
  marketing: "المستشار الذكي للتسويق",
  business: "المستشار الذكي لإدارة الأعمال",
  legal: "المستشار الذكي القانوني",
};

export default function AIConsultantCard({ categoryId }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ai-consultant/${categoryId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="ai flex justify-end mt-1"
    >
        <div className="cursor-pointer w-16 h-16 rounded-full bg-main-color flex items-center justify-center text-white text-2xl" 
        title = {TITLES[categoryId]}>
          🤖
        </div>


      </div>
  );
}