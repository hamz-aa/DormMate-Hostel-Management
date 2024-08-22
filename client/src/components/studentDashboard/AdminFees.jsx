import React, { useState } from 'react';

const AdminFeesSection = () => {
  const [payments, setPayments] = useState([
    { monthYear: 'January/2024', studentName: 'John Doe', dueDate: '2024-01-31', customerId: '12345', status: 'Paid' },
    { monthYear: 'February/2024', studentName: 'Jane Smith', dueDate: '2024-02-28', customerId: '12345', status: 'Paid' },
    { monthYear: 'January/2024', studentName: 'Jim Brown', dueDate: '2024-01-31', customerId: '12345', status: 'Unpaid' },
    { monthYear: 'February/2024', studentName: 'Jake White', dueDate: '2024-02-28', customerId: '12345', status: 'Paid' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [errors, setErrors] = useState({});
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // Clear input fields and errors on modal close
    setStudentName('');
    setDueDate('');
    setCustomerId('');
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentName') {
      setStudentName(value);
    } else if (name === 'dueDate') {
      setDueDate(value);
    } else if (name === 'customerId') {
      setCustomerId(value);
    }
  };

  const handleAddVoucher = () => {
    // Basic validation
    if (!studentName || !dueDate || !customerId) {
      setErrors({
        studentName: !studentName ? 'Student name is required' : '',
        dueDate: !dueDate ? 'Due date is required' : '',
        customerId: !customerId ? 'Customer ID is required' : '',
      });
      return;
    }

    const currentDate = new Date();
    const currentDateStr = currentDate.toISOString().split('T')[0];

    // Check if due date is less than current date
    if (dueDate < currentDateStr) {
      setErrors({
        ...errors,
        dueDate: 'Due date cannot be less than current date',
      });
      return;
    }

    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const newMonthYear = `${month}/${year}`;

    // Check if voucher for current month and customer ID already exists
    const voucherExists = payments.some(payment => payment.monthYear === newMonthYear && payment.customerId === customerId);

    if (voucherExists) {
      alert('A voucher for this month and customer ID already exists.');
      return;
    }

    // Add new payment
    const newPayment = {
      monthYear: newMonthYear,
      studentName: studentName,
      dueDate: dueDate, // Assuming dueDate is already formatted correctly
      customerId: customerId,
      status: 'Pending',
    };

    setPayments([newPayment, ...payments]);
    console.log('Voucher generated');

    // Close modal and clear input fields
    handleCloseModal();
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <h2 className="text-2xl text-[#0A2640] font-bold mb-4 ml-6">Fees Dashboard</h2>
      <div className="bg-gray-200 shadow-md rounded-xl p-6 m-5 flex-grow">
        <div className="flex justify-between items-center my-6">
          <h2 className="text-xl text-[#0A2640] font-semibold">Online Payments</h2>
          <button
            className="text-white px-4 py-2 rounded-full bg-[#0A2640]"
            onClick={handleOpenModal}
          >
            Generate Voucher
          </button>
        </div>
        <hr className="border-t border-gray-300 mb-4" />
        <div className="flex justify-between items-center mx-4">
          <div className="relative">
            <form className="max-w-md mx-auto">   
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input type="search" id="default-search" className="block w-full py-3 px-4 pr-10 ps-10 text-sm text-gray-900 shadow-lg rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search" required />
              </div>
            </form>
          </div>
          <div className="relative ml-4">
            <button
              className="focus:outline-none"
              onClick={handleMenuToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute top-full right-0 mt-1 w-24 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col gap-1 p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Paid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Unpaid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span>Pending</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-20 px-4">
          <div className="flex flex-col sm:flex-row justify-between text-center text-lg font-bold bg-transparent items-center p-4 px-2 mb-4">
            <span className="w-1/5">Month</span>
            <span className="w-1/5">Student Name</span>
            <span className="w-1/5">Due Date</span>
            <span className="w-1/5">Customer Id</span>
            <span className="w-1/5">Status</span>
          </div>
          {payments.map((payment, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between bg-white text-center items-center p-4 px-2 rounded-full mb-4">
              <span className="w-1/5 text-lg">{payment.monthYear}</span>
              <span className="w-1/5 text-lg">{payment.studentName}</span>
              <span className="w-1/5">{payment.dueDate}</span>
              <span className="w-1/5">{payment.customerId}</span>
              <span className="w-1/5">
              <span
                            className={`px-3 py-2 text-white rounded-full ${
                              payment.status === 'Paid' ? 'bg-green-600' :
                              payment.status === 'Unpaid' ? 'bg-red-600' : 'bg-yellow-600'
                            }`}
                          >
                            {payment.status}
                          </span>
              </span>
            </div>
          ))}
</div>

      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-xl p-6 bg-[#0A2640] rounded-t-2xl font-semibold text-white text-center mb-4">Add Voucher</h2>
            <div className="p-6 pb-14 px-8 md:px-20">
              <div className="mb-8">
                <input
                  type="text"
                  name="studentName"
                  placeholder="Student Name"
                  value={studentName}
                  onChange={handleChange}
                  className="block w-full shadow-lg rounded-lg p-2"
                />
                {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName}</p>}
              </div>
              <div className="mb-8">
                <input
                  type="date"
                  name="dueDate"
                  placeholder="Due Date"
                  value={dueDate}
                  onChange={handleChange}
                  className="block w-full shadow-lg rounded-lg p-2"
                />
                {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  name="customerId"
                  placeholder="Customer ID"
                  value={customerId}
                  onChange={handleChange}
                  className="block w-full shadow-lg rounded-lg p-2"
                />
                {errors.customerId && <p className="text-red-500 text-sm">{errors.customerId}</p>}
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={handleAddVoucher}
                  className="px-6 py-2 rounded-full bg-[#0A2640] text-white"
                >
                  Add
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-full shadow-lg text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeesSection;
