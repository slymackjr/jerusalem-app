import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { InvoiceReport, Home, Login, Profile, CompanyProfile, StudentDashboard, AdminDashboard, TeacherDashboard, CashierDashboard, Payment, Results, StudentProfile, CashierProfile } from "./pages";
// import { ProtectedRoutes } from "./Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/cashier/dashboard" element={<CashierDashboard />} />
        <Route path="/cashier/payment" element={<Payment />} />
        <Route path="/student/results" element={<Results />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/cashier/profile" element={<CashierProfile />} />
        
        {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/invoice-report" element={<InvoiceReport />} />
          <Route path="/profile" element={<Profile />} />
        {/* </Route> */}

        {/* <Route element={<ProtectedRoutes role="admin" />}> */}
          <Route path="/company" element={<CompanyProfile />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;