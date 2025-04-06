import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { useFirebase } from "../Context/firebase";

function Finance() {
  const { updateUserLikedCourses, getCurrentUser, getUserLikedCourses } = useFirebase();
  const [userId, setUserId] = useState(null);
  const [likes, setLikes] = useState({
    atm: false,
    cheque: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getCurrentUser(async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const courses = await getUserLikedCourses(user.uid);
          setLikes({
            atm: courses.atm === true,
            cheque: courses.cheque === true,
          });
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setUserId(null);
        setLikes({ atm: false, cheque: false });
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [getCurrentUser, getUserLikedCourses]);

  const toggleLike = async (course) => {
    if (!userId || loading) return;

    const newLikeState = !likes[course];
    setLikes((prev) => ({ ...prev, [course]: newLikeState }));

    try {
      await updateUserLikedCourses(userId, course, newLikeState);
    } catch (error) {
      console.error("Error updating course like:", error);
      setLikes((prev) => ({ ...prev, [course]: !newLikeState }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      <Header />

      <main className="flex-grow p-6">
        <h1 className="text-3xl font-[Arial] font-bold text-cyan-500 mb-6 tracking-wide drop-shadow-sm">
          Finance
        </h1>

        {/* Course Container */}
        <div className="bg-cyan-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-lg font-[Arial] font-bold text-gray-900 dark:text-white mb-4">
            Available Courses
          </h2>

          {/* ATM Course */}
          <Link to="/item1" className="block">
            <div className="bg-cyan-50 dark:bg-gray-700 p-4 rounded-lg border border-cyan-100 dark:border-gray-600 shadow-sm hover:ring-2 hover:ring-amber-400 transition mb-4 w-full relative">
              <p className="text-gray-900 dark:text-white font-semibold font-[Arial]">ATM</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 font-[Arial]">
                Learn how to use Automated Teller Machines (ATMs) safely, withdraw and deposit money, check balances, and understand transaction limits.
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault(); 
                  toggleLike("atm");
                }}
                className="absolute top-4 right-4 text-lg transition-transform hover:scale-125"
                aria-label="Like ATM course"
              >
                {likes.atm ? "❤️" : "🤍"}
              </button>
            </div>
          </Link>

          {/* Cheque Writing Course */}
          <Link to="/item3" className="block">
            <div className="bg-cyan-50 dark:bg-gray-700 p-4 rounded-lg border border-cyan-300 dark:border-gray-600 shadow-sm hover:ring-2 hover:ring-amber-400 transition w-full relative">
              <p className="text-gray-900 dark:text-white font-semibold font-[Arial]">Cheque Writing</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 font-[Arial]">
                Understand how to write a cheque properly, avoid mistakes, endorse cheques, and learn about clearing processes in banks.
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault(); 
                  toggleLike("cheque");
                }}
                className="absolute top-4 right-4 text-lg transition-transform hover:scale-125"
                aria-label="Like Cheque Writing course"
              >
                {likes.cheque ? "❤️" : "🤍"}
              </button>
            </div>
          </Link>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Finance;

