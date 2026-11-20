import { Icon } from "@/components/ui/Icon";

type SelectFieldProps = {
  id: string;
  label: string;
  options: string[];
  placeholder?: string;
  name?: string;
};

// Labelled dropdown styled like the designs (with a chevron on the right).
export function SelectField({ id, label, options, placeholder, name }: SelectFieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="sel">
        <select className="inp" id={id} name={name ?? id} defaultValue="">
          <option value="" disabled>
            {placeholder ?? "Select"}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size="s" />
      </div>
    </div>
  );
}
