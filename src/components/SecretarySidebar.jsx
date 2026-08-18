import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {secretary} from "../config/RoleOptions";
import girl from "../assets/images/girl.jpg";

const SecretarySidebar = ({ adminName, email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // التحقق من حجم الشاشة
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
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

  // منع تمرير الصفحة عند فتح القائمة
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

  return (
    <>
      {/* زر الهامبرغر - يظهر فقط في الموبايل */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-main-color text-white shadow-lg hover:bg-opacity-90 transition-all duration-300"
          aria-label="قائمة"
        >
          <svg
            className="w-6 h-6"
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

      {/* السايدبار نفسه */}
      <aside
        className={`
          fixed top-0 right-0 h-screen bg-white shadow-xl p-4 overflow-y-auto transition-all duration-300 z-45
          ${isMobile ? "w-72" : "w-90"}
          ${isMobile && !isOpen ? "translate-x-full" : "translate-x-0"}
        `}
        style={{
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          zIndex: 45,
        }}
      >
        {/* معلومات المستخدم */}
        <div className="flex items-center gap-4 mb-8 border-b pb-6">
          <img
            src={girl}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover border-4 border-main-color"
          />
          <div className="text-center">
            <p className="font-semibold text-lg text-gray-800">{adminName}</p>
            <p className="text-sm text-gray-500 mt-1">{email}</p>
          </div>
        </div>

        {/* الروابط */}
        <nav className="flex flex-col gap-8">
          {secretary.map((opt, idx) => (
            <NavLink
              key={idx}
              to={opt.link}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-main-color text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <span
                className={`text-3xl ${
                  !secretary.some(item => item.link === opt.link && window.location.pathname === item.link)
                    ? "text-second-color"
                    : "text-second-color"
                }`}
              >
                {opt.icon}
              </span>
              <span className="text-base font-medium">{opt.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* زر غلق إضافي للموبايل في أسفل القائمة */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-8 p-3 text-center text-gray-500 hover:text-gray-700 border-t pt-4"
          >
            إغلاق القائمة
          </button>
        )}
      </aside>

      {/* تحسين للشاشات الكبيرة - عدم وجود مشاكل في التمرير */}
     <style>{`
      @media (min-width: 768px) {
        .w-90 {
          width: 280px;
        }
      }
      @media (min-width: 1024px) {
        .w-90 {
          width: 300px;
        }
      }
    `}</style>
    </>
  );
};

export default SecretarySidebar;