import { useState } from "react";
import { Sidebar } from "../../components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, DollarSign, BookOpen, UploadCloud, User } from "lucide-react";

// Placeholder images from Unsplash
const studentAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"; // Student portrait
const bannerImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"; // Classroom background

// Dummy Data
const dummyStudent = {
  id: "STU001",
  name: "John Mushi",
  email: "john.mushi@example.com",
  form: "Form 1",
  stream: "Stream A",
  feesDue: 20000,
  totalFees: 50000,
  resultsSummary: {
    totalSubjects: 9,
    averageGrade: 75,
    lastUpdated: "2025-03-03",
  },
};

export default function StudentProfile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  // Simulate password update (dummy behavior)
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
        <div className="relative h-48 md:h-64 bg-blue-800 overflow-hidden">
          <img
            src={bannerImage}
            alt="Classroom Banner"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-50"></div>
          <div className="absolute bottom-6 left-6 flex items-center">
            <label htmlFor="avatarUpload" className="cursor-pointer">
              <div className="relative flex">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : studentAvatar}
                  alt="Student Avatar"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg transform hover:scale-105 transition-transform"
                />
                <UploadCloud
                  className="absolute bottom-0 right-0 bg-orange-600 text-white p-1 rounded-full"
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
              <h1 className="text-2xl md:text-3xl font-bold">{dummyStudent.name}</h1>
              <p className="text-sm md:text-md">{dummyStudent.form} {dummyStudent.stream}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 md:p-12 max-w-4xl mx-auto">
          {/* Student Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <User className="text-green-600 mr-4" size={40} />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Student Details</h3>
                <p className="text-gray-800 font-bold">{dummyStudent.id}</p>
                <p className="text-gray-500">{dummyStudent.email}</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <DollarSign className="text-orange-600 mr-4" size={40} />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Payment Status</h3>
                <p className="text-gray-800 font-bold">TZS {dummyStudent.feesDue} Due</p>
                <p className="text-gray-500">{((dummyStudent.totalFees - dummyStudent.feesDue) / dummyStudent.totalFees * 100).toFixed(1)}% Paid</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
              <BookOpen className="text-blue-600 mr-4" size={40} />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Results Summary</h3>
                <p className="text-gray-800 font-bold">{dummyStudent.resultsSummary.averageGrade}% Avg</p>
                <p className="text-gray-500">{dummyStudent.resultsSummary.totalSubjects} Subjects</p>
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="text-orange-600 mr-3" size={24} />
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="password"
                  className="border px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="border px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="border px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto hover:bg-orange-700 transition-colors shadow-md"
              >
                <CheckCircle size={20} className="mr-2" />
                Update Password
              </button>
            </form>
          </div>

          {/* Fun Welcome Message */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg shadow-md text-center animate-bounce-in">
            <p className="text-lg font-semibold text-blue-800">
              Welcome back, {dummyStudent.name}! Keep shining in {dummyStudent.form}! 🌟
            </p>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

// const { data: student = {}, isPending } = useQuery({
//     queryKey: ["student-profile"],
//     queryFn: () => axiosInstance.get("/api/student/me").then(res => res.data),
//   });
//   const { mutate: updatePassword } = useMutation({
//     mutationFn: ({ oldPassword, newPassword }) => axiosInstance.put(`/api/password/${student.id}/update`, { old_password: oldPassword, password: newPassword }),
//     onSuccess: () => toast.success("Password updated!"),
//   });
//   if (isPending) return <LoadingComponent />;