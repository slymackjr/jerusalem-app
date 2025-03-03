import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { InvoiceReport, Home, AllMembers, AllUsers, Login, AllDiscounts, Profile, CompanyProfile, AllPackages, StudentDashboard, AdminDashboard, TeacherDashboard, CashierDashboard, Payment } from "./pages";
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
        
        {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/all-members" element={<AllMembers />} />
          <Route path="/invoice-report" element={<InvoiceReport />} />
          <Route path="/profile" element={<Profile />} />
        {/* </Route> */}

        {/* <Route element={<ProtectedRoutes role="admin" />}> */}
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/all-discounts" element={<AllDiscounts />} />
          <Route path="/all-packages" element={<AllPackages />} />
          <Route path="/company" element={<CompanyProfile />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;