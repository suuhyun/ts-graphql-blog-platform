import React from "react";

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  type?: string;
};

const FormInput = (props: Props) => {
  const { label, name, handleChange, type } = props;
  return (
    <div className="p-2">
      <label htmlFor={name}>{label}: </label>
      <input
        className="border w-100 border-gray-400 rounded"
        onChange={handleChange}
        type={type || "text"}
        id={name}
        name={name}
      />
    </div>
  );
};

export default FormInput;
