import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { FirebaseAuth, database } from "../Context/firebase"; 
import {ref, onValue} from 'firebase/database'; 

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Ongoing");


  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.warn("User data not found in database");
            setUserData(null);
          }
          setLoading(false);
        }, (error) => {
          console.error("Database error:", error);
          setLoading(false);
        });
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className="bg-orange-50 h-screen flex flex-col">
      <Header />

      <main className="flex-grow px-4 py-6 space-y-6">
        {/* Profile Section */}
        {loading ? (
          <p className="text-center text-gray-500">Loading profile info...</p>
        ) : userData ? (
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Image */}
            <div className="bg-white rounded-full shadow flex-shrink-0 h-32 w-32 flex items-center justify-center">
              <img
                src={userData.photoURL || "profile_image.ico"}
                alt="Profile Icon"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="bg-white rounded-lg shadow p-6 flex-1">
              <p className="text-gray-700 font-semibold mb-2">
                Name: {userData.name || "N/A"}
              </p>
              <p className="text-gray-700 font-semibold mb-2">
                Email: {userData.email || "N/A"}
              </p>
              <p className="text-gray-700 font-semibold">
                Gender: {userData.gender || "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">User data not found.</p>
        )}

        {/* Course Progress Section with Tabs */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Tabs */}
          <div className="flex justify-between border-b pb-2 mb-4">
            {["Ongoing", "Completed", "Favorites"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-semibold pb-1 ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === "Ongoing" && (
            <>
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow">
                <p className="text-gray-700 font-medium">ATM</p>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow">
                <p className="text-gray-700 font-medium">2-Factor</p>
              </div>
            </>
          )}

          {activeTab === "Completed" && (
            <p className="text-gray-500 text-center">You have not completed any courses yet.</p>
          )}

          {activeTab === "Favorites" && (
            <p className="text-gray-500 text-center">No favorite courses added yet.</p>
          )}
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;


