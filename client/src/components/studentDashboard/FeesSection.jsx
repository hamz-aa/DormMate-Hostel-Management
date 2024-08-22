import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const FeesSection = () => {
  const [payments, setPayments] = useState([
    { monthYear: 'January/2024', amount: '200', dueDate: '2024-01-31', customerId: '12345', status: 'Paid' },
    { monthYear: 'February/2024', amount: '200', dueDate: '2024-02-28', customerId: '12345', status: 'Paid' },
    { monthYear: 'January/2024', amount: '200', dueDate: '2024-01-31', customerId: '12345', status: 'Expired' },
    { monthYear: 'February/2024', amount: '200', dueDate: '2024-02-28', customerId: '12345', status: 'Paid' },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const generateVoucher = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const newMonthYear = `${month}/${year}`;

    const voucherExists = payments.some(payment => payment.monthYear === newMonthYear);

    if (voucherExists) {
      setDialogOpen(true);
      return;
    }

    const newPayment = {
      monthYear: newMonthYear,
      amount: (Math.random() * 100 + 100).toFixed(2),
      dueDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0],
      customerId: Math.floor(Math.random() * 100000).toString(),
      status: 'Pending',
    };

    setPayments([newPayment, ...payments]);
    console.log('Voucher generated');
  };

  return (
    <div className="p-4 flex flex-col h-screen">
      <h2 className="text-2xl text-[#0A2640] font-bold mb-4 ml-6">Fees Dashboard</h2>
      <div className="bg-gray-200 shadow-md rounded-xl p-6 m-5 flex-grow">
        <h2 className="text-xl text-[#0A2640] font-semibold my-4">Online Payments</h2>
        <hr className="border-t border-gray-300 mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-red-500 mb-4 md:mb-0 md:mr-4">
            The voucher fee will expire if not paid by the due date.
          </p>
          <button
            className="text-white px-5 py-2 rounded-full bg-[#0A2640] hover:bg-white hover:text-[#0A2640] hover:shadow-lg"
            onClick={generateVoucher}
          >
            Generate Voucher
          </button>
        </div>
        <div className="mt-20 px-4">
          <div className="flex flex-col sm:flex-row justify-between text-center text-lg font-bold bg-transparent items-center p-4 px-2 mb-4">
            <span className="w-1/5">Month</span>
            <span className="w-1/5">Amount</span>
            <span className="w-1/5">Due Date</span>
            <span className="w-1/5">Customer Id</span>
            <span className="w-1/5">Status</span>
          </div>
          {payments.map((payment, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between bg-white text-center items-center p-4 px-2 rounded-full mb-4">
              <span className="w-1/5 text-lg">{payment.monthYear}</span>
              <span className="w-1/5 text-lg">{payment.amount}</span>
              <span className="w-1/5">{payment.dueDate}</span>
              <span className="w-1/5">{payment.customerId}</span>
              <span className="w-1/5">
              <span
                            className={`px-3 py-2 text-white rounded-full ${
                              payment.status === 'Paid' ? 'bg-green-600' :
                              payment.status === 'Expired' ? 'bg-red-600' : 'bg-yellow-600'
                            }`}
                          >
                            {payment.status}
                          </span>
              </span>
            </div>
          ))}
</div>
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Voucher Exists</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A voucher for the current month and year already exists.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeesSection;
