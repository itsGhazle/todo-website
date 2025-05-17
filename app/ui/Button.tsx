import { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const Button: FC<ButtonHTMLAttributes<{}>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center justify-center rounded-md border-1 transition-all px-4 py-2 text-xs bg-blue-600 text-white hover:bg-blue-500 hover:cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
