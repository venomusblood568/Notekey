import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const signout = () => {
    navigate("/signin")
  }
  return (
    <>
      <div>
        <div>
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between w-[calc(100%-3rem)]">
            {/* Left Side: Logo + Title */}
            <div className="flex items-center gap-4">
              <img src="/icon.png" alt="Logo" className="w-8 h-8" />
              <h1 className="text-xl text-black font-bold">Dashboard</h1>
            </div>

            {/* Right Side: Sign Out */}
            <span
              onClick={signout}
              className="cursor-pointer text-blue-500 underline hover:text-blue-700 transition-colors"
            >
              Sign Out
            </span>
          </div>
        </div>
        <div className="pt-24 px-6">
          <div className="border border-gray-300 p-4 rounded-2xl shadow-xl  bg-white">
            <div className="text-lg text-gray-800 font-bold">
              Welcome, Name!
            </div>
            <div className="text-gray-600">Email: user@gmail.com</div>
          </div>
        </div>
        <div className="px-8 py-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">Notes</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition hover:cursor-pointer">
              + Create Note
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-md flex justify-between items-center">
              <div className="text-gray-800 font-medium">Car1</div>
              <button className=" transition p-1 rounded hover:bg-blue-200 hover:cursor-pointer">
                <img src="/delete.png" alt="Delete" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
