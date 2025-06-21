import { useNavigate } from "react-router-dom";

export default function Signin() {
    const navigate = useNavigate();
    const navigateSignup = () => {
      navigate("/");
    };
    return (
      <div className="w-screen h-screen flex font-inter gap-4 overflow-hidden">
        {/* Left Side */}
        <div className="w-[45%] bg-white relative flex flex-col justify-center px-40">
          {/* Logo */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <img src="/icon.png" alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl text-black font-bold">HD</h1>
          </div>

          {/* Signup Section */}
          <div className="flex flex-col items-start w-full max-w-sm space-y-2">
            {/* Title & Description */}
            <div className="w-full">
              <h1 className="text-4xl font-bold text-black mb-4">Sign In</h1>
              <p className="text-gray-500 mb-6">
                Sign up to enjoy the feature of HD
              </p>
            </div>

            {/* Form */}
            <form className="w-full space-y-6">
              {/* Email input */}
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

              {/* OTP input */}
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
              <div className="text-blue-600 underline">Forgot Password ?</div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="keepLoggedIn"
                  className="accent-blue-600 w-4 h-4"
                />
                <label htmlFor="keepLoggedIn" className="text-gray-700 text-sm">
                  Keep me Logged In
                </label>
              </div>
              {/* Submit Button */}
              <div className="relative">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold mt-2 hover:bg-blue-700"
                >
                  Sign in
                </button>
              </div>

              {/* OR Separator */}
              <div className="flex items-center gap-4 text-gray-500 my-4">
                <div className="flex-1 h-px bg-gray-300" />
                <div className="text-sm text-gray-500">or</div>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Google Button */}
              <div className="border border-gray-300 rounded-xl p-1">
                <button className="w-full flex items-center justify-center gap-2 p-3">
                  Continue with Google
                  <img src="/google.svg" alt="Google" className="w-5 h-5" />
                </button>
              </div>

              {/* Sign-in Link */}
              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <span
                  onClick={navigateSignup}
                  className="text-blue-600 font-semibold underline cursor-pointer"
                >
                  Create One
                </span>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[55%] h-screen p-2">
          <div
            className="w-full h-full rounded-3xl bg-cover bg-center flex flex-col justify-center items-start p-12"
            style={{ backgroundImage: "url('blue.jpg')" }}
          >
            {/* Optional overlay content */}
          </div>
        </div>
      </div>
    );
}
