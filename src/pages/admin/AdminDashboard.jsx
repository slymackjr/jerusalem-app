import { Sidebar, Cards } from "../../components";
import { Calendar, Clock, FileText, User } from "lucide-react"; // Admin-specific icons
import "react-toastify/dist/ReactToastify.css";
import { Bar } from "react-chartjs-2";
import { useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const dummyTotals = {
  members: 150,    
  invoices: 200,   
  packages: 10,   
  discounts: 5,  
};

const dummyReportData = {
  members: [
    { month: "Jan", total: 20 },
    { month: "Feb", total: 25 },
    { month: "Mar", total: 30 },
    { month: "Apr", total: 15 },
    { month: "May", total: 10 },
    { month: "Jun", total: 35 },
  ],
  paid: [
    { month: "Jan", total: 15 },
    { month: "Feb", total: 20 },
    { month: "Mar", total: 25 },
    { month: "Apr", total: 10 },
    { month: "May", total: 8 },
    { month: "Jun", total: 30 },
  ],
  invoices: [
    { month: "Jan", total: 5000 },
    { month: "Feb", total: 6000 },
    { month: "Mar", total: 7000 },
    { month: "Apr", total: 4000 },
    { month: "May", total: 3000 },
    { month: "Jun", total: 8000 },
  ],
};

export default function AdminDashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const barChartRef = useRef(null);

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear - i);
  };

  const barData = {
    labels: dummyReportData.members.map((item) => `${item.month}`),
    datasets: [
      {
        label: "New Members",
        data: dummyReportData.members.map((item) => item.total),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: "Paid Members",
        data: dummyReportData.paid.map((item) => item.total),
        borderColor: "rgba(26, 4, 230, 1)",
        backgroundColor: "rgba(26, 4, 230, 0.8)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: "Invoice Amount",
        data: dummyReportData.invoices.map((item) => item.total),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.8)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  return (
    <Sidebar activePage="dashboard" alertPages="dashboard">
      <div className="flex flex-col p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Cards
            title="Members"
            icon={<User size={40} className="text-green-500" />}
            number={dummyTotals.members}
            description="Total Members"
          />
          <Cards
            title="Invoices"
            icon={<FileText size={40} className="text-blue-500" />}
            number={dummyTotals.invoices}
            description="Total Invoices"
          />
          <Cards
            title="Packages"
            icon={<Calendar size={40} className="text-yellow-500" />}
            number={dummyTotals.packages}
            description="Total Packages"
          />
          <Cards
            title="Discounts"
            icon={<Clock size={40} className="text-red-500" />}
            number={dummyTotals.discounts}
            description="Total Discounts"
          />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
        <div className="mb-6 flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-white">Monthly Reports</h2>
        </div>
        <div className="flex justify-end gap-4 mb-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full md:w-auto px-4 py-2 border rounded-lg"
          >
            {generateYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full h-80 md:h-96">
          <Bar
            ref={barChartRef}
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                tooltip: { mode: "index", intersect: false },
              },
              scales: {
                x: {
                  ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col p-6 bg-gray-100 mt-6">
        <h2 className="text-2xl font-bold mb-6">General Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Cards
            title="Members"
            icon={<User size={40} className="text-green-500" />}
            number={dummyTotals.members}
            description="Total Members"
          />
          <Cards
            title="Invoices"
            icon={<FileText size={40} className="text-blue-500" />}
            number={dummyTotals.invoices}
            description="Total Invoices"
          />
        </div>
      </div>
    </Sidebar>
  );
}