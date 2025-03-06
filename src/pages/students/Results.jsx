import { Sidebar, Pagination } from "../../components";
import { useState } from "react";
import { Download, BookOpen, Trophy, Star, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dummy Data for a Student
const dummyStudentResults = {
  id: "STU001",
  name: "John Mushi",
  form: "Form 1",
  stream: "Stream A",
  periods: {
    Midterms: [
      { subject: "English", score: 85, comment: "Great improvement!" },
      { subject: "Kiswahili", score: 72, comment: "Good effort." },
      { subject: "Mathematics", score: 45, comment: "Needs more practice." },
      { subject: "Biology", score: 60, comment: "Satisfactory." },
      { subject: "History", score: 92, comment: "Outstanding work!" },
    ],
    Mock: [
      { subject: "English", score: 78, comment: "Consistent performance." },
      { subject: "Kiswahili", score: 68, comment: "Well done." },
      { subject: "Mathematics", score: 55, comment: "Improving." },
      { subject: "Biology", score: 65, comment: "Good progress." },
      { subject: "History", score: 88, comment: "Excellent!" },
    ],
    Annual: [
      { subject: "English", score: 90, comment: "Top performer!" },
      { subject: "Kiswahili", score: 75, comment: "Strong grasp." },
      { subject: "Mathematics", score: 62, comment: "Passed with effort." },
      { subject: "Biology", score: 70, comment: "Solid work." },
      { subject: "History", score: 95, comment: "Exceptional!" },
    ],
    Other: [
      { subject: "English", score: 82, comment: "Very good." },
      { subject: "Kiswahili", score: 60, comment: "Keep practicing." },
      { subject: "Mathematics", score: 48, comment: "More focus needed." },
    ],
  },
};

const getGradeIcon = (score) => {
  if (score >= 80) return <Trophy className="text-yellow-500" size={20} />;
  if (score >= 65) return <Star className="text-green-500" size={20} />;
  if (score >= 50) return <CheckCircle className="text-blue-500" size={20} />;
  if (score >= 40) return <AlertTriangle className="text-orange-500" size={20} />;
  return <XCircle className="text-red-500" size={20} />;
};

const getGradeDescription = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Pass";
  if (score >= 40) return "Poor";
  return "Failure";
};

export default function Results() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedPeriod, setSelectedPeriod] = useState("Midterms");

  // Filter results based on search (though typically one student's data)
  const filteredResults = dummyStudentResults.periods[selectedPeriod].filter((result) =>
    result.subject.toLowerCase().includes(search.toLowerCase())
  );
  const pageCount = Math.ceil(filteredResults.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const displayedResults = filteredResults.slice(startIndex, startIndex + rowsPerPage);

  const handlePageClick = (data) => setCurrentPage(data.selected);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(0);
  };

  const handleDownload = () => {
    const results = dummyStudentResults.periods[selectedPeriod];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Subject,Score,Grade,Comment"].join(",") +
      "\n" +
      results
        .map((r) => `${r.subject},${r.score},${getGradeDescription(r.score)},"${r.comment}"`)
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${dummyStudentResults.form}_${dummyStudentResults.stream}_${selectedPeriod}_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded ${selectedPeriod} results!`, { position: "top-center" });
  };

  return (
    <Sidebar activePage="results" alertPages="results">
      <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center">
          <BookOpen className="text-blue-600 mr-3" size={32} />
          My Results - {dummyStudentResults.form} {dummyStudentResults.stream}
        </h1>

        {/* Period Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          {["Midterms", "Mock", "Annual", "Other"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 ${
                selectedPeriod === period
                  ? "bg-blue-600 shadow-lg"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Search and Download Section */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            placeholder="Search by subject..."
            value={search}
            onChange={handleSearch}
          />
          <div className="flex gap-4">
            <select
              className="border px-4 py-2 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            >
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={15}>15 rows</option>
              <option value={20}>20 rows</option>
            </select>
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors shadow-md"
            >
              <Download size={20} className="mr-2" /> Download Results
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full min-w-[600px] bg-white">
            <thead className="bg-blue-100">
              <tr>
                <th className="border p-3 text-left text-gray-700 font-semibold">Subject</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Score</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Grade</th>
                <th className="border p-3 text-left text-gray-700 font-semibold">Comment</th>
              </tr>
            </thead>
            <tbody>
              {displayedResults.map((result, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors animate-fade-in"
                >
                  <td className="border p-3 text-gray-800">{result.subject}</td>
                  <td className="border p-3 text-gray-800">{result.score}</td>
                  <td className="border p-3 flex items-center gap-2">
                    {getGradeIcon(result.score)}
                    <span className="text-gray-800 font-medium">{getGradeDescription(result.score)}</span>
                  </td>
                  <td className="border p-3 text-gray-600 italic">{result.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />

        {/* Fun Motivation Message */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg shadow-md text-center animate-bounce-in">
          <p className="text-lg font-semibold text-yellow-800">
            Keep shining, {dummyStudentResults.name}! Your hard work is paying off! 🌟
          </p>
        </div>
      </div>
    </Sidebar>
  );
}
