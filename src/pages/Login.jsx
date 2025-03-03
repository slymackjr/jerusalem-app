import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, X, UserCog, User, BookOpen, DollarSign } from "lucide-react"; // Added role-specific icons
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../hooks";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { logo3 } from "../assets";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/authSlice";
import PropTypes from "prop-types";

const RoleSelector = ({ onSelectRole }) => {
  const roles = [
    { name: "Admin", icon: <UserCog size={40} />, description: "Manage the system" },
    { name: "Student", icon: <User size={40} />, description: "View fees & results" },
    { name: "Teacher", icon: <BookOpen size={40} />, description: "Manage student results" },
    { name: "Cashier", icon: <DollarSign size={40} />, description: "Handle payments" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-96">
      <div className="flex justify-center mb-6">
        <Link to="/">
          <img src={logo3} alt="Logo" className="w-40" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center">Select Your Role</h1>
      <div className="grid grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role.name}
            onClick={() => onSelectRole(role.name)}
            className="flex flex-col items-center p-2 border rounded-lg hover:bg-blue-200 transition-colors"
          >
            {role.icon}
            <span className="mt-2 font-semibold">{role.name}</span>
            <span className="text-sm text-gray-500">{role.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

RoleSelector.propTypes = {
  onSelectRole: PropTypes.func.isRequired,
};

const LoginForm = ({ selectedRole, onExit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "", role: selectedRole });
  const [errors, setErrors] = useState({});

  const { token, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && role) {
      navigate("/dashboard");
    }
  }, [navigate, token, role]);

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/login", formData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success === true) {
        const { token, ability, user } = data;
        const role = ability;

        dispatch(setAuth({ token, role, user }));
        toast.success(data.message || "Login successful.", { position: "top-center" });
        navigate("/dashboard");
        // navigate(`/dashboard/${role.toLowerCase()}`);
      } else if (data.success === false) {
        toast.error(data.message || "An error occurred. Please try again.", {
          position: "top-center",
        });
      } else {
        toast.warning("Unexpected response received.", { position: "top-center" });
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message, { position: "top-center" });
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
      <button onClick={onExit} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <X size={24} />
      </button>
      <div className="flex justify-center mb-6">
        <Link to="/">
          <img src={logo3} alt="Logo" className="w-40" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center">Login as {selectedRole}</h1>
      <form className="grid grid-cols-1 gap-7" onSubmit={handleLogin}>
        <div className="relative">
          <Mail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`border p-3 rounded-lg pl-10 w-full focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 ring-red-500" : "focus:ring-orange-600"
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 absolute left-0 right-0">{errors.email[0]}</p>
          )}
        </div>
        <div className="relative">
          <Lock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`border p-3 rounded-lg pl-10 w-full focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 ring-red-500" : "focus:ring-orange-600"
            }`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 absolute left-0 right-0">{errors.password[0]}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <>
              <LogIn className="mr-2" />
              Login
            </>
          )}
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  selectedRole: PropTypes.string.isRequired,
  onExit: PropTypes.func.isRequired,
};

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleExit = () => {
    setSelectedRole(null); // Return to role selection
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 py-12">
      <ToastContainer autoClose={5000} hideProgressBar={true} newestOnTop={true} closeOnClick pauseOnHover draggable />
      {selectedRole ? (
        <LoginForm selectedRole={selectedRole} onExit={handleExit} />
      ) : (
        <RoleSelector onSelectRole={handleRoleSelect} />
      )}
    </div>
  );
}