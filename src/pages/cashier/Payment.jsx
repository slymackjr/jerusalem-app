import { Sidebar, Pagination, Cards, AddPaymentModal } from "../../components";
import { useState } from "react";
import { DollarSign, FileText, Edit } from "lucide-react"; // Added relevant icons
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dummy Data
const dummyStudentPayments = [
  { id: "STU001", name: "John Mushi", form: "Form 1", totalFees: 50000, paid: 30000, dateLastPaid: "2025-03-01", resultsWithheld: false },
  { id: "STU002", name: "Amina Juma", form: "Form 2", totalFees: 50000, paid: 20000, dateLastPaid: "2025-02-15", resultsWithheld: true },
  { id: "STU003", name: "Peter Nyerere", form: "Form 3", totalFees: 60000, paid: 60000, dateLastPaid: "2025-03-03", resultsWithheld: false },
  { id: "STU004", name: "Fatuma Ali", form: "Form 4", totalFees: 60000, paid: 15000, dateLastPaid: "2025-01-10", resultsWithheld: true },
  { id: "STU005", name: "David Kweka", form: "Form 1", totalFees: 50000, paid: 40000, dateLastPaid: "2025-03-02", resultsWithheld: false },
];


export default function Payment() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editPayment, setEditPayment] = useState(null);

  // Calculate Today’s Collections (assuming today is March 3, 2025, for dummy data)
  const today = "2025-03-03";
  const todaysCollections = dummyStudentPayments
    .filter((student) => student.dateLastPaid === today)
    .reduce((sum, student) => sum + (student.dateLastPaid === today ? student.paid : 0), 0);

  // Calculate Payment Progress (percentage of students fully paid)
  const fullyPaidStudents = dummyStudentPayments.filter((s) => s.paid >= s.totalFees).length;
  const paymentProgress = ((fullyPaidStudents / dummyStudentPayments.length) * 100).toFixed(1);

  // Filter students based on search
  const filteredStudents = dummyStudentPayments.filter((student) =>
    [student.id, student.name, student.form]
      .map((field) => field.toLowerCase())
      .some((field) => field.includes(search.toLowerCase()))
  );
  const pageCount = Math.ceil(filteredStudents.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const displayedStudents = filteredStudents.slice(startIndex, startIndex + rowsPerPage);

  const handlePageClick = (data) => setCurrentPage(data.selected);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(0);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setEditPayment(null);
  };

  const handleEditPayment = (student) => {
    setEditPayment(student);
    setModalOpen(true);
  };

  // Simulate payment update with dummy data
  const updatePayment = (updatedStudent) => {
    const updatedPayments = dummyStudentPayments.map((student) =>
      student.id === updatedStudent.id ? { ...student, ...updatedStudent, dateLastPaid: today } : student
    );
    // Normally, this would be a mutation with axiosInstance.put
    toast.success("Payment updated successfully!", { position: "top-center" });
    // Update dummy data (in real app, invalidate query)
    dummyStudentPayments.length = 0;
    dummyStudentPayments.push(...updatedPayments);
    closeModal();
  };

  return (
    <Sidebar activePage="dashboard" alertPages="dashboard">
      <div className="p-6 bg-white shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Cashier Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Cards
            title="Today's Collections"
            icon={<DollarSign size={40} className="text-green-500" />}
            number={todaysCollections}
            description="TZS Processed Today"
          />
          <Cards
            title="Pending Payments"
            icon={<FileText size={40} className="text-red-500" />}
            number={dummyStudentPayments.reduce((sum, s) => sum + (s.totalFees - s.paid), 0)}
            description="TZS Outstanding"
          />
          <Cards
            title="Payment Progress"
            icon={<DollarSign size={40} className="text-blue-500" />}
            number={`${paymentProgress}%`}
            description="Students Paid Up"
          />
        </div>

        {/* Search and Record Payment Button */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full md:w-1/3"
            placeholder="Search by ID, name, form..."
            value={search}
            onChange={handleSearch}
          />
          <div className="flex gap-4">
            <select
              className="border px-4 py-2 rounded-lg"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            >
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={15}>15 rows</option>
              <option value={20}>20 rows</option>
            </select>
            <button
              onClick={openModal}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <DollarSign size={20} className="mr-2" /> Record Payment
            </button>
          </div>
        </div>

        {/* Pending Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border bg-white shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-3">Student ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Form</th>
                <th className="border p-3">Total Fees (TZS)</th>
                <th className="border p-3">Paid (TZS)</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100 transition-colors">
                  <td className="border p-3">{student.id}</td>
                  <td className="border p-3">{student.name}</td>
                  <td className="border p-3">{student.form}</td>
                  <td className="border p-3">{student.totalFees}</td>
                  <td className="border p-3">{student.paid}</td>
                  <td className="border p-3">
                    {student.paid >= student.totalFees
                      ? "Fully Paid"
                      : student.resultsWithheld
                      ? "Fees Unpaid, Results Withheld"
                      : "Partially Paid"}
                  </td>
                  <td className="border p-3 flex space-x-4 justify-center">
                    <button
                      onClick={() => handleEditPayment(student)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Update Payment"
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

        {/* Payment Modal */}
        <AddPaymentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          editPayment={editPayment}
          onSave={updatePayment}
        />
      </div>
    </Sidebar>
  );
}