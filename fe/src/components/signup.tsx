import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigateSignin = () => {
    navigate("/signin");
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const requestOTP = async () => {
    if (isSendingOTP || !isValidEmail(email)) return;

    try {
      setIsSendingOTP(true);
      setError("");

      const res = await fetch(
        "https://notekey.onrender.com/api/auth/request-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        
      } else {
        setError(data.message || "Failed to send OTP");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Server error");
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !dob || !otp) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://notekey.onrender.com/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            date: dob,
            otp,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP Verification Failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email); // ✅ fixed
      alert("Signup successful");

      navigate("/dashboard");
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error ? error.message : "Something went wrong";
      console.error(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex font-inter gap-4 overflow-hidden">
      {/* Left Side */}
      <div className="w-full sm:w-[45%] bg-white relative flex flex-col justify-center items-center sm:items-start px-6 sm:px-40 min-h-screen">
        {/* Logo Desktop */}
        <div className="absolute top-6 left-6 sm:flex items-center gap-2 hidden">
          <img src="/icon.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl text-black font-bold">HD</h1>
        </div>

        {/* Logo Mobile */}
        <div className="sm:hidden flex gap-2 items-center mb-6">
          <img src="/icon.png" alt="Logo" className="w-12 h-12 mb-2" />
          <h1 className="text-2xl text-black font-bold">HD</h1>
        </div>

        {/* Form Container */}
        <div className="flex flex-col items-center sm:items-start w-full max-w-sm space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2 sm:mb-4 text-center sm:text-left">
            Sign up
          </h1>
          <p className="text-gray-500 mb-6 text-center sm:text-left">
            Sign up to enjoy the feature of HD
          </p>

          <form onSubmit={handleSignup} className="w-full space-y-6">
            {/* Name */}
            <div className="relative border border-gray-300 rounded-xl p-1 focus-within:ring-2 focus-within:ring-blue-500">
              <label className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm font-semibold">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border-0 p-2 outline-none rounded-xl"
              />
            </div>

            {/* DOB */}
            <div className="relative border border-gray-300 rounded-xl p-1 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border-0 p-2 outline-none"
              />
              <label className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm font-semibold">
                Date of Birth
              </label>
            </div>

            {/* Email */}
            <div className="relative border border-gray-300 rounded-xl p-1 focus-within:ring-2 focus-within:ring-blue-500">
              <label className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                value={email}
                onBlur={requestOTP}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border-0 p-2 outline-none"
              />
            </div>
            {isSendingOTP && (
              <p className="text-blue-500 text-sm">Sending OTP...</p>
            )}
            {otpSent && !isSendingOTP && (
              <p className="text-green-500 text-sm">OTP sent to your email! Check your spam as well!!</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* OTP */}
            <div className="relative border border-gray-300 rounded-xl p-1 focus-within:ring-2 focus-within:ring-blue-500">
              <label className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm font-semibold">
                OTP
              </label>
              <div className="flex items-center">
                <input
                  type={showOTP ? "text" : "password"}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border-0 p-2 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowOTP(!showOTP)}
                  className="p-2"
                >
                  <img
                    src={showOTP ? "/eye.png" : "/hidden.png"}
                    alt="Toggle visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="relative">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold mt-2 hover:bg-blue-700"
              >
                {loading ? "Processing..." : "Sign up"}
              </button>
            </div>

            {/* OR Separator */}
            <div className="flex items-center gap-4 text-gray-500 my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <div className="text-sm">or</div>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google Button */}
            <div className="border border-gray-300 rounded-xl p-1">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 p-3"
                onClick={() => navigate("/signin")}
              >
                Continue with Google
                <img src="/google.svg" alt="Google" className="w-5 h-5" />
              </button>
            </div>

            {/* Sign-in Link */}
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

      {/* Right Side with Image */}
      <div className="hidden sm:block w-[55%] h-screen p-2">
        <div
          className="w-full h-full rounded-3xl bg-cover bg-center flex flex-col justify-center items-start p-12"
          style={{ backgroundImage: "url('blue.jpg')" }}
        ></div>
      </div>
    </div>
  );
}
