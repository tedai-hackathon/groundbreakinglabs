import Link from "next/link";

type CustomButtonProps = {
  label: string;
  onClick?: () => void;
  link?: string;
  className?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  link,
  className,
}) => {
  return (
    <button
      className={`bg-white text-black p-2 rounded-full hover:bg-zinc-100 transition duration-200 ${className}`}
      onClick={onClick}
    >
      {link ? <Link href={link}>{label}</Link> : label}
    </button>
  );
};

export default CustomButton;