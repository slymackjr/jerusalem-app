import { BarChart, Users, Calendar, DollarSign, BookOpen, School, FileText, UserPlus } from "lucide-react";
import { logo3 } from "../assets"; // Assuming your school logo
import { Link } from "react-router-dom";

// Placeholder images (replace with actual URLs or local assets)
const schoolImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"; // School building
const studentsImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"; // Students studying

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-blue-800 text-white py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-opacity-50 bg-gradient-to-r from-blue-900 to-transparent z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-start max-w-lg">
            <div className="flex items-center mb-4">
              <img src={logo3} alt="School Management Logo" className="h-16 w-16 mr-4 rounded-full shadow-lg" />
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">EduTrack</h1>
            </div>
            <p className="text-xl md:text-2xl font-light mb-6 animate-fade-in-down">
              Empowering Schools with Seamless Payment & Result Management
            </p>
            <p className="text-base md:text-lg mb-8">
              Streamline student payments and academic results for Forms 1-4 with our powerful, user-friendly platform.
            </p>
            <Link
              to="/login"
              className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center shadow-md"
            >
              Get Started <DollarSign size={20} className="ml-2" />
            </Link>
          </div>
          <div className="hidden md:block max-w-md animate-fade-in-right">
            <img src={schoolImage} alt="School Building" className="rounded-lg shadow-xl transform hover:scale-105 transition-transform" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-200 to-transparent"></div>
      </div>
      <div className="py-16 px-6 md:px-12 lg:px-24 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Empowering Our Students</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img src={studentsImage} alt="Students Studying" className="rounded-lg shadow-xl w-full md:w-1/2" />
          <p className="text-lg text-gray-600">
            EduTrack puts students at the heart of education, helping them stay on top of their payments and excel in their studies across Forms 1-4.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-6 md:p-12 lg:p-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose EduTrack?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center hover:bg-blue-50 transition duration-300 transform hover:-translate-y-2">
            <Users className="text-blue-600 mr-4" size={40} />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Total Students</h3>
              <p className="text-3xl font-bold text-gray-800">250</p>
              <p className="text-gray-500">Across Forms 1-4</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center hover:bg-green-50 transition duration-300 transform hover:-translate-y-2">
            <DollarSign className="text-green-600 mr-4" size={40} />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Payments Tracked</h3>
              <p className="text-3xl font-bold text-gray-800">85%</p>
              <p className="text-gray-500">Fees Collected</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center hover:bg-yellow-50 transition duration-300 transform hover:-translate-y-2">
            <BookOpen className="text-yellow-600 mr-4" size={40} />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Results Managed</h3>
              <p className="text-3xl font-bold text-gray-800">300</p>
              <p className="text-gray-500">Grades Recorded</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center hover:bg-purple-50 transition duration-300 transform hover:-translate-y-2">
            <School className="text-purple-600 mr-4" size={40} />
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Forms Supported</h3>
              <p className="text-3xl font-bold text-gray-800">1-4</p>
              <p className="text-gray-500">Tanzanian Curriculum</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-orange-50 transition duration-300 transform hover:scale-105">
            <DollarSign className="text-orange-600 mb-4 mx-auto" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 text-center">Payment Collection</h3>
            <p className="text-gray-500 text-center mt-2">
              Effortlessly collect and track student fees with real-time updates.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-green-50 transition duration-300 transform hover:scale-105">
            <BookOpen className="text-green-600 mb-4 mx-auto" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 text-center">Result Management</h3>
            <p className="text-gray-500 text-center mt-2">
              Record and access student grades for all subjects securely.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-50 transition duration-300 transform hover:scale-105">
            <FileText className="text-blue-600 mb-4 mx-auto" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 text-center">Invoice Reports</h3>
            <p className="text-gray-500 text-center mt-2">
              Generate detailed payment and progress reports instantly.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-purple-50 transition duration-300 transform hover:scale-105">
            <UserPlus className="text-purple-600 mb-4 mx-auto" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 text-center">Student Registration</h3>
            <p className="text-gray-500 text-center mt-2">
              Add new students and manage their profiles with ease.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-red-50 transition duration-300 transform hover:scale-105">
            <BarChart className="text-red-600 mb-4 mx-auto" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 text-center">Analytics Dashboard</h3>
            <p className="text-gray-500 text-center mt-2">
              Visualize payment and academic performance trends.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:bg-yellow-50 transition duration-300 transform hover:scale-105">
            <Calendar className="text-yellow-600 mb-4 mx-auto" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 text-center">Timetable Integration</h3>
            <p className="text-gray-500 text-center mt-2">
              Schedule classes and exams efficiently for all Forms.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-16 px-6 md:px-12 lg:px-24 bg-orange-600 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-opacity-30 bg-gradient-to-r from-orange-800 to-transparent z-0"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-pulse">Ready to Transform Your School?</h2>
          <p className="text-lg md:text-xl mb-8">
            Join hundreds of schools using EduTrack to manage payments and results effortlessly.
          </p>
          <Link
            to="/login"
            className="bg-white text-orange-600 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center shadow-lg"
          >
            Start Now <Users size={24} className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={logo3} alt="EduTrack Logo" className="h-10 w-10 mr-3 rounded-full" />
            <span className="text-lg font-semibold">EduTrack</span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/slymackjr" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/jofrey-nyamasheki-9bb8781ab" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">LinkedIn</a>
            <Link to="/contact" className="hover:text-orange-400 transition-colors">Contact Us</Link>
          </div>
        </div>
        <p className="text-center mt-4 text-sm">© 2025 EduTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}