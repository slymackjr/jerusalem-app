import { Sidebar,Cards} from "../../components";
import { DollarSign, BookOpen, User, Calendar, FileText } from "lucide-react"; 
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react"; 


const dummyStudentData = {
  feesDue: 300,        
  resultsCount: 5,       
  name: "John Doe",     
  studentId: "STU12345", 
};

const dummyClassData = {
  totalClassmates: 30,   
  pendingAssignments: 3, 
  upcomingExams: 2,     
};

export default function StudentDashboard() {
  const [viewMode, setViewMode] = useState("personal"); 

  return (
    <Sidebar activePage="dashboard" alertPages="dashboard">
      <div className="flex flex-col p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Student Dashboard - {dummyStudentData.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Cards
            title="Fees Due"
            icon={<DollarSign size={40} className="text-red-500" />}
            number={dummyStudentData.feesDue}
            description="Amount Due"
          />
          <Cards
            title="Results"
            icon={<BookOpen size={40} className="text-blue-500" />}
            number={dummyStudentData.resultsCount}
            description="Subjects Graded"
          />
          <Cards
            title="Student ID"
            icon={<User size={40} className="text-green-500" />}
            number={dummyStudentData.studentId}
            description="Your ID"
          />
        </div>
      </div>

      <div className="flex flex-col p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Class Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Cards
            title="Classmates"
            icon={<User size={40} className="text-green-500" />}
            number={dummyClassData.totalClassmates}
            description="Total in Class"
          />
          <Cards
            title="Pending Assignments"
            icon={<FileText size={40} className="text-red-500" />}
            number={dummyClassData.pendingAssignments}
            description="Due Soon"
          />
          <Cards
            title="Upcoming Exams"
            icon={<Calendar size={40} className="text-yellow-500" />}
            number={dummyClassData.upcomingExams}
            description="Scheduled"
          />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
        <div className="flex justify-between items-center mb-4">
          {["personal", "class"].map((mode) => (
            <button
              key={mode}
              className={`px-4 py-2 text-sm font-semibold rounded-lg mx-2 transition-colors ${
                viewMode === mode
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setViewMode(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)} View
            </button>
          ))}
        </div>
        <p className="text-gray-600">
          {viewMode === "personal"
            ? "Showing your personal details."
            : "Showing class overview."}
        </p>
      </div>
    </Sidebar>
  );
}