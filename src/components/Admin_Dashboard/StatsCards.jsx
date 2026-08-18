import React from "react";

const StatsCards = ({ showIcons = true, stats }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="md:text-xl text-xs bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center gap-2"
        >
          {showIcons && (
            <span className="text-2xl md:text-4xl">{item.icon}</span>
          )}

          <div className="flex flex-col items-center">
            <p className="text-gray-500">{item.label}</p>
            <p className="text-xl md:text-3xl font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
//statecards
export default StatsCards;
