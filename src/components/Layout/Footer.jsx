import React from "react";
import NavLinksGroup from "../NavLinksGroup";
import logo from "../../assets/images/logo.png";
import Facebook from "../../assets/images/Facebook.png";
import Google from "../../assets/images/Google.jpeg";
import Instagram from "../../assets/images/Instagram.jpeg";

const quickLinks = [
  { label: "الصفحة الرئيسية", to: "/", scrollId: "home" },
  { label: "من نحن", to: "/about", scrollId: "about" },
  { label: "الأهداف", to: "/", scrollId: "goals" },
  { label: "أدوار الحاضنة", to: "/", scrollId: "roles" },
  { label: "كن شريكاً بنجاحنا", to: "/", scrollId: "partners" },
  { label: "المعرض", to: "/about", scrollId: "exhibition" },
  { label: "مراحل الاحتضان", to: "/", scrollId: "stages" },
  { label: "الخدمات", to: "/about", scrollId: "services" },
  { label: "الشروط والأحكام", to: "/", scrollId: "terms" },
  { label: "الأسئلة الشائعة", to: "/", scrollId: "faq" }
];

const joinLinks = [
  { label: "تسجيل الدخول", to: "/login" },
  { label: "أنشئ حسابك الآن", to: "/signup" },
  { label: "تطوع الآن", to: "/signup" },
  { label: "قدم فكرتك", to: "/signup" }
];

const Footer = () => {
  return (
  <footer dir="rtl" className="bg-main-color text-white py-10 px-6 font-bold w-full">
  <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center lg:text-right">

        {/* اللوغو والتواصل */}
        <div className="flex flex-col items-center lg:items-start">
          <img src={logo} alt="Logo" className="w-32 h-auto mb-6" />
          <p className="text-lg leading-relaxed">
            تواصل معنا على الرقم:
            <br />
            <span className="text-second-color text-xl">0989838930</span>
          </p>

          <div className="flex gap-4 mt-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={Facebook} alt="Facebook" className="w-10 h-10 rounded-full" />
            </a>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              <img src={Google} alt="Google" className="w-10 h-10 rounded-full" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={Instagram} alt="Instagram" className="w-10 h-10 rounded-full" />
            </a>
          </div>
        </div>

        {/* انضم إلينا */}
        <div>
          <h3 className="text-second-color text-2xl font-bold mb-4">انضم إلينا</h3>
          <NavLinksGroup options={joinLinks} className="flex flex-col items-center lg:items-start gap-2 text-lg" />
        </div>

        {/* الوصول السريع */}
        <div>
          <h3 className="text-second-color text-2xl font-bold mb-4">الوصول السريع</h3>
          <NavLinksGroup options={quickLinks} className="flex flex-col items-center lg:items-start gap-2 text-lg" />
        </div>

        {/* العنوان */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-second-color text-2xl font-bold mb-4">العنوان</h3>
          <p className="text-lg leading-relaxed">
            سوريا، جامعة حمص
            <br />
            خلف كلية العلوم
          </p>
        </div>

      </div>

      {/* خط سفلي */}
      <div className="text-center mt-10 text-sm opacity-80">
        © جميع الحقوق محفوظة - ICT INCUBATOR
      </div>
    </footer>
  );
};

export default Footer;
