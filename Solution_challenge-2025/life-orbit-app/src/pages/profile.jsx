import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { FirebaseAuth, database } from "../Context/firebase";
import { ref, onValue } from "firebase/database";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState({
    profile: true,
    favorites: true,
  });
  const [activeTab, setActiveTab] = useState("Ongoing");

  const courseNames = {
    atm: "ATM",
    cheque: "Cheque Writing",
    "2fa": "2-Factor Authentication",
  };

  useEffect(() => {
    const unsubscribeAuth = FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        const userListener = onValue(
          userRef,
          (snapshot) => {
            setLoading((prev) => ({ ...prev, profile: false }));
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            } else {
              console.warn("User data not found");
              setUserData(null);
            }
          },
          (error) => {
            console.error("Profile load error:", error);
            setLoading((prev) => ({ ...prev, profile: false }));
          }
        );

        const favoritesRef = ref(database, `liked_courses/${user.uid}`);
        const favListener = onValue(
          favoritesRef,
          (snapshot) => {
            setLoading((prev) => ({ ...prev, favorites: false }));
            if (snapshot.exists()) {
              const favData = snapshot.val();
              const favList = Object.entries(favData)
                .filter(([_, isLiked]) => isLiked === true)
                .map(([courseId]) => courseId);
              setFavorites(favList);
            } else {
              setFavorites([]);
            }
          },
          (error) => {
            console.error("Favorites load error:", error);
            setLoading((prev) => ({ ...prev, favorites: false }));
          }
        );

        return () => {
          userListener();
          favListener();
        };
      } else {
        setUserData(null);
        setFavorites([]);
        setLoading({ profile: false, favorites: false });
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const isLoading = loading.profile || loading.favorites;

  return (
    <div className="bg-orange-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-6 space-y-6">
        {/* Profile Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : userData ? (
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Image */}
            <div className="bg-white dark:bg-gray-800 rounded-full shadow flex-shrink-0 h-32 w-32 flex items-center justify-center">
              <img
                src={userData.photoURL || "profile_image.ico"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = "profile_image.ico";
                }}
              />
            </div>

            {/* Profile Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-1">
              <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
                Profile Information
              </h2>
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Name:</span>{" "}
                  {userData.name || "Not set"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Email:</span>{" "}
                  {userData.email || "Not set"}
                </p>
                {userData.gender && (
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Gender:</span>{" "}
                    {userData.gender}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <p className="text-red-500 dark:text-red-400">
              No user data found. Please sign in.
            </p>
          </div>
        )}

        {/* Course Progress Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
            My Courses
          </h2>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            {["Ongoing", "Completed", "Favorites"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "Ongoing" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-200 font-medium">ATM Basics</p>
                  <span className="text-yellow-500">In Progress</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-200 font-medium">2-Factor Authentication</p>
                  <span className="text-yellow-500">In Progress</span>
                </div>
              </div>
            )}

            {activeTab === "Completed" && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  You haven't completed any courses yet
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Complete courses to see them listed here
                </p>
              </div>
            )}

            {activeTab === "Favorites" && (
              loading.favorites ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : favorites.length > 0 ? (
                <div className="space-y-4">
                  {favorites.map((courseId) => (
                    <div
                      key={courseId}
                      className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-4 rounded-lg transition"
                    >
                      <p className="text-gray-700 dark:text-gray-200 font-medium">
                        {courseNames[courseId] || courseId}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    You haven't liked any courses yet
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Click the heart icon on course pages to add favorites
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
