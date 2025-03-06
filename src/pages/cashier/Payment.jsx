import { Sidebar, Pagination, Cards, AddPaymentModal } from "../../components";
import { useState, useRef } from "react";
import { DollarSign, FileText, Edit, Download, Upload } from "lucide-react";
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

export default function CashierDashboard() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formFilter, setFormFilter] = useState("All"); // Form filter state
  const [isModalOpen, setModalOpen] = useState(false);
  const [editPayment, setEditPayment] = useState(null);
  const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadedCSV, setUploadedCSV] = useState(null); // Simulated uploaded CSV content

  // Calculate Today’s Collections (assuming today is March 3, 2025)
  const today = "2025-03-03";
  const todaysCollections = dummyStudentPayments
    .filter((student) => student.dateLastPaid === today)
    .reduce((sum, student) => sum + (student.dateLastPaid === today ? student.paid : 0), 0);

  // Calculate Payment Progress
  const fullyPaidStudents = dummyStudentPayments.filter((s) => s.paid >= s.totalFees).length;
  const paymentProgress = ((fullyPaidStudents / dummyStudentPayments.length) * 100).toFixed(1);

  // Filter students based on search and form
  const filteredStudents = dummyStudentPayments.filter((student) => {
    const matchesSearch = [student.id, student.name, student.form]
      .map((field) => field.toLowerCase())
      .some((field) => field.includes(search.toLowerCase()));
    const matchesForm = formFilter === "All" || student.form === formFilter;
    return matchesSearch && matchesForm;
  });
  const pageCount = Math.ceil(filteredStudents.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const displayedStudents = filteredStudents.slice(startIndex, startIndex + rowsPerPage);

  const handlePageClick = (data) => setCurrentPage(data.selected);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(0);
  };
  const handleFormFilter = (event) => {
    setFormFilter(event.target.value);
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

  const updatePayment = (updatedStudent) => {
    const updatedPayments = dummyStudentPayments.map((student) =>
      student.id === updatedStudent.id ? { ...student, ...updatedStudent, dateLastPaid: today } : student
    );
    toast.success("Payment updated successfully!", { position: "top-center" });
    dummyStudentPayments.length = 0;
    dummyStudentPayments.push(...updatedPayments);
    closeModal();
  };

  // Download Modal Logic
  const [downloadForm, setDownloadForm] = useState("Form 1");
  const [downloadStatus, setDownloadStatus] = useState("All");
  const handleDownload = () => {
    const filteredForDownload = dummyStudentPayments.filter((student) => {
      const matchesForm = downloadForm === "All" || student.form === downloadForm;
      const matchesStatus =
        downloadStatus === "All" ||
        (downloadStatus === "Fully Paid" && student.paid >= student.totalFees) ||
        (downloadStatus === "Partially Paid" && student.paid < student.totalFees && !student.resultsWithheld) ||
        (downloadStatus === "Fees Unpaid, Results Withheld" && student.resultsWithheld);
      return matchesForm && matchesStatus;
    });
    const csvContent = "data:text/csv;charset=utf-8," +
      ["ID,Name,Form,Total Fees,Paid,Status"].join(",") + "\n" +
      filteredForDownload.map(s => `${s.id},${s.name},${s.form},${s.totalFees},${s.paid},${s.paid >= s.totalFees ? "Fully Paid" : s.resultsWithheld ? "Fees Unpaid, Results Withheld" : "Partially Paid"}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${downloadForm}_${downloadStatus.replace(/, /g, "_")}_payments.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadModalOpen(false);
  };

  // Upload Modal Logic
  const [uploadForm, setUploadForm] = useState("Form 1");
  const fileInputRef = useRef(null);
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setUploadedCSV(text);
        toast.success(`CSV for ${uploadForm} uploaded successfully!`, { position: "top-center" });
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid CSV file!", { position: "top-center" });
    }
    setUploadModalOpen(false);
  };

  return (
    <Sidebar activePage="dashboard" alertPages="dashboard">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Cashier Dashboard</h1>

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

        {/* Search, Row Select, Form Filter, and Action Buttons */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Search by ID, name, form..."
            value={search}
            onChange={handleSearch}
          />
          <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <select
              className="border px-4 py-2 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-orange-500"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            >
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={15}>15 rows</option>
              <option value={20}>20 rows</option>
            </select>
            <select
              className="border px-4 py-2 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-orange-500"
              value={formFilter}
              onChange={handleFormFilter}
            >
              <option value="All">All Forms</option>
              <option value="Form 1">Form 1</option>
              <option value="Form 2">Form 2</option>
              <option value="Form 3">Form 3</option>
              <option value="Form 4">Form 4</option>
            </select>
            <button
              onClick={openModal}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-700 transition-colors"
            >
              <DollarSign size={20} className="mr-2" /> Record Payment
            </button>
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
            >
              <Download size={20} className="mr-2" /> Download CSV
            </button>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
            >
              <Upload size={20} className="mr-2" /> Upload CSV
            </button>
          </div>
        </div>

        {/* Pending Payments Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full min-w-[600px] border bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left text-gray-700">Student ID</th>
                <th className="border p-3 text-left text-gray-700">Name</th>
                <th className="border p-3 text-left text-gray-700">Form</th>
                <th className="border p-3 text-left text-gray-700">Total Fees (TZS)</th>
                <th className="border p-3 text-left text-gray-700">Paid (TZS)</th>
                <th className="border p-3 text-left text-gray-700">Status</th>
                <th className="border p-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border p-3">{student.id}</td>
                  <td className="border p-3">{student.name}</td>
                  <td className="border p-3">{student.form}</td>
                  <td className="border p-3">{student.totalFees}</td>
                  <td className="border p-3">{student.paid}</td>
                  <td className="border p-3">
                    {student.paid >= student.totalFees ? (
                      <span className="text-green-600 font-semibold">Fully Paid</span>
                    ) : student.resultsWithheld ? (
                      <span className="text-red-600 font-semibold">Fees Unpaid, Results Withheld</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Partially Paid</span>
                    )}
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

        {/* Download Modal */}
        {isDownloadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Download Payments CSV</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Select Form</label>
                  <select
                    value={downloadForm}
                    onChange={(e) => setDownloadForm(e.target.value)}
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Forms</option>
                    <option value="Form 1">Form 1</option>
                    <option value="Form 2">Form 2</option>
                    <option value="Form 3">Form 3</option>
                    <option value="Form 4">Form 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Select Status</label>
                  <select
                    value={downloadStatus}
                    onChange={(e) => setDownloadStatus(e.target.value)}
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Fully Paid">Fully Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                    <option value="Fees Unpaid, Results Withheld">Fees Unpaid, Results Withheld</option>
                  </select>
                </div>
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
          </div>
        )}

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Payments CSV</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Select Form</label>
                  <select
                    value={uploadForm}
                    onChange={(e) => setUploadForm(e.target.value)}
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Form 1">Form 1</option>
                    <option value="Form 2">Form 2</option>
                    <option value="Form 3">Form 3</option>
                    <option value="Form 4">Form 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Upload CSV</label>
                  <input
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    className="w-full border px-4 py-2 rounded-lg"
                  />
                </div>
                <div className="flex justify-end gap-4">
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
          </div>
        )}

        {/* View Uploaded CSV */}
        {uploadedCSV && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
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