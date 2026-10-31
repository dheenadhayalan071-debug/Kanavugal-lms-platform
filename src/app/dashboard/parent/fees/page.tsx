import React, { useState } from 'react';
import { Receipt, Download, CheckCircle2 } from 'lucide-react';
import { LINKED_CHILDREN } from '../data';

export const ParentFeesPage: React.FC = () => {
  const [selectedChildId, setSelectedChildId] = useState<string>(
    LINKED_CHILDREN[0].id
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeChild =
    LINKED_CHILDREN.find((c) => c.id === selectedChildId) || LINKED_CHILDREN[0];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

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
            <span>Read-Only Fee Ledger · /dashboard/parent/fees</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
            Academic Fee Status & Official Receipts
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Verified offline Cash, UPI, and NEFT tuition receipts for{' '}
            {activeChild.fullName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {LINKED_CHILDREN.map((child) => {
            const isSelected = child.id === activeChild.id;
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => setSelectedChildId(child.id)}
                className={`px-3.5 py-2 rounded-md text-xs font-medium border transition-colors ${
                  isSelected
                    ? 'bg-[#FF4B00] text-[#F5F3EF] border-[#FF4B00]'
                    : 'bg-[#111111] text-[#A1A1AA] border-[#292929] hover:text-[#F5F3EF]'
                }`}
              >
                {child.fullName} ({child.campus})
              </button>
            );
          })}
        </div>
      </header>

      <div className="px-6 lg:px-10 py-8 max-w-4xl">
        <div className="bg-[#111111] border border-[#292929] rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#292929] pb-4">
            <div>
              <p className="text-xs text-[#A1A1AA]">
                Scholar: {activeChild.fullName} ({activeChild.rollNumber})
              </p>
              <h2 className="text-lg font-semibold text-[#F5F3EF] mt-1">
                {activeChild.feeSummary.termTitle}
              </h2>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded bg-[#080808] border border-[#292929] text-[#FF4B00]">
              {activeChild.feeSummary.status}
            </span>
          </div>

          <div className="bg-[#080808] border border-[#292929] rounded-md p-5 space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-[#292929]">
              <span className="text-[#A1A1AA]">Official Receipt Number</span>
              <span className="font-mono text-[#F5F3EF]">
                {activeChild.feeSummary.receiptNo}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#292929]">
              <span className="text-[#A1A1AA]">Campus Branch</span>
              <span className="text-[#F5F3EF]">{activeChild.campus}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#292929]">
              <span className="text-[#A1A1AA]">Total Term Tuition Fee</span>
              <span className="font-mono text-[#F5F3EF]">
                ₹{activeChild.feeSummary.totalFee.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#292929]">
              <span className="text-[#A1A1AA]">Amount Paid</span>
              <span className="font-mono font-semibold text-[#FF4B00]">
                ₹{activeChild.feeSummary.paidAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#292929]">
              <span className="text-[#A1A1AA]">Balance Due</span>
              <span className="font-mono text-[#F5F3EF]">
                ₹{activeChild.feeSummary.balanceDue.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#A1A1AA]">Payment Mode & Date</span>
              <span className="text-[#F5F3EF]">
                {activeChild.feeSummary.paymentMethod} ·{' '}
                {activeChild.feeSummary.paidOn}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              triggerToast(
                `Downloading official fee receipt ${activeChild.feeSummary.receiptNo}.pdf...`
              )
            }
            className="w-full py-2.5 rounded-md bg-[#FF4B00] hover:bg-[#E04200] text-[#F5F3EF] text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              Download Official Receipt ({activeChild.feeSummary.receiptNo})
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentFeesPage;
