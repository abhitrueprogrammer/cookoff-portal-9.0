import Image from "next/image";

export default function login() {
    return (
        <div className="bg-[#202020] min-h-screen min-w-screen text-[#F14A16] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold pt-5">CODECHEF PRESENTS</h1>
            <div className="flex flex-row w-full mt-8">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <Image
                            className="pl-14"
                            src="cookoff.svg"
                            alt="cookoff text"
                            width={700}
                            height={600}
                        />
                    </div>
                </div>
                <div className="bg-[#B7AB98] text-white h-[510px] w-[420px] flex flex-col justify-center items-center " style={{
                    clipPath: 'polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)'
                }}>
                    <div className="bg-black text-white h-[575px] w-[435px] flex flex-col justify-center items-center scale-95" style={{
                        clipPath: 'polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)'
                    }}>
                        <h1 className="text-3xl font-bold p-5 mb-6 text-[#F14A16]">START COOKING</h1>
                        <input
                            type="text"
                            className="bg-[#B7AB98] p-3 w-[390px] rounded-sm mb-6 placeholder-white"
                            placeholder="Enter Username"
                            required
                        />
                        <input
                            type="text"
                            className="bg-[#B7AB98] p-3 w-[390px] rounded-sm mb-6 placeholder-white"
                            placeholder="Enter Password"
                            required
                        />
                        <br />
                        <button className="bg-[#F14A16] text-white p-3 rounded-md w-[100px]">
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <h1 className="text-3xl text-white font-bold pt-5">NOT A COOKING COMPETITION</h1>
        </div>
    );
}