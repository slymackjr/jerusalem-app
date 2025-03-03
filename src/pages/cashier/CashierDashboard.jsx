import { Sidebar, Cards } from "../../components";
import { DollarSign, FileText, User } from "lucide-react"; // Cashier-specific icons

import "react-toastify/dist/ReactToastify.css";

const dummyCashierData = {
  paymentsToday: 1500,    
  pendingPayments: 2000,
  totalTransactions: 50,  
};

const dummySchoolData = {
  totalStudents: 150,    
  totalInvoices: 200,    
};

export default function CashierDashboard() {
  return (
    <Sidebar activePage="dashboard" alertPages="dashboard">
      <div className="flex flex-col p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Cashier Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Cards
            title="Payments Today"
            icon={<DollarSign size={40} className="text-green-500" />}
            number={dummyCashierData.paymentsToday}
            description="Total Collected"
          />
          <Cards
            title="Pending Payments"
            icon={<FileText size={40} className="text-red-500" />}
            number={dummyCashierData.pendingPayments}
            description="Outstanding"
          />
          <Cards
            title="Transactions"
            icon={<DollarSign size={40} className="text-blue-500" />}
            number={dummyCashierData.totalTransactions}
            description="Processed Today"
          />
        </div>
      </div>

      <div className="flex flex-col p-6 bg-gray-100 mt-6">
        <h2 className="text-2xl font-bold mb-6">School Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Cards
            title="Total Students"
            icon={<User size={40} className="text-green-500" />}
            number={dummySchoolData.totalStudents}
            description="School-Wide"
          />
          <Cards
            title="Total Invoices"
            icon={<FileText size={40} className="text-blue-500" />}
            number={dummySchoolData.totalInvoices}
            description="School-Wide"
          />
        </div>
      </div>
    </Sidebar>
  );
}