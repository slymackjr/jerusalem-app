import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Login, StudentDashboard, AdminDashboard, TeacherDashboard, CashierDashboard, Payment, Results, StudentProfile, CashierProfile, ResultsUpload, TeacherProfile, AdminProfile, ManagementUsers } from "./pages";
// import { ProtectedRoutes } from "./Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/cashier/dashboard" element={<CashierDashboard />} />
        <Route path="/cashier/payment" element={<Payment />} />
        <Route path="/student/results" element={<Results />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/cashier/profile" element={<CashierProfile />} />
        <Route path="/teacher/results-upload" element={<ResultsUpload />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/management-users" element={<ManagementUsers />} />

        {/* <Route element={<ProtectedRoutes />}> */}
        {/* </Route> */}

        {/* <Route element={<ProtectedRoutes role="admin" />}> */}
        {/* </Route> */}
      </Routes>
    </Router>
  );
}
export default App;