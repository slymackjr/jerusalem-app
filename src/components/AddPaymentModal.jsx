import { X, User, DollarSign, Calendar } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPaymentModal({ isOpen, onClose, editPayment, onSave }) {
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editPayment) {
      setStudentId(editPayment.id);
      setAmount((editPayment.totalFees - editPayment.paid).toString()); // Remaining amount due
      setDate(new Date().toISOString().split("T")[0]); // Default to today for updates
    } else {
      resetForm();
    }
  }, [editPayment]);

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

  const resetForm = () => {
    setStudentId("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const student = dummyStudentPayments.find((s) => s.id === studentId);
    if (!student && !editPayment) {
      toast.error("Student ID not found!", { position: "top-center" });
      return;
    }

    const updatedStudent = {
      id: editPayment ? editPayment.id : studentId,
      name: editPayment ? editPayment.name : student.name,
      form: editPayment ? editPayment.form : student.form,
      totalFees: editPayment ? editPayment.totalFees : student.totalFees,
      paid: (editPayment ? editPayment.paid : student.paid) + parseInt(amount),
      resultsWithheld: (editPayment ? editPayment.totalFees : student.totalFees) > ((editPayment ? editPayment.paid : student.paid) + parseInt(amount)),
    };

    onSave(updatedStudent);
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter(value);
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white shadow-lg p-6 max-w-md w-full mx-4 md:mx-0 relative rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <h1 className="text-2xl font-bold text-center">{editPayment ? "Update Payment" : "Record Payment"}</h1>
        <form className="grid grid-cols-1 gap-4" onSubmit={handleFormSubmit}>
          <div className="relative">
            <User className="absolute left-2 top-2 text-gray-400" />
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => handleInputChange(e, setStudentId)}
              className={`border p-2 rounded-lg pl-10 w-full focus:outline-none ${errors.studentId ? "border-red-500 ring-red-500" : "focus:ring-2 focus:ring-green-500"}`}
              required
              disabled={!!editPayment} // Disable if editing
            />
            {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
          </div>
          <div className="relative">
            <DollarSign className="absolute left-2 top-2 text-gray-400" />
            <input
              type="number"
              name="amount"
              placeholder="Amount (TZS)"
              value={amount}
              onChange={(e) => handleInputChange(e, setAmount)}
              className={`border p-2 rounded-lg pl-10 w-full focus:outline-none ${errors.amount ? "border-red-500 ring-red-500" : "focus:ring-2 focus:ring-green-500"}`}
              required
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>
          <div className="relative">
            <Calendar className="absolute left-2 top-2 text-gray-400" />
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => handleInputChange(e, setDate)}
              className={`border p-2 rounded-lg pl-10 w-full focus:outline-none ${errors.date ? "border-red-500 ring-red-500" : "focus:ring-2 focus:ring-green-500"}`}
              required
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-orange-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              {editPayment ? "Update Payment" : "Record Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddPaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editPayment: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};