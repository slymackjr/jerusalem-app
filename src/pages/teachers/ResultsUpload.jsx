import { Sidebar, Pagination } from "../../components";
import { useState } from "react";
import { Edit, Download, Upload, BookOpen, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

// Dummy Data
const dummyStudents = [
  { id: "STU001", name: "John Mushi", form: "Form 1", results: { English: 85, Kiswahili: 72, Mathematics: 45 } },
  { id: "STU002", name: "Amina Juma", form: "Form 2", results: { English: 78, Kiswahili: 68, Mathematics: 55 } },
  { id: "STU003", name: "Peter Nyerere", form: "Form 3", results: { English: 90, Kiswahili: 75, Biology: 70 } },
  { id: "STU004", name: "Fatuma Ali", form: "Form 4", results: { English: 82, Physics: 60, Chemistry: 48 } },
  { id: "STU005", name: "David Kweka", form: "Form 1", results: { English: 88, Kiswahili: 65, History: 92 } },
];

// Subjects assigned to the teacher
const teacherSubjects = ["English", "Kiswahili", "Mathematics", "Biology", "Physics", "Chemistry", "History"];

const ResultsUploadModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState("Form 1");
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");

  if (!isOpen) return null;

  const filteredStudents = dummyStudents.filter(
    (student) =>
      student.form === form &&
      student.name.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent || !subject) {
      toast.error("Please select a student and subject!", { position: "top-center" });
      return;
    }
    const resultData = { id: selectedStudent.id, form, subject, score: parseInt(score) };
    onSave(resultData);
    setStudentSearch("");
    setSelectedStudent(null);
    setSubject("");
    setScore("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Upload Result</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={form}
            onChange={(e) => {
              setForm(e.target.value);
              setSelectedStudent(null);
              setStudentSearch("");
            }}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="Form 1">Form 1</option>
            <option value="Form 2">Form 2</option>
            <option value="Form 3">Form 3</option>
            <option value="Form 4">Form 4</option>
          </select>
          <input
            type="text"
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Search student by name..."
          />
          <div className="max-h-40 overflow-y-auto border rounded-lg bg-gray-50">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`p-2 cursor-pointer hover:bg-blue-100 transition-colors ${
                  selectedStudent?.id === student.id ? "bg-blue-200" : ""
                }`}
              >
                {student.name} ({student.id})
              </div>
            ))}
          </div>
          {selectedStudent && (
            <div className="bg-blue-50 p-4 rounded-lg animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedStudent.name}’s Results</h3>
              <div className="grid grid-cols-2 gap-2">
                {teacherSubjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubject(sub)}
                    className={`p-2 rounded-lg text-left ${
                      subject === sub ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                    } transition-colors`}
                  >
                    {sub}: {selectedStudent.results[sub] || "N/A"}
                  </button>
                ))}
              </div>
              {subject && (
                <input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 mt-2"
                  placeholder={`Enter ${subject} score (0-100)`}
                  min="0"
                  max="100"
                  required
                />
              )}
            </div>
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1 flex items-center justify-center"
              disabled={!selectedStudent || !subject}
            >
              <Upload size={20} className="mr-2" />
              Upload
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors flex-1 flex items-center justify-center"
            >
              <X size={20} className="mr-2" />
              Exit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ResultsUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editResult: PropTypes.object,
};

export default function ResultsUpload() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);
  const [editResult, setEditResult] = useState(null);
  const [formFilter, setFormFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  // Filter students
  const filteredStudents = dummyStudents.filter((student) => {
    const matchesSearch = [student.id, student.name]
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

  const openUploadModal = () => setUploadModalOpen(true);
  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setEditResult(null);
  };

  const handleEditResult = (student, subject) => {
    setEditResult({ id: student.id, form: student.form, subject, score: student.results[subject] });
    setUploadModalOpen(true);
  };

  const handleSaveResult = (resultData) => {
    const updatedStudents = dummyStudents.map((student) =>
      student.id === resultData.id
        ? { ...student, results: { ...student.results, [resultData.subject]: resultData.score } }
        : student
    );
    dummyStudents.length = 0;
    dummyStudents.push(...updatedStudents);
    toast.success("Result saved successfully!", { position: "top-center" });
  };

  const handleDownload = (form) => {
    const filteredForDownload = dummyStudents.filter((s) => form === "All" || s.form === form);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Student ID,Name,Form," + teacherSubjects.join(",")].join(",") +
      "\n" +
      filteredForDownload.map((s) =>
        [s.id, s.name, s.form, ...teacherSubjects.map((sub) => s.results[sub] || "N/A")].join(",")
      ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${form}_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadModalOpen(false);
    toast.success(`Downloaded ${form} results!`, { position: "top-center" });
  };

  return (
    <Sidebar activePage="results-upload" alertPages="results-upload">
      <div className="p-6 bg-white shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center">
          <BookOpen className="text-blue-600 mr-3" size={32} />
          Results Upload
        </h1>

        {/* Search, Filters, and Buttons */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Search by ID or name..."
            value={search}
            onChange={handleSearch}
          />
            <select
              className="border px-4 py-2 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            >
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={15}>15 rows</option>
              <option value={20}>20 rows</option>
            </select>
            <select
              className="border px-4 py-2 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
              value={formFilter}
              onChange={(e) => setFormFilter(e.target.value)}
            >
              <option value="All">All Forms</option>
              <option value="Form 1">Form 1</option>
              <option value="Form 2">Form 2</option>
              <option value="Form 3">Form 3</option>
              <option value="Form 4">Form 4</option>
            </select>
            <select
              className="border px-4 py-2 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="All">All Subjects</option>
              {teacherSubjects.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            <button
              onClick={openUploadModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Upload size={20} className="mr-2" /> Upload Results
            </button>
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Download size={20} className="mr-2" /> Download Results
            </button>
          </div>

        {/* Results Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full min-w-[600px] bg-white">
            <thead className="bg-blue-100">
              <tr>
                <th className="border p-3 text-left text-gray-700 font-semibold">Student ID</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Name</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Form</th>
                {subjectFilter === "All"
                  ? teacherSubjects.map((sub) => (
                      <th key={sub} className="border p-3 text-left text-gray-700 font-semibold">{sub}</th>
                    ))
                  : <th className="border p-3 text-left text-gray-700 font-semibold">{subjectFilter}</th>
                }
                <th className="border p-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors animate-fade-in">
                  <td className="border p-3">{student.id}</td>
                  <td className="border p-3">{student.name}</td>
                  <td className="border p-3">{student.form}</td>
                  {subjectFilter === "All"
                    ? teacherSubjects.map((sub) => (
                        <td key={sub} className="border p-3">{student.results[sub] || "N/A"}</td>
                      ))
                    : <td className="border p-3">{student.results[subjectFilter] || "N/A"}</td>
                  }
                  <td className="border p-3 flex space-x-4 justify-center">
                    <button
                      onClick={() => handleEditResult(student, subjectFilter === "All" ? "English" : subjectFilter)}
                      className="text-blue-600 hover:text-blue-800 transform hover:scale-110 transition-transform"
                      title="Edit Result"
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

        {/* Upload Modal */}
        <ResultsUploadModal
          isOpen={isUploadModalOpen}
          onClose={closeUploadModal}
          onSave={handleSaveResult}
          editResult={editResult}
        />

        {/* Download Modal */}
        {isDownloadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Download Student Results</h2>
                <button
                  onClick={() => setDownloadModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <select
                onChange={(e) => handleDownload(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 mb-4"
              >
                <option value="">Select Form to Download</option>
                <option value="All">All Forms</option>
                <option value="Form 1">Form 1</option>
                <option value="Form 2">Form 2</option>
                <option value="Form 3">Form 3</option>
                <option value="Form 4">Form 4</option>
              </select>
              <button
                onClick={() => setDownloadModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors w-full flex items-center justify-center"
              >
                <X size={20} className="mr-2" />
                Exit
              </button>
            </div>
          </div>
        )}

        {/* Motivational Message */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-md text-center animate-bounce-in">
          <p className="text-lg font-semibold text-blue-800">
            Keep shaping the future by uploading student results! 📚
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

// const { data: students = [], isPending } = useQuery({
//     queryKey: ["teacher-students"],
//     queryFn: () => axiosInstance.get("/api/teacher/students").then(res => res.data),
//   });
//   const { mutate: saveResult } = useMutation({
//     mutationFn: (resultData) => axiosInstance.post("/api/results/upload", resultData),
//     onSuccess: () => {
//       toast.success("Result uploaded!");
//       queryClient.invalidateQueries("teacher-students");
//     },
//   });
//   if (isPending) return <LoadingComponent />;