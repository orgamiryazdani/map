import BaseIcon from "@/app/_components/icons/base-icon";
import { SvgIconType } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIconType) {
  return (
    <BaseIcon {...props}>
      <path d="M12.9602 18.0796L11.5522 16.6716L16.1885 12.0354H5.99116V20H4V10.0442H16.1885L11.5522 5.40796L12.9602 4L20 11.0398L12.9602 18.0796Z"/>
    </BaseIcon>
  );
}