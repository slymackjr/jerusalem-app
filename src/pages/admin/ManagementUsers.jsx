import { Sidebar, Pagination, Cards } from "../../components";
import { useState, useRef } from "react";
import { User, Users, Edit, Download, Upload, Shield, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

// Dummy Data
const dummyUsers = [
  { id: "CSH001", name: "Amina Juma", role: "Cashier", email: "amina.juma@example.com", permissions: ["Process Payments"], lastLogin: "2025-03-03" },
  { id: "TCH001", name: "Fatuma Hassan", role: "Teacher", email: "fatuma.hassan@example.com", permissions: ["Upload Results"], lastLogin: "2025-03-02" },
  { id: "STU001", name: "John Mushi", role: "Student", email: "john.mushi@example.com", permissions: ["View Results"], lastLogin: "2025-03-01" },
  { id: "CSH002", name: "Peter Nyerere", role: "Cashier", email: "peter.nyerere@example.com", permissions: ["Process Payments"], lastLogin: "2025-03-03" },
  { id: "TCH002", name: "David Kweka", role: "Teacher", email: "david.kweka@example.com", permissions: ["Upload Results"], lastLogin: "2025-03-02" },
];

const AddUserModal = ({ isOpen, onClose, onSave, editUser }) => {
  const [name, setName] = useState(editUser?.name || "");
  const [email, setEmail] = useState(editUser?.email || "");
  const [role, setRole] = useState(editUser?.role || "Cashier");
  const [permissions, setPermissions] = useState(editUser?.permissions || []);
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password && !editUser) {
      toast.error("Password is required for new users!", { position: "top-center" });
      return;
    }
    const userData = { id: editUser?.id || `USR${Math.floor(Math.random() * 1000)}`, name, email, role, permissions, ...(password && { password }) };
    onSave(userData);
    onClose();
  };

  const togglePermission = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{editUser ? "Edit User" : "Add User"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            required
          />
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setPermissions(e.target.value === "Cashier" ? ["Process Payments"] : e.target.value === "Teacher" ? ["Upload Results"] : ["View Results"]);
            }}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="Cashier">Cashier</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
          <div className="space-y-2">
            <label className="text-gray-700 font-semibold">Permissions</label>
            <div className="flex flex-wrap gap-2">
              {["Process Payments", "Upload Results", "View Results"].map((perm) => (
                <label key={perm} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={permissions.includes(perm)}
                    onChange={() => togglePermission(perm)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span>{perm}</span>
                </label>
              ))}
            </div>
          </div>
          {!editUser && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
              required
            />
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex-1 flex items-center justify-center"
            >
              <User size={20} className="mr-2" />
              {editUser ? "Update" : "Add"}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors flex-1 flex items-center justify-center"
            >
              <X size={20} className="mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editUser: PropTypes.object,
};

export default function ManagementUsers() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [roleFilter, setRoleFilter] = useState("All");
  const [isModalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadedCSV, setUploadedCSV] = useState(null);

  // Calculate Stats
  const totalUsers = dummyUsers.length;
  const activeUsersToday = dummyUsers.filter((u) => u.lastLogin === "2025-03-03").length;
  const permissionCount = dummyUsers.reduce((acc, u) => acc + u.permissions.length, 0);

  // Filter users
  const filteredUsers = dummyUsers.filter((user) => {
    const matchesSearch = [user.id, user.name, user.email, user.role]
      .map((field) => field.toLowerCase())
      .some((field) => field.includes(search.toLowerCase()));
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });
  const pageCount = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);

  const handlePageClick = (data) => setCurrentPage(data.selected);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(0);
  };
  const handleRoleFilter = (event) => {
    setRoleFilter(event.target.value);
    setCurrentPage(0);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setEditUser(null);
  };
  const handleEditUser = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = dummyUsers.map((user) =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
    dummyUsers.length = 0;
    dummyUsers.push(...updatedUsers);
    toast.success("User updated successfully!", { position: "top-center" });
    closeModal();
  };

  // Download Modal Logic
  const [downloadRole, setDownloadRole] = useState("All");
  const handleDownload = () => {
    const filteredForDownload = dummyUsers.filter((user) => downloadRole === "All" || user.role === downloadRole);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Name,Role,Email,Permissions,Last Login"].join(",") +
      "\n" +
      filteredForDownload.map((u) => `${u.id},${u.name},${u.role},${u.email},${u.permissions.join("|")},${u.lastLogin}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${downloadRole}_users.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadModalOpen(false);
    toast.success(`Downloaded ${downloadRole} users!`, { position: "top-center" });
  };

  // Upload Modal Logic
  const [uploadRole, setUploadRole] = useState("Cashier");
  const fileInputRef = useRef(null);
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setUploadedCSV(text);
        toast.success(`CSV for ${uploadRole} uploaded successfully!`, { position: "top-center" });
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid CSV file!", { position: "top-center" });
    }
    setUploadModalOpen(false);
  };

  return (
    <Sidebar activePage="management-users" alertPages="management-users">
      <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center">
          <Users className="text-purple-600 mr-3" size={32} />
          User Management
        </h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Cards
            title="Total Users"
            icon={<Users size={40} className="text-purple-500" />}
            number={totalUsers}
            description="All Roles"
          />
          <Cards
            title="Active Today"
            icon={<User size={40} className="text-green-500" />}
            number={activeUsersToday}
            description="Last Login Today"
          />
          <Cards
            title="Permissions Assigned"
            icon={<Shield size={40} className="text-blue-500" />}
            number={permissionCount}
            description="Total Permissions"
          />
        </div>

        {/* Search, Row Select, Role Filter, and Action Buttons */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-purple-500 shadow-sm"
            placeholder="Search by ID, name, email, role..."
            value={search}
            onChange={handleSearch}
          />
          <div className="flex gap-4 items-center">
            <select
              className="border px-4 py-2 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-purple-500"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            >
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={15}>15 rows</option>
              <option value={20}>20 rows</option>
            </select>
            <select
              className="border px-4 py-2 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-purple-500"
              value={roleFilter}
              onChange={handleRoleFilter}
            >
              <option value="All">All Roles</option>
              <option value="Cashier">Cashier</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
            <button
              onClick={openModal}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700 transition-colors shadow-md transform hover:scale-105"
            >
              <User size={20} className="mr-2" /> Add User
            </button>
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors shadow-md transform hover:scale-105"
            >
              <Download size={20} className="mr-2" /> Download CSV
            </button>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors shadow-md transform hover:scale-105"
            >
              <Upload size={20} className="mr-2" /> Upload CSV
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full min-w-[600px] bg-white">
            <thead className="bg-purple-100">
              <tr>
                <th className="border p-3 text-left text-gray-700 font-semibold">User ID</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Name</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Role</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Email</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Permissions</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Last Login</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors animate-fade-in">
                  <td className="border p-3">{user.id}</td>
                  <td className="border p-3">{user.name}</td>
                  <td className="border p-3">{user.role}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">{user.permissions.join(", ")}</td>
                  <td className="border p-3">{user.lastLogin}</td>
                  <td className="border p-3 flex space-x-4 justify-center">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-transform"
                      title="Edit User"
                    >
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />

        {/* Add/Edit User Modal */}
        <AddUserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={updateUser}
          editUser={editUser}
        />

        {/* Download Modal */}
        {isDownloadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Download Users CSV</h2>
                <button onClick={() => setDownloadModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              <select
                value={downloadRole}
                onChange={(e) => setDownloadRole(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
              >
                <option value="All">All Roles</option>
                <option value="Cashier">Cashier</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDownloadModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Download size={20} className="mr-2" /> Download
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Upload Users CSV</h2>
                <button onClick={() => setUploadModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              <select
                value={uploadRole}
                onChange={(e) => setUploadRole(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 mb-4"
              >
                <option value="Cashier">Cashier</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleUpload}
                className="w-full border px-4 py-2 rounded-lg"
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Upload size={20} className="mr-2" /> Upload
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Uploaded CSV */}
        {uploadedCSV && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Uploaded CSV Preview</h3>
              <button
                onClick={() => setUploadedCSV(null)}
                className="text-red-600 hover:text-red-800"
              >
                Close
              </button>
            </div>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">{uploadedCSV}</pre>
          </div>
        )}

        {/* Motivational Message */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg shadow-md text-center animate-bounce-in">
          <p className="text-lg font-semibold text-purple-800">
            Great job managing the team! Keep the system thriving! 🚀
          </p>
        </div>
      </div>
    </Sidebar>
  );
}

// // Tailwind Animation Config
// const tailwindConfig = `
//   .animate-fade-in { animation: fadeIn 0.5s ease-out; }
//   .animate-bounce-in { animation: bounceIn 0.8s ease-out; }
//   @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
//   @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
// `;
// console.log("Add to tailwind.config.js:", tailwindConfig);