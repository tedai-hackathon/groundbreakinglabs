"use client"
import { FC, useState } from 'react';

interface ToggleButtonProps {
  label: string;
}

const ToggleButton: FC<ToggleButtonProps> = ({ label }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`whitespace-nowrap rounded-full py-2 px-4 transition-colors duration-300 ${
        isActive ? 'bg-zinc-700 text-white' : 'bg-white text-black'
      }`}
    >
      {label}
    </button>
  );
};

export default ToggleButton;