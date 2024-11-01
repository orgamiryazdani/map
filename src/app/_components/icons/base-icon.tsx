import { SvgIconType } from "./icon.types";

export const BaseIcon: React.FC<SvgIconType> = ({
  color = "currentColor",
  width = 24,
  height = 24,
  strokeWidth = "1.5",
  viewBox = "0 0 24 24",
  children,
  ...rest
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={viewBox}
      fill='none'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      stroke={color}
      {...rest}>
      {children}
    </svg>
  );
};

export default BaseIcon;