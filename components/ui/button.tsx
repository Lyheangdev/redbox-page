import cn from "classnames";
import React from "react";

interface Props {
  variant?: "default" | "outline";
  radius?: "sm" | "md" | "lg" | "xl";
  foregroundColor?: "primary";
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}


export const Button: React.FC<Props> = (props) => {
  const {
    variant = "default",
    radius = "md",
    className,
    foregroundColor,
    onClick,
    children,
  } = props;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-16 min-[400px]:w-20 text-white text-[10px] h-6",
        {
          "bg-pink-600": variant === "default",
          "bg-transparent outline outline-2 outline-pink-600":
            variant === "outline",
          "rounded-sm": radius === "sm",
          "rounded-md": radius === "md",
          "rounded-lg": radius === "lg",
          "rounded-xl": radius === "xl",
          "!text-pink-600": foregroundColor === "primary",
        },
        className
      )}
    >
      {children}
    </button>
  );
};
