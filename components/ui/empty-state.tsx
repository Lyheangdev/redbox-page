import { ImageNext } from "./image";

export interface EmptyProps {
  image: string;
  title: string;
  subtitle: string;
}

export const EmptyState: React.FC<EmptyProps> = ({
  image,
  title,
  subtitle,
}) => (
  <div className="flex flex-col items-center space-y-1 w-full mt-8">
    <ImageNext src={image} className="w-14 h-14" />
    <p className="text-base text-center font-semibold text-pink-600">{title}</p>
    <p className="text-xs text-center">{subtitle}</p>
  </div>
);
