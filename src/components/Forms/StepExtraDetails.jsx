import Input from "../Input"

const StepExtraDetails = ({ form, errors, handleChange }) => {
  return (
    <>
      <h3 className="font-bold text-lg mb-4">تفاصيل إضافية</h3>

      <Input
        label="نوع المنتج"
        placeholder="تطبيق، موقع إلكتروني، جهاز..."
        name="product_type" // تعديل أساسي ليطابق الباك إند
        value={form.product_type || ""}
        onChange={(e) => handleChange("product_type", e.target.value)}
        error={errors.product_type}
        className="w-1/2"
      />

      <Input
        label="الفئة المستهدفة"
        placeholder="من هم المستخدمون المستهدفون؟"
        name="targetAudience"
        value={form.targetAudience || ""}
        onChange={(e) => handleChange("targetAudience", e.target.value)}
        error={errors.targetAudience}
        className="w-1/2"
      />

      <Input
        label="المشكلة التي يحلها المنتج"
        placeholder="وصف لا تتجاوز 30 كلمة"
        name="productProblem"
        value={form.productProblem || ""}
        onChange={(e) => handleChange("productProblem", e.target.value)}
        error={errors.productProblem}
        className="w-1/2"
      />
    </>
  )
}

export default StepExtraDetails;