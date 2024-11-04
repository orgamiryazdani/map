import BaseIcon from "@/app/_components/icons/base-icon";
import { SvgIconType } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIconType) {
  return (
    <BaseIcon {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 21V21C7.029 21 3 16.971 3 12V12C3 7.029 7.029 3 12 3V3C16.971 3 21 7.029 21 12V12C21 16.971 16.971 21 12 21Z"/><path d="M14.83 9.16992L9.17001 14.8299"/><path d="M14.83 14.8299L9.17001 9.16992"/>
    </BaseIcon>
  );
}