import React, { useEffect, useState, ChangeEvent } from "react";

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  [key: string]: any; // To allow other props to be passed
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState<string>(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  // 0.5s after setting value in state
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <input {...props} value={value} onChange={handleChange} />;
};

export default DebouncedInput;
