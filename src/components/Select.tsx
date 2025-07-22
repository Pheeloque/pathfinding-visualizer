import type { ChangeEvent } from "react";

function Select({
  value,
  onChange,
  options,
  label,
  isDisabled,
}: {
  value: string | number;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: { value: string | number; name: string }[];
  isDisabled?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <label className="text-sm text-zinc-400 mx-auto" htmlFor={label}>
        {label}
      </label>
      <select
        disabled={isDisabled}
        className="bg-zinc-600 cursor-pointer rounded-full hover:bg-zinc-500 transition ease-in active:ring-0 active:border-0 p-2 min-w-[150px] sm:min-w-full"
        id={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
