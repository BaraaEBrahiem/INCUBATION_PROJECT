import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import person1 from "../assets/images/person1.jpg";
import { BuildDashboardOptions } from "../Utils/BuildDashboardOptions";

const Sidebar = ({ roles = [], userName, email }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const finalOptions = BuildDashboardOptions(roles);

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // غلق القائمة تلقائياً عند التحول للشاشات الكبيرة
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // غلق القائمة عند الضغط على رابط (للموبايل)
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // منع تمرير الصفحة عند فتح القائمة في الموبايل
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isMobile]);

  // محتوى السايدبار المشترك
  const SidebarContent = () => (
    <>
      {/* معلومات المستخدم */}
      <div className="flex items-center gap-4 mb-8 pb-4 border-b">
        <img 
          src={person1} 
          alt="avatar" 
          className="w-14 h-14 rounded-full object-cover border-2"
        />
        <div className="overflow-hidden">
          <p className="font-semibold text-gray-800 truncate">{userName}</p>
          <p className="text-sm text-gray-500 truncate">{email}</p>
        </div>
      </div>

      {/* الروابط */}
      <nav className="flex flex-col gap-8">
        {finalOptions.map((opt, idx) => {
          const isActive = location.pathname === opt.link;
          return (
            <NavLink
              key={idx}
              to={opt.link}
              onClick={handleLinkClick}
              className={`
                flex items-center gap-3 rounded-lg transition-all duration-200 overflow-hidden
                ${isActive 
                  ? "bg-main-color text-white shadow-md" 
                  : "text-black hover:bg-gray-100"
                }
              `}
            >
              <span className={`inline-block text-2xl p-3 ${isActive ? "text-white" : "text-black"}`}>
                {opt.icon}
              </span>
              <span className="py-3 px-1 font-medium text-sm md:text-base">
                {opt.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* زر الهامبرغر - يظهر فقط في الموبايل */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-main-color text-white shadow-lg hover:bg-opacity-90 transition-all duration-300"
          aria-label="القائمة"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      )}

      {/* طبقة الخلفية المعتمة (للموبايل فقط) */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* السايدبار للشاشات الكبيرة (ثابت دائماً) */}
      {!isMobile && (
        <aside className="fixed top-0 right-0 h-screen w-72 lg:w-80 bg-white shadow-xl p-5 overflow-y-auto z-30">
          <SidebarContent />
        </aside>
      )}

      {/* السايدبار المنبثق للموبايل */}
      {isMobile && (
        <aside
          className={`
            fixed top-0 right-0 h-full w-80 bg-white shadow-2xl p-5 overflow-y-auto transition-all duration-300 z-45
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
          style={{ zIndex: 45 }}
        >
          <SidebarContent />
          
          {/* زر إضافي لغلق القائمة في الأسفل */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-6 pt-4 text-center text-gray-400 hover:text-gray-600 border-t text-sm transition-colors"
          >
            إغلاق القائمة
          </button>
        </aside>
      )}
    </>
  );
};

export default Sidebar;