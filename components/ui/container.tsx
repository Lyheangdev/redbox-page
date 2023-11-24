import cn from "classnames";

interface Props {
  className?: string;
  children: React.ReactNode;
}
export const Container: React.FC<Props> = ({ children, className }) => (
  <div className="container h-full">
    <div
      className={cn(
        "max-w-md overflow-y-scroll hidden-scroll w-full  absolute left-1/2 -translate-x-1/2 h-full",
        className
      )}
    >
      {children}
    </div>
  </div>
);
