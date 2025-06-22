import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const navigateSignin = () => {
    navigate("/signin");
  };
  return (
    <div className="w-screen h-screen flex font-inter gap-4 overflow-hidden">
      <div className="w-full sm:w-[45%] bg-white relative flex flex-col justify-center items-center sm:items-start px-6 sm:px-40 min-h-screen">
        <div className="absolute top-6 left-6 sm:flex items-center gap-2 hidden">
          <img src="/icon.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl text-black font-bold">HD</h1>
        </div>
        {/* small screens */}
        <div className="sm:hidden flex gap-2 items-center mb-6">
          <img src="/icon.png" alt="Logo" className="w-12 h-12 mb-2" />
          <h1 className="text-2xl text-black font-bold">HD</h1>
        </div>
        <div className="flex flex-col items-center sm:items-start w-full max-w-sm space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2 sm:mb-4 text-center sm:text-left">
            Sign up
          </h1>
          <p className="text-gray-500 mb-6 text-center sm:text-left">
            Sign up to enjoy the feature of HD
          </p>
          <form className="w-full space-y-6">
            <div className="relative border border-gray-300 rounded-xl p-1 focus-within:ring-2 focus-within:ring-blue-500">
              <label className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm font-semibold">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border-0 p-2 outline-none rounded-xl"
              />
            </div>
            <div className="relative border border-gray-300 rounded-xl p-1 focus-within:ring-2 focus-within:ring-blue-500">
              <input type="date" className="w-full border-0 p-2 outline-none" />
              <label className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm font-semibold">
                Date of Birth
              </label>
            </div>
            <div className="relative border border-gray-300 rounded-xl p-1 focus-within:ring-2 focus-within:ring-blue-500">
              <label className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-0 p-2 outline-none"
              />
            </div>
            <div className="relative border border-gray-300 rounded-xl p-1 focus-within:ring-2 focus-within:ring-blue-500">
              <label className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm font-semibold">
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border-0 p-2 outline-none"
              />
            </div>
            <div className="relative">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold mt-2 hover:bg-blue-700"
              >
                Sign up
              </button>
            </div>
            <div className="flex items-center gap-4 text-gray-500 my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <div className="text-sm text-gray-500">or</div>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            <div className="border border-gray-300 rounded-xl p-1">
              <button className="w-full flex items-center justify-center gap-2 p-3">
                Continue with Google
                <img src="/google.svg" alt="Google" className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={navigateSignin}
                className="text-blue-600 font-semibold underline cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden sm:block w-[55%] h-screen p-2">
        <div
          className="w-full h-full rounded-3xl bg-cover bg-center flex flex-col justify-center items-start p-12"
          style={{ backgroundImage: "url('blue.jpg')" }}
        >
        </div>
      </div>
    </div>
  );
}
