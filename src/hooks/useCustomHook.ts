import { useState, useEffect } from "react";

function useCustomHook<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Optional side effect logic
  }, [value]);

  const updateValue = (newValue: T) => {
    setLoading(true);
    setValue(newValue);
    setLoading(false);
  };

  return { value, loading, updateValue };
}

export default useCustomHook;
