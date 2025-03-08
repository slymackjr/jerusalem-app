import { useState } from "react";
import { Sidebar } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, BookOpen, UploadCloud, User, Clock, FileText } from "lucide-react";

// Placeholder images from Unsplash
const teacherAvatar = "https://images.unsplash.com/photo-1573496359142-b8d877993ecb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"; // Teacher portrait
const bannerImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"; // Classroom background

// Dummy Data for a Teacher
const dummyTeacher = {
  id: "TCH001",
  name: "Fatuma Hassan",
  email: "fatuma.hassan@example.com",
  role: "Teacher",
  studentsTaught: 60,
  resultsUploaded: 150,
  subjectsTaught: 3,
  lastActivity: "2025-03-03 10:15",
};

export default function TeacherProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  // Simulate password update
  const handlePasswordChange = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }
    toast.success("Password updated successfully!", { position: "top-center" });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // Avatar Upload Handling
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      toast.success("Profile picture updated!", { position: "top-center" });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setAvatar(file);
      toast.success("Profile picture updated!", { position: "top-center" });
    }
  };

  return (
    <Sidebar activePage="profile" alertPages="profile">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 text-gray-800">
        {/* Banner Section */}
        <div className="bg-cover bg-center overflow-hidden flex flex-col justify-end p-6 gap-4 bg-black/50 bg-blend-overlay"
          style={{ backgroundImage: `url(${bannerImage})` }}>
          <div className="bg-gradient-to-t from-purple-900 to-transparent w-full h-1/3" />
          <div className="flex items-center gap-4">
            <label htmlFor="avatarUpload" className="cursor-pointer group">
              <div className="flex items-center justify-center">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : teacherAvatar}
                  alt="Admin Avatar"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg"
                />
                <UploadCloud
                  className="bg-orange-600 text-white p-1 rounded-full group-hover:opacity-100 transition-opacity duration-300 ml-[-2rem] mt-[6rem]"
                  size={24}
                />
              </div>
            </label>
            <input
              type="file"
              id="avatarUpload"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold animate-fade-in">{dummyTeacher.name}</h1>
              <p className="text-sm md:text-md animate-fade-in">{dummyTeacher.role}</p>
            </div>
          </div>
        </div>          

        {/* Profile Content */}
        <div className="p-6 md:p-12 max-w-4xl mx-auto">
          {/* Teacher Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <User className="text-blue-600 mr-4" size={40} />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Teacher Details</h3>
                <p className="text-gray-800 font-bold">{dummyTeacher.id}</p>
                <p className="text-gray-500">{dummyTeacher.email}</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <BookOpen className="text-green-600 mr-4" size={40} />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Students Taught</h3>
                <p className="text-gray-800 font-bold">{dummyTeacher.studentsTaught}</p>
                <p className="text-gray-500">Across Forms 1-4</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <FileText className="text-orange-600 mr-4" size={40} />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Results Uploaded</h3>
                <p className="text-gray-800 font-bold">{dummyTeacher.resultsUploaded}</p>
                <p className="text-gray-500">Grades Recorded</p>
              </div>
            </div>
          </div>

          {/* Teaching Summary Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 hover:bg-yellow-50 transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <Clock className="text-yellow-600 mr-3" size={24} />
              Teaching Activity
            </h3>
            <p className="text-gray-800 text-lg">
              Last result uploaded: <span className="font-bold">{dummyTeacher.lastActivity}</span>
            </p>
            <p className="text-gray-500 mt-2">
              Subjects taught: <span className="font-bold">{dummyTeacher.subjectsTaught}</span>
            </p>
            <p className="text-gray-500 mt-2">Keep inspiring your students with your dedication!</p>
          </div>

          {/* Change Password Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="text-orange-600 mr-3" size={24} />
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="password"
                  className="border px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm hover:border-orange-300 transition-colors"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="border px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm hover:border-orange-300 transition-colors"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="border px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm hover:border-orange-300 transition-colors"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto hover:bg-orange-700 transition-colors shadow-md transform hover:scale-105"
              >
                <CheckCircle size={20} className="mr-2" />
                Update Password
              </button>
            </form>
          </div>

          {/* Motivational Message */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg shadow-md text-center animate-bounce-in">
            <p className="text-lg font-semibold text-blue-800">
              Amazing work, {dummyTeacher.name}! You’re shaping the future, one student at a time! 🌟
            </p>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

// // Tailwind Animation for Fade-In and Bounce-In
// const tailwindConfig = `
//   .animate-fade-in {
//     animation: fadeIn 0.5s ease-out;
//   }
//   .animate-bounce-in {
//     animation: bounceIn 0.8s ease-out;
//   }
//   @keyframes fadeIn {
//     0% { opacity: 0; transform: translateY(10px); }
//     100% { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes bounceIn {
//     0% { opacity: 0; transform: scale(0.9); }
//     50% { opacity: 1; transform: scale(1.05); }
//     100% { opacity: 1; transform: scale(1); }
//   }
// `;
// console.log("Add to tailwind.config.js:", tailwindConfig);