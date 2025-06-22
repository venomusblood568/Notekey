import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const navigateSignup = () => navigate("/");

  // Validate email format with debounce
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailValid(isValid);

    if (isValid) {
      const timer = setTimeout(() => {
        sendOTP();
      }, 500); // Wait 500ms after typing stops

      return () => clearTimeout(timer);
    }
  }, [email]);

  const sendOTP = async () => {
    if (isSendingOTP || otpSent) return;

    setIsSendingOTP(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setOtpSent(true);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailValid) {
      setError("Please enter a valid email");
      return;
    }
    if (!otpSent) {
      setError("OTP hasn’t been sent yet");
      return;
    }
    if (!otp) {
      setError("OTP is required");
      return;
    }

    try {
      setError("");
      const res = await fetch("http://localhost:3001/api/auth/signin-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      console.log("Signin response:", res.ok, data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Signin error:", err);
      setError("Server error. Please try again.");
    }
  };
  

  return (
    <div className="w-screen h-screen flex font-inter gap-4 overflow-hidden">
      {/* Left Side */}
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
        <div className="flex flex-col items-start w-full max-w-sm space-y-2">
          {/* Title & Description */}
          <div className="flex flex-col items-center sm:items-start w-full max-w-sm space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2 sm:mb-4 text-center sm:text-left">
              Sign In
            </h1>
            <p className="text-gray-500 mb-6 text-center sm:text-left">
              Sign in to enjoy the features of HD
            </p>
          </div>
          <form className="w-full space-y-6" onSubmit={handleSignin}>
            <div className="relative border border-gray-300 rounded-xl p-1 focus-within:ring-2 focus-within:ring-blue-500">
              <label className="absolute -top-3 left-4 bg-white px-2 text-gray-600 text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border-0 p-2 outline-none"
              />
            </div>

            {/* Status Messages */}
            {isSendingOTP && (
              <p className="text-blue-500 text-sm">Sending OTP...</p>
            )}
            {otpSent && !isSendingOTP && (
              <p className="text-green-500 text-sm">OTP sent to your email!</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* OTP Field - Always Visible */}
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
                  disabled={!otpSent}
                />
                <button
                  type="button"
                  onClick={() => setShowOTP(!showOTP)}
                  className="p-2"
                  disabled={!otpSent}
                >
                  <img
                    src={showOTP ? "/eye.png" : "/hidden.png"}
                    alt="Toggle visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            {/* Resend OTP Button */}
            {otpSent && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={sendOTP}
                  disabled={isSendingOTP}
                  className="text-blue-600 text-sm underline disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            )}

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
            <div className="relative">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold mt-2 hover:bg-blue-700 disabled:opacity-50"
                disabled={!otpSent || isSendingOTP || !otp}
              >
                Sign in
              </button>
            </div>
            <div className="flex items-center gap-4 text-gray-500 my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <div className="text-sm text-gray-500">or</div>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            <div className="border border-gray-300 rounded-xl p-1">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 p-3"
              >
                Continue with Google
                <img src="/google.svg" alt="Google" className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
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
      <div className="hidden sm:block w-[55%] h-screen p-2">
        <div
          className="w-full h-full rounded-3xl bg-cover bg-center flex flex-col justify-center items-start p-12"
          style={{ backgroundImage: "url('blue.jpg')" }}
        ></div>
      </div>
    </div>
  );
}
