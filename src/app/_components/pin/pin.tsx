import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../button";
import { IconPin } from "../icons/icons";

export const Pin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const location = useSearchParams();
  const lat = location.get("lat");
  const lng = location.get("lng");

  const pinHandler = () => {
    const params = new URLSearchParams(location.toString());
    params.set("pinlat", String(lat));
    params.set("pinlng", String(lng));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Button
      onClick={pinHandler}
      className='w-10 h-10'
      shape='square'
      variant='neutral'>
      <IconPin />
    </Button>
  );
};
