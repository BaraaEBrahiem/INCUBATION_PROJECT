import React from "react";
import Button from "./Button";
const ProjectEvaluationCard = ({ project, onViewDetails}) => {
 return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-second-color hover:shadow-lg transition">

      <p className="text-gray-700 mb-2">
        <span className="font-bold">عنوان المشروع: </span>
        {project.title}
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-bold">نوع المنتج: </span>
        {project.product_type}
      </p>

      <p className="text-gray-700 mb-4">
        <span className="font-bold">القطاع المستهدف: </span>
        {project.target_audience}
      </p>

      <div className="flex justify-center items-center mt-4">
        <Button
        label="عرض التفاصيل"
          onClick={onViewDetails}
          className="bg-main-color"
        />
      </div>
    </div>
  );
};

export default ProjectEvaluationCard;
