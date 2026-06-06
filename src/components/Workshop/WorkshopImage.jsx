import React from "react"
import { IoImageOutline } from "react-icons/io5";

const WorkshopImage = ({ image }) => {
  const preview = image ? URL.createObjectURL(image) : null;

  return (
    <div className="w-[375px] h-[375px] rounded-full border border-second-color overflow-hidden bg-white flex items-center justify-center">
      {preview ? (
        <img
          src={preview}
          alt="Workshop"
          className="w-full h-full object-cover"
        />
      ) : (
        <IoImageOutline className="text-gray-700 text-8xl" />
      )}
    </div>
  );
};

export default WorkshopImage