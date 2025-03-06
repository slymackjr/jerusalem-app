import { useState } from "react";
import { Sidebar } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, DollarSign, FileText, UploadCloud, User, Clock, Users } from "lucide-react";

// Placeholder images from Unsplash
const adminAvatar = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"; // Admin portrait
const bannerImage = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"; // School admin background

// Dummy Data for an Admin
const dummyAdmin = {
  id: "ADM001",
  name: "Joseph Kweka",
  email: "joseph.kweka@example.com",
  role: "Administrator",
  totalUsers: 150,
  paymentsProcessed: 1200000,
  resultsUploaded: 500,
  lastActivity: "2025-03-03 09:00",
  schoolsManaged: 1,
};

export default function AdminProfile() {
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
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-gray-100 text-gray-800">
        {/* Banner Section */}
        <div className="relative h-48 md:h-64 bg-purple-800 overflow-hidden">
          <img
            src={bannerImage}
            alt="School Admin Banner"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-50"></div>
          <div className="absolute bottom-6 left-6 flex items-center">
            <label htmlFor="avatarUpload" className="cursor-pointer">
              <div className="relative group">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : adminAvatar}
                  alt="Admin Avatar"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg transform hover:scale-110 transition-transform duration-300"
                />
                <UploadCloud
                  className="absolute bottom-0 right-0 bg-orange-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
            <div className="ml-4 text-white">
              <h1 className="text-2xl md:text-3xl font-bold animate-fade-in">{dummyAdmin.name}</h1>
              <p className="text-sm md:text-md animate-fade-in">{dummyAdmin.role}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 md:p-12 max-w-4xl mx-auto">
          {/* Admin Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <User className="text-blue-600 mr-4" size={40} />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Admin Details</h3>
                <p className="text-gray-800 font-bold">{dummyAdmin.id}</p>
                <p className="text-gray-500">{dummyAdmin.email}</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <Users className="text-green-600 mr-4" size={40} />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
                <p className="text-gray-800 font-bold">{dummyAdmin.totalUsers}</p>
                <p className="text-gray-500">Teachers, Cashiers, Students</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <DollarSign className="text-orange-600 mr-4" size={40} />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Payments Processed</h3>
                <p className="text-gray-800 font-bold">TZS {dummyAdmin.paymentsProcessed.toLocaleString()}</p>
                <p className="text-gray-500">School Fees</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <FileText className="text-purple-600 mr-4" size={40} />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Results Uploaded</h3>
                <p className="text-gray-800 font-bold">{dummyAdmin.resultsUploaded}</p>
                <p className="text-gray-500">Grades Recorded</p>
              </div>
            </div>
          </div>

          {/* System Summary Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 hover:bg-yellow-50 transition duration-300 transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <Clock className="text-yellow-600 mr-3" size={24} />
              System Overview
            </h3>
            <p className="text-gray-800 text-lg">
              Last activity: <span className="font-bold">{dummyAdmin.lastActivity}</span>
            </p>
            <p className="text-gray-800 text-lg mt-2">
              Schools managed: <span className="font-bold">{dummyAdmin.schoolsManaged}</span>
            </p>
            <p className="text-gray-500 mt-2">You’re the backbone of this system—keep it running smoothly!</p>
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
          <div className="mt-8 p-4 bg-purple-50 rounded-lg shadow-md text-center animate-bounce-in">
            <p className="text-lg font-semibold text-purple-800">
              Outstanding leadership, {dummyAdmin.name}! You’re keeping the school thriving! 🚀
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


// const { data: admin = {}, isPending } = useQuery({
//     queryKey: ["admin-profile"],
//     queryFn: () => axiosInstance.get("/api/admin/me").then(res => res.data),
//   });
//   const { mutate: updatePassword } = useMutation({
//     mutationFn: ({ oldPassword, newPassword }) => axiosInstance.put(`/api/password/${admin.id}/update`, { old_password: oldPassword, password: newPassword }),
//     onSuccess: () => toast.success("Password updated!"),
//   });
//   if (isPending) return <LoadingComponent />;