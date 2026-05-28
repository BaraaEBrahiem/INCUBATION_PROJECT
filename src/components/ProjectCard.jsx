import React from "react";
import SignupLink from "./SignupLink";
import { useFavorites } from "../hooks/useFavorites";
import NavLinkUniversal from "./NavLinkUniversal";
import { FaRegHeart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { useRole } from "../hooks/useRole";
import Button from "./Button";


const ProjectCard = ({ project, ShowImage = false, details = "general" }) => {

  const { roles } = useRole()
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.some((p) => p.id === project.id)
  const showFavorites = roles.includes("visitor")
  const getDetailsPath = () => {
    if (details === "graduated") return `/admin/latest-review/${project.id}`
    return `/ProjectDetails/${project.id}`; 
    
  }

  return (
    <div className='flex flex-col md:flex-row-reverse items-center justify-between bg-white-color rounded-xl shadow-md p-4 border border-second-color w-full gap-16' dir='ltr'>
        

        {ShowImage && (
          <div className="mt-4">
            <SignupLink
              label={
                "عرض التفاصيل"
              }
              className={
                "bg-main-color text-white px-6 py-2 rounded-lg inline-block"
              }
            />
          </div>
        )}


        <div className='flex flex-col gap-2 w-full md:flex-1 text-right' dir='rtl'>
            <p className="text-lg md:text-xl"><span className='font-bold'>اسم المشروع: </span>{project.title}</p>
            <p className="text-lg md:text-xl"><span className='font-bold'>الفئة: </span>{project.category}</p>
            <p className="text-lg md:text-xl"><span className='font-bold'>أعضاء الفريق: </span>{project.team_members?.join(", ") || ""}</p>

            {showFavorites && !ShowImage && (
              <div className='flex justify-between items-center mt-4'>
                <NavLinkUniversal
                  to={`/ProjectDetails/${project.id}`}
                  label="عرض التفاصيل"
                  className="bg-main-color text-white px-6 py-2 rounded-xl"
                />

                <button
                  onClick={() => toggleFavorite(project)}
                  className="text-2xl"
                >
                  {isFavorite
                    ? <IoIosHeart className='cursor-pointer text-red-color'/>
                    : <FaRegHeart className='cursor-pointer text-red-color'/>}
                </button>
              </div>
            )}

            {/* حالة وجود صورة */}
            {ShowImage && (
              <div className="mt-4">
                <SignupLink label={"عرض التفاصيل"} className={"bg-main-color text-white px-6 py-2 rounded-lg inline-block"} />
              </div>
            )}

            {/* حالة غير الزائر */}
            {!ShowImage && !showFavorites && (
              <div className="mt-4">
                <NavLinkUniversal
                  to={getDetailsPath()}
                  label={<Button label={"عرض التفاصيل"} className="bg-main-color text-white px-6 py-2 rounded-lg" />}
                />
              </div>
            )}
        </div>
    </div>
  );
};

export default ProjectCard;