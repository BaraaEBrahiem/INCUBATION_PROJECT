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
      className="cursor-pointer border-2 border-main-color rounded-xl shadow hover:shadow-lg transition"
    >
      <div className="flex items-center gap-4 bg-blue-300">

        <div className="w-16 h-16 rounded-full bg-main-color flex items-center justify-center text-white text-2xl">
          🤖
        </div>

        <div>
          <h3 className="font-bold text-lg">
            {TITLES[categoryId]}
          </h3>

          <p className="text-sm text-gray-500">
            احصل على استشارة فورية بالذكاء الاصطناعي
          </p>
        </div>

      </div>
    </div>
  );
}