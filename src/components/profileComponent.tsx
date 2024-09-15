
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
                    <h1 className="absolute top-2 left-4 text-[#F14A16] text-4xl font-normal" style={{ fontFamily: '"Singapore Sling", sans-serif' }}>
                        PROFILE
                    </h1>
                </div>

                {/* Profile picture placeholder */}
                <div className="mt-8 w-[149px] h-[146px] bg-[#2F2F2F] rounded-full flex items-center justify-center">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40" cy="40" r="39" stroke="#B7AB98" strokeWidth="2" />
                        <circle cx="40" cy="30" r="15" stroke="#B7AB98" strokeWidth="2" />
                        <path d="M65 67.5C65 56.7304 53.8071 48 40 48C26.1929 48 15 56.7304 15 67.5" stroke="#B7AB98" strokeWidth="2" />
                    </svg>
                </div>

                {/* Add Image button */}
                <button className="mt-4 px-4 py-2 bg-[#2F2F2F] text-white rounded-md flex items-center">
                    Add Image
                    <svg className="ml-2" width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 12V0H7L10 3V12H0Z" fill="#B7AB98" />
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