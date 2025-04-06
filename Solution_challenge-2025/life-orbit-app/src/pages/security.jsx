import { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useFirebase } from "../Context/firebase";
import { Link } from "react-router-dom";

function Security() {
  const { updateUserLikedCourses, getCurrentUser, getUserLikedCourses } = useFirebase();
  const [userId, setUserId] = useState(null);
  const [liked, setLiked] = useState(false); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getCurrentUser(async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const courses = await getUserLikedCourses(user.uid);
          setLiked(courses.security === true);
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setUserId(null);
        setLiked(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [getCurrentUser, getUserLikedCourses]);

  const toggleLike = async () => {
    if (!userId || loading) return;

    const newLikeState = !liked;
    setLiked(newLikeState);

    try {
      await updateUserLikedCourses(userId, "2fa", newLikeState);
    } catch (error) {
      console.error("Error updating course like:", error);
      setLiked(!newLikeState);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      <Header />

      <main className="flex-grow p-6">
        <h1 className="text-3xl font-[Arial] font-bold text-emerald-500 mb-6 tracking-wide drop-shadow-sm">
          Security
        </h1>

        <div className="bg-emerald-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-lg font-bold font-[Arial] text-gray-900 dark:text-white mb-4">
            Available Courses
          </h2>

          <Link to="/item2" className="block">
            <div className="bg-emerald-50 dark:bg-gray-700 p-4 rounded-lg border border-emerald-100 dark:border-gray-600 shadow-sm hover:ring-2 hover:ring-amber-400 transition mb-4 w-full relative">
              <p className="text-gray-900 dark:text-white font-semibold font-[Arial]">
                Email Security Using 2-Factor Authentication
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 font-[Arial]">
                Learn how to secure email accounts using 2-Factor Authentication (2FA) and protect against unauthorized access.
              </p>

              <button
                onClick={(e) => {
                  e.preventDefault(); 
                  toggleLike();
                }}
                className={`absolute top-3 right-4 text-xl transition-transform duration-300 ${
                  liked ? "text-red-500 scale-110" : "text-gray-400 hover:scale-110"
                }`}
                aria-label={liked ? "Unlike this course" : "Like this course"}
              >
                {liked ? "❤️" : "🤍"}
              </button>
            </div>
          </Link>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Security;

