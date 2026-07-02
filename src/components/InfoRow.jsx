 const InfoRow = ({ label, children }) => (
   <div className="flex flex-col md:flex-row justify-end items-start mb-5 gap-2 md:gap-0">
  {/* محتوى البيانات */}
  <div className="w-full md:flex-1 leading-relaxed pl-4 order-2 text-right">
    {children}
  </div>
  
  {/* العنوان مع النقطتين مضبوطتين */}
  <div className="font-bold text-black w-full md:w-auto md:min-w-[180px] order-1 flex justify-start mb-1 md:mb-0">
     <span>{label}</span>
  </div>
</div>
 )
//Inforow
  
  export default InfoRow