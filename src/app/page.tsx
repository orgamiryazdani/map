import { Map } from "./_components/map";

export default function Home() {
  return (
    <div className='flex items-center justify-center md:gap-x-10 w-svw h-svh bg-secondary md:px-5'>
      <div className='background w-full h-full absolute z-30'></div>
      <div className='w-56 h-56 rounded-full bg-info absolute top-0 left-0 z-10 blur-3xl circle-blue-animation'></div>
      <div className='w-56 h-56 rounded-full bg-success absolute top-[7%] right-0 z-10 blur-3xl'></div>
      <div className='w-96 h-32  bg-info absolute bottom-0 left-[20%] z-10 blur-3xl circle-blue-animation-test'></div>
      <Map />
    </div>
  );
}
