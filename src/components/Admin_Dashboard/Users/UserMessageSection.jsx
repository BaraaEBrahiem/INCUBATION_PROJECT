import Button from "../../Button";
const UserMessagesSection = ({ lastMessage, onMessageClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6" dir="rtl">
      
      <h3 className="text-2xl font-bold mb-4">المراسلات</h3>

      <p className="text-lg text-gray-500 mb-2">آخر رسالة متبادلة:</p>

      {/* صندوق الرسالة */}
      <div className="bg-gray-100 p-4 rounded-md mb-4 text-right border-r-4 border-main-color/40">
        <p className="text-gray-800 leading-relaxed font-medium">
          {lastMessage || "لا توجد رسائل سابقة في سجل هذا المستخدم."}
        </p>
      </div>

      <Button 
        label="الانتقال إلى المحادثة" 
        className="bg-main-color px-6 py-2"
        onClick={onMessageClick}
      />
    </div>
  );
};

export default UserMessagesSection;