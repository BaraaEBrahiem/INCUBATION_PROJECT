import { useState, useEffect } from "react";
import Modal from "../../Modal";
import Button from "../../Button";
import person1 from "../../../assets/images/person1.jpg";
import Checkbox from "../../CheckBox";
import Input from "../../Input";
import NavLinkUniversal from "../../NavLinkUniversal";
import { useGetAvailableRolesQuery } from "../../../api/endpoints/admin/usersOptionsApi";

// قاموس الترجمة الموحد
const ROLE_TRANSLATIONS = {
  VISITOR: "مستخدم",
  VOLUNTEER: "متطوع",
  IDEA_OWNER: "صاحب فكرة",
  INCUBATOR: "محتضن",
  EVALUATOR: "مقيم",
};

const UserHeaderActions = ({
  user,
  is_active,
  onFreeze,
  onActivate,
  onChangeRole,
  onSendNotification,
}) => {
  console.log("USER DATA:", user);
  const [freezeOpen, setFreezeOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [editRoleOpen, setEditRoleOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  
  const { data: serverRoles, /*isLoading*/ } = useGetAvailableRolesQuery();

  const hardcodedRoles = [
    { id: "VOLUNTEER", name: "VOLUNTEER" },
    { id: "IDEA_OWNER", name: "IDEA_OWNER" },
    { id: "INCUBATOR", name: "INCUBATOR" },
    { id: "EVALUATOR", name: "EVALUATOR" },
  ];

  const availableRoles = serverRoles 
    ? (Array.isArray(serverRoles) && typeof serverRoles[0] === "string"
        ? serverRoles.map(roleName => ({ id: roleName, name: roleName })) 
        : serverRoles)
    : hardcodedRoles; 

  const userRoles = Array.isArray(user.role) ? user.role : [];
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);
  const [notificationText, setNotificationText] = useState("");
  

  useEffect(() => {
    if (availableRoles.length > 0 && userRoles.length > 0) {
      const currentIds = availableRoles
        .filter((role) => userRoles.includes(role.name))
        .map((role) => role.id);
      //eslint-disable-next-line
      setSelectedRoleIds(currentIds);
    }
    //eslint-disable-next-line
  }, [user.role, serverRoles]); 

  const handleCheckboxChange = (roleId, isChecked) => {
    if (isChecked) {
      setSelectedRoleIds((prev) => [...prev, roleId]);
    } else {
      setSelectedRoleIds((prev) => prev.filter((id) => id !== roleId));
    }
  };

  const arabicRolesText = userRoles
    .map((code) => ROLE_TRANSLATIONS[code] || code)
    .join(" ، ");

  return (
    <>
      <div className="mb-8" dir="rtl">
        <div className="flex items-center gap-4 mb-2 py-4">
          <img src={person1} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">
              الأدوار الحالية: {arabicRolesText || "لا يوجد أدوار مسندة"}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2 flex-wrap">
          <Button label="تعديل الأدوار" className="bg-main-color" onClick={() => setEditRoleOpen(true)} />
          <Button label="إرسال إشعار" className="bg-main-color" onClick={() => setNotifyOpen(true)} />
          <Button
            label="تفعيل الحساب"
            className={`${is_active ? "bg-gray-400 text-gray-500 cursor-not-allowed" : "bg-green-color"}`}
            disabled={is_active} 
            onClick={() => !is_active && setActivateOpen(true)}
          />
          <Button
            label="تجميد الحساب"
            className={`${!is_active ? "bg-gray-400 text-gray-500 cursor-not-allowed" : "bg-red-color"}`}
            disabled={!is_active}
            onClick={() => is_active && setFreezeOpen(true)}
          />
          {userRoles.includes("VOLUNTEER") && (
            <NavLinkUniversal
              label={<Button label="طلب التطوع" className="bg-main-color" />}
              to={`/admin/details/${user.volunteer_request_id}?type=request`}
            />
          )}
        </div>
      </div>

      {/* مودال تجميد الحساب */}
      <Modal
        isOpen={freezeOpen}
        onClose={() => setFreezeOpen(false)}
        title="هل أنت متأكد من تجميد الحساب؟"
        footer={
          <div className="flex gap-3">
            <Button label="تجميد" className="bg-red-color w-30" onClick={async () => { await onFreeze(user.id); setFreezeOpen(false); }} />
            <button onClick={() => setFreezeOpen(false)} className="w-30 border border-second-color px-4 rounded font-medium text-gray-600">إلغاء</button>
          </div>
        }
      >
        <p className="text-gray-600">سيتم تجميد حساب المستخدم مؤقتاً ولن يتمكن من تسجيل الدخول إلى المنصة.</p>
      </Modal>

      {/* مودال تفعيل الحساب */}
      <Modal
        isOpen={activateOpen}
        onClose={() => setActivateOpen(false)}
        title="تفعيل الحساب"
        footer={
          <div className="flex gap-3">
            <Button label="تفعيل" className="bg-green-color w-30" onClick={async () => { await onActivate(user.id); setActivateOpen(false); }} />
            <button onClick={() => setActivateOpen(false)} className="w-30 border border-second-color px-4 rounded font-medium text-gray-600">إلغاء</button>
          </div>
        }
      >
        <p className="text-gray-600">سيتم إعادة تفعيل حساب المستخدم فوراً ليمارس صلاحياته البرمجية بالكامل.</p>
      </Modal>

      {/* مودال قائمة تعديل الأدوار المشغولة */}
      <Modal
        isOpen={editRoleOpen}
        onClose={() => setEditRoleOpen(false)}
        title="إدارة وتعديل صلاحيات المستخدم"
        footer={
          <Button
            label="حفظ التعديلات الحالية"
            className="bg-main-color"
            onClick={async () => {
              // إرسال المصفوفة المعدلة للباك إند
              await onChangeRole(user.id, selectedRoleIds);
              setEditRoleOpen(false);
            }}
          />
        }
      >
        <p className="mb-4 text-gray-700 font-medium text-right">
          يرجى تحديد أو إلغاء تحديد الأدوار المخصصة للمستخدم <span className="font-bold text-main-color">{user.name}</span>:
        </p>

        <div className="flex flex-col gap-3 text-right font-medium max-h-60 overflow-y-auto p-1">
          {/* هنا نقرأ من availableRoles المضمونة والآمنة حالياً */}
          {availableRoles.map((role) => (
            <Checkbox
              key={role.id}
              label={ROLE_TRANSLATIONS[role.name] || role.name}
              name={`role-${role.id}`}
              checked={selectedRoleIds.includes(role.id)}
              onChange={(e) => handleCheckboxChange(role.id, e.target.checked)}
            />
          ))}
        </div>
      </Modal>

      {/* مودال إرسال إشعار */}
      <Modal
        isOpen={notifyOpen}
        onClose={() => setNotifyOpen(false)}
        title="إرسال إشعار مخصص للمستخدم"
        footer={
          <Button label="إرسال الآن" className="bg-main-color" onClick={async () => { await onSendNotification(user.id, notificationText); setNotificationText(""); setNotifyOpen(false); }} />
        }
      >
        <Input type="text" name="text" label="مضمون نص الإشعار الإداري" placeholder="اكتبي نص الإشعار المباشر هنا..." value={notificationText} onChange={(e) => setNotificationText(e.target.value)} />
      </Modal>
    </>
  );
};

export default UserHeaderActions;