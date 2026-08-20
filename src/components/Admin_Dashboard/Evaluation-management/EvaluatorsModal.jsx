import React from 'react';
import person1 from "../../../assets/images/person1.jpg"; ;

const EvaluatorsModal = ({ isOpen, onClose, evaluators = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]" onClick={onClose}>
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden bg-white"
       onClick={e => e.stopPropagation()} dir="rtl">
        
        <div className="flex justify-between items-center p-4 ">
          <h2 className="font-bold text-black">المقيمون المعينون ({evaluators.length})</h2>
          <button onClick={onClose} className="text-black hover:text-black transition-colors text-xl">✕</button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto ">
          {evaluators.length > 0 ? (
            <div className="grid grid-cols-2 gap-14">
              {evaluators.map((ev, i) => (
                <div key={i} className="">

                  <div className="flex items-center gap-5">
                    <img src={ person1 || ev.image } alt="" className="w-15 h-15 rounded-full object-cover" />
                    <div className="overflow-hidden">
                      <p className="font-bold text-sm truncate">{ev.name}</p>
                      <p className="text-sm text-black truncate">{ev.specialization}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-gray-700">لا يوجد مقيمون حالياً.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default EvaluatorsModal;
