import React from "react";
import Input from "./Input";
import Select from "./Select";

const DynamicStep = ({
  stepName,
  fields = [],
  form,
  errors,
  handleChange,
}) => {

  const renderField = (field) => {
    const fieldKey = field.key;

    if (!fieldKey) return null;

    const value = form[fieldKey];
    const error = errors?.[fieldKey];

    switch (field.type) {

      case "select":
        return (
          <Select
            key={field.id}
            label={field.label}
            name={fieldKey}
            value={value || ""}
            onChange={(e) =>
              handleChange(fieldKey, e.target.value)
            }
            options={
              field.choices?.map((choice) => ({
                value: choice.value,
                label: choice.label,
              })) || []
            }
            error={error}
            placeholder={field.placeholder || field.label}
            required={field.required}
          />
        );

      case "boolean":
        return (
          <div
            key={field.id}
            className="space-y-2"
          >
            <label className="font-bold block">
              {field.label}

              {field.required && (
                <span className="text-red-500 mr-1">
                  *
                </span>
              )}
            </label>

            <div className="flex gap-4">

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={fieldKey}
                  checked={value === true}
                  onChange={() =>
                    handleChange(fieldKey, true)
                  }
                />
                نعم
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={fieldKey}
                  checked={value === false}
                  onChange={() =>
                    handleChange(fieldKey, false)
                  }
                />
                لا
              </label>

            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}
          </div>
        );

      case "list_text":

        if (
          field.key === "team_members" &&
          form.team !== true
        ) {
          return null;
        }

        return (
          <Input
            key={field.id}
            label={field.label}
            name={fieldKey}
            value={
              Array.isArray(value)
                ? value.join(", ")
                : ""
            }
            onChange={(e) => {

            const values =
              e.target.value
                .split(/,|،/)
                .map((item) => item.trim())
                .filter(Boolean);

              handleChange(
                fieldKey,
                values
              );

            }}
            error={error}
            placeholder={
              field.placeholder ||
              "value1, value2, value3"
            }
            required={field.required}
          />
        );

      case "text":
      default:
        return (
          <Input
            key={field.id}
            label={field.label}
            name={fieldKey}
            type="text"
            value={value || ""}
            onChange={(e) =>
              handleChange(
                fieldKey,
                e.target.value
              )
            }
            error={error}
            placeholder={field.placeholder || field.label}
            required={field.required}
          />
        );
    }
  };

  return (
    <div className="space-y-6">

      {stepName && (
        <h2 className="text-xl font-bold text-second-color">
          {stepName}
        </h2>
      )}

      <div className="space-y-4">
        {[...fields]
          .sort((a, b) => a.order - b.order)
          .map(renderField)}
      </div>

    </div>
  );
};

export default DynamicStep;