
// Simulated API response object
const profileData = {
    username: "JohnDoe",
    round: "Round 2",
    totalScore: 750,
};

export default function Component() {
    return (
        <div className="relative w-[352px] h-[702px]">
            {/* Background shape with white border */}
            <svg className="absolute top-0 left-0" width="352" height="702" viewBox="0 0 352 702" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 48.2086L48.7056 0.5H351.5V657.274L301.311 701.5H0.5V48.2086Z" fill="#202020" stroke="white" strokeWidth="1" />
            </svg>

            {/* Content container */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Profile header with white border */}
                <div className="w-full relative">
                    <svg width="352" height="61" viewBox="0 0 352 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M48 0H352V61H0V47L48 0Z" fill="black" stroke="white" strokeWidth="1" />
                    </svg>
                    <h1 className="absolute top-2 left-4 text-[#F14A16] text-4xl font-normal px-8" style={{ fontFamily: '"Singapore Sling", sans-serif' }}>
                        PROFILE
                    </h1>
                </div>

                {/* Profile picture placeholder */}
                <div className="mt-8 w-[149px] h-[146px] bg-[#2F2F2F] rounded-full flex items-center justify-center">

                    <svg xmlns="http://www.w3.org/2000/svg" width="155" height="152" viewBox="0 0 155 152" fill="none">
                        <path d="M120.682 135.473C110.072 123.862 94.657 116.556 77.5 116.556C60.343 116.556 44.9263 123.862 34.3165 135.473M77.5 149C36.3548 149 3 116.317 3 76C3 35.6832 36.3548 3 77.5 3C118.645 3 152 35.6832 152 76C152 116.317 118.645 149 77.5 149ZM77.5 92.2222C63.7849 92.2222 52.6667 81.3278 52.6667 67.8889C52.6667 54.45 63.7849 43.5556 77.5 43.5556C91.2151 43.5556 102.333 54.45 102.333 67.8889C102.333 81.3278 91.2151 92.2222 77.5 92.2222Z" stroke="#C1BBB3" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>

                <button className="mt-4 px-4 py-2 bg-[#2F2F2F] text-white rounded-md flex items-center gap-2">
                    Add Image
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                        <path d="M4.125 3L6 1M6 1L7.875 3M6 1V7.66667M2.87514 5.66667C2.29272 5.66667 2.0015 5.66667 1.77179 5.76816C1.4655 5.90349 1.22202 6.1632 1.09515 6.48991C1 6.73494 1 7.04541 1 7.66667V10.8667C1 11.6134 1 11.9865 1.13624 12.2717C1.25608 12.5226 1.44717 12.727 1.68237 12.8548C1.9495 13 2.29937 13 2.99807 13H9.00224C9.70093 13 10.0503 13 10.3174 12.8548C10.5526 12.727 10.744 12.5226 10.8639 12.2717C11 11.9868 11 11.614 11 10.8687V7.66667C11 7.04541 10.9999 6.73494 10.9048 6.48991C10.7779 6.1632 10.5346 5.90349 10.2284 5.76816C9.99864 5.66667 9.70743 5.66667 9.125 5.66667" stroke="#B7AB98" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>

                {/* Input fields */}
                <div className="mt-9 w-full space-y-9 px-4">
                    <input
                        type="text"
                        value={profileData.username}
                        readOnly
                        className="w-full h-12 px-4 bg-[#2F2F2F] text-white rounded-xl"
                    />
                    <input
                        type="text"
                        value={profileData.round}
                        readOnly
                        className="w-full h-12 px-4 bg-[#2F2F2F] text-white rounded-xl"
                    />
                    <input
                        type="text"
                        value={profileData.totalScore}
                        readOnly
                        className="w-full h-12 px-4 bg-[#2F2F2F] text-white rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
}