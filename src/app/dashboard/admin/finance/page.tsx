import React, { useState } from 'react';
import { Receipt, CreditCard, CheckCircle2 } from 'lucide-react';

interface FeePaymentRow {
  id: string;
  receiptNo: string;
  studentName: string;
  rollNumber: string;
  campus: 'SBO Colony' | 'Anaiyur';
  termName: string;
  amountPaid: number;
  balanceDue: number;
  method: 'CASH' | 'UPI';
  status: 'PAID' | 'PARTIAL';
  paidDate: string;
}

const INITIAL_FEE_PAYMENTS: FeePaymentRow[] = [
  {
    id: 'fee_01',
    receiptNo: 'KA-SBO-2026-0891',
    studentName: 'Kavin Rajan',
    rollNumber: 'KA-SBO-26-0142',
    campus: 'SBO Colony',
    termName: 'Term 1 & 2 JEE Integrated Tuition + CBT Series',
    amountPaid: 68000,
    balanceDue: 0,
    method: 'UPI',
    status: 'PAID',
    paidDate: '29 Oct 2026',
  },
  {
    id: 'fee_02',
    receiptNo: 'KA-ANA-2026-0412',
    studentName: 'Divya Rajan',
    rollNumber: 'KA-ANA-26-0419',
    campus: 'Anaiyur',
    termName: 'Class 9 Foundation Annual Fee',
    amountPaid: 32000,
    balanceDue: 0,
    method: 'CASH',
    status: 'PAID',
    paidDate: '27 Oct 2026',
  },
  {
    id: 'fee_03',
    receiptNo: 'KA-SBO-2026-0904',
    studentName: 'Arjun Narayanan',
    rollNumber: 'KA-SBO-26-0158',
    campus: 'SBO Colony',
    termName: 'Term 1 JEE Main & Advanced Tuition',
    amountPaid: 45000,
    balanceDue: 23000,
    method: 'CASH',
    status: 'PARTIAL',
    paidDate: '25 Oct 2026',
  },
  {
    id: 'fee_04',
    receiptNo: 'KA-ANA-2026-0438',
    studentName: 'Harini Balasubramanian',
    rollNumber: 'KA-ANA-26-0211',
    campus: 'Anaiyur',
    termName: 'CBSE Class 12 Board + NEET Crash Course',
    amountPaid: 54000,
    balanceDue: 0,
    method: 'UPI',
    status: 'PAID',
    paidDate: '22 Oct 2026',
  },
];

export const AdminFinancePage: React.FC = () => {
  const [feePayments, setFeePayments] =
    useState<FeePaymentRow[]>(INITIAL_FEE_PAYMENTS);
  const [feeStudentName, setFeeStudentName] = useState('');
  const [feeRollNo, setFeeRollNo] = useState('KA-SBO-26-0195');
  const [feeAmount, setFeeAmount] = useState('48000');
  const [feeMethod, setFeeMethod] = useState<'CASH' | 'UPI'>('UPI');
  const [feeCampus, setFeeCampus] = useState<'SBO Colony' | 'Anaiyur'>(
    'SBO Colony'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeStudentName.trim() || !feeRollNo.trim()) return;
    const numericAmount = Math.max(1000, Number(feeAmount) || 45000);
    const newPayment: FeePaymentRow = {
      id: `fee_${Date.now()}`,
      receiptNo: `KA-${
        feeCampus === 'SBO Colony' ? 'SBO' : 'ANA'
      }-2026-${Math.floor(1000 + Math.random() * 8999)}`,
      studentName: feeStudentName.trim(),
      rollNumber: feeRollNo.trim().toUpperCase(),
      campus: feeCampus,
      termName: 'Academic Tuition & Test Series Installment',
      amountPaid: numericAmount,
      balanceDue: 0,
      method: feeMethod,
      status: 'PAID',
      paidDate: 'Today',
    };
    setFeePayments((prev) => [newPayment, ...prev]);
    setFeeStudentName('');
    triggerToast(
      `Recorded offline ${newPayment.method} payment of ₹${numericAmount.toLocaleString(
        'en-IN'
      )} (${newPayment.receiptNo}).`
    );
  };

  const totalCollected = feePayments.reduce((sum, f) => sum + f.amountPaid, 0);

  return (
    <div className="bg-[#080808] text-[#F5F3EF]">
      {toastMessage && (
        <div className="fixed bottom-8 right-6 z-50 max-w-md bg-[#111111] border border-[#FF4B00] rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#FF4B00] shrink-0" />
          <p className="text-xs text-[#F5F3EF]">{toastMessage}</p>
        </div>
      )}

      <header className="px-6 lg:px-10 py-6 border-b border-[#292929] bg-[#080808] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#FF4B00] font-medium">
            <Receipt className="w-3.5 h-3.5" />
            <span>Institutional Fee Ledger · /dashboard/admin/finance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            Offline Fee Payments (Cash / UPI)
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Log and track desk fee collections across SBO Colony and Anaiyur campuses
          </p>
        </div>

        <div className="bg-[#111111] border border-[#292929] rounded-lg px-4 py-2.5 text-right">
          <p className="text-[11px] text-[#A1A1AA]">Total Logged Collection</p>
          <p className="font-mono text-lg font-semibold text-[#FF4B00]">
            ₹{totalCollected.toLocaleString('en-IN')}
          </p>
        </div>
      </header>

      <div className="px-6 lg:px-10 py-8 space-y-8 max-w-7xl">
        {/* Log New Offline Desk Receipt Form */}
        <form
          onSubmit={handleRecordPayment}
          className="bg-[#111111] border border-[#292929] rounded-lg p-6 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#292929] pb-3">
            <h2 className="text-base font-semibold text-[#F5F3EF]">
              Log New Offline Desk Receipt (Cash / UPI)
            </h2>
            <span className="font-mono text-xs text-[#FF4B00]">
              DESK VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input
              type="text"
              required
              value={feeStudentName}
              onChange={(e) => setFeeStudentName(e.target.value)}
              placeholder="Student Full Name"
              className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2.5 text-xs text-[#F5F3EF] placeholder-[#A1A1AA] focus:outline-none focus:border-[#FF4B00]"
            />
            <input
              type="text"
              required
              value={feeRollNo}
              onChange={(e) => setFeeRollNo(e.target.value)}
              placeholder="Roll No (KA-SBO-...)"
              className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2.5 text-xs font-mono text-[#F5F3EF] placeholder-[#A1A1AA] focus:outline-none focus:border-[#FF4B00]"
            />
            <select
              value={feeCampus}
              onChange={(e) =>
                setFeeCampus(e.target.value as 'SBO Colony' | 'Anaiyur')
              }
              className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2.5 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
            >
              <option value="SBO Colony">SBO Colony</option>
              <option value="Anaiyur">Anaiyur</option>
            </select>
            <input
              type="number"
              required
              value={feeAmount}
              onChange={(e) => setFeeAmount(e.target.value)}
              placeholder="Amount (INR)"
              className="w-full bg-[#080808] border border-[#292929] rounded-md px-3 py-2.5 text-xs font-mono text-[#F5F3EF] placeholder-[#A1A1AA] focus:outline-none focus:border-[#FF4B00]"
            />
            <div className="flex gap-2">
              <select
                value={feeMethod}
                onChange={(e) =>
                  setFeeMethod(e.target.value as 'CASH' | 'UPI')
                }
                className="flex-1 bg-[#080808] border border-[#292929] rounded-md px-2.5 py-2.5 text-xs font-mono text-[#F5F3EF] focus:outline-none focus:border-[#FF4B00]"
              >
                <option value="UPI">UPI</option>
                <option value="CASH">CASH</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-xs font-medium inline-flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Record</span>
              </button>
            </div>
          </div>
        </form>

        {/* Fee Ledger Rows */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-[#F5F3EF]">
            Recent Desk Receipts ({feePayments.length})
          </h2>

          {feePayments.map((fee) => (
            <div
              key={fee.id}
              className="bg-[#111111] border border-[#292929] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-[#FF4B00] font-semibold">
                    {fee.receiptNo}
                  </span>
                  <span className="text-sm font-semibold text-[#F5F3EF]">
                    {fee.studentName}
                  </span>
                  <span className="font-mono text-xs text-[#A1A1AA]">
                    ({fee.rollNumber})
                  </span>
                </div>
                <p className="text-xs text-[#A1A1AA]">
                  {fee.termName} · {fee.campus}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="font-mono text-base font-semibold text-[#F5F3EF]">
                    ₹{fee.amountPaid.toLocaleString('en-IN')}
                  </p>
                  <p className="font-mono text-xs text-[#A1A1AA]">
                    {fee.method} · {fee.paidDate}
                  </p>
                </div>
                <span
                  className={`font-mono text-xs px-2.5 py-1 rounded border ${
                    fee.status === 'PAID'
                      ? 'bg-[#080808] text-[#F5F3EF] border-[#292929]'
                      : 'bg-[#FF4B00]/15 text-[#FF4B00] border-[#FF4B00]/40'
                  }`}
                >
                  {fee.status}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AdminFinancePage;
