import BaseIcon from "@/app/_components/icons/base-icon";
import { SvgIconType } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIconType) {
  return (
    <BaseIcon {...props}>
      <path d="M20 10L12 5L4 10L12 15L20 10Z"/><path d="M20 14L12 19L4 14"/>
    </BaseIcon>
  );
}