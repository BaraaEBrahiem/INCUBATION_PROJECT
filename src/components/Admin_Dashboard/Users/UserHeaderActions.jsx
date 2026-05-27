 import { useState, useEffect } from "react";
import Modal from "../../Modal";
import Button from "../../Button";
import girl from "../../../assets/images/girl.jpg";
import Checkbox from "../../CheckBox";
import Input from "../../Input";
import NavLinkUniversal from "../../NavLinkUniversal";

const UserHeaderActions = ({
  user,
  onFreeze,
  onActivate,
  onChangeRole,
  onSendNotification,
}) => {
  const [freezeOpen, setFreezeOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [editRoleOpen, setEditRoleOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  // 1. تحويل الأدوار القادمة إلى مصفوفة دائماً لتجنب الأخطاء
  const userRoles = Array.isArray(user.role) ? user.role : [user.role];

  // 2. جعل الـ State عبارة عن مصفوفة لتخزين الأدوار المختارة
  const [selectedRoles, setSelectedRoles] = useState(userRoles);
  const [notificationText, setNotificationText] = useState("");

 
  useEffect(() => {
  //eslint-disable-next-line
    setSelectedRoles(userRoles);
    //eslint-disable-next-line
  }, [user.role]);

  // دالة للتعامل مع الـ Checkbox (إضافة أو إزالة الدور من المصفوفة)
  const handleCheckboxChange = (roleName, isChecked) => {
    if (isChecked) {
      // إذا تم تفعيل الخيار، نضيف الدور للمصفوفة
      setSelectedRoles((prev) => [...prev, roleName]);
    } else {
      // إذا تم إلغاء تفعيل الخيار، نحذفه من المصفوفة
      setSelectedRoles((prev) => prev.filter((r) => r !== roleName));
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2 py-4">
          <img
            src={girl}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            {/* تعديل 1: عرض الأدوار كـ نصوص مفصولة بشرطة */}
            <p className="text-gray-600">{userRoles.join(" - ")}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            label="تعديل الأدوار"
            className="bg-main-color"
            onClick={() => setEditRoleOpen(true)}
          />

          <Button
            label="ارسال اشعار"
            className="bg-main-color"
            onClick={() => setNotifyOpen(true)}
          />

          <Button
            label="تفعيل الحساب"
            className="bg-green-color"
            onClick={() => setActivateOpen(true)}
          />

          <Button
            label="تجميد الحساب"
            className="bg-red-color"
            onClick={() => setFreezeOpen(true)}
          />

          {/* تعديل 2: الفحص باستخدام .includes لدعم تعدد الأدوار */}
          {userRoles.includes("متطوع") && (
            <NavLinkUniversal
              label={<Button label="طلب التطوع" className="bg-main-color" />}
              to={`/admin/details/${user.id}?type="request"`}
            />
          )}
        </div>
      </div>

      {/* تجميد الحساب */}
      <Modal
        isOpen={freezeOpen}
        onClose={() => setFreezeOpen(false)}
        title="هل أنت متأكد من تجميد الحساب؟"
        footer={
          <div className="flex gap-3">
            <Button
              label="تجميد"
              className="bg-red-color w-30"
              onClick={() => onFreeze(user.id)}
            />
            <button
              onClick={() => setFreezeOpen(false)}
              className="w-30 border border-second-color px-4 rounded"
            >
              إلغاء
            </button>
          </div>
        }
      >
        <p>سيتم تجميد حساب المستخدم ولن يتمكن من تسجيل الدخول.</p>
      </Modal>

      {/* تفعيل الحساب */}
      <Modal
        isOpen={activateOpen}
        onClose={() => setActivateOpen(false)}
title="تفعيل الحساب"
        footer={
          <div className="flex gap-3">
            <Button
              label="تفعيل"
              className="bg-green-color w-30"
              onClick={() => onActivate(user.id)}
            />
            <button
              onClick={() => setActivateOpen(false)}
              className="w-30 border border-second-color px-4 rounded"
            >
              إلغاء
            </button>
          </div>
        }
      >
        <p>سيتم تفعيل حساب المستخدم ويمكنه تسجيل الدخول.</p>
      </Modal>

      {/* تعديل 3: نافذة تعديل الأدوار المتعددة */}
      <Modal
        isOpen={editRoleOpen}
        onClose={() => setEditRoleOpen(false)}
        title="تعديل الأدوار"
        footer={
          <Button
            label="حفظ التعديلات"
            className="bg-main-color"
            // نرسل المصفوفة الكاملة للأدوار الجديدة المختارة
            onClick={() => {
              onChangeRole(user.id, selectedRoles);
              setEditRoleOpen(false);
            }}
          />
        }
      >
        <p className="mb-4 text-black font-medium">
          يرجى اختيار الأدوار الحالية للمستخدم {user.name} :
        </p>

        <div className="flex flex-col gap-2 text-right font-bold">
          <Checkbox 
            label="مدير" 
            checked={selectedRoles.includes("مدير")}
            onChange={(e) => handleCheckboxChange("مدير", e.target.checked)} 
          />
          <Checkbox 
            label="زائر" 
            checked={selectedRoles.includes("زائر")}
            onChange={(e) => handleCheckboxChange("زائر", e.target.checked)} 
          />
          <Checkbox 
            label="متطوع" 
            checked={selectedRoles.includes("متطوع")}
            onChange={(e) => handleCheckboxChange("متطوع", e.target.checked)} 
          />
          <Checkbox
            label="صاحب الفكرة"
            checked={selectedRoles.includes("صاحب فكرة")}
            onChange={(e) => handleCheckboxChange("صاحب فكرة", e.target.checked)}
          />
          <Checkbox
            label="محتضن"
            checked={selectedRoles.includes("محتضن")}
            onChange={(e) => handleCheckboxChange("محتضن", e.target.checked)}
          />
          <Checkbox 
  label="مقيم" 
  checked={selectedRoles.includes("مقيم")}
  onChange={(e) => handleCheckboxChange("مقيم", e.target.checked)} 
/>
        </div>
      </Modal>

      {/* إرسال إشعار */}
      <Modal
        isOpen={notifyOpen}
        onClose={() => setNotifyOpen(false)}
        title="إرسال إشعار"
        footer={
          <Button
            label="إرسال"
            className="bg-main-color"
            onClick={() => onSendNotification(user.id, notificationText)}
          />
        }
      >
        <Input
          type="text"
          name="text"
          label="نص الإشعار"
          value={notificationText}
          onChange={(e) => setNotificationText(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default UserHeaderActions;
