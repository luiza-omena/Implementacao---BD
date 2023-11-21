import { ChangeEvent } from "react";

interface CheckboxProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    label: string;
    isChecked: boolean;
  }

const Checkbox = ({ onChange, label, isChecked }: CheckboxProps) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;