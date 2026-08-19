const UserInfoCard = ({ basicInfo }) => {
  if (!basicInfo) return null;

    return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg mb-6 w-full" dir="rtl">
      <div className="space-y-6 md:space-y-15">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

          {/* الاسم */}
          <div>
            <p className="text-lg sm:text-xl font-bold">الاسم</p>
            <p className="font-medium text-gray-750 break-words">{basicInfo.full_name}</p>
          </div>


          {/* البريد الإلكتروني */}
          <div>
            <p className="text-lg sm:text-xl font-bold">البريد الإلكتروني</p>
            {/* 🎯 break-all تضمن عدم خروج الإيميل الطويل عن شاشة الـ 320px */}
            <p className="font-medium text-gray-750 break-all">{basicInfo.email}</p>
          </div>

          {/* الرقم */}
          <div>
            <p className="text-lg sm:text-xl font-bold">الرقم</p>
            <p className="font-medium text-gray-750">{basicInfo.phone}</p>
          </div>

          
        </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6"> 
          
          {/*تاريخ الانضمام */}
          <div>
            <p className="text-lg sm:text-xl font-bold">تاريخ الانضمام</p>
            <p className="font-medium text-gray-750">{basicInfo.joined_at}</p>
          </div>
          {/* الأدوار التي قام بها (محدث ليتوافق مع مصفوفة all_roles) */}
          <div>
            <p className="text-lg sm:text-xl font-bold">الأدوار التي قام بها</p>
            <p className="font-medium text-gray-750 break-words">
              {basicInfo.all_roles && basicInfo.all_roles.length > 0
                ? basicInfo.all_roles.join("، ")
                : "لا يوجد أدوار مسجلة"}
            </p>
          </div>


          <div>
            <p className="text-lg sm:text-xl font-bold">حالة الحساب</p>
            <span
              className={`font-bold ${
                basicInfo.is_active ? "text-green-color" : "text-red-color"
              }`}
            >
              {basicInfo.is_active ? "نشط" : "مجمد"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
export default UserInfoCard;