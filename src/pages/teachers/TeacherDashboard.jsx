import { Sidebar, Cards } from "../../components";
import { User, BookOpen, FileText } from "lucide-react"; 
import "react-toastify/dist/ReactToastify.css";


const dummyTeacherData = {
  students: 30,          
  resultsSubmitted: 25,  
  pendingReviews: 5,     
};

const dummyClassData = {
  totalStudents: 150,  
  totalClasses: 10,     
};

export default function TeacherDashboard() {
  return (
    <Sidebar activePage="dashboard" alertPages="dashboard">
      <div className="flex flex-col p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Teacher Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Cards
            title="Students Assigned"
            icon={<User size={40} className="text-green-500" />}
            number={dummyTeacherData.students}
            description="Total Students"
          />
          <Cards
            title="Results Submitted"
            icon={<BookOpen size={40} className="text-blue-500" />}
            number={dummyTeacherData.resultsSubmitted}
            description="Grades Entered"
          />
          <Cards
            title="Pending Reviews"
            icon={<FileText size={40} className="text-red-500" />}
            number={dummyTeacherData.pendingReviews}
            description="Awaiting Review"
          />
        </div>
      </div>

      <div className="flex flex-col p-6 bg-gray-100 mt-6">
        <h2 className="text-2xl font-bold mb-6">School Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Cards
            title="Total Students"
            icon={<User size={40} className="text-green-500" />}
            number={dummyClassData.totalStudents}
            description="School-Wide"
          />
          <Cards
            title="Total Classes"
            icon={<BookOpen size={40} className="text-blue-500" />}
            number={dummyClassData.totalClasses}
            description="School-Wide"
          />
        </div>
      </div>
    </Sidebar>
  );
}