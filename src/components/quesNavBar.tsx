import { usePathname } from "next/navigation";
import Timer from "./ui/timer";

const QuesNavbar = () => {
  const path= usePathname();
  return (
    <div
        className="border-b-2 border-cream flex flex-row w-full h-[14vh] justify-around items-center bg-black">
      <div>
         {path!== '/dashboard' && <Timer />}
      </div>
      <div className="s-sling text-6xl ">
        <span className="text-cream mr-8">COOK</span>
        <span className="text-accent mr-8">OFF</span>
        <span className="text-cream mr-8">9.0</span>
      </div>
     <div></div>
    </div>
  );
}

export default QuesNavbar;
