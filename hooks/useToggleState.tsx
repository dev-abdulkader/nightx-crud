import { useState } from "react";

const useToggleState = (
  initialValue: boolean = false
): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialValue);

  const toggleState = () => {
    setState((prevState) => !prevState);
  };

  return [state, toggleState];
};

export default useToggleState;
