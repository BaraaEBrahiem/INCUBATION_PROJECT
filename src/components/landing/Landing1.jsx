import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import MainLayout from "../Layout/MainLayout"
import Header from "../Layout/Header";
import Home from "./Home";
import Roles from "./Roles";
import Goals from "./Goals";
import FaQuestions from "./FaQuestions";
import Terms from "./Terms";
import Footer from "../Layout/Footer";
const navLinkOptions = [
  { label: "الصفحة الرئيسية", to: "/", scrollId: "home" }, 
  { label: "أدوار الحاضنة", to: "/", scrollId: "roles" },
  { label: "من نحن", to: "/about", scrollId: "about" },
  { label: "الأهداف", to: "/", scrollId: "goals" },
  { label: "الأسئلة الشائعة", to: "/", scrollId: "faq" },
  { label: "الشروط والأحكام", to: "/", scrollId: "terms" },
]

const Landing1 = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "")
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }, [location])

  return (

   <div className="w-full overflow-x-hidden md:mt-1 mt-5"> 
<MainLayout header={<Header navOptions={navLinkOptions}/>}  footer={<Footer />}>
      <Home id="home" />
      <Roles id="roles" />
      <Goals id="goals" />
      <FaQuestions id="faq" />
      <Terms id="terms" />
    </MainLayout>
    </div>
  )
}

export default Landing1