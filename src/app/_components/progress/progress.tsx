import { Size } from "@/types/size.type";
import { ProgressProps } from "./progress.types";
import classNames from 'classnames';

const sizeClasses: Record<Size, string> = {
    tiny: "progress-xs",
    small: "progress-sm",
    normal: "progress-md",
    large: "progress-lg",
  };

export const Progress: React.FC<ProgressProps> =({
   variant = 'neutral',
   className,
   size = "small",
   value
}) => {
    const classes = classNames("progress", className, {
        [`progress-${variant}`]: variant,
        [`${sizeClasses[size]}`]: size,
      });
    
   return (
       <progress value={value} max="100" className={classes}/>
   )
}