import Select from "../../Select";

const UserFilters = ({
  roleFilter,
  setRoleFilter,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Select
        label="الدور"
        name="role"
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        placeholder="اختر الدور"
        options={[
          { value: "all", label: "كل الادوار" },
          { value: "VISITOR", label: "زائر" },
          { value: "VOLUNTEER", label: "متطوع" },
          { value: "INCUBATOR", label: "محتضن" },
          { value: "GRADUATED", label: "متخرج" },
          { value: "IDEA_OWNER", label: "صاحب فكرة" },
          { value: "EVALUATOR", label: "مقيم" }
        ]}
        className="w-100 mb-6"
      />
    </div>
  );
};

export default UserFilters;