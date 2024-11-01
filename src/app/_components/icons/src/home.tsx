import BaseIcon from "@/app/_components/icons/base-icon";
import { SvgIconType } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIconType) {
  return (
    <BaseIcon {...props}>
      <path d="M18.4384 20C19.3561 20 20.1493 19.3726 20.2725 18.4632C20.3895 17.5988 20.5 16.4098 20.5 15C20.5 12 20.6683 10.1684 17.5 7C16.0386 5.53865 14.4064 4.41899 13.3024 3.74088C12.4978 3.24665 11.5021 3.24665 10.6975 3.74088C9.5935 4.41899 7.96131 5.53865 6.49996 7C3.33157 10.1684 3.49997 12 3.49997 15C3.49997 16.4098 3.61039 17.5988 3.72745 18.4631C3.85061 19.3726 4.64378 20 5.56152 20H18.4384Z"/>
    </BaseIcon>
  );
}