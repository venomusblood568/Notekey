import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Note {
  _id: string;
  title: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user and fetch notes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchNotes(parsedUser._id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        console.error("Failed to parse user from localStorage.");
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const fetchNotes = async (userId: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://notekey.onrender.com/api/notes/get-notes?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setNotes(data || []);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async () => {
    if (!newNoteTitle.trim() || !user) return;

    const res = await fetch(
      "https://notekey.onrender.com/api/notes/post-notes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: newNoteTitle, userId: user._id }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      setNotes((prev) => [data, ...prev]);
      setNewNoteTitle("");
    } else {
      console.error("Error creating note:", data.message);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const res = await fetch(
        `https://notekey.onrender.com/api/notes/delete-note/${noteId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok && user) {
        fetchNotes(user._id);
      } else {
        const data = await res.json();
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const signout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between w-[calc(100%-3rem)]">
        <div className="flex items-center gap-4">
          <img src="/icon.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl text-black font-bold">Dashboard</h1>
        </div>
        <span
          onClick={signout}
          className="cursor-pointer text-blue-500 underline hover:text-blue-700 transition-colors"
        >
          Sign Out
        </span>
      </div>

      
      <div className="pt-24 px-6">
        <div className="border border-gray-300 p-4 rounded-2xl shadow-xl bg-white">
          <div className="text-lg text-gray-800 font-bold">
            Welcome, {user?.name || "User"}!
          </div>
          <div className="text-gray-600">Email: {user?.email || "N/A"}</div>
        </div>
      </div>

      {/* Notes */}
      <div className="px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">Notes</h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              type="text"
              placeholder="New Note Title..."
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={createNote}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              + Create Note
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p>Loading notes...</p>
          ) : notes.length === 0 ? (
            <p className="text-gray-500 col-span-full">No notes available.</p>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="bg-white border border-gray-200 p-4 rounded-xl shadow-md flex justify-between items-center"
              >
                <div className="text-gray-800 font-medium">{note.title}</div>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="transition p-1 rounded hover:bg-blue-200"
                >
                  <img src="/delete.png" alt="Delete" className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
