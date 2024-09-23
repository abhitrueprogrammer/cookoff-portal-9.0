import Timer from "./ui/timer";
import Image from "next/image";


const QuesNavbar = () => {
  return (
    <div
        className="border-b-2 border-cream flex flex-row w-full h-[14vh] justify-around items-center bg-black">
      <div>
        <Timer />
      </div>
      <div className="s-sling text-6xl ">
        <span className="text-cream mr-8">COOK</span>
        <span className="text-accent mr-8">OFF</span>
        <span className="text-cream mr-8">9.0</span>
      </div>
      <div className="flex items-center">
      <div className="bg-dark2">
        <span className="text-cream mr-4 ml-2 ">ROUND</span>
      <span className="text-accent mr-3 ">1</span>
        </div>
        <Image
          src="/profile_vector.svg"
          alt="Profile vector"
          height={50}
          width={50}
          className="h-8 w-8 ml-2" 
        />
      </div>
    </div>
  );
}

export default QuesNavbar;
