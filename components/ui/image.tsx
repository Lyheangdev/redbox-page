import classNames from "classnames";
import Image from "next/image";

interface ImageProps {
  className?: string;
  src: string;
  radius?: "sm" | "md" | "lg" | "xl";
}

// Custom Image
export const ImageNext: React.FC<ImageProps> = ({ className, src, radius }) => (
  <div className={classNames("relative", className)}>
    <Image
      src={src}
      alt={src}
      className={classNames("object-cover", {
        "rounded-sm": radius === "sm",
        "rounded-md": radius === "md",
        "rounded-lg": radius === "lg",
        "rounded-xl": radius === "xl",
      })}
      fill
      priority
    />
  </div>
);
