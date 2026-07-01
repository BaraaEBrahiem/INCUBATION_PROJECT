import React from "react";

const PageTabs = ({ tabs, activeTab, onChange }) => {
return (
     <div className="flex gap-4 mb-4 border-b pb-2 overflow-x-auto whitespace-nowrap block [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 text-xl font-semibold shrink-0 ${
            activeTab === tab.id
              ? "text-main-color bg-gray-300 cursor-pointer border border-main-color rounded"
              : "text-black"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default PageTabs;
