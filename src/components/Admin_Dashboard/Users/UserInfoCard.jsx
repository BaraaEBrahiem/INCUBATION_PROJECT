const UserInfoCard = ({ basicInfo }) => {
  if (!basicInfo) return null;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-6" dir="rtl">
      <div className="space-y-15">
        
        {/* الصف الأول: البيانات الأساسية*/}
        <div className="flex justify-between items-center">

          {/* الاسم */}
          <div>
            <p className="text-xl font-bold">الاسم</p>
            <p className="font-medium text-gray-750">{basicInfo.full_name}</p>
          </div>


          {/* البريد الإلكتروني */}
          <div>
            <p className="text-xl font-bold">البريد الإلكتروني</p>
            <p className="font-medium text-gray-750">{basicInfo.email}</p>
          </div>

          {/* الرقم */}
          <div>
            <p className="text-xl font-bold">الرقم</p>
            <p className="font-medium text-gray-750">{basicInfo.phone}</p>
          </div>

         
        </div>

        {/* الصف الثاني: الأدوار والحالة والحقول الإضافية */}
        <div className="flex justify-between items-center"> 
          
          {/*تاريخ الانضمام */}
          <div>
            <p className="text-xl font-bold">تاريخ الانضمام</p>
            <p className="font-medium text-gray-750">{basicInfo.joined_at}</p>
          </div>
          {/* الأدوار التي قام بها (محدث ليتوافق مع مصفوفة all_roles) */}
          <div>
            <p className="text-xl font-bold">الأدوار التي قام بها</p>
            <p className="font-medium text-gray-750">
              {basicInfo.all_roles && basicInfo.all_roles.length > 0
                ? basicInfo.all_roles.join("، ")
                : "لا يوجد أدوار مسجلة"}
            </p>
          </div>


          <div>
            <p className="text-xl font-bold">حالة الحساب</p>
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