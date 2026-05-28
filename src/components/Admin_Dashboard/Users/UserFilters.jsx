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
          { value: "زائر", label: "زائر" },
          { value: "متطوع", label: "متطوع" },
          { value: "محتضن", label: "محتضن" },
          { value: "متخرج", label: "متخرج" },
          { value: "صاحب فكرة", label: "صاحب فكرة" },
          {value:"متطوع ومحتضن" , label:"متطوع ومحتضن"},
          {value:"صاحب فكرة ومتطوع" , label:"صاحب فكرة ومتطوع"},
          {value:"مقيم" , label:"مقيم"},
          {value:"متطوع ومقيم" , label:"متطوع ومقيم"},

        ]}
        className="w-100 mb-6"
      />

    </div>
  );
};

export default UserFilters;
